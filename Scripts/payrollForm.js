//JavaScript Code -------------------

// document.getElementById('payroll-form').addEventListener('submit', function (event) {
//   event.preventDefault();

//   const formData = validateFormData();
//   if (!formData) return;

//   saveToLocalStorage(formData);
//   event.target.reset();
// });

// // Function to validate form inputs
// function validateFormData() {
//   const name = document.getElementById('inputName').value.trim();
//   const profileImage = document.querySelector('input[name="profileImageOptions"]:checked');
//   const gender = document.querySelector('input[name="genderRadioOptions"]:checked');
//   const departments = document.querySelectorAll('input[name="departmentOptions"]:checked');
//   const salaryRange = document.getElementById('salaryRange').value;
//   const day = document.getElementById('day').value;
//   const month = document.getElementById('month').value;
//   const year = document.getElementById('year').value;
//   const notes = document.getElementById('Textarea1').value.trim();

//   if (name === "") {
//     alert("Please enter your name.");
//     return null;
//   }

//   if (!profileImage) {
//     alert("Please select a profile image.");
//     return null;
//   }

//   if (!gender) {
//     alert("Please select your gender.");
//     return null;
//   }

//   if (departments.length === 0) {
//     alert("Please select at least one department.");
//     return null;
//   }

//   if (salaryRange === "") {
//     alert("Please select your salary.");
//     return null;
//   }

//   if (day === "" || month === "" || year === "") {
//     alert("Please select a complete date.");
//     return null;
//   }

//   const departvalues = Array.from(departments).map(item => item.value);

//   return {
//     name,
//     profileImage: profileImage.value,
//     gender: gender.value,
//     departvalues,
//     salaryRange,
//     day,
//     month,
//     year,
//     notes
//   };
// }

// // Function to save data to localStorage
// function saveToLocalStorage(userData) {
//   const existingData = JSON.parse(localStorage.getItem("userList")) || [];

//   const isDuplicate = existingData.some(user => user.name.toLowerCase() === userData.name.toLowerCase());
//   if (isDuplicate) {
//     alert("An entry with this name already exists.");
//     return;
//   }

//   existingData.push(userData);
//   localStorage.setItem("userList", JSON.stringify(existingData));
// }

// Navigation and form reset helpers
function goToHomePage() {
  window.location.href = "homePage.html";
}

// function resetForm() {
//   document.getElementById("payroll-form").reset();
// }


//JQUERY Code : --------------------------

$(document).ready(function () {
  const userId = getQueryParam('id'); // check if we're in edit mode

  //if userId is found then prefill form and update user else add user
  if (userId) {
    // Change Submit button text to "Update"
    $('#payroll-form button[type="submit"]').text("Update").addClass("btn btn-warning");

    // Fetch user data and prefill form
    $.ajax({
      url: `http://localhost:3000/employees/${userId}`,
      type: 'GET',
      success: function (user) {
        prefillForm(user);
      },
      error: function () {
        alert("User not found!");
      }
    });
  }

  $('#payroll-form').submit(function (e) {
    e.preventDefault(); // prevent actual submission
    const formData = validateFormDataJquery();
    if (!formData) return;

    // Update user
    if (userId) {
      updateUser(userId, formData);
    } else {
      // Add new user
      saveToJson(formData);
    }

    //reset the form fields
    $('#payroll-form').trigger("reset");
  });

  //Populating Day inside form it gives warning when doument write is used
  for (let i = 1; i <= 31; i++) {
    $('#day').append($('<option>', {
      value: i,
      text: i
    }));
  }

  //pupulating year inside form 
  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= 1980; y--) {
    $('#year').append($('<option>', {
      value: y,
      text: y
    }));
  }
});

function validateFormDataJquery() {
  const name = $('#inputName').val().trim();
  const profileImage = $('input[name="profileImageOptions"]:checked').val();
  const gender = $('input[name="genderRadioOptions"]:checked').val();
  const departments = [];
  $('input[name="departmentOptions"]:checked').each(function () {
    departments.push($(this).val());
  });
  const salaryRange = $('#salaryRange').val();
  const day = $('#day').val();
  const month = $('#month').val();
  const year = $('#year').val();
  const notes = $('#Textarea1').val().trim();

  if (name === "") {
    alert("Please enter your name.");
    return null;
  }

  if (!profileImage) {
    alert("Please select a profile image.");
    return null;
  }

  if (!gender) {
    alert("Please select your gender.");
    return null;
  }

  if (departments.length === 0) {
    alert("Please select at least one department.");
    return null;
  }

  if (salaryRange === "") {
    alert("Please select your salary.");
    return null;
  }

  if (day === "" || month === "" || year === "") {
    alert("Please select a complete date.");
    return null;
  }

  return {
    name,
    profileImage,
    gender,
    departments,
    salaryRange,
    day,
    month,
    year,
    notes
  };
}

function saveToJson(userData) {
  $.ajax({
    url: 'http://localhost:3000/employees',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(userData),
    success: function (response) {
      console.log("Data successfully added:", response);
    },
    error: function (error) {
      console.error("Error while adding data:", error);
    }
  });
}


function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function prefillForm(user) {
  $('#inputName').val(user.name);
  $(`input[name="profileImageOptions"][value="${user.profileImage}"]`).prop('checked', true);
  $(`input[name="genderRadioOptions"][value="${user.gender}"]`).prop('checked', true);
  user.departments.forEach(dep => {
    $(`input[name="departmentOptions"][value="${dep}"]`).prop('checked', true);
  });
  $('#salaryRange').val(user.salaryRange);
  $('#day').val(user.day);
  $('#month').val(user.month);
  $('#year').val(user.year);
  $('#Textarea1').val(user.notes);
}


function updateUser(userId, formData) {
  console.log("reached inside update user and userId = ", userId);

  $.ajax({
    url: `http://localhost:3000/employees/${userId}`,
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(formData),
    success: function () {
      $('#payroll-form button[type="submit"]').text("Submit").addClass("btn btn-secondary px-5 me-5");
      alert("User updated successfully!");
      goToHomePage();
    },
    error: function () {
      alert("Error updating user.");
    }
  });
}