app.currentModule = (function($) {

    var cfg = {
        id: "005B0AD0-3D76-48F4-FF85-296C0438F200",
        key: "3A2A9558-A762-E6A6-FF7D-51D1C5AA3200"
    };
    



    return {
        init: function(obj, callback) {
            console.log("Инициализируем модуль для страницы семьи");
            obj = obj || new Object(null);
            callback = callback || function() {
                return false;
            }

            var currentCategory = "";
            var objItems = {};
            objItems.nameItems = ["Apple", "Samsung", "Nokia"];

            var btnTest = obj.find('#test-btn');
            var btnTest1 = obj.find('#test-btn1');
            var objUl = obj.find("#nav-tovar ul");
            var category = obj.find("#nav-tovar ul li");

            btnTest.off("click").on("click", function() {

                //obj.titleItems = ["Nokia 6300", "iPhone 5s"];
                objItems.titleItems = [currentCategory];


                //  console.log(createStringOfSearch(arr, "title"));
                //  console.log(viewItems(findTag(obj)));
                viewItems(findTag(objItems));
                //getDataByTagName("Nokia");
                // getData();


            });

            btnTest1.off("click").on("click", function() {

                obj.find("#nav-tovar ul li").each(function() {
                    //  console.log($(this).text());
                })
            });

            $(document).ready(function() {
                category.remove();
                viewList(findCategory());
                $("#nav-tovar ul li").off("click").on("click", function() {
                    currentCategory = ($(this).text());

                    console.log(currentCategory);
                    objItems.titleItems = [currentCategory];
                    viewItems(findTag(objItems));

                });
            });

            $("#nav-tovar ul li").off("click").on("click", function() {

            });




            var getListOfTag = function() {
                var obj1 = [];
                $.ajax({
                    url: "https://api.backendless.com/v1/data/tags",
                    method: "GET",
                    dataType: "json",
                    headers: {
                        "application-id": cfg.id,
                        "secret-key": cfg.key
                    },
                    success: function(data) {
                        $.each(data.data, function(i, item) {
                            obj1[obj1.length] = data.data[i].tag;
                        });
                    }
                }).then(function() {
                    obj.find("#nav-tovar ul li").remove();
                    obj1.forEach(function(item, i, arr) {
                        objUl.append('<li>' + item + '</li>');
                    });
                });
            }

            function viewItems(data) {
                $("#content-tovar div").remove();
                $.each(data, function(i, item) {
                    $("#content-tovar").append('<div>' + data[i].shortDescription + '</div>')
                    console.log(data[i]);
                    //Показывать изображение
                    /* $.each(data[0].images, function(j,item){
                             console.log( data[i].images[j].image);
                              $("#content-tovar").append('<img src=' + data[i].images[j].image + ' width="50" height="50">');
                               $("#content-tovar").append('<div>' + data[i].images[j].image + '</div>')
                       });*/
                });
            }

            function viewList(data) {
                $.each(data, function(i, item) {
                    objUl.append('<li><a href="#/content">' + data[i].name + '</a></li>')
                });
            }

            function createStringOfSearch(arr, items) {
                var str = " and (" + items + "='" + arr[0] + "'";
                if (arr.length > 1) {
                    for (var i = 0; i < arr.length - 1; i++) {
                        str += " or " + items + "='" + arr[i + 1] + "'";
                    }

                }
                str += ")";
                return str;
            }

            function findTag(obj) {
                obj = obj || new Object();
                obj.startPrice = obj.startPrice || parseInt("0");
                obj.endPrice = obj.endPrice || 100000;
                obj.sortBy = obj.sortBy || 'price';
                obj.order = obj.order || "asc";
                obj.pageSize = obj.pageSize || 20;
                // obj.category = "category";
                obj.title = "categoryId.name";
                obj.titleItems = obj.titleItems || "";
                obj.name = "vendorId.name";
                obj.nameItems = obj.nameItems || "";
                // var arrayOfItems = " and title='iPhone 5s' and vendorId.name='Apple'";
                var arrayOfTitleItems = "";
                var arrayOfNameItems = "";
                if (obj.titleItems != "") {
                    arrayOfTitleItems = createStringOfSearch(obj.titleItems, obj.title);
                }

                if (obj.nameItems != "") {
                    arrayOfNameItems = createStringOfSearch(obj.nameItems, obj.name);
                    //arrayOfNameItems = "and (vendorId.name='Apple' or vendorId.name='Nokia')";

                    //price >= 0 and price <= 100000  and categoryId.name='Смартфоны'and vendorId.name='Nokia' or vendorId.name='Apple'
                    //price >= 0 and price <= 100000  and categoryId.name='Смартфоны' and vendorId.name='Apple' or vendorId.name='Nokia'
                }

                var condition1 = "price >= " + obj.startPrice + " and price <= " + obj.endPrice + " " + arrayOfTitleItems + "" + arrayOfNameItems + "";
                console.log(condition1);
                // obj.title = obj.title || null;
                var arrayOfItems = [];
                var itemsStorage = Backendless.Persistence.of('items');
                var dataQuery = {
                   //properties: ["name", "objectId"],
                    options: {

                        sortBy: (obj.sortBy + " " + obj.order),
                        pageSize: obj.pageSize
                    },
                    condition: condition1
                };

                var myContact = itemsStorage.find(dataQuery);
                $.each(myContact.data, function(i, item) {
                    arrayOfItems[arrayOfItems.length] = myContact.data[i];
                });
                return arrayOfItems;
            }


            function findCategory() {
                var arrayOfItems = [];
                var itemsStorage = Backendless.Persistence.of('category');
                var dataQuery = {}; 

                var myContact = itemsStorage.find(dataQuery);
                $.each(myContact.data, function(i, item) {
                    arrayOfItems[arrayOfItems.length] = myContact.data[i];
                });
                return arrayOfItems;
            }




            callback();
        }
    }

})(jQuery);
/*    var options = {};
    var headers = {
        'application-id': '005B0AD0-3D76-48F4-FF85-296C0438F200',
        'secret-key': '3A2A9558-A762-E6A6-FF7D-51D1C5AA3200'
    };

    options.headers = headers;
    options.type = 'GET';
    options.url = 'https://api.backendless.com/v1/data/tags';
    options.contentType = 'application/json';



    $.ajax(options);
    var v = (function() {
        var element = document.createElement('div');
        return {
            render: function(data) {
                console.log(data);
                element.innerHTML = data;
                document.body.appendChild(element);
            },
            setDomObject: function(domElement) {
                element = domElement;
            }
        }
    })();


    var m = (function() {

        options.success = function(resp, status, xhr) {
            console.log(resp, status, xhr);
            return resp;
        };

        options.error = function(xhr) {
            console.log(JSON.parse(xhr.responseText), xhr);
        };
        return {
            getData: function() {

                return options.success();
            }
        }
    })();
    
        controller: (function(model, view) {
            return {
                render: function() {
                    view.render(model.getData());
                }
            }
        })(m, v),
*/