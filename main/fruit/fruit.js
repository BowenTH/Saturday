var sum=0;
mui.plusReady(function(){
	plus.webview.create('SailDetail/SailDetailHeader.html','SailDetailHeader.html',{},{shopName:'zhangshan'});
	sqlcreat();
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

var shopList = null;
function sqlcreat(){		
	upDateFile();
	function upDateFile(){								
		console.log('go datalist');
		var shopQuery=new AV.Query('TESTsall');
		shopQuery.find().then(function(results){
			shopList = results;
			console.log(JSON.stringify(shopList)); 
		},function(error){
			console.log(error);
		});
	}	
	/*所有数据保存到websql数据库，需要时更新*/
	/*数据库获取服务器信息有4秒延迟*/
	var db = openDatabase('testDB', '1.0', 'Test DB', 2 * 1024 * 1024);
	//      db.transaction(function (context){
	//      	context.executeSql('DROP NewshopData');
	//      	alert('drop success');
	//     }); 
	var msg,j;
	mui.later(function(){       	        
	    db.transaction(function (context) {
	       context.executeSql('CREATE TABLE IF NOT EXISTS SshopData (id unique, shopname,message)');
	     	var flagData=null;
	       for (j=0;j<shopList.length;j++) {	  
	       		context.executeSql('INSERT INTO SshopData (id,shopname,message) values (?,?,?)',
	       		[shopList[j].id,shopList[j].get('data').shopname,JSON.stringify(shopList[j])]);  
	        } 
	     });
	 },4000);          
	//      db.transaction(function(context){
	//      	content.executeSql('UPDATA NewshopData SET')
	//      })

	        db.transaction(function (context) {
	        	var sqlResult=[];
	           context.executeSql('SELECT * FROM SshopData', [], function (context, results) {
//	    sqlResult=results;//获取数据库商户信息
	    var len = results.rows.length, i;
	    console.log('Got '+len+' rows.');
	    
	       for (i = 0; i < len; i++){
	       	var shopData=JSON.parse(results.rows.item(i).message);
	       	var flag=results.rows.item(i).message; 
	       	sqlResult[i]=results.rows.item(i).message;	       	
				       	
	       	var product=shopData.data.product;
	       	console.log(shopData.data.shopname); 
	//             	console.log(product.length); 
//	        console.log(JSON.stringify(product));
	        for (var typeobj in product) {
	        	for (var j=0;j<product[typeobj].length;j++) {
//	        		console.log(product[typeobj][j].name+':'+product[typeobj][j].price);
	        	} 
	        }    
	    }      
//	       //往foodMenu.html里发送shopList信息
//			alert('foodMenu page'); 
//			var i=0; 
//			foodMenu=plus.webview.getWebviewById('foodMenu.html');
//			alert(JSON.stringify(foodMenu));
//			mui.fire(foodMenu,'ShopListfire',{'sqlResult':sqlResult});			
	 });  
	});
}

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
						shopname:'韩食馆',
						product:{
							'热销':[{name:'驴肉火烧',price:10},{name:'红烧鱼',price:12}],
							'特价':[{name:'泡菜',price:2},{name:'菠萝',price:3}],
							'新品':[{name:'韩炸丸子',price:1},{name:'萝卜',price:1}],
							'精品':[{name:'生鱼片',price:100},{name:'萝卜',price:1}]
						},
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
		listFood(shopList);		
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
			shopList[i]['flag']=1;
		}
	}
}
function fdModel(li,data){
	li.innerHTML='<div id="list2" class="listfd">'+'<img src="../../img/s2.jpg" style="height: 40px;width: 50px;"/>'
	+'<h5 style="" class="shopname">'+data.get('data').shopname+'</h5>'+
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


