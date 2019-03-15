;; (function ($) {
  var domain = 'https://zlcx.sunlands.wang';
  var index = 1;
  var phone = '';
  var authCode = '';
  var step = 0;
  var disable = true;
  var times = 60;
  var myTimeout = '';

  function timer(time, cb) {
    cb(time);
    myTimeout = setTimeout(function () {
      time--;
      console.info(time);
      if (time > 0) {
        timer(time, cb);
      }
    }, 1000);
  }
  function getTab1() {
    switch (index) {
      case 0:
        return 'home'
      case 1:
        return 'lesson'
      case 2:
        // return 'meg'
      return 'test'
      case 3:
        return 'my'
      default:
        return 'home'
    }
  }
  //数据上报
  function report(tab2, ev) {
    ev = ev || 0
    var tab1 = getTab1();
    sl.de({
      eventType: ev,
      objName: 'jifu_1.0',
      objtyType: tab2 ? tab2 =='tb' ?'tb_loaded': (tab2 + '_' + tab1) : tab1,
    })
  }
  function goTargetPage(channelSite) {
    var phone = window.localStorage.phone;
    if (index == 0){
      report();
    }
    if (index == 1) {
      report();
      // window.location.href = 'https://lite3.sunlands.com/h5-landing/#/course?messageType=wechat&siteId=' + channelSite + '&ADTAG=ad.zjf';
      window.location.href = 'https://lite3.sunlands.com/h5-landing/?adtag=ad.cjzjf#/course?mobile=' + phone;
    }
    if (index == 2) {
      report();
      window.location.href = 'https://img.sunlands.wang/html/luodi/index.html?channelSite=' + channelSite;
    }
    if (index == 3) {
      report();
      window.location.href = 'https://ggpt.sunlands.com/innovatepage/jifu/1.0/mine/mine.html?channelSite=' + channelSite;
    }
  }
  function SDBar (params) {
    console.info(params);
    var channelSite = params.channelSite;
    if (sunlandsLog && sunlandsLog.siteId) {
      channelSite = sunlandsLog.siteId;
    }
    var $html = $('<div class="sd-bar"></div>');
    var $shadow = $('<div class="shadow"></div>');
    var $bar = $('<div class="bar"><div class="cursor"></div><div class="list"><div class="item active"><div class="img"></div> <div class="text">首页</div></div><div class="item"><div class="img"></div> <div class="text">试听课</div></div><div class="item"><div class="img"></div> <div class="text">测一测</div></div><div class="item"><div class="img"></div> <div class="text">我的</div></div></div></div>');
    var $class = $('<div class="pannel class animated fadeInUp fastest ease-in-out "><div class="tag animated fadeInRight faster delay-1700ms">价值498元</div><div class="title animated fadeInUp delay-500ms">名师公开课</div><div class="subtitle animated fadeInUp delay-600ms">自考历年真题知识点解析</div><div class="front"><div class="swiper"><div class="img animated fadeInLeft delay-1s"></div><div class="img animated fadeInUp fast delay-700ms"></div><div class="img animated fadeInRight delay-1s"></div></div><div id="login" class="button animated fadeInUpZoom faster delay-2s ease-in-out">登录观看</div></div></div>');
    var $test = $('<div class="pannel test animated fadeInUp fastest ease-in-out "><div class="title animated fadeInUp delay-500ms">测一测，神准</div><div class="subtitle animated fadeInUp delay-600ms">你到底多久能拿本科</div><div class="front"><div class="img-bg animated fadeIn faster delay-1s"><div class="light animated fadeIn delay-1s slow infinite alternate"></div></div> <div id="login" class="button animated fadeInUpZoom faster delay-1700ms ease-in-out">登录开始测试</div></div></div>');
    var $mine = $('<div class="pannel mine animated fadeInUp fastest ease-in-out"><div class="tag animated fadeInRight faster delay-1700ms">价值398元</div><div class="title animated fadeInUp delay-500ms">自考宝典</div><div class="subtitle animated fadeInUp delay-600ms">限免领取</div><div class="front"><div class="img-bg animated fadeIn delay-1s faster"><div class="hello animated fadeIn fastest delay-1200ms"></div><div class="hi animated fadeIn fastest delay-1400ms"></div></div><div class="strips"> <div class="strip strip1 animated fadeInRight faster delay-1400ms"><span>报名条件解读</span></div> <div class="strip strip2 animated fadeInRight  faster delay-1500ms"><span>各院校专业自考学费</span></div> <div class="strip strip3 animated fadeInRight  faster delay-1600ms"><span>热门院校及专业</span></div> </div><div id="login" class="button animated fadeInUpZoom faster delay-2s ease-in-out">登录领取</div></div></div>');
    var back = '<div class="back"><div class="input-pannel" id="phone"><input type="text" placeholder="请输入手机号"/></div><div class="button disable">获取短信验证码</div></div>';
    $test.append($(back));
    $test.children('.back').hide();
    $test.hide();
    $class.append($(back));
    $class.children('.back').hide();
    $class.hide();
    $mine.append($(back));
    $mine.children('.back').hide();
    $mine.hide();
    $html.append($mine);
    $html.append($test);
    $html.append($class);
    $html.append($bar);
    $('body').prepend($shadow);
    $shadow.hide();
    $('body').prepend($html);
    $html.ready(function(){
      report('tb');
    })
    var $firstItem = $html.find('.item:first');
    var $cursor = $html.find('.cursor');
    $cursor.css({
      'width': $firstItem.width(),
      'left': $firstItem.offset().left
    });

    // handle click bar
    $html.find('.item').click(function () {
      $cursor.css('left', $(this).offset().left);
      $('.item').removeClass('active');
      $(this).addClass('active');
      index = $(this).index();
      report();
      if (window.localStorage.phone) {
        goTargetPage(channelSite);
      } else {
        $shadow.hide();
        $html.children('.pannel').hide();
        step = 0;
        disable = true;
        var phone = '';
        var authCode = '';
        clearTimeout(myTimeout);
        $html.find('.back').hide();
        $html.find('.front').show();
        $html.find('.back .input-pannel').attr({ 'id': 'phone' });
        $html.find('.back input').val('');
        $html.find('.back input').attr('placeholder', '请输入手机号');
        $html.find('.back .button').text('获取短信验证码');
        if (index == 1) {
          $shadow.show();
          $class.show();
        } else if (index == 2) {
          $shadow.show();
          $test.show();
        } else if (index == 3) {
          $shadow.show();
          $mine.find('.title').css('left', 70);
          $mine.find('.subtitle').css('left', 70);
          $mine.show();
        }
      }
    });

    // handle click class's login
    $class.find('#login').click(function () {
      report('btn');
      $class.children('.front').hide();
      $class.children('.back').show();
    });

    // handle click test's login
    $test.find('#login').click(function () {
      report('btn');
      $test.children('.front').hide();
      $test.children('.back').show();
    });

    // handle click test's login
    $mine.find('#login').click(function () {
      report('btn');
      $mine.children('.front').hide();
      $mine.find('.title').css('left', 0);
      $mine.find('.subtitle').css('left', 0);
      $mine.children('.back').show();
    });



    // handle input phone
    $html.find('#phone input').keyup(function (e) {
      if (step == 0) {
        phone = $(this).val();
        window.phone = phone;
        if (phone.charAt(0) == 1 && phone.length == 11) {
          $('.back .button').removeClass('disable');
          disable = false;
        } else {
          $('.back .button').addClass('disable');
          disable = true;
        }
      }
      if (step == 1) {
        authCode = $(this).val();
        if (authCode.length == 4) {
          interactive.verifyAndSend({
            mobile: phone,
            checkCode: authCode,
            callback: function (res) {
              report('input');
              window.localStorage.phone = window.phone;
              $shadow.hide();
              $html.children('.pannel').hide();
              step = 0;
              disable = true;
              var authCode = '';
              clearTimeout(myTimeout);
              $html.find('.back').hide();
              $html.find('.front').show();
              $html.find('.back .input-pannel').attr({ 'id': 'phone' });
              $html.find('.back input').val('');
              $html.find('.back input').attr('placeholder', '请输入手机号');
              $html.find('.back .button').text('获取短信验证码');
              goTargetPage(channelSite);
            },
            errCallback: function (res) {
              if (res.message.indexOf('重复') != -1) {//这里需要改动
                report('input');
                window.localStorage.phone = window.phone;
                $shadow.hide();
                $html.children('.pannel').hide();
                step = 0;
                disable = true;
                var authCode = '';
                clearTimeout(myTimeout);
                $html.find('.back').hide();
                $html.find('.front').show();
                $html.find('.back .input-pannel').attr({ 'id': 'phone' });
                $html.find('.back input').val('');
                $html.find('.back input').attr('placeholder', '请输入手机号');
                $html.find('.back .button').text('获取短信验证码');

                goTargetPage(channelSite);
              } else {
                clearTimeout(myTimeout);
                $html.find('.back .button').text('重新获取');
                $html.find('.back .button').removeClass('disable');
                disable = false;
              }
            }
          })
        }
      }

    });

    // handle click back button
    $html.find('.button').click(function () {
      if (disable) {
        return false;
      }
      interactive.getCaptcha({
        mobile: phone,
        codeLen: 4,//需要改接受验证码处的代码length
        callback: function (res) {
          step = 1;
          $html.find('.back #phone').removeAttr('id');
          $html.find('.back input').val('');
          $html.find('.back input').attr('placeholder', '请输入验证码');
          var btn = $html.find('.back .button');
          btn.addClass('disable');
          disable = true;
          timer(times, function (time) {
            btn.text('重新获取（' + time + 's）');
            if (time == 1) {
              disable = false;
              btn.removeClass('disable');
              btn.text('重新获取');
            }
          });
        },
        errCallback: function (err) {
          alert(err.resultMessage);
        }
      })
    });
  }
  SDBar({ channelSite: '700085945' });
})(jQuery)