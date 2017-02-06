var shopName=null;
var typenum=0;
mui.plusReady(function(){	
	//获取当前商铺名
	shopName=plus.webview.currentWebview().shopname;	
	var db = openDatabase('testDB', '1.0', 'Test DB', 2 * 1024 * 1024);
	 	db.transaction(function (context) {
//	        var sqlResult=[];
	        context.executeSql('SELECT * FROM SshopData', [], function (context, results) {
	    var len = results.rows.length, i;	       
	       for (i = 0; i < len; i++){
	       	var shopData=JSON.parse(results.rows.item(i).message);
//	       	document.getElementById('left-side').innerHTML='';
			if(shopData.data.shopname==shopName){//获取当前商铺信息
				var product=shopData.data.product;
				mui.toast(JSON.stringify(product));
//		       	console.log(shopData.data.shopname);
		       	var typeList=['热销','特价','新品','精品'];//固定 侧栏
		        for (var typeobj in product) {
//				var typeobj=null;
//				for (var i=0;i<4;i++){
//					typeobj=typeList[i];//固定死 侧栏
		        	//添加侧列listdiv 热销，特价，新品，精品
		        	var ul = document.createElement('ul');//add ul
		        	ul.innerHTML='<li>'+typeobj+'</li>';
		        	var fdDIV = document.body.querySelector('#left-side');//侧栏列表		        	
		        	var fdUL = document.body.querySelector('#fdUL');//菜单列表
		        	$(fdUL).addClass('mui-table-view'); 
		        	fdDIV.appendChild(ul);
		        	var h=document.createElement('h5');
		        	h.innerHTML=typeobj;
		        	fdUL.appendChild(h);
		        	for (var j=0;j<product[typeobj].length;j++) {		        		
		        		var li = document.createElement('li');//add li
		        		var dialog=document.querySelector('#temp_detail');  
		        		dialog.content.querySelector('.food-type').innerHTML=product[typeobj][j].name
		        		+'<span  class="sigle">'+product[typeobj][j].price+'</span>';
		        		fdUL.appendChild(dialog.content.cloneNode(true));
		        	}
		        }    
			}		
	    }  
	    });});

});



/* 支付宝支付引用  */
var channel =null;
function plusReady(){
	document.getElementById('go').addEventListener('tap',function(){
	mui.toast('结算金额:'+foodsum);
	//生成订单
//	alert(shopName);	
	var checklist=[];
	$list=$('#menu-list ul li');

//	alert($('#menu-list .sigle:eq(1)').text());
//	alert($('#menu-list .mui-badge:eq(1)').text());
	for (var i=0;i<$('#menu-list ul li').length;i++) {
		var flag={'name': $('#menu-list .food-type:eq('+i+')').text(),
			'price':$('#menu-list .sigle:eq('+i+')').text(),
			'count':$('#menu-list .mui-badge:eq('+i+')').text()
		}
		checklist.push(flag);
	}
//	alert(JSON.stringify(checklist));
	//订单导入数据库 
	var db = openDatabase('testDB', '1.0', 'Test DB', 2 * 1024 * 1024);
	db.transaction(function (context) {
       	    context.executeSql('CREATE TABLE IF NOT EXISTS LshopData (shopname unique, checklist)');
     		context.executeSql('INSERT INTO LshopData (shopname,checklist) values (?,?)',
       		[shopName,JSON.stringify(checklist)]);  
       });

	plus.payment.getChannels(function(channels){
	channel=channels[0];
	},function(e){
		alert('获取支付通道失败:'+e.message);
	});
	pay('alipay');
//	pay('weixin');
})
}
document.addEventListener('plusready',plusReady,false);
var ALLPAYSERVER='http://demo.dcloud.net.cn/helloh5/payment/alipay.php?total=';
//var ALLPAYSERVER='https://bowenth.github.io/';
var WXPAYSERVER='http://demo.dcloud.net.cn/helloh5/payment/wxpay.php?total=';



//2.发起支付请求
function pay(id){
 var PAYSERVER='';
    if(id=='alipay'){
        PAYSERVER=ALLPAYSERVER;
//      alert('发起支付请求')
    }else if(id=='weixin'){
    	alert('微信支付哟');
        PAYSERVER=WXPAYSERVER;
    }else{
        plus.nativeUI.alert("不支持此支付通道！",null,"捐赠");
        return;
    }
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
//  	alert('判断');
        switch(xhr.readyState){
            case 4:
            if(xhr.status==200){
                plus.payment.request(channel,xhr.responseText,function(result){
                    plus.nativeUI.alert("支付成功！",function(){
                        back();
                    });
                },function(error){
                    plus.nativeUI.alert("支付失败：" + error.code);
                });
            }else{
                alert("获取订单信息失败！");
            }
            break;
            default:
            break;
        }
    }
    xhr.open('GET',PAYSERVER);
    xhr.send();
}


