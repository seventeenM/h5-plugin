
;; (function ($) {
    $.alert = function(opt) {
        var initOpt = {   //默认值
            title: '',
            description: '',
            theme: 'pink',  
            btnContent: '登录观看',
            className: '',
            style: '' 
        }
        $.extend(initOpt, opt); //继承合并对象
        var imgUrl = {};
        // var 
        if(initOpt.theme === 'pink'){
            imgUrl = {
                big: 'picture/singListen.png',
                small: 'picture/fire.png'
            }
        }else if(initOpt.theme === 'blue'){
            imgUrl = {
                big: 'picture/handclap.png',
                small: 'picture/pencil.png'
            }
        }else if(initOpt.theme === 'yellow'){
            imgUrl = {
                big: 'picture/peopleAndCat.png',
                small: 'picture/directional.png'
            }
        }
        var $alert = $(`<div id="mengcheng-alert" class="c-mengcheng-alert ${initOpt.className}" style=${initOpt.style}>
                <div class="c-alert b_${initOpt.theme}">
                    <div id="mengcheng-alert-content">
                        <div class="title">
                            <p class="tit">${initOpt.title}</p>
                            <p class="theme_${initOpt.theme}">${initOpt.description}</p>
                        </div>
                        <div class="btns" id="funModule">
                            <input placeholder="请输入手机号"/><br/>
                            <button class="btn_${initOpt.theme}">${initOpt.btnContent}</button>
                        </div>
                    </div>
                    <image class="singListen_${initOpt.theme}" src="${imgUrl.big}"></image>
                    <image class="fire_${initOpt.theme}" src="${imgUrl.small}"></image>
                    <div class="circle_orange_${initOpt.theme}" id="star-five"></div>
                    <div class="circle_purple_${initOpt.theme}"></div>
                    <div class="circle_white_${initOpt.theme}"></div>
                    <div class="purple_small_${initOpt.theme}"></div>
                    <div class="purple_big_${initOpt.theme}"></div>
                    <div class="orange_op_${initOpt.theme}"></div>
                    <div class="circle_error" id="id_circle_error">
                        <div class="black"></div>
                    </div>
                </div>
            </div>`);
        $("body").append($alert);
        $("#id_circle_error").on('click', (e) => {
             opt.clickClose(e, {
               aa: 1
             });
        })
      return getfunModuleDom();
    }
    function getfunModuleDom(){
      return $("#funModule")
    }
})(jQuery)




// function AutoCenter($dialog) {
// 	var w = $dialog.width();
// 	var h = $dialog.height();
// 	var l = $(window).width() - w;
// 	var t = $(window).height() - h;
// 	$dialog.css({
// 		left:(l /2) +"px",
// 		top:(t / 2)+"px"
// 	});
// }
// function DialogMove($dialog,opts){\
// 	//静止选中文字
// 	$(document).bind("selectstart",function(){return false;});
// 	var w = $dialog.width();
// 	var h = $dialog.height();
// 	var le = $(document).width() - w;
// 	var to = $(document).height() - h;
// 	//拖拽
// 	$dialog.find(".title").mousedown(function(evw) {
// 		var ev = evw || window.event;
// 		var dialogBox = $(this).parent()
// 		var _left = ev.clientX - dialogBox.offset().left;
// 		var _top = ev.clientY - dialogBox.offset().top;
// 		var flag = true;
// 		$(document).mousemove(function(eve) {
// 			if (flag)
// 			{
// 				var ev = eve || window.event;
// 				var l = ev.clientX - _left;
// 				var t = ev.clientY - _top;
// 				//防止溢出
// 				if (t <= 0) t = 0;   //top
// 				if (l <= 0) l = 0;   //left
// 				if (l >= le) l = le; //bottom
// 				if (t >= to) t = to; //right
// 				dialogBox.css({left:l,top:t});
// 			}
// 		}).mouseup(function() {
// 			flag = false;
// 		});
// 	});
// 	//关闭按钮
// 	$dialog.find(".close").click(function() {
// 		$dialog.remove();
// 		$(".gray").remove();
// 	});
 
// 	//确定按钮
// 	$dialog.find(".sure").click(function() {
// 		if (opts.callback)
// 		{
// 			$dialog.remove();
// 			$(".gray").remove();
// 			opts.callback(true);
// 		}
// 	});
// 	//取消按钮
// 	$dialog.find(".cancle").click(function() {
// 		if (opts.callback)
// 		{
// 			opts.callback(false);
// 		}
// 	});
// }
