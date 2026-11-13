// Per Care and Training Academy - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }

  // Close dropdowns / menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navMenu) {
      navMenu.classList.remove('show');
    }
  });

  // Form validation and error handling
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      // Clear previous errors
      form.querySelectorAll('.error').forEach(err => err.classList.remove('show'));
      form.querySelectorAll('input, select, textarea').forEach(field => {
        field.style.borderColor = '';
      });

      // Validate required fields
      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        const errorEl = field.parentElement.querySelector('.error') || 
                        field.nextElementSibling;
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#dc3545';
          if (errorEl && errorEl.classList.contains('error')) {
            errorEl.textContent = 'This field is required.';
            errorEl.classList.add('show');
          }
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
          isValid = false;
          field.style.borderColor = '#dc3545';
          if (errorEl && errorEl.classList.contains('error')) {
            errorEl.textContent = 'Please enter a valid email address.';
            errorEl.classList.add('show');
          }
        }
      });

      // Password match check for signup
      const password = form.querySelector('#password');
      const confirmPassword = form.querySelector('#confirm-password');
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        isValid = false;
        confirmPassword.style.borderColor = '#dc3545';
        const errorEl = confirmPassword.parentElement.querySelector('.error');
        if (errorEl) {
          errorEl.textContent = 'Passwords do not match.';
          errorEl.classList.add('show');
        }
      }

      if (isValid) {
        // Show success message and simulate submission
        const successMsg = form.querySelector('.success-message') || 
                           document.createElement('div');
        if (!form.querySelector('.success-message')) {
          successMsg.className = 'success-message';
          successMsg.textContent = 'Form submitted successfully! Redirecting...';
          form.prepend(successMsg);
        }
        successMsg.style.display = 'block';

        // Simulate processing
        setTimeout(() => {
          if (form.id === 'login-form') {
            window.location.href = 'my-courses.html';
          } else if (form.id === 'signup-form') {
            window.location.href = 'login.html';
          } else if (form.id === 'enroll-form') {
            alert('Enrollment request submitted successfully!');
            form.reset();
            successMsg.style.display = 'none';
          } else {
            form.reset();
            successMsg.style.display = 'none';
          }
        }, 1500);
      }
    });
  });

  // Simple email validation
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Active nav link highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Table row click (if any interactive tables)
  document.querySelectorAll('table tbody tr').forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', () => {
      const courseName = row.cells[0]?.textContent;
      if (courseName) {
        console.log('Selected:', courseName);
        // Could navigate to course details
      }
    });
  });
});

// Utility: show notification
function showNotification(message, type = 'info') {
  const notif = document.createElement('div');
  notif.className = `alert alert-${type}`;
  notif.textContent = message;
  notif.style.position = 'fixed';
  notif.style.top = '80px';
  notif.style.right = '20px';
  notif.style.zIndex = '9999';
  notif.style.minWidth = '250px';
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
}
