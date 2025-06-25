document.getElementById('payroll-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = validateFormData();
  if (!formData) return;

  saveToLocalStorage(formData);
  event.target.reset();
});

// Function to validate form inputs
function validateFormData() {
  const name = document.getElementById('inputName').value.trim();
  const profileImage = document.querySelector('input[name="profileImageOptions"]:checked');
  const gender = document.querySelector('input[name="genderRadioOptions"]:checked');
  const departments = document.querySelectorAll('input[name="departmentOptions"]:checked');
  const salaryRange = document.getElementById('salaryRange').value;
  const day = document.getElementById('day').value;
  const month = document.getElementById('month').value;
  const year = document.getElementById('year').value;
  const notes = document.getElementById('Textarea1').value.trim();

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

  const departvalues = Array.from(departments).map(item => item.value);

  return {
    name,
    profileImage: profileImage.value,
    gender: gender.value,
    departvalues,
    salaryRange,
    day,
    month,
    year,
    notes
  };
}

// Function to save data to localStorage
function saveToLocalStorage(userData) {
  const existingData = JSON.parse(localStorage.getItem("userList")) || [];
  
  const isDuplicate = existingData.some(user => user.name.toLowerCase() === userData.name.toLowerCase());
  if (isDuplicate) {
    alert("An entry with this name already exists.");
    return;
  }

  existingData.push(userData);
  localStorage.setItem("userList", JSON.stringify(existingData));
}

// Navigation and form reset helpers
function goToHomePage() {
  window.location.href = "homePage.html";
}

function resetForm() {
  document.getElementById("payroll-form").reset();
}
