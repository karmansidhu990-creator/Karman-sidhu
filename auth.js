/* ==========================================================================
   EcoRoute — auth pages (login / signup)
   UI-only: validates input and redirects to the dashboard. There is no
   real authentication here — that is out of scope for the frontend and
   would be added by whoever builds the backend, if the project needs one.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const setFieldError = (input, show) => {
    input.classList.toggle('invalid', show);
    const form = input.closest('form');
    const errorEl = form?.querySelector(`.field-error[data-error-for="${input.id}"]`);
    if (errorEl) errorEl.classList.toggle('show', show);
  };

  /* ---------------- Login ---------------- */
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');

    [email, password].forEach(input => {
      input.addEventListener('input', () => setFieldError(input, false));
    });

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      if (!email.checkValidity()) { setFieldError(email, true); valid = false; }
      else setFieldError(email, false);

      if (!password.checkValidity()) { setFieldError(password, true); valid = false; }
      else setFieldError(password, false);

      if (valid) window.location.href = 'dashboard.html';
    });
  }

  /* ---------------- Sign up ---------------- */
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    const name = document.getElementById('signupName');
    const email = document.getElementById('signupEmail');
    const password = document.getElementById('signupPassword');
    const confirm = document.getElementById('signupConfirm');
    const terms = document.getElementById('agreeTerms');

    [name, email, password, confirm].forEach(input => {
      input.addEventListener('input', () => setFieldError(input, false));
    });

    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      if (!name.checkValidity()) { setFieldError(name, true); valid = false; }
      else setFieldError(name, false);

      if (!email.checkValidity()) { setFieldError(email, true); valid = false; }
      else setFieldError(email, false);

      if (!password.checkValidity()) { setFieldError(password, true); valid = false; }
      else setFieldError(password, false);

      if (!confirm.value || confirm.value !== password.value) {
        setFieldError(confirm, true);
        valid = false;
      } else {
        setFieldError(confirm, false);
      }

      const termsError = signupForm.querySelector('.field-error[data-error-for="agreeTerms"]');
      if (!terms.checked) {
        termsError?.classList.add('show');
        valid = false;
      } else {
        termsError?.classList.remove('show');
      }

      if (valid) window.location.href = 'dashboard.html';
    });
  }

});
