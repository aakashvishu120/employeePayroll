function goToPayrollFormPage() {
  window.location.href = "payrollForm.html";
}

// window.addEventListener('load', function () {
//     const users = getStoredUsers();
//     if(users.length === 0) return null;
//     users.forEach(user => displayUsers(user))
// });

// function getStoredUsers() {
//     const storedUsers = localStorage.getItem("userList");
//     return storedUsers ? JSON.parse(storedUsers) : [];
// }

// function displayUsers(user) {
//     const tableBody = document.querySelector(".table-body");
//     const tableRow = document.createElement('div');
//     tableRow.classList.add('table-row');

//     //creating parent div for name and img tag
//     const nameImg = document.createElement('div');
//     nameImg.classList.add("table-cell", "name");
//     // nameImg.style.flex = '2';  this will create some default properties of flex
//     nameImg.style.flexGrow = '2';     // only sets the grow factor
//     nameImg.style.flexShrink = '';    // unset shrink
//     nameImg.style.flexBasis = '';     // unset basis

//     //creating img tag
//     const imageTag = document.createElement('img');
//     imageTag.classList.add("face");
//     imageTag.setAttribute("src", `../Assets/${user.profileImage}`);
//     imageTag.setAttribute("alt", "Avatar");
//     nameImg.appendChild(imageTag);

//     //creating name tag
//     const nameTag = document.createElement('span');
//     var finalName = user.name[0].toUpperCase() + user.name.slice(1);
//     nameTag.textContent = finalName;
//     nameImg.appendChild(nameTag);

//     //add name and img parent div to table-row div
//     tableRow.appendChild(nameImg);

//     //creating gender tag
//     const gender = document.createElement('div');
//     var finalGender = user.gender[0].toUpperCase() + user.gender.slice(1);
//     gender.textContent = finalGender;
//     gender.classList.add("table-cell");
//     tableRow.appendChild(gender);

//     //creating department tag
//     const department = document.createElement('div');
//     department.classList.add("table-cell", "department-cell");
//     department.style.flexGrow = '2';
//     department.style.flexShrink = '';
//     department.style.flexBasis = '';
//     user.departvalues.forEach(item => {
//         const spanElement = document.createElement('span');
//         spanElement.textContent = item;
//         spanElement.classList.add("px-2", "py-1", "m-1", "rounded-4", "department-color");
//         department.appendChild(spanElement);
//     });
//     tableRow.appendChild(department);

//     //creating salary
//     const salary = document.createElement('div');
//     salary.classList.add("table-cell");

//     const rupee = document.createElement('i');
//     rupee.classList.add("bi", "bi-currency-rupee");

//     const salaryValue = document.createElement('span');
//     salaryValue.textContent = user.salaryRange;

//     salary.appendChild(rupee);
//     salary.appendChild(salaryValue)
//     tableRow.appendChild(salary);

//     //creating start Date
//     const startDate = document.createElement('div');
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
//     startDate.textContent = `${user.day} ${months[user.month - 1]} ${user.year}`;
//     startDate.classList.add("table-cell");
//     tableRow.appendChild(startDate);

//     //creating Action Buttons
//     const actionButtons = document.createElement('div');
//     actionButtons.classList.add("table-cell", "text-end", "action-icons");

//     const deleteButton = document.createElement('i');
//     deleteButton.classList.add("bi", "bi-trash", "text-danger");
//     actionButtons.appendChild(deleteButton);

//     const editButton = document.createElement('i');
//     editButton.classList.add("bi", "bi-pencil", "text-primary");
//     actionButtons.appendChild(editButton);
//     tableRow.appendChild(actionButtons);

//     //adding all field in the parent div(tableBody)
//     tableBody.appendChild(tableRow);
// }




//Jquery Code : ------------
$(document).ready(function () {
  getStoredUsers(); //it cannot return data because it uses async js(AJAX) fetching data may take time
});

function getStoredUsers() {
  $.ajax({
    url: 'http://localhost:3000/employees',
    type: 'GET',
    contentType: 'application/json',
    success: function (response) {
      console.log("Data Fetched Successfully:", response);
      displayUsers(response);
    },
    error: function (error) {
      console.error("Error in Fetching the Data:", error);
    }
  });
}


function displayUsers(storedUsers) {
  if (storedUsers.length === 0) return null;
  storedUsers.forEach(user => listSingleUser(user));
}

function listSingleUser(user) {

  //creating a table row for each entry
  let tableRow = $('<div>').addClass('table-row');

  //parent div of name+img 
  let nameImg = $('<div>').addClass('table-cell name');

  //creating an image tag
  let img = $('<img>').attr({
    src: `../Assets/${user.profileImage}`,
    alt: 'Avatar',
  }).addClass('face');
  nameImg.append(img);

  //creating an span tag for name
  var finalName = user.name[0].toUpperCase() + user.name.slice(1);
  let span = $('<span>').text(finalName);
  nameImg.append(span);
  tableRow.append(nameImg);

  //creating a div for gender
  var finalGender = user.gender[0].toUpperCase() + user.gender.slice(1);
  let gender = $('<div>').addClass('table-cell').text(finalGender);
  tableRow.append(gender);

  //creating a div for department
  let department = $('<div>').addClass('table-cell department-cell');
  user.departments.forEach(item => {
    let span = $('<span>').addClass('px-2 py-1 m-1 rounded-4 department-color').text(item);
    department.append(span);
  })
  tableRow.append(department);

  //creating a div for salary
  let salary = $('<div>').addClass('table-cell').text(user.salaryRange);
  tableRow.append(salary);

  //creating a div for startDate
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  let startDate = $('<div>').addClass('table-cell').text(`${user.day} ${months[user.month - 1]} ${user.year}`);
  tableRow.append(startDate);

  let editdelbuttons = $('<div>').addClass('table-cell text-end action-icons');
  let deletebtn = $('<i>').addClass('bi bi-trash text-danger fs-3 mx-2 delete-user').attr('data-id', user.id);
  let editbtn = $('<i>').addClass('bi bi-pencil text-primary fs-3 mx-2 edit-user').attr('data-id', user.id);
  editdelbuttons.append(deletebtn);
  editdelbuttons.append(editbtn);
  tableRow.append(editdelbuttons);

  $('.table-body').append(tableRow);
}


$(document).on('click', '.delete-user', function () {
  var userId = $(this).attr('data-id');

  if (confirm("Are you sure you want to delete this user?")) {
    $.ajax({
      url: `http://localhost:3000/employees/${userId}`,
      type: 'DELETE',
      success: function () {
        console.log(`User with ID ${userId} deleted successfully`);
      },
      error: function (err) {
        console.error("Error deleting user:", err);
      }
    });
  }
})

$(document).on('click', '.edit-user', function () {
  var userId = $(this).attr('data-id');
  window.location.href = `payrollForm.html?id=${userId}`;
})

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}