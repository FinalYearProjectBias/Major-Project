// Function to toggle between forms based on role selection
function toggleForm() {
    var role = document.getElementById("role").value;
    document.getElementById("student-form").style.display = "none";
    document.getElementById("teacher-form").style.display = "none";
    document.getElementById("staff-form").style.display = "none";

    if (role === "student") {
        document.getElementById("student-form").style.display = "block";
    } else if (role === "teacher") {
        document.getElementById("teacher-form").style.display = "block";
    } else if (role === "staff") {
        document.getElementById("staff-form").style.display = "block";
    }
}

// Wait for the DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {

    // Detect form submission for student, teacher, or staff
    document.querySelectorAll('.signup-form').forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the default form submission
            
            const role = document.getElementById("role").value;
            
            // Capture form data based on role
            if (role === 'student') {
                const name = document.getElementById('student-name').value;
                const gender = document.querySelector('input[name="gender"]:checked').value;
                const course = document.getElementById('course').value;
                const batch = document.getElementById('batch').value;
                const roll_no = document.getElementById('roll-no').value;
                const email = document.getElementById('email').value;
                const mobile_no = document.getElementById('contact-number').value;

                const studentData = { name, gender, course, batch, roll_no, email, mobile_no, role: 'student' };

                // Store student data in localStorage
                const existingStudents = JSON.parse(localStorage.getItem('students')) || [];
                existingStudents.push(studentData);
                localStorage.setItem('students', JSON.stringify(existingStudents));

            } else if (role === 'teacher') {
                const name = document.getElementById('teacher-name').value;
                const gender = document.querySelector('input[name="gender"]:checked').value;
                const department = document.getElementById('department').value;
                const designation = document.getElementById('designation').value;
                const email = document.getElementById('teacher-email').value;
                const mobile_no = document.getElementById('teacher-contact').value;

                const teacherData = { name, gender, department, designation, email, mobile_no, role: 'teacher' };

                // Store teacher data in localStorage
                const existingTeachers = JSON.parse(localStorage.getItem('teachers')) || [];
                existingTeachers.push(teacherData);
                localStorage.setItem('teachers', JSON.stringify(existingTeachers));

            } else if (role === 'staff') {
                const name = document.getElementById('staff-name').value;
                const gender = document.querySelector('input[name="gender"]:checked').value;
                const department = document.getElementById('staff-department').value;
                const designation = document.getElementById('staff-designation').value;
                const email = document.getElementById('staff-email').value;
                const mobile_no = document.getElementById('staff-contact').value;

                const staffData = { name, gender, department, designation, email, mobile_no, role: 'staff' };

                // Store staff data in localStorage
                const existingStaff = JSON.parse(localStorage.getItem('staff')) || [];
                existingStaff.push(staffData);
                localStorage.setItem('staff', JSON.stringify(existingStaff));
            }

            // Show success message
            const successMessage = document.getElementById('success-message');
            successMessage.style.display = 'block'; // Show the message
            
            // Optionally, reset the form
            form.reset();

            // Redirect to the index page after a delay (3 seconds)
            setTimeout(function () {
                window.location.href = 'index.html'; // Change 'index.html' to your desired page
            }, 3000); // 3-second delay
        });
    });
});
