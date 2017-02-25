/**
 * Created by Nealyang on 17/2/24.
 */
$(document).ready(function () {
    var title = '首页';
    if(window.location.pathname.indexOf('blog') >0 ){
        title = '博文管理';
        $('.menu span:contains("博文管理")').css({
            'bottom':'5px',
            'box-shadow' :'4px 9px 10px #020202'
        });
    }else if(window.location.pathname.indexOf('users') >0 ){
        $('.menu span:contains("用户管理")').css({
            'bottom':'5px',
            'box-shadow' :'4px 9px 10px #020202'
        });
        title = '用户管理'
    }else{
        $('.menu span:contains("首页")').css({
            'bottom':'5px',
            'box-shadow' :'4px 9px 10px #020202'
        });
    }
    $('.menu span').mouseenter(function () {
            $(this).css({
                'bottom':'5px',
                'box-shadow' :'4px 9px 10px #020202'
            });
    });
    $('.menu span').mouseleave(function () {
        if($.trim($(this).text())!= title){
            $(this).css({
                'bottom':'0',
                'box-shadow' :'2px 2px 2px #6d5d5d'
            });
        }

    });

});