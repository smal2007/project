var app = (function($, cont) {

    var APPLICATION_ID = '005B0AD0-3D76-48F4-FF85-296C0438F200',
        SECRET_KEY = '3A2A9558-A762-E6A6-FF7D-51D1C5AA3200',
        VERSION = 'v1'; //default application version;


    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);


    var initialized = false; // флаг, инициализировано наше приложение или нет
    var $window = $(window); // ссылка на объект window, чтобы вызывать постоянно jquery

    var pages = {}; // ассоциативный массив с описаием страниц src - адрес подгружаемого html, js - адрес подгружаемого js, ключ - hash

    var renderState = function() {
        cont.html(app.state.html);
    }

    var changeState = function(e) {
        // записываем текущее состояние в state
        app.state = pages[window.location.hash];
        // вот тут может выдаваться ошибка "Cannot read property 'init' of undefined". 
        // подумайте, почему происходит ошибка и как от этого можно избавиться?
        app.state.module.init(app.state.html);

        //$('nav a[herf=+window.location.hash+')
        $('#pages>li>a').each(function() {
            if ($(this).attr('data-src') == app.state.src) {
                $(this).addClass("active");
            }
            else {
                $(this).removeClass("active");
            }
        });
        renderState();
    }

    /*    var APPLICATION_ID = '8C75EE00-12BF-1292-FF8F-EBEDE65D5500',
            SECRET_KEY = '374E32DA-C724-2D39-FF18-3F39D8DD4300',
            VERSION = 'v1'; //default application version;


        Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);

      
     var dialog, form;
      


        //диалоговое окно------------------------------------------------------------------
        $("button#logout").button().on("click", function() {
            //    app.currentModule.
            $("span#login").html(app.currentModule.logout());

        });

        $("button#curUser").button().on("click", function() {
            //    app.currentModule.
            $("span#login").html(app.currentModule.getCurUser());


        });

        function getCurUser() {
            var curUser = "Выполните вход";
            if (Backendless.UserService.getCurrentUser() != null) {
                curUser = Backendless.UserService.getCurrentUser().email;
            }

            return curUser;
        };

        function userLoggedIn(user) {
            console.log("user has logged in");

            $("span#login").html(getCurUser());
            dialog.dialog('close');
        }

        function userLoggedout() {
            console.log("user has been logged out");
            $("span#login").html(getCurUser());
        }

        function gotError(err) {
            console.log("error message - " + err.message);
            console.log("error code - " + err.statusCode);
        }

        function registrationUser(login, pass) {
            var user = new Backendless.User();
            user.email = login.toString();
            user.password = pass.toString();
            Backendless.UserService.register(user);

        };

        $("button#logout").button().on("click", function() {
            Backendless.UserService.logout(new Backendless.Async(userLoggedout, gotError));
        });

        $(function() {
            var loginForm = $(pages["#/registration"].html);

            dialog = loginForm.dialog({
                autoOpen: false,
                height: 400,
                width: 350,
                modal: true,
                buttons: {

                },
            });

            $("button#login").button().on("click", function() {
                var myButtons = {
                    "Login": function() {

                        Backendless.UserService.login(loginForm.find("#email").val(), loginForm.find("#password").val(), true, new Backendless.Async(userLoggedIn, gotError));

                    },

                    Cancel: function() {
                        dialog.dialog("close");
                    }

                };
                dialog.dialog('option', 'buttons', myButtons);
                dialog.dialog("open");
            });

            $("button#create-user").button().on("click", function() {
                var myButtons = {
                    "Create": function() {
                        Backendless.UserService.login(loginForm.find("#email").val(), loginForm.find("#password").val(), true, new Backendless.Async(userLoggedIn, gotError));
                    },

                    Cancel: function() {
                        dialog.dialog("close");
                    }

                };
                dialog.dialog('option', 'buttons', myButtons);
                dialog.dialog("open");
            });







        });
    */

    //диалоговое окно------------------------------------------------------------------
    return {
        init: function() {
            $(cont.data('pages')).find('li>a').each(function() {
                var href = $(this).attr("href");

                pages[href] = {

                    src: $(this).data("src"),
                    js: $(this).data("js"),
                };

                $.ajax({
                    url: pages[href].src,
                    method: "GET",
                    dataType: "html",
                    async: false,
                    success: function(html) {
                        pages[href].html = $(html); // подумайте, почему так?
                        $.ajax({
                            url: pages[href].js,
                            method: "GET",
                            async: false,
                            dataType: "script",
                            success: function(js) {
                                pages[href].module = app.currentModule;
                            }
                        });

                    }
                });
            });

            this.state = {} // текущее состояние
            window.location.hash = window.location.hash || "#/";
            $window.on('hashchange', changeState);
            if (!initialized) {
                $window.trigger('hashchange');
            }
            initialized = true;
        },

        debug: function() {
            console.log(pages);
        }
    }

})(jQuery, $('#app'));

app.init();
