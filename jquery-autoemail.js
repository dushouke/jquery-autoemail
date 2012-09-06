(function ($) {
    $.fn.autoEmail = function (options) {
        var opts = $.extend({}, $.fn.autoEmail.defaults, options);
        return this.each(function () {
            var $this = $(this);
            var o = $.meta ? $.extend({}, opts, $this.data()) : opts;

            var $email_auto = $("<div class='email_auto'><p>请选择您的邮箱类型...</p><ul></ul></div>");

            $('body').append($email_auto);
            $email_auto.hover(function () {
                $this.unbind('blur');
            }, function () {
                $this.bind('blur', function () {
                    $email_auto.hide();
                    $this.removeClass("textbox0_focus");
                });
            });
            $this.keydown(function (event) {
                if ($email_auto.is(':visible')) {
                    if (event.keyCode == 40 || event.keyCode == 38) {
                        keyUpDown($email_auto, event.keyCode);
                    }
                    else if (event.keyCode == 13) {
                        $this.val($email_auto.find('ul li.current').html());
                        $email_auto.hide();
                    }
                }
            }).keyup(function (event) {
                if (event.keyCode != 40 && event.keyCode != 38 && event.keyCode != 13) {
                    buildTipHtml($this, $email_auto, $(this).val(), o.emailDomain);
                    var offset = $this.offset();
                    $email_auto.css({ top: offset.top + $(this).outerHeight(), left: offset.left, width: $(this).outerWidth() - 2 }).show();
                }
            }).blur(function () {
                $email_auto.hide();
            });
        });
    };
    keyUpDown = function (obj, kc) {
        var $lis = obj.find('li');
        var currselet = obj.find('ul li.current');
        if (kc == 40) {//down
            if (currselet.length == 0 || currselet.attr('title') === $lis.eq($lis.length - 1).attr('title')) {
                currselet.removeClass('current');
                $lis.eq(0).addClass('current');
            }
            else {
                currselet.removeClass('current').next().addClass('current');
            }
        }
        else {
            if (currselet.length == 0 || currselet.attr('title') === $lis.eq(0).attr('title')) {
                currselet.removeClass('current');
                $lis.eq($lis.length - 1).addClass('current');
            }
            else {

                currselet.removeClass('current').prev().addClass('current');
            }
        }
    };
    buildTipHtml = function (inputobj, obj, txt, emailDomain) {
        var atIndex = txt.indexOf('@');
        var name = "";
        var name2 = "";
        if (atIndex < 0) {
            name = txt;
        }
        else {
            if (atIndex == name.length - 1) {
                name = txt.substr(0, atIndex);
            }
            else {
                name = txt.substr(0, atIndex);
                name2 = txt.substr(atIndex + 1);
            }
        }
        var liHtml = [];

        liHtml.push('<li class="current">' + txt + '</li>');
        $.each(emailDomain, function (i, n) {
            var name3 = n.substr(1, name2.length);
            if (name2 === '' || name2 === name3) {
                var litxt = name + n;
                liHtml.push('<li title="' + litxt + '">' + litxt + '</li>');
            }
        });
        var $ul = obj.find('ul').html(liHtml.join(''));
        var $lis = $ul.find('li');
        $lis.hover(function () {
            $lis.removeClass('current');
            $(this).addClass('current');
        }, function () {
        }).click(function () {
            inputobj.val($(this).html()).focus().blur().focus();
            obj.hide();

        });
        $ul.mouseout(function () {
            $lis.removeClass('current');
            $lis.eq(0).addClass('current');
        });

    };
    $.fn.autoEmail.defaults = {
        emailDomain: ["@163.com", "@gmail.com", "@qq.com", "@126.com", "@hotmail.com", "@sina.com", "@yahoo.com.cn", "@sohu.com", "@yahoo.cn", "@139.com"]
    };
})(jQuery);