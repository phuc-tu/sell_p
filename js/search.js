var searchProduct = [];
var search = document.getElementById("search-info");
var products = JSON.parse(localStorage.getItem("products"));

getNewLabel();
function getNewLabel() {
    for (var i = 0; i < products.length; i++) {
        if (products[i].state == "new")
            products[i]["label"] = "product__item-new-label";
        else products[i]["label"] = "no-label";
    }
}

search.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        window.location.href = "index.html";
    }
});

function showCategory() {
    searchProduct = JSON.parse(localStorage.getItem("searchProduct"));

    var categoryList = searchProduct.map(function (product) {
        return product.category;
    });

    for (var i = 0; i < categoryList.length; i++) {
        categoryList[i] = categoryList[i].toLowerCase();
    }
    categoryList = [...new Set(categoryList)];

    for (var i = 0; i < categoryList.length; i++) {
        categoryList[i] = ReName(categoryList[i]);
    }

    if (categoryList.length > 1) {
        var s = `
            <li class="product__filter-item">
                <button class="product__filter-item-btn product__filter-item-btn--active" onclick="showSearchProduct(1)">Tất cả</button>
            </li>
        `;
        var html = categoryList.map(function (category) {
            return `
                <li class="product__filter-item">
                    <button class="product__filter-item-btn" onclick="showCategoryProduct('${category
                        .toLowerCase()
                        .replaceAll(" ", "-")}', 1)">${category}</button>
                </li>
            `;
        });
        s = s + html.join("");
        document.querySelector(".product__filter").innerHTML = s;
    } else {
        document.querySelector(".product__filter").innerHTML = "";
    }
}

function showCurrentCategory(name) {
    var currentFilter = document.querySelectorAll(".product__filter-item-btn");
    for (var i = 0; i < currentFilter.length; i++) {
        currentFilter[i].classList.remove("product__filter-item-btn--active");
    }
    for (var i = 0; i < currentFilter.length; i++) {
        if (
            currentFilter[i].innerText.toLowerCase() ==
            name.replaceAll("-", " ")
        ) {
            currentFilter[i].classList.add("product__filter-item-btn--active");
            break;
        }
    }
}

function showCategoryProduct(name, start) {
    var tmpArray = JSON.parse(localStorage.getItem("searchProduct"));
    var categoryProduct = tmpArray.filter(function (product) {
        return (
            product.category.toLowerCase().replaceAll(" ", "") ==
            name.toLowerCase().replaceAll("-", "")
        );
    });
    localStorage.setItem("categoryName", name);

    showCurrentCategory(name);
    showCategoryPagination(categoryProduct, name);
    showCurrentPage(start);

    var arr = createTempArray(start, categoryProduct);
    document.getElementById("show-product").innerHTML = arr.join("");
    document.querySelector(".product__header").scrollIntoView();

    // Xử lý page
    Pagination();
}

function showSearchProduct(start) {
    document.querySelector(".cart").style.display = "none";
    document.querySelector(".order").style.display = "none";

    searchProduct = JSON.parse(localStorage.getItem("searchProduct"));
    // searchProduct = JSON.parse(localStorage.getItem('searchProduct'));
    search.value = localStorage.getItem("search");
    showCategory();
    showSearchPagination(searchProduct);
    showCurrentPage(start);

    var arr = createTempArray(start, searchProduct); //tạo mảng tạm chứa sản phẩm ở trang hiện tại
    document.getElementById("body").style.display = "block";
    document.getElementById("show-product").innerHTML = arr.join("");
    document.getElementById("search-info").value = ""; //reset search input

    document.querySelector(".product__header").scrollIntoView();

    // Xử lý page
    Pagination();

    //clear lần tìm kiếm trc để lần tìm kiếm sau kh bị lần tìm kiếm trc ghi đè
    searchProduct = [];
}
