var orderList = JSON.parse(localStorage.getItem('orderList'));
if (!orderList) {
    orderList = [];
}

function getOrderQuantity() {
    return orderList.length;
}

function getOrderProductQuantity() {
    var quantity = 0;
    orderList.forEach(function(item) {
        var tmpArray = createNewCartProductArray(item.userAccount.cartList);
        tmpArray.forEach(function(product) {
            quantity += product.quantity;
        })
    });
    return quantity;
}

function getTotalOrderPrice() {
    var totalOrderPrice = 0;
    orderList.forEach(function(item) {
        var tmpArray = createNewCartProductArray(item.userAccount.cartList);
        totalOrderPrice += covertPriceToNumber(getTotalPrice(tmpArray));
    });
    return converPriceToString(totalOrderPrice);
}

showStatisticsPage();
function showStatisticsPage() {
    statisticsPage.style.display = 'block';
    orderPage.style.display = 'none';
    productPage.style.display = 'none';
    const thongke1 = document.querySelector(".thongke1")
    const thongke2 = document.querySelector(".thongke2")
    const thongke3 = document.querySelector(".thongke3")
    const thongke4 = document.querySelector(".thongke4")
    const thongke5 = document.querySelector(".thongke5")
    const thongke6 = document.querySelector(".thongke6")
    thongke2.style.display = "none"
    thongke3.style.display = "none"
    thongke1.style.display = "block"
    thongke4.style.display = "none"
    thongke5.style.display = "none"
    thongke6.style.display = "none"
    userPage.style.display = 'none';
    showCurrentContent('statisticsProduct');
    document.querySelector('.admin__content-header h3').innerHTML = 'Thống kê';
}
function showStatisticsPage1() {
    statisticsPage.style.display = 'block';
    orderPage.style.display = 'none';
    productPage.style.display = 'none';
    const thongke1 = document.querySelector(".thongke1")
    const thongke2 = document.querySelector(".thongke2")
    const thongke3 = document.querySelector(".thongke3")
    const thongke4 = document.querySelector(".thongke4")
    const thongke5 = document.querySelector(".thongke5")
    const thongke6 = document.querySelector(".thongke6")
    thongke2.style.display = "none"
    thongke3.style.display = "none"
    thongke1.style.display = "none"
    thongke4.style.display = "block"
    thongke5.style.display = "none"
    thongke6.style.display = "none"
    userPage.style.display = 'none';
    showCurrentContent('statisticsUser');
    document.querySelector('.admin__content-header h3').innerHTML = 'Thống kê';
}
function showThongke1(){
    const thongke1 = document.querySelector(".thongke1")
    const thongke2 = document.querySelector(".thongke2")
    const thongke3 = document.querySelector(".thongke3")
    thongke2.style.display = "none"
    thongke3.style.display = "none"
    thongke1.style.display = "block"
}
function showThongke2(){
    const thongke1 = document.querySelector(".thongke1")
    const thongke2 = document.querySelector(".thongke2")
    const thongke3 = document.querySelector(".thongke3")
    thongke2.style.display = "block"
    thongke1.style.display = "none"
     thongke3.style.display = "none"
}
function showThongke4(){
    const thongke4 = document.querySelector(".thongke4")
    const thongke5 = document.querySelector(".thongke5")
    const thongke6 = document.querySelector(".thongke6")
    thongke5.style.display = "none"
    thongke6.style.display = "none"
    thongke4.style.display = "block"
}
function showThongke5(){
    const thongke4 = document.querySelector(".thongke4")
    const thongke5 = document.querySelector(".thongke5")
    const thongke6 = document.querySelector(".thongke6")
    thongke5.style.display = "block"
    thongke6.style.display = "none"
    thongke4.style.display = "none"
}
function showThongkeSpTheoTen(){
    const thongke4 = document.querySelector(".thongke4")
    const thongke5 = document.querySelector(".thongke5")
    const thongke6 = document.querySelector(".thongke6")
    thongke5.style.display = "none"
    thongke6.style.display = "block"
    thongke4.style.display = "none"
}
function showThongkeTheoTen(){
    const thongke1 = document.querySelector(".thongke1")
    const thongke2 = document.querySelector(".thongke2")
    const thongke3 = document.querySelector(".thongke3")
    thongke2.style.display = "none"
    thongke1.style.display = "none"
     thongke3.style.display = "block"
}
// Statistics chart
var orderByMonth = [], productByMonth = [], totalByMonth = [];
var orderSum = getOrderQuantity();
var productSum = getOrderProductQuantity();
var totalSum = getTotalOrderPrice();

 

function getOrderByCategory(category) {
    var categoryOrder = [];
    if (category != 'all') {
        for (var i = 0; i < orderList.length; i++) {
            for (var j = 0; j < orderList[i].userAccount.cartList.length; j++) {
                if (orderList[i].userAccount.cartList[j].category.toLowerCase().replaceAll(' ', '-') == category) {
                    categoryOrder.push(orderList[i]);
                    break;
                }
            }
        }
    } else {
        categoryOrder = orderList;
    }
    return categoryOrder;
}

function getOrderByMonth(month, category) {
    var categoryOrder = getOrderByCategory(category);
    var orderByMonth = categoryOrder.filter(function(item) {
        return item.orderDate.split('/')[1] == month;
    })
    return orderByMonth.length;
}

function getProductByMonth(month, category) {
    var categoryOrder = getOrderByCategory(category);

    var orderByMonth = categoryOrder.filter(function(item) {
        return item.orderDate.split('/')[1] == month;
    })

    var quantity = 0;
    orderByMonth.forEach(function(item) {
        var tmpArray = createNewCartProductArray(item.userAccount.cartList);
        tmpArray.forEach(function(product) {
            if (category == 'all') {
                quantity += product.quantity;
            } else if (product.category.toLowerCase().replaceAll(' ', '-') == category) {
                quantity += product.quantity;
            }
        })
    })
    return quantity;
}

function getToTalByMonth(month, category) {
    var categoryOrder = getOrderByCategory(category);

    var orderByMonth = categoryOrder.filter(function(item) {
        return item.orderDate.split('/')[1] == month;
    })

    var totalOrderPrice = 0;
    orderByMonth.forEach(function(item) {
        var tmpArray = createNewCartProductArray(item.userAccount.cartList);
        if (category == 'all') {
            totalOrderPrice += covertPriceToNumber(getTotalPrice(tmpArray));
        } else {
            tmpArray.forEach(function(product) {
                if (product.category.toLowerCase().replaceAll(' ', '-') == category) {
                    totalOrderPrice += covertPriceToNumber(product.currentPrice) * product.quantity;
                }
            }); 
        }
    });
    return converPriceToString(totalOrderPrice);
}

function getDataByMonth(category) {
    orderByMonth = [], productByMonth = [], totalByMonth = [];
    for (var i = 1; i <= 12; i++) {
        orderByMonth.push(getOrderByMonth(i, category));
        productByMonth.push(getProductByMonth(i, category));
        totalByMonth.push(getToTalByMonth(i, category));
    }
}
