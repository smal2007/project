app.currentModule = (function($) {

    $(document).ready(function() {
        $('.special-ads a.title,.special-ads .image a').hover(function() {
            $(this).parents('td').addClass('td-hr');
        }, function() {
            $(this).parents('td').removeClass('td-hr');
        })

        $('.fld').focus(function() {
            $(this).addClass('fld-focus');
        }).blur(function() {
            $(this).removeClass('fld-focus');
        })

        $('.b-fld .fld-val').click(function() {
            $(this).hide();
            $(this).parent().find('.fld').trigger('focus');
        })

        $('.b-fld .fld').focus(function() {
            $(this).parent().find('.fld-val').hide();
        }).blur(function() {
            if ($(this).val() == '' || typeof $(this).val() == 'undefined') {
                $(this).parent().find('.fld-val').show();
            }
        })

      //  $('input:checkbox, input:radio').CRBoxes();

        $('form .required').blur(function() {
            $(this).jqValidateReg();
        })

        $('form .button:submit').click(function() {
            var errors = 0;
            $(this).parents('form').find('.required').each(function() {
                $(this).jqValidateReg();
                if ($(this).hasClass('fld-error')) {
                    errors++;
                }
            })
            if (errors > 0) {
                return false;
            }
        });
    });

    $.fn.jqValidateReg = function() {
        return this.each(function() {

            var message = {
                emailIncorrect: 'Неправильный ' + $(this).parent().find('label').text(),
                textfieldEmpty: 'Пустое поле ' + $(this).parent().find('label').text(),
                checkboxEmpty: 'Установите галочку',
                passwordMinLength: 'Минимальная длина пароля 6 символов',
                confirmPasswordMismatch: 'Пароли не совпадают',
                show: function(type) {
                    return this[type];
                }
            };

            if (this.type == 'text') {
                var empty = checkTextField(this, $(this).val());
                if (empty) {
                    return false;
                }
            }

            if (this.name == 'email') {
                checkEmail(this, $(this).val());
            }

            if (this.type == 'checkbox') {
                checkCheckBox(this);
            }

            if (this.name == 'password') {
                var PswConf = $(this).parents('form').find('input[name=password_confirm]');

                checkPassword(this, $(this).val());

                if (PswConf.val() < 1) {
                    removeStatusError(PswConf);
                }
                else {
                    checkConfirmPassword(PswConf, $(this).val(), PswConf.val());
                }

            }

            if (this.name == 'password_confirm') {
                var empty = checkTextField(this, $(this).val());
                if (empty) {
                    return false;
                }
                checkConfirmPassword(this, $(this).val(), $(this).parents('form').find('input[name=password]').val());
            }

            function checkEmail(el, val) {
                var r1 = new RegExp("(@.*@)|(\\.\\.)|(@\\.)|(^\\.)");
                var r2 = new RegExp("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,8}|[0-9]{1,3})(\\]?)$");
                if (r1.test(val) || !r2.test(val)) {
                    addStatusError(el, message.show('emailIncorrect'));
                }
                else {
                    removeStatusError(el);
                }
            }

            function checkTextField(el, val) {
                var flagEmpty = false;
                if (val.length < 1) {
                    addStatusError(el, message.show('textfieldEmpty'));
                    flagEmpty = true;
                }
                else {
                    removeStatusError(el);
                }
                return flagEmpty;
            }

            function checkCheckBox(el) {
                if (!el.checked) {
                    addStatusError(el, message.show('checkboxEmpty'));
                }
                else {
                    removeStatusError(el);
                }
            }

            function checkPassword(el, val) {
                if (val.length < 6) {
                    addStatusError(el, message.show('passwordMinLength'));
                }
                else {
                    removeStatusError(el);
                }
            }

            function checkConfirmPassword(el, val1, val2) {
                if (val1 != val2) {
                    addStatusError(el, message.show('confirmPasswordMismatch'));
                }
                else {
                    removeStatusError(el);
                }
            }

            function addStatusError(el, txtError) {
                $(el).parent().parent().find('p').remove();
                $(el).parents('.l-form-row').removeClass('confirm');
                $(el).addClass('fld-error').parent().append($('<p />')
                    .attr({
                        'class': 'error-message'
                    })
                    .html(txtError));
            }

            function removeStatusError(el) {
                $(el).parent().parent().find('p').remove();
                $(el).removeClass('fld-error');
                $(el).parents('.l-form-row').addClass('confirm');
            }

        })
    };

    function registrationUser(login, name, pass) {
        var user = new Backendless.User();
        user.email = login;
        user.name = name;
        user.password = pass;
        console.log(user);
        Backendless.UserService.register(user, new Backendless.Async(userRegistration(), gotError));

    };

    function userRegistration(user) {
         window.location = "#/";
        console.log(user);
    }

    function gotError(err) {
        console.log(err);
    };

    return {
        init: function(obj, callback) {
            console.log("Инициализируем модуль для формы регистрации");
            obj = obj || new Object(null);
            callback = callback || function() {
                return false;

            }

            var email = obj.find("input[name='email']");
            var name = obj.find("input[name='username']")
            var password = obj.find("input[name='password']")

            obj.find("#Register").on("click", function() {
                registrationUser(email.val(), name.val(), password.val());
            });

            callback();
        }
    }
})(jQuery);