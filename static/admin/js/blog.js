/**
 * Created by Nealyang on 17/2/24.
 */
$(document).ready(function () {
    var add_button = $('.add_button');
    var scroll_img = $('.add_button img');
    var add_form_container = $('.add_form');
    add_button.mouseenter(function () {
        $(this).css({
            'left':'0'
        });
        scroll_img.css({
            'right':'30px',
            'transform':'rotate(-90deg)'
        });
    });

    add_button.mouseleave(function () {
        $(this).css({
            'left':'-50px'
        });
        scroll_img.css({
            'right':'0',
            'transform':'rotate(0deg)'
        });
    });

    add_button.click(function () {
        add_form_container.css({
            'display':'flex'
        });
    });
    $('.add_form img').click(function () {
        add_form_container.css({
            'display':'none'
        });
    })

});