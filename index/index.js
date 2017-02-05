
mui.init();

mui.plusReady(function(){	
	mui.toast('正在加载，请稍等...')
	var parentWv=plus.webview.currentWebview();
	var Wvlist=[{
		url:'../main/main.html',
		id:'main'
	},{
		url:'../list/list.html',
		id:'list'
	}];
	for (var i=0;i<Wvlist.length;i++) {
		if (plus.webview.getWebviewById(Wvlist[i].id)) {			
			continue;
		}
		var newWv = plus.webview.create(Wvlist[i].url,Wvlist[i].id,{
			bottom:'50px',
			top:'45px',//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!????????????
			popGesture:'none'
		});
		if (i===0) {

//			document.getElementById('changeHead').innerHTML='<span class="testhead mui-icon mui-icon-bars"></span>';
			newWv.show(); 		
		}else{
			newWv.hide();
		}
		parentWv.append(newWv);
		console.info(i);
	}
	var showWv = 'main';//默认的id
	mui('.mui-bar').on('tap','.mui-tab-item',function(e){
		if (showWv ===this.dataset.id) {			
			return;
		}
		//隐藏当前Webview		
		plus.webview.getWebviewById(showWv).hide();
		console.info(this.dataset.id);
		plus.webview.getWebviewById(this.dataset.id).show();
		showWv = this.dataset.id;//重新赋值
		if (this.dataset.id==='main') {
			document.getElementById('telheader').style.visibility='hidden';
			document.getElementById('mainheader').style.visibility='visible';
		} else{
			document.getElementById('telheader').style.visibility='visible';
			document.getElementById('mainheader').style.visibility='hidden';
		}	

	});
		
//	document.getElementsByClassName('testhead')[0].addEventListener('tap',function(){
////		mui.toast('功能待加');
//	});
	document.getElementById('leftSlide').addEventListener('tap',function(){
			var mainView=plus.webview.getLaunchWebview();
			var wd=plus.webview.getWebviewById('webview.html');
			wd.show("slide-in-left",200);
			mainView.setStyle({mask:"rgba(0,0,0,0.8)"});
		});
});
  