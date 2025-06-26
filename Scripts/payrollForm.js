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

// // Navigation and form reset helpers
// function goToHomePage() {
//   window.location.href = "homePage.html";
// }

// function resetForm() {
//   document.getElementById("payroll-form").reset();
// }


//JQUERY Code : --------------------------

$(document).ready(function () {
  $('#payroll-form').submit(function (e) {
    e.preventDefault(); // prevent actual submission
    const formData = validateFormDataJquery();
    if (!formData) return;
    saveToJson(formData);

    //reset the form fields
    $('#payroll-form').trigger("reset");
  });
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
    startDate: `${day}-${month}-${year}`,
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
