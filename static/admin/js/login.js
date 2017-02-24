/**
 * Created by Nealyang on 17/2/25.
 */
$(document).ready(function () {
    //设置一屏的宽高
    $('body').css({
        'height': $(window).height() + 'px',
        'width': $(window).width() + 'px'
    });
    // 点击登录
    $('.login_button').click(function () {
        var username = $('.username_div input').val(),
            password = $('.password_div input').val();
        if (username && password) {
            $.ajax({
                type: 'POST',
                url: '/admin/login',
                data: {
                    username: username,
                    password: password
                },
                success: function (response) {
                    window.location.replace('/admin');
                },
                error: function (response) {
                    if (JSON.parse(response.responseText).code == 500) {
                        alert('服务器内部错误!');
                    } else {
                        alert('用户名或密码错误');
                    }
                }
            })
        } else {
            confirm('用户名和密码为必填项~');
        }

    });
});