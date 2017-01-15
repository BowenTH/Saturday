
/*显示或是关闭侧滑栏*/
//document.getElementById('closList').addEventListener('tap',function(){
//	mui('.mui-off-canvas-wrap').offCanvas().toggle();
//	
//});
function setting(){
	mui.openWindow({
		url:'setting/setting.html',
	})
}
//document.getElementById('sign').addEventListener('tap',setting);
//document.getElementById('setting').addEventListener('tap',setting);
//document.getElementById('checkUp').addEventListener('tap',upDating);

var checkUrl="http://demo.dcloud.net.cn/test/update/check.php";
function upDating(){
	var wgtVer=null;
	function plusReady(){
	    // ......
	    // 获取本地应用资源版本号
	    plus.runtime.getProperty(plus.runtime.appid,function(inf){
	        wgtVer=inf.version;
	        console.log("当前应用版本："+wgtVer);
	    });
	}
	if(window.plus){
	    plusReady();
	}else{
		  document.addEventListener('plusready',plusReady,false);
	}
	//退出，版本不需要升级
	
	plus.nativeUI.showWaiting("检测更新...");
	alert('checking');
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        switch(xhr.readyState){
            case 4:
            plus.nativeUI.closeWaiting();
            if(xhr.status==200){
                console.log("检测更新成功："+xhr.responseText);
                var newVer=xhr.responseText;
                if(wgtVer&&newVer&&(wgtVer!=newVer)){
                	console.log(wgtVer+":!!!!!!!!!!!!!!"+newVer);
                    downWgt();  // 下载升级包
                }else{
                    plus.nativeUI.alert("无新版本可更新！");
                }
            }else{
                console.log("检测更新失败！");
                plus.nativeUI.alert("检测更新失败！");
            }
            break;
            default:
            break;
        }
    }
    xhr.open('GET',checkUrl);
    xhr.send();	
}

// 下载wgt文件
//var wgtUrl="http://demo.dcloud.net.cn/test/update/H5EF3C469.wgt";
var wgtUrl='http://oi7xjum3c.bkt.clouddn.com/H5824FA93.wgt';

function downWgt(){
    plus.nativeUI.showWaiting("下载wgt文件...");
    var dtask = plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){
        if ( status == 200 ) { 
            console.log("下载wgt成功："+d.filename);
            installWgt(d.filename); // 安装wgt包
        } else {
            console.log("下载wgt失败！");
            plus.nativeUI.alert("下载wgt失败！");
        }
        plus.nativeUI.closeWaiting();
    }).start();
    
    dtask.addEventListener("statechanged", function(){
	var downSize = dtask.downloadedSzie; // 已下载大小
	var totalSize = dtask.totalSize; // 总大小
	}, false ); 
}

// 更新应用资源
function installWgt(path){
    plus.nativeUI.showWaiting("安装wgt文件...");
    plus.runtime.install(path,{},function(){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件成功！");
        plus.nativeUI.alert("应用资源更新完成！",function(){
            plus.runtime.restart();
        });
    },function(e){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件失败["+e.code+"]："+e.message);
        plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
    });
}



