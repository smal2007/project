app.currentModule = (function($) {
    return {
        init: function(obj, callback) {
            console.log("Инициализируем модуль для логина");
            obj = obj || new Object(null);
            callback = callback || function() {
                return false;
            }

            var email = obj.find("input[name='username']");
            var password = obj.find("input[name='password']");

            obj.find("#Signin").on("click", function() {
                console.log("sf");
                Login(email.val(), password.val());
            });

            function Login(login, password) {
                console.log(login + password);
                Backendless.UserService.login(login, password, true, new Backendless.Async(userLoggedIn, app.gotError));
            }
            
            function userLoggedIn(success){
                 console.log(success);
                console.log("Login done");
                app.userLoggedIn();
            }
            
            
         /*   function gotError(err){
                console.log(err);
                app.gotError(err.message);
            }*/

            callback();
        }
    }
})(jQuery);