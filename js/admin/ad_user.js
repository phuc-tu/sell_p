
var userList = document.querySelector(".admin__user-account-list");
var  userAccount = [
    {
        cartList: [],
        userName: "Admin",
        userEmail: "admin@gmail.com",
        userPassword: "admin",
        userFullName: "Admin",
        userPhone: "0123456789",
        userAddress: "Admin",
        userDate: "1/11/2023",
        type: "admin",
    },
    {
        cartList: [
            {id: 'iphone003', category: 'iphone', name: 'iPhone 14 Plus 128GB', img: './img/product/iphone/iphone003.png', currentPrice: '26.490.000₫', oldPrice: '27.990.000₫', detailCategory: 'iPhone 14', state: 'new'},
            {id: 'iphone004', category: 'iphone', name: 'iPhone 14 128GB', img: './img/product/iphone/iphone004.png', currentPrice: '23.490.000₫', oldPrice: '24.990.000₫', detailCategory: 'iPhone 14', state: 'new'},
            {id: 'iphone005', category: 'iphone', name: 'iPhone 13 Pro Max 256GB', img: './img/product/iphone/iphone005.png', currentPrice: '29.990.000₫', oldPrice: '36.990.000₫', detailCategory: 'iPhone 13', state: 'old'},
            {id: 'iphone006', category: 'iphone', name: 'iPhone 13 Pro 128GB', img: './img/product/iphone/iphone006.png', currentPrice: '24.990.000₫', oldPrice: '30.990.000₫', detailCategory: 'iPhone 13', state: 'old'},
        ],
        userName: "Xin chào",
        userEmail: "xinchao@gmail.com",
        userPassword: "123",
        userFullName: "123",
        userPhone: "0123456789",
        userAddress: "Random",
        userDate: "1/12/2024",
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
        userDate: "1/12/2024",
        type: "user",
    },
];

localStorage.setItem("userAccount", JSON.stringify(userAccount));

function htmlUser(account) {
    var icon = {
        admin: "fa-solid fa-screwdriver-wrench",
        user: "fa-solid fa-user",
    };

    var html = `
        <div class="admin__user-account-item">
            <div class="admin__user-account-item-box">
                <i class="${icon[account.type]}"></i>
            </div>
            <div class="admin__user-account-item-box">
                <img src="./img/account-logo.png" alt="">
            </div>
            <div class="admin__user-account-item-box">
                <h3>${account.userName}</h3>
                <p>${account.userEmail}</p>
            </div>
            <div class="admin__user-account-item-box lock-user" style="display:none" >
               <i class='bx bxs-lock'></i>
            </div>
            <div class="admin__user-account-item-box">
    <h3>Ngày đăng ký</h3>
    <p>${
        account.type === "admin" ? "1/11/2024" : account.userDate
    }</p> <!-- Kiểm tra nếu là admin thì hiển thị ngày mặc định -->
</div>


            <div class="admin__user-account-item-box control">
                <i class="fa-solid fa-ellipsis-vertical"></i>
                <div class="admin__user-account-control">
                    <div class="admin__user-account-control-item" onclick="showSeeInfoModal('${
                        account.userEmail
                    }')">
                        <i class="uil uil-info-circle"></i>
                        <span>Xem thông tin</span>
                    </div>
                    <div class="admin__user-account-control-item" onclick="showEditInfoModal('${
                        account.userEmail
                    }')">
                        <i class="uil uil-edit"></i>
                        <span>Sửa thông tin</span>
                    </div>
                  
                    <div class="admin__user-account-control-item" onclick="showDeleteAccountModal('${
                        account.userEmail
                    }')">
                        <i class="uil uil-user-times"></i>
                        <span>Xóa tài khoản</span>
                    </div>
                      <div class="admin__user-account-control-item" onclick="showDeleteAccountModal('${
                        account.userEmail
                    }',1)">
                        <i class="uil uil-edit"></i>
                        <span>Khóa người dùng</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    return html;
}

function showUserPage() {
    userPage.style.display = "block";
    orderPage.style.display = "none";
    productPage.style.display = "none";
    statisticsPage.style.display = "none";

    showCurrentContent("user");

    var html = userAccount.map(function (account) {
        return htmlUser(account);
    });

    var adminAccount = userAccount.filter(function (account) {
        return account.type == "admin";
    });
    document.querySelector(".all-account-quantity").innerHTML =
        userAccount.length;
    document.querySelector(".admin-account-quantity").innerHTML =
        adminAccount.length;
    document.querySelector(".user-account-quantity").innerHTML =
        userAccount.length - adminAccount.length;

    document.querySelector(".admin__content-header h3").innerHTML =
        "Quản lý khách hàng";
    userList.innerHTML = html.join("");
    showControl();
    autoCloseControlPage();
}

function showControl() {
    var controlBtn = document.querySelectorAll(
        ".admin__user-account-item-box.control"
    );
    var prevControlPage;
    controlBtn.forEach(function (control) {
        control.addEventListener("click", function (event) {
            var controlPage = control.querySelector(
                ".admin__user-account-control"
            );
            controlPage.classList.toggle("active");

            if (prevControlPage && prevControlPage != controlPage) {
                prevControlPage.classList.remove("active");
            }
            prevControlPage = controlPage;
            event.stopPropagation();
        });
    });
}

function autoCloseControlPage() {
    var controlPage = document.querySelectorAll(".admin__user-account-control");
    var content = document.querySelector(".admin__content-wrapper");
    content.addEventListener("click", function (event) {
        controlPage.forEach(function (item) {
            item.classList.remove("active");
        });
        event.stopPropagation();
    });
}

// Search account


// Show user control
var userControlModal = document.getElementById("user-control-modal");
var infoModal = document.getElementById("user-info");
var deleteAccountModal = document.getElementById("delete-account");

// See info
var userFullName = document.getElementById("user-fullname");
var userName = document.getElementById("user-name");
var userEmail = document.getElementById("user-email");
var userPass = document.getElementById("user-pass");
var userAddress = document.getElementById("user-address");
var userPhone = document.getElementById("user-phone");
var userType = document.getElementById("user-type");
var editIndex;

function disableEdit() {
    userFullName.classList.add("disable");
    userFullName.readOnly = true;
    userName.classList.add("disable");
    userName.readOnly = true;
    userEmail.classList.add("disable");
    userEmail.readOnly = true;
    userPass.classList.add("disable");
    userPass.readOnly = true;
    userAddress.classList.add("disable");
    userAddress.readOnly = true;
    userPhone.classList.add("disable");
    userPhone.readOnly = true;
    userType.style.cursor = "not-allowed";
    userType.disabled = true;
}

function enableEdit() {
    userFullName.classList.remove("disable");
    userFullName.readOnly = false;
    userName.classList.remove("disable");
    userName.readOnly = false;
    userEmail.classList.remove("disable");
    userEmail.readOnly = false;
    userPass.classList.remove("disable");
    userPass.readOnly = false;
    userAddress.classList.remove("disable");
    userAddress.readOnly = false;
    userPhone.classList.remove("disable");
    userPhone.readOnly = false;
    userType.style.cursor = "default";
    userType.disabled = false;
}

function showSeeInfoModal(email) {
    userControlModal.style.display = "flex";
    infoModal.style.display = "block";
    deleteAccountModal.style.display = "none";

    var userInfo = userAccount.find(function (account, index) {
        editIndex = index;
        return account.userEmail == email;
    });

    userFullName.value = userInfo.userFullName;
    userName.value = userInfo.userName;
    userEmail.value = userInfo.userEmail;
    userPass.value = userInfo.userPassword;
    userAddress.value = userInfo.userAddress;
    userPhone.value = userInfo.userPhone;

    for (var i = 0; i < userType.options.length; i++) {
        if (userType.options[i].value == userInfo.type) {
            userType.options[i].selected = true;
            break;
        }
    }

    disableEdit();
    document.querySelector("#user-info .control-form__heading h3").innerHTML =
        "Xem thông tin";
    document.querySelector(
        "#user-info .control-form___form-btn"
    ).style.display = "none";
}

// Edit info
function showEditInfoModal(email) {
    showSeeInfoModal(email);
    enableEdit();
    document.querySelector("#user-info .control-form__heading h3").innerHTML =
        "Sửa thông tin";
    document.querySelector(
        "#user-info .control-form___form-btn"
    ).style.display = "block";
}

function checkPhone() {
    if (
        !userPhone.value ||
        (parseInt(userPhone.value) && userPhone.value.length == 10)
    ) {
        return true;
    } else {
        return false;
    }
}

function EditInfo() {
    if (checkPhone()) {
        userAccount[editIndex].userFullName = userFullName.value;
        userAccount[editIndex].userName = userName.value;
        userAccount[editIndex].userEmail = userEmail.value;
        userAccount[editIndex].userPassword = userPass.value;
        userAccount[editIndex].userAddress = userAddress.value;
        userAccount[editIndex].userPhone = userPhone.value;

        for (var i = 0; i < userType.options.length; i++) {
            if (userType.options[i].selected == true) {
                userAccount[editIndex].type = userType.options[i].value;
                break;
            }
        }

        document.querySelector("#user-info .error-phone").style.display =
            "none";

        showToast(
            "success",
            "Thành công!",
            `Đã lưu thông tin mới của tài khoản ${userAccount[editIndex].userEmail}`
        );
        userControlModal.style.display = "none";
        showUserPage();
    } else {
        document.querySelector("#user-info .error-phone").style.display =
            "block";
    }
}

// Delete account
var deleteIndex;

function showDeleteAccountModal(email,type) {
    const tmp = type||0
    userControlModal.style.display = "flex";
    deleteAccountModal.style.display = "block";
    infoModal.style.display = "none";
    const deleteBtn = document.getElementById('deleteBtn');
    const lockBtn = document.getElementById('lockBtn');
    if(tmp===1)
    {

        deleteBtn.style.display = 'none';        
            lockBtn.style.display = 'inline-block';   
        document.querySelector(
            "#delete-account .delete-form__question"
        ).innerHTML = `Bạn có muốn khóa tài khoản "${email}" không ?`;
    }else{
        deleteBtn.style.display = 'inline-block';  
        lockBtn.style.display = 'none';     
        document.querySelector(
            "#delete-account .delete-form__question"
        ).innerHTML = `Bạn có muốn xóa tài khoản "${email}" không ?`;
    }
}

function isAdminAccount(account) {
    if (account.type == "admin") return true;
    return false;
}

function deleteAccount(type) {
    const tmpType = type || 0
    if(tmpType===1){
        showToast(
            "success",
            "Thành công!",
            `khóa thành công tài khoản`
        );
        userControlModal.style.display = "none";
        showUserPage();
    }
    else{
        showToast(
            "success",
            "Thành công!",
            `Xóa thành công tài khoản`
        );
        userControlModal.style.display = "none";
        showUserPage();
    }
}
