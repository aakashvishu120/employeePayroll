function goToPayrollFormPage() {
    window.location.href = "payrollForm.html";
}

window.addEventListener('load', function () {
    const users = getStoredUsers();
    if(users.length === 0) return null;
    users.forEach(user => displayUsers(user))
});

function getStoredUsers() {
    const storedUsers = localStorage.getItem("userList");
    return storedUsers ? JSON.parse(storedUsers) : [];
}

function displayUsers(user) {
    const tableBody = document.querySelector(".table-body");
    const tableRow = document.createElement('div');
    tableRow.classList.add('table-row');

    //creating parent div for name and img tag
    const nameImg = document.createElement('div');
    nameImg.classList.add("table-cell", "name");
    // nameImg.style.flex = '2';  this will create some default properties of flex
    nameImg.style.flexGrow = '2';     // only sets the grow factor
    nameImg.style.flexShrink = '';    // unset shrink
    nameImg.style.flexBasis = '';     // unset basis

    //creating img tag
    const imageTag = document.createElement('img');
    imageTag.classList.add("face");
    imageTag.setAttribute("src", `../Assets/${user.profileImage}`);
    imageTag.setAttribute("alt", "Avatar");
    nameImg.appendChild(imageTag);

    //creating name tag
    const nameTag = document.createElement('span');
    var finalName = user.name[0].toUpperCase() + user.name.slice(1);
    nameTag.textContent = finalName;
    nameImg.appendChild(nameTag);

    //add name and img parent div to table-row div
    tableRow.appendChild(nameImg);

    //creating gender tag
    const gender = document.createElement('div');
    var finalGender = user.gender[0].toUpperCase() + user.gender.slice(1);
    gender.textContent = finalGender;
    gender.classList.add("table-cell");
    tableRow.appendChild(gender);

    //creating department tag
    const department = document.createElement('div');
    department.classList.add("table-cell", "department-cell");
    department.style.flexGrow = '2';
    department.style.flexShrink = '';
    department.style.flexBasis = '';
    user.departvalues.forEach(item => {
        const spanElement = document.createElement('span');
        spanElement.textContent = item;
        spanElement.classList.add("px-2", "py-1", "mx-1", "rounded-4", "department-color");
        department.appendChild(spanElement);
    });
    tableRow.appendChild(department);

    //creating salary
    const salary = document.createElement('div');
    salary.classList.add("table-cell");

    const rupee = document.createElement('i');
    rupee.classList.add("bi", "bi-currency-rupee");

    const salaryValue = document.createElement('span');
    salaryValue.textContent = user.salaryRange;

    salary.appendChild(rupee);
    salary.appendChild(salaryValue)
    tableRow.appendChild(salary);

    //creating start Date
    const startDate = document.createElement('div');
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    startDate.textContent = `${user.day} ${months[user.month - 1]} ${user.year}`;
    startDate.classList.add("table-cell");
    tableRow.appendChild(startDate);

    //creating Action Buttons
    const actionButtons = document.createElement('div');
    actionButtons.classList.add("table-cell", "text-end", "action-icons");

    const deleteButton = document.createElement('i');
    deleteButton.classList.add("bi", "bi-trash", "text-danger");
    actionButtons.appendChild(deleteButton);

    const editButton = document.createElement('i');
    editButton.classList.add("bi", "bi-pencil", "text-primary");
    actionButtons.appendChild(editButton);
    tableRow.appendChild(actionButtons);

    //adding all field in the parent div(tableBody)
    tableBody.appendChild(tableRow);
}