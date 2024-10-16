
document.addEventListener('DOMContentLoaded', () => {
    // Handle dropdown functionality
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.addEventListener('click', () => {
            dropdown.classList.toggle('active');
            const content = dropdown.querySelector('.dropdown-content');
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Handle sidebar link clicks to show the relevant section
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Handle sign-out button click
    document.getElementById('sign-out-btn')?.addEventListener('click', signOut);

    // Handle form submissions
    function handleFormSubmit(formId, successMessageId) {
        document.getElementById(formId)?.addEventListener('submit', (event) => {
            event.preventDefault();
            // Perform form submission logic here

            // Show success message
            const messageElement = document.getElementById(successMessageId);
            messageElement.style.display = 'block';

            // Clear the form fields
            document.getElementById(formId).reset();
        });
    }

    // Handle add member form submission
    document.getElementById('add-member-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        document.getElementById('form-success-message').style.display = 'block';
        document.getElementById('add-member-form').reset();
    });

    // Handle change password form submission
document.getElementById('change-password-form')?.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (!checkPasswordMatch()) return; // Check if passwords match

    // Perform password change logic here

    // Show success message
    const messageElement = document.getElementById('change-password-success-message');
    if (messageElement) {
        messageElement.style.display = 'block';
    }

    // Clear the form fields
    document.getElementById('change-password-form').reset();
});

    // Handle edit profile form submission
    document.getElementById('edit-profile-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        // Perform the update profile logic here

        // Show success message
        const messageElement = document.getElementById('edit-profile-success-message');
        if (messageElement) {
            messageElement.style.display = 'block';
        }

        // Clear form fields
        document.getElementById('edit-profile-form').reset();
    });
});

// Function to check if new passwords match and validate the password strength
function checkPasswordMatch() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-new-password').value;
    const errorElement = document.getElementById('password-error');
    
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,])[A-Za-z\d!@#$%^&*()_+}{":;'?/>.<,]{8,}$/;
    
    
    
    // Check if the new password is not the same as the current password
    if (currentPassword ==newPassword && currentPassword == confirmPassword) {
        errorElement.textContent = 'New password should not be the same as the current password.';
        return false;
    }

    // Validate password strength
    if (!passwordRegex.test(newPassword)) {
        errorElement.textContent = 'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.';
        return false;
    }
    
    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
        errorElement.textContent = 'Passwords do not match!';
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const inputId = toggle.getAttribute('data-input');
            const inputElement = document.getElementById(inputId);
            
            // Toggle between password and text input types
            if (inputElement.type === 'password') {
                inputElement.type = 'text';
                toggle.classList.remove('fa-eye');
                toggle.classList.add('fa-eye-slash');
            } else {
                inputElement.type = 'password';
                toggle.classList.remove('fa-eye-slash');
                toggle.classList.add('fa-eye');
            }
        });
    });
});



// Sign out function
function signOut() {
    window.location.href = 'index.html'; // Adjust the URL to match your login page
}


    // Initialize members array
    const members = [];

    // Function to populate the table with data
    function populateTable() {
        const tableBody = document.querySelector('#members-table tbody');
        tableBody.innerHTML = ''; // Clear the table before populating
        members.forEach(member => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${member.srNo}</td>
                <td>${member.name}</td>
                <td>${member.gender}</td>
                <td>${member.designation}</td>
                <td>${member.email}</td>
                <td>${member.contact}</td>
                <td><button class="action-button" onclick="deleteMember(${member.srNo})"><i class="fas fa-trash-alt"></i></button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Function to handle member deletion
    function deleteMember(srNo) {
        const confirmation = confirm('Are you sure you want to delete this member?');
        if (confirmation) {
            // Remove the member from the data array
            const index = members.findIndex(member => member.srNo === srNo);
            if (index !== -1) {
                members.splice(index, 1);
                // Refresh the table
                populateTable();
            }
        }
    }

    // Handle form submission
    document.getElementById('add-member-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get form values
        const name = document.getElementById('member-name').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const designation = document.getElementById('member-degination').value;
        const email = document.getElementById('member-email').value;
        const contact = document.getElementById('member-contact').value;
        const password = document.getElementById('member-password').value;

        // Generate new member object
        const newMember = {
            srNo: members.length + 1,
            name,
            gender,
            designation,
            email,
            contact,
            password
        };

        // Add new member to the array and refresh the table
        members.push(newMember);
        populateTable();

        // Show success message and reset the form
        document.getElementById('form-success-message').style.display = 'block';
        setTimeout(() => {
            document.getElementById('form-success-message').style.display = 'none';
        }, 3000);
        document.getElementById('add-member-form').reset();
    });

    // Populate the table on page load (if you want to add some initial data, you can do it here)
    document.addEventListener('DOMContentLoaded', populateTable);


    // pending students
  // Function to display pending students
  
function displayStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const tbody = document.querySelector('#studentTable tbody');
    tbody.innerHTML = ''; // Clear existing entries

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.gender}</td>
            <td>${student.course}</td>
            <td>${student.batch}</td>
            <td>${student.roll_no}</td>
            <td>${student.email}</td>
            <td>${student.mobile_no}</td>
            <td>
                <button class="approveBtn" data-index="${index}">Approve</button>
                <button class="deleteBtn" data-index="${index}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Attach event listeners for the buttons
    document.querySelectorAll('.approveBtn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            approveStudent(index);
        });
    });

    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            deleteStudent(index);
        });
    });
}

// Function to display approved students
function displayApprovedStudents() {
    const approvedStudents = JSON.parse(localStorage.getItem('approvedStudents')) || [];
    const tbody = document.querySelector('#approvedStudents tbody');
    tbody.innerHTML = ''; // Clear existing entries

    approvedStudents.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.gender}</td>
            <td>${student.course}</td>
            <td>${student.batch}</td>
            <td>${student.roll_no}</td>
            <td>${student.email}</td>
            <td>${student.mobile_no}</td>
            <td><button class="deleteBtn" data-index="${index}">Delete</button></td>
        `;
        tbody.appendChild(row);
    });

    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            deleteApprovedStudent(index);
        });
    });
    
}

// Function to delete a student
function deleteStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents(); // Refresh the displayed list
}

//function to delete approved student
function deleteApprovedStudent(index) {
    // Fetch the approvedStudents array from localStorage
    const approvedStudents = JSON.parse(localStorage.getItem('approvedStudents')) || [];

    // Remove the student at the given index
    approvedStudents.splice(index, 1);

    // Save the updated list back to localStorage
    localStorage.setItem('approvedStudents', JSON.stringify(approvedStudents));

    // Refresh the displayed list
    displayApprovedStudents();
}

// Function to approve a student
function approveStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const approvedStudents = JSON.parse(localStorage.getItem('approvedStudents')) || [];

    // Move the student to the approved list
    const approvedStudent = students.splice(index, 1)[0];
    approvedStudents.push(approvedStudent);

    // Save updated data to localStorage
    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('approvedStudents', JSON.stringify(approvedStudents));

    // Refresh both tables
    displayStudents();
    displayApprovedStudents();
}

// Call displayStudents and displayApprovedStudents when the page loads
window.onload = function () {
    displayStudents();
    displayApprovedStudents();
};

// Handling student form submission
document.getElementById('student-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get values from the form
    const name = document.getElementById('student-name').value;
    const gender = document.querySelector('input[name="gender"]:checked').value; // Retrieve the checked radio button value
    const course = document.getElementById('course').value;
    const batch = document.getElementById('batch').value;
    const roll_no = document.getElementById('roll-no').value; // Ensure ID matches
    const email = document.getElementById('email').value;
    const mobile_no = document.getElementById('contact-number').value; // Ensure ID matches

    const studentData = { name, gender, course, batch, roll_no, email, mobile_no };

    // Save the data to local storage
    const existingStudents = JSON.parse(localStorage.getItem('students')) || [];
    existingStudents.push(studentData);
    localStorage.setItem('students', JSON.stringify(existingStudents));

    // Show success message
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';

    // Refresh the displayed students
    displayStudents();
});


// Function to display pending students
function displayStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const tbody = document.querySelector('#studentTable tbody');
    tbody.innerHTML = ''; // Clear existing entries

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.gender}</td>
            <td>${student.course}</td>
            <td>${student.batch}</td>
            <td>${student.roll_no}</td>
            <td>${student.email}</td>
            <td>${student.mobile_no}</td>
            <td>
                <button class="approveBtn" data-index="${index}">Approve</button>
                <button class="deleteBtn" data-index="${index}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Attach event listeners for the buttons
    document.querySelectorAll('.approveBtn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            approveStudent(index);
        });
    });

    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            deleteStudent(index);
        });
    });
}

 // pending teachers
  // Function to display pending teachers
  function displayTeachers() {
    const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
    const tbody = document.querySelector('#teacherTable tbody');
    tbody.innerHTML = ''; // Clear existing entries

    teachers.forEach((teacher, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
           <td>${index + 1}</td>
            <td>${teacher.name}</td>
            <td>${teacher.gender}</td>
            <td>${teacher.department}</td>
            <td>${teacher.designation}</td>
            <td>${teacher.email}</td>
            <td>${teacher.mobile_no}</td>
            <td>
                <button class="approveBtn" data-index="${index}">Approve</button>
                <button class="deleteBtn" data-index="${index}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Attach event listeners for the buttons
    document.querySelectorAll('.approveBtn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            approveTeacher(index);
        });
    });

    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            deleteTeacher(index);
        });
    });
}

// Function to display approved teacher
function displayApprovedTeachers() {
    const approvedTeachers = JSON.parse(localStorage.getItem('approvedTeachers')) || [];
    const tbody = document.querySelector('#approvedTeachers tbody');
    tbody.innerHTML = ''; // Clear existing entries

    approvedTeachers.forEach((Teacher, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${teacher.name}</td>
            <td>${teacher.gender}</td>
            <td>${teacher.department}</td>
            <td>${teacher.designation}</td>
            <td>${teacher.email}</td>
            <td>${teacher.mobile_no}</td>
            <td><button class="deleteBtn" data-index="${index}">Delete</button></td>
        `;
        tbody.appendChild(row);
    });

    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            deleteApprovedTeacher(index);
        });
    });
    
}

// Function to delete a teacher
function deleteTeacher(index) {
    const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
    teachers.splice(index, 1);
    localStorage.setItem('teachers', JSON.stringify(teachers));
    displayTeachers(); // Refresh the displayed list
}

//function to delete approved teacher
function deleteApprovedTeacher(index) {
    // Fetch the approvedStudents array from localStorage
    const approvedTeachers = JSON.parse(localStorage.getItem('approvedTeachers')) || [];

    // Remove the student at the given index
    approvedTeachers.splice(index, 1);

    // Save the updated list back to localStorage
    localStorage.setItem('approvedTeachers', JSON.stringify(approvedTeachers));

    // Refresh the displayed list
    displayApprovedTeachers();
}

// Function to approve a teacher
function approveTeacher(index) {
    const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
    const approvedTeachers = JSON.parse(localStorage.getItem('approvedTeachers')) || [];

    // Move the student to the approved list
    const approvedTeacher = teachers.splice(index, 1)[0];
    approvedTeachers.push(approvedTeacher);

    // Save updated data to localStorage
    localStorage.setItem('teachers', JSON.stringify(teachers));
    localStorage.setItem('approvedTeachers', JSON.stringify(approvedTeachers));

    // Refresh both tables
    displayTeachers();
    displayApprovedTeachers();
}

// Call displayStudents and displayApprovedStudents when the page loads
window.onload = function () {
    displayTeachers();
    displayApprovedTeachers();
};

// Handling student form submission
document.getElementById('teacher-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get values from the form
   
    const name = document.getElementById('teacher-name').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const department = document.getElementById('department').value;
    const designation = document.getElementById('designation').value;
    const email = document.getElementById('teacher-email').value;
    const mobile_no = document.getElementById('teacher-contact').value;

    const teacherData = { name, gender, department, designation, email, mobile_no, role: 'teacher' }

    // Save the data to local storage
    const existingTeachers = JSON.parse(localStorage.getItem('teachers')) || [];
    existingTeachers.push(teacherData);
    localStorage.setItem('teachers', JSON.stringify(existingTeachers));

    // Show success message
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';

    // Refresh the displayed students
    displayTeachers();
});