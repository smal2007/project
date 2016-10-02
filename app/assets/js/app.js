var app = (function($, cont) {

  var APPLICATION_ID = '005B0AD0-3D76-48F4-FF85-296C0438F200',
    SECRET_KEY = '3A2A9558-A762-E6A6-FF7D-51D1C5AA3200',
    VERSION = 'v1'; //default application version;


  Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);

  function checkUser() {
    if (Backendless.UserService.getCurrentUser() != null) {
      $("#user").text(Backendless.UserService.getCurrentUser().email);
      $("#Registration").hide();
      $("#Login").hide();
      $("#Logout").show();
    }
    else {
      $("#Registration").show();
      $("#Login").show();
      $("#Logout").hide();
      $("#user").text("");
    }
  }
  $(document).ready(function() {
    checkUser();
    /*    $("#user").text(Backendless.UserService.getCurrentUser().email);
        var curUser = "Выполните вход";*/
    console.log(Backendless.UserService.getCurrentUser());

    //  setCurrentUser.innerHTML = curUser;
  });
  var initialized = false; // флаг, инициализировано наше приложение или нет
  var $window = $(window); // ссылка на объект window, чтобы вызывать постоянно jquery

  var pages = {}; // ассоциативный массив с описаием страниц src - адрес подгружаемого html, js - адрес подгружаемого js, ключ - hash

  var renderState = function() {
    cont.html(app.state.html);
  }

  $("#Logout").on("click", function() {
    //  $("#user").text(Backendless.UserService.getCurrentUser().email);
    Backendless.UserService.logout(new Backendless.Async(app.userLoggedout, app.gotError));
    checkUser();

  });


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

  return {
    userLoggedIn: function(user) {
      console.log(user);
      //  $("#user").text(Backendless.UserService.getCurrentUser().email);
      checkUser();
      window.location = "#/";
    },
    gotError: function(err) {
      console.log(err);
    },

    userLoggedout: function() {
      checkUser();
    },
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