function goToPayrollFormPage() {
    window.location.href = "payrollForm.html";
}

window.addEventListener('load', function () {
    // Your function code here
    console.log("Window fully loaded");
    dynamicDepartment();
});

function dynamicDepartment() {
    console.log("This function runs after window is loaded");
    const arr = ["sales", "hr", "finance"];
    const departments = document.querySelectorAll('.department-cell');

    departments.forEach(department => {
        // Clear previous contents if any
        department.innerHTML = "";

        arr.forEach(element => {
            const spanElement = document.createElement('span');
            spanElement.innerHTML = element;
            spanElement.classList.add("px-2", "py-1", "mx-1", "rounded-4", "department-color");
            department.appendChild(spanElement);
        });
    });
}
