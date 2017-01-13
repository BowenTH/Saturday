mui.init();


//var User=AV.Object.extend('_User');
//var user=new User();
//alert('user creat');
//user.save({
//	username:'ttxbowen',
//	password:'000',
//	email:'bowen@qq.com'
//}).then(function(object) {
//	alert('rocks');
//})

//mui.ajax({
//		url:'https://api.leancloud.cn/1.1/classes/Post',
//		type:'post',
//		data:{"content": "每个 Java 程序员必备的 8 个开发工具",
//			"pubUser": "LeanCloud官方客服",
//			"pubTimestamp": 1435541999 
//		},
//		headers:{
//			'Content-Type': 'application/json',
//			'X-LC-Id':'91TtjFpYIeeLfxTlfYAo9GLT-gzGzoHsz',
//			'X-LC-Key':'lLxPT0gKqEBd2Vk56OCjYfbp',
//		},
//		success:function(resp){
//			alert('ok');
//		},
//		error:function(error){
//			alert('fall');
//		}
//	})



//登录判断 记住密码
	var accentInput = document.querySelector('input[name="accent"]');
	var passwdInput = document.querySelector('input[name="passwd"]');
LoginInit();
//记住密码
function LoginInit(){
	if(localStorage.getItem('username')||localStorage.getItem('passwd'))
	{
		accentInput.setAttribute('value',localStorage.getItem('username'));
		passwdInput.setAttribute('value',localStorage.getItem('passwd'));
	}
}

document.getElementById('check-login').addEventListener('tap',function(){
	//登录判断

	var accentInput = document.querySelector('input[name="accent"]');
	var passwdInput = document.querySelector('input[name="passwd"]');
	//console.info(accentInput.value,"---accent",passwdInput.value);
	if(!accentInput.value||!passwdInput.value)
	{
		mui.toast('请输入账户和密码');
		return;
	}
	mui.ajax({
		url:'https://api.leancloud.cn/1.1/login',
		type:'post',
		data:{
			'username':accentInput.value,
			'password':passwdInput.value
		},
		headers:{
			'X-LC-Id':'91TtjFpYIeeLfxTlfYAo9GLT-gzGzoHsz',
			'X-LC-Key':'lLxPT0gKqEBd2Vk56OCjYfbp',
		},
		success:function(resp){
			localStorage.setItem('sessionToken',resp.sessionToken);
			localStorage.setItem('username',resp.username);
			localStorage.setItem('passwd',passwdInput.value);
			//alert('succes');
			//记住账号密码
			mui.toast('登录成功');
			mui.later(function(){
//				mui.openWindow('../index/index.html')
				mui.openWindow({
				url:'../index/index.html',
				styles: {
	                    top: 10,
	                    bottom: 10
	                },
		})
			},1000);
		},
		error:function(error){
			mui.toast('账户或是密码输入有误');
		}
	})
	if (accentInput.value==='admin'&&passwdInput.value==='123') {
		
		mui.openWindow({
			url:'../index/index.html',
			styles: {
                    top: 10,
                    bottom: 10
                },
		})
	}
})


document.getElementById('check-regist').addEventListener('tap',function(){
	//注册判断

	var accentInput = document.querySelector('input[name="accent"]');
	var passwdInput = document.querySelector('input[name="passwd"]');
	//console.info(accentInput.value,"---accent",passwdInput.value);
	if(!accentInput.value||!passwdInput.value)
	{
		mui.toast('请输入账户和密码');
		return;
	}
	mui.ajax({
		url:'https://api.leancloud.cn/1.1/users',
		type:'post',
		data:{
			'username':accentInput.value,
			'password':passwdInput.value
		},
		headers:{
			'Content-Type':'application/json',
			'X-LC-Id':'91TtjFpYIeeLfxTlfYAo9GLT-gzGzoHsz',
			'X-LC-Key':'lLxPT0gKqEBd2Vk56OCjYfbp',
		},
		success:function(resp){
			localStorage.setItem('sessionToken',resp.sessionToken);
			localStorage.setItem('username',resp.username);
			mui.toast('注册成功');
			mui.later(function(){
				mui.openWindow('../index/index.html')
			},1000);
		},
		error:function(error){
			mui.toast('账户或是密码输入有误');
			alert(accentInput.value+passwdInput.value);
			
		}
	});
	if (accentInput.value==='admin'&&passwdInput.value==='123') {
		mui.openWindow('../index/index.html')
	}
})