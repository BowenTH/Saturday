
mui.init();
mui.plusReady(function(){
	var data = plus.webview.currentWebview().data;
	alert('传过来了'+data);
})
