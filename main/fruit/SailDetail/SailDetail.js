
mui.plusReady(function(){
//		var flagMenu=[{button:'点菜',id:'foodMenu.html'},{button:'评价',id:'appraise.html'}];
		var flagMenu='点菜';
		mui('.mui-table-view').on('tap','.mui-table-view-cell',function(){
			//mui.toast(this.getElementsByClassName('tab')[0].innerHTML);
		var tabFlag=this.getElementsByClassName('tab')[0].innerHTML;
		console.log(tabFlag.toString());
		
//		if(flagMenu[0].button==tabFlag)return;
//		plus.webview.getWebviewById(flagMenu[0].id).hide();
//		plus.webview.getWebviewById(flagMenu[1],id).show();
//		
		flagMenu=tabFlag;
		
		if (tabFlag=='点菜'&&flagMenu)return;
		if(tabFlag=='点菜'){
			mui.toast('menu');
			plus.webview.getWebviewById('appraise.html').hide();
			plus.webview.getWebviewById('foodMenu.html').show();
		} else{
			mui.toast('appraise');
			plus.webview.getWebviewById('foodMenu.html').hide();
			plus.webview.getWebviewById('appraise.html').show();
			flagMenu=0;
		}
	});
});	

