var sum=0;
mui.plusReady(function(){
	plus.webview.create('SailDetail/SailDetailHeader.html','SailDetailHeader.html',{},{shopName:'zhangshan'});
	mui('.mui-media-body').on('tap','.listfd',function(e){		
		var goWeb=plus.webview.getWebviewById('SailDetailHeader.html');
		var shopname=this.getElementsByClassName('shopname')[0].innerHTML;
		var detailPage=null;
		if(!detailPage){
			detailPage=plus.webview.getWebviewById('SailDetailHeader.html');
		}
		mui.fire(detailPage,'ShopNamefire',{shopName:shopname});
		goWeb.show();
//		goWeb.show({shopName:shopname});
	});
});

/*调试总额显示*/
/*document.getElementById('list2').addEventListener('tap',function(){	
//	var count = document.getElementById('countInput').value;
	var count = document.getElementById('list2').getElementsByTagName('input')[0].value;
	//alert(count);
	if(count<0)count=-1; 
	count++;
	document.getElementById('list2').getElementsByTagName('input')[0].setAttribute('value',count);
	sum=12*count;
	//alert(count+':'+sum);
	document.getElementById('sum').setAttribute('value',sum);
});

document.getElementById('list2').addEventListener('tap',function(){	
//	var count = document.getElementById('countInput').value;
	var count = document.getElementById('list2').getElementsByTagName('input')[0].value;
	
	if(count<=0)count=1;
	count--;
	document.getElementById('list2').getElementsByTagName('input')[0].setAttribute('value',count);
	sum=12*count;
	document.getElementById('sum').setAttribute('value',sum);
});
*/
//商家地理位置

var userList=[];
var addFlag=0;
//1.新增商户(上传)

document.getElementById('userx').addEventListener('tap',addUser); //服务器添加用户

function addUser(){//服务器添加用户
//	alert('go'+localStorage.getItem('username'));
	var Query=new AV.Query("TESTsall");
	var Flag=0;
	Query.equalTo('username',localStorage.getItem('username'));	
	var resultFind = Query.find({
		success:function(resp){
			alert(resultFind[0].getItem('username'));//!!!!
			mui.toast('服务器已存在该用户，联系管理员更新？');
			Flag=1;//添加了这个用户啦
		},
		error:function(error){}
	});
	
	setTimeout(function(){
		if (Flag) {
			mui.toast('服务器已经有该用户了。。');return;
		}else{
				var Product=AV.Object.extend('TESTsall');
				var product = new Product();
				product.save({
					username:localStorage.getItem('username'),
					password:'000',
					data:{
						shopname:'上上之家',
						product:'鸡鸭鱼肉',
						position:localStorage.getItem('shopPosition')
					}}
				).then(function() {
				    //  发布成功，跳转到商品 list 页面
				    alert('上传成功');
				}, function(error) {
				    alert(JSON.stringify(error));
				});
		}
	},1000);

}
function addSall(){
//	alert('开始上传');
	getShop(userList);
}

//2.下载用户信息
function getShop(userList){
//	alert('正在查询');
	var name,address;	
	var Query=new AV.Query("TESTsall");
//	Query.equalTo('username','nat');
	var resultFind = Query.find({
		success:function(resp){
			for(var i=0;i<resp.length;i++){					
				var object=resp[i];
				var shop = object.get('data');
				var returnFlag=0;
//				var flag=0;//手机加载一次，页面不再加载
//				var downFlag=0;//服务器下载过一次，查找成功后不再添加
				var item={name:object.get('username'),address:shop['position'],flag:0};
				for (var j=0;j<userList.length;j++) {
					if(item.name===userList[j].name)
					returnFlag++;
				}
				if(!returnFlag)
				userList.push(item);	
			}
		},
		error:function(error){
			alert("error"+error.message);
		}
	});
	
	setTimeout(function(){
//		alert('点了刷新了');
		listFood(userList);		
	},1000);
}

/*3.商品上传格式*/
//var p = {name:"一叶扁舟",address:'22号'};
function listFood(shopList){
	var fdDiv = document.body.querySelector('.mui-media-body');
	var fdlist=document.body.querySelectorAll('.listfd');
	

	for (var i=0;i<shopList.length;i++) {
		if(!shopList[i].flag)
		{
			var li=document.createElement('span');
			fdModel(li,shopList[i]);
			fdDiv.appendChild(li);
			shopList[i].flag++;
		}
	}
	
}
function fdModel(li,data){
	li.innerHTML='<div id="list2" class="listfd">'+'<img src="../../img/s2.jpg" style="height: 40px;width: 50px;"/>'
	+'<h5 style="" class="shopname">'+data.name+'</h5>'+
			'<h5 class="content" style="padding: 0px;margin-left:53px;margin-top: -30px;"><span class="contentx" style="font-size: 70%;">位置:'+data.address+'</span></h5>'
			+'<h6 style="margin-left: 5px;" class="jiancontent">新用户立减5元<span class="longcontent">距离:1000m</span></h6>'
			+'<h6 style="margin-left: 5px;" class="fullcontent">满30立减5元</h6>'
		+'<hr/>'+'</div>';
	
}

/*左划返回*/
//在android4.4.2中的swipe事件，需要preventDefault一下，否则触发不正常

document.addEventListener('swipeleft',function(e){

	if(Math.abs(e.detail.angle)-90<45)
		return;
		mui.back();	
})
/* 支付宝支付引用  */
var channel =null;
function plusReady(){
	document.getElementById('go').addEventListener('tap',function(){
	//var count = document.getElementById('sum').value;
	mui.toast('未结算金额:'+sum);
	
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



