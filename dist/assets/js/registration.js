app.currentModule = (function($) {
    var APPLICATION_ID = '8C75EE00-12BF-1292-FF8F-EBEDE65D5500',
        SECRET_KEY = '374E32DA-C724-2D39-FF18-3F39D8DD4300',
        VERSION = 'v1'; //default application version;


    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);


    function userLoggedIn(user) {
        console.log("user has logged in");
        console.log(app);

    }

    function userLoggedout() {
        console.log("user has been logged out");
    }

    function gotError(err) {
        console.log("error message - " + err.message);
        console.log("error code - " + err.statusCode);
    }

    return {

        registrationUser: function(login, pass) {
            var user = new Backendless.User();
            user.email = login.toString();
            user.password = pass.toString();
            Backendless.UserService.register(user);

        },

        login: function(login, pass) {
            console.log(login + pass);
            Backendless.UserService.login(login, pass, true, new Backendless.Async(userLoggedIn, gotError));

        },
        logout: function() {
            Backendless.UserService.logout(new Backendless.Async(userLoggedout, gotError));
        },
        getCurUser: function() {
            var curUser = "Выполните вход";
            if (Backendless.UserService.getCurrentUser() != null) {
                curUser = Backendless.UserService.getCurrentUser().email;
            }
            console.log(curUser);
            return curUser;
        },

        init: function(obj, callback) {
            console.log("Инициализируем модуль для регистрации страницы");
            obj = obj || new Object(null);
            callback = callback || function() {
                return false;
            }


       
      /* 
            function sendMessage(email, mess) {
                var dataStore = Backendless.Persistence.of(TestTable);
                var commentObject = new TestTable({
                    message: textSend.value,
                    email: emailSend.value || Backendless.UserService.getCurrentUser().email
                })
                dataStore.save(commentObject);
            }

            function TestTable(args) {
                args = args || {};
                this.message = args.message || "";
                this.email = args.email || "";

            }
*/

            callback();
        }
    }

})(jQuery);