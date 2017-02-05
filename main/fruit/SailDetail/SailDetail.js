
mui.plusReady(function(){
//		var flagMenu=[{button:'点菜',id:'foodMenu.html'},{button:'评价',id:'appraise.html'}];
		var flagMenu='点菜';
		mui.back=function(){
			plus.webview.getWebviewById('SailDetailHeader.html').hide();
			flagMenu='点菜';
		}
		
		mui('.mui-table-view').on('tap','.mui-table-view-cell',function(){
			//mui.toast(this.getElementsByClassName('tab')[0].innerHTML);
			if(localStorage.getItem('SailDetailBack')=='1')//判断是否是退出后，再进来的要初始化flagMenu
			{
				flagMenu='点菜';localStorage.setItem('SailDetailBack','0');
			}
		var tabFlag=this.getElementsByClassName('tab')[0].innerHTML;  
		
		if (tabFlag==flagMenu)return;
		if(tabFlag=='点菜'){
			plus.webview.getWebviewById('appraise.html').hide();
			plus.webview.getWebviewById('foodMenu.html').show();
		} else{
			plus.webview.getWebviewById('foodMenu.html').hide();
			plus.webview.getWebviewById('appraise.html').show();
		}
		flagMenu=tabFlag;
	});
});	

