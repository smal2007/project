app.currentModule = (function($) {
    var currentCategory = "";

    return {
        init: function(obj, callback) {
            console.log("Инициализируем модуль для категорий");
            obj = obj || new Object(null);
            callback = callback || function() {
                return false;
            }

            var category = obj.find("#category-list li");
            var objUl = obj.find("#category-list");
            var objItems = {};
            objItems.nameItems = ["Apple", "Samsung", "Nokia"];

            $(document).ready(function() {


                $(".l-hdcategory h4 span:first-child").text("Все категории");
                category.remove();
                viewList(findCategory());
                viewItems(findTag(objItems));
                $("#category-list li").off("click").on("click", function() {
                    currentCategory = ($(this).text());
                    $(".l-hdcategory h4 span:first-child").text(currentCategory);
                    objItems.titleItems = [currentCategory];
                    viewItems(findTag(objItems));
                });

                $('.special-ads a.title,.special-ads .image a').hover(function() {
                    $(this).parents('td').addClass('td-hr');
                }, function() {
                    $(this).parents('td').removeClass('td-hr');
                })

                $('a.button-control').mousedown(function() {
                    $('>span', this).addClass('click');
                }).mouseup(function() {
                    $('>span', this).removeClass('click');
                }).mouseout(function() {
                    $('>span', this).removeClass('click');
                })

                $('.l-sites dd').hover(function() {
                    $('.l-actions', this).fadeIn(200);
                }, function() {
                    $('.l-actions', this).fadeOut(200);
                })
            })

            function findCategory() {
                var arrayOfItems = [];
                var itemsStorage = Backendless.Persistence.of('category');
                var dataQuery = {};

                var myContact = itemsStorage.find(dataQuery);
                $.each(myContact.data, function(i) {
                    arrayOfItems[arrayOfItems.length] = myContact.data[i];
                });
                return arrayOfItems;
            }

            function viewList(data) {
                $.each(data, function(i) {
                    objUl.append('<li><a href="#/category_catalog">' + data[i].name + '</a></li>')
                });
            }


            function viewItems(data) {
                $("#main-content dd").remove();
                $.each(data, function(i) {
                    // console.log( data[i].vendorId.objectId);
                    console.log(data[i].shortDescription);
                    $("#main-content").append('<dd><div style="display:none">' + data[i].objectId + '</div><div class=image><a href="#"><img src="' + data[i].images[0].image + '" width="128" height="98"></img></a></div><h4><a href="#">' + data[i].title + '</a><span class="category">in category <a href="#">' + currentCategory + '</a><span></h4><p>' + data[i].shortDescription + '</p></div><div class="info"><div class="region">Belarus</div><ul class="l-actions" style="display: block"><li><i class="b-icon b-icon-like"></i><a href="#" title="Like">Like</a></li><li><i class="b-icon b-icon-share"></i><a href="#" title="Share">Share</a></li><li><i class="b-icon b-icon-favorite"></i><a href="#/category_catalog" class="addToCart" title="Add to Favorites">Add to Favorites</a></li><li class="last"><i class="b-icon b-icon-report"></i><a href="#" title="Report">Report</a></li></ul><div class="date-added">Added ' + data[i].created + '</div></div></dd>');
                });
            }



            function findTag(obj) {
                obj = obj || new Object();
                obj.startPrice = obj.startPrice || parseInt("0");
                obj.endPrice = obj.endPrice || 100000;
                obj.sortBy = obj.sortBy || 'price';
                obj.order = obj.order || "asc";
                obj.pageSize = obj.pageSize || 20;
                obj.title = "categoryId.name";
                obj.titleItems = obj.titleItems || "";
                obj.name = "vendorId.name";
                obj.nameItems = obj.nameItems || "";
                var arrayOfTitleItems = "";
                var arrayOfNameItems = "";
                if (obj.titleItems != "") {
                    arrayOfTitleItems = createStringOfSearch(obj.titleItems, obj.title);
                }

                if (obj.nameItems != "") {
                    arrayOfNameItems = createStringOfSearch(obj.nameItems, obj.name);
                }

                var condition1 = "price >= " + obj.startPrice + " and price <= " + obj.endPrice + " " + arrayOfTitleItems + "" + arrayOfNameItems + "";
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
                //  var myContact = Backendless.Persistence.of('items').find(dataQuery, new Backendless.Async(userLoggedIn(myContact), gotError));
                var myContact = Backendless.Persistence.of('items').find(dataQuery);
                $.each(myContact.data, function(i, item) {
                    arrayOfItems[arrayOfItems.length] = myContact.data[i];
                });
                return arrayOfItems;
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

            $(document).ready(function() {
                $(".addToCart").on("click", function() {
                    var itemId = $(this).parent().parent().parent().parent().children(':first-child').text();
                    addToCart(itemId);
                });
            });


            function addToCart(id) {
                console.log(id + "sf");

                var dataStore = Backendless.Persistence.of('cart');
                var dataQuery = {
                    condition: "itemId='" + id + "'"
                };
                var myContact = dataStore.find(dataQuery);
                console.log(myContact)

                var commentObject = new Cart({
                        count: "112311",
                        itemId: id,
                    })
                    // myContact.count = "11123";
                dataStore.save(commentObject);



                //   console.log(myContact.data.length);

            }

            function Cart(args) {
                args = args || {};
                this.count = args.count || "";
                this.itemId = args.itemId || "";
                //     this.objectId = args.objectId || "";
            }




            callback();
        }
    }
})(jQuery);