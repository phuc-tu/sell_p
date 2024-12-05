var modalBody = document.querySelector(".modal-body");
var signUp = document.getElementById("sign-up-btn");
var signIn = document.getElementById("sign-in-btn");

modalBody.addEventListener("click", function (event) {
    event.stopPropagation(); // ấn vô khung modal body sẽ kh bị tắt
});

function showSignIn() {
    document.getElementById("sign-in").style.display = "block";
    document.getElementById("sign-up").style.display = "none";
}

function showSignUp() {
    document.getElementById("sign-up").style.display = "block";
    document.getElementById("sign-in").style.display = "none";
}

function showPassword() {
    var icon = document.querySelector(".sign-up-showpass .show-hide");
    passwords.forEach(function (password) {
        if (password.type == "password") {
            icon.classList.replace("uil-eye", "uil-eye-slash");
            password.type = "text";
        } else {
            icon.classList.replace("uil-eye-slash", "uil-eye");
            password.type = "password";
        }
    });
}

function showSignInPassword() {
    var icon = document.querySelector(".sign-in-showpass .show-hide");
    if (signInPassword.type == "password") {
        icon.classList.replace("uil-eye-slash", "uil-eye");
        signInPassword.type = "text";
    } else {
        icon.classList.replace("uil-eye", "uil-eye-slash");
        signInPassword.type = "password";
    }
}

// tạo tài khoản
var email = document.getElementById("email");
var passwords = document.querySelectorAll(".password");
var myName = document.getElementById("user-name");

var  userAccount = [
    {
        cartList: [],
        userName: "Admin",
        userEmail: "admin@gmail.com",
        userPassword: "admin",
        userFullName: "Admin",
        userPhone: "0123456789",
        userAddress: "Admin",
        userDate: new Date().toLocaleDateString("vi-VN"),
        type: "admin",
    },
    {
        cartList: [
            {id: 'iphone003', category: 'iphone', name: 'iPhone 14 Plus 128GB', img: './img/product/iphone/iphone003.png', currentPrice: '26.490.000₫', oldPrice: '27.990.000₫', detailCategory: 'iPhone 14', state: 'new'},
            {id: 'iphone004', category: 'iphone', name: 'iPhone 14 128GB', img: './img/product/iphone/iphone004.png', currentPrice: '23.490.000₫', oldPrice: '24.990.000₫', detailCategory: 'iPhone 14', state: 'new'},
            {id: 'iphone005', category: 'iphone', name: 'iPhone 13 Pro Max 256GB', img: './img/product/iphone/iphone005.png', currentPrice: '29.990.000₫', oldPrice: '36.990.000₫', detailCategory: 'iPhone 13', state: 'old'},
            {id: 'iphone006', category: 'iphone', name: 'iPhone 13 Pro 128GB', img: './img/product/iphone/iphone006.png', currentPrice: '24.990.000₫', oldPrice: '30.990.000₫', detailCategory: 'iPhone 13', state: 'old'},
            {id: 'iphone005', category: 'iphone', name: 'iPhone 13 Pro Max 256GB', img: './img/product/iphone/iphone005.png', currentPrice: '29.990.000₫', oldPrice: '36.990.000₫', detailCategory: 'iPhone 13', state: 'old'},
            {id: 'iphone006', category: 'iphone', name: 'iPhone 13 Pro 128GB', img: './img/product/iphone/iphone006.png', currentPrice: '24.990.000₫', oldPrice: '30.990.000₫', detailCategory: 'iPhone 13', state: 'old'},
        ],
        userName: "Xin Chào",
        userEmail: "xinchao@gmail.com",
        userPassword: "123",
        userFullName: "123",
        userPhone: "0123456789",
        userAddress: "Random",
        userDate: new Date().toLocaleDateString("vi-VN"),
        type: "user",
    },
    {
        cartList: [ {id: 'iphone005', category: 'iphone', name: 'iPhone 13 Pro Max 256GB', img: './img/product/iphone/iphone005.png', currentPrice: '29.990.000₫', oldPrice: '36.990.000₫', detailCategory: 'iPhone 13', state: 'old'},
            {id: 'iphone006', category: 'iphone', name: 'iPhone 13 Pro 128GB', img: './img/product/iphone/iphone006.png', currentPrice: '24.990.000₫', oldPrice: '30.990.000₫', detailCategory: 'iPhone 13', state: 'old'},],
        userName: "Test1",
        userEmail: "test1@gmail.com",
        userPassword: "123",
        userFullName: "123",
        userPhone: "0123456789",
        userAddress: "Random",
        userDate: new Date().toLocaleDateString("vi-VN"),
        type: "user",
    },
];

localStorage.setItem("userAccount", JSON.stringify(userAccount));
function checkSameAccount(email) {
    for (var i = 0; i < userAccount.length; i++) {
        if (email == userAccount[i].userEmail) {
            return true;
        }
    }
    return false;
}

function createAccount() {
    var rePassword = document.getElementById("re-password");
    var password = document.getElementById("true-password");

    if (checkSameAccount(email.value)) {
        document.querySelector(".error.email").innerHTML = "Email đã tồn tại!";
        return false;
    } else {
        document.querySelector(".error.email").innerHTML = "";
    }

    if (rePassword.value != password.value) {
        document.querySelector(".error.password").innerHTML =
            "Mật khẩu không trùng khớp!";
        return false;
    } else {
        document.querySelector(".error.password").innerHTML = "";

        localStorage.setItem("userAccount", JSON.stringify(userAccount));
        localStorage.setItem("isLogIn", 1);
        localStorage.setItem("userAccountIndex", 1);
    }
}

// Check và Login
var signInEmail = document.getElementById("sign-in-email");
var signInPassword = document.getElementById("sign-in-password");

function checkLogIn() {
    localStorage.setItem("userAccountIndex", i);
    return true;
}

function LogIn() {
        localStorage.setItem("isLogIn", 1);
        localStorage.setItem("userAccountIndex", 1)
        localStorage.setItem("isLogIn", 1);
        location.reload();
}

function LogOut() {
    localStorage.setItem("isLogIn", 0);
    localStorage.setItem("userAccountIndex", "");
    window.location.href = "index.html";
}

// show user
var noneUser = document.querySelector(".header__none-user");
var user = document.querySelector(".header__user");
var admin = document.querySelector(".header__admin");
var index;

function showUserGroup(name, name1, name2) {
    name.style.display = "block";
    name1.style.display = "none";
    name2.style.display = "none";
}

var isLogIn = localStorage.getItem("isLogIn");
if (isLogIn == 1) {
    index = JSON.parse(localStorage.getItem("userAccountIndex"));

    if (userAccount[index].type == "admin") {
        showUserGroup(admin, noneUser, user);
    } else {
        var changeUserName = document.querySelector(
            ".header__user .header__user-name"
        );
        changeUserName.innerHTML = userAccount[index].userName;
        showUserGroup(user, noneUser, admin);
    }
} else {
    showUserGroup(noneUser, user, admin);
}
