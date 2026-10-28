document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('contactForm');
  if(!form) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();
    document.querySelectorAll('.invalid-feedback').forEach(el => { el.textContent = ''; });
    document.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));
    document.getElementById('successMsg').style.display = 'none';
    document.getElementById('errorMsg').style.display = 'none';

    let valid = true;
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const phoneEl = document.getElementById('phone');

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const phone = phoneEl.value.trim();

    if(name === ''){
      document.getElementById('nameError').textContent = 'Name is required';
      nameEl.classList.add('is-invalid');
      valid = false;
    }
    if(!email.includes('@') || !email.includes('.')){
      document.getElementById('emailError').textContent = 'Enter a valid email';
      emailEl.classList.add('is-invalid');
      valid = false;
    }
    if(phone.length < 10){
      document.getElementById('phoneError').textContent = 'Enter a valid phone number';
      phoneEl.classList.add('is-invalid');
      valid = false;
    }

    if(!valid) return;

    fetch('send_message.php', { method: 'POST', body: new FormData(form) })
      .then(res => res.text())
      .then(data => {
        if(data.trim() === 'success'){
          document.getElementById('successMsg').style.display = 'inline';
          document.getElementById('errorMsg').style.display = 'none';
          form.reset();
        } else {
          document.getElementById('errorMsg').style.display = 'inline';
        }
      })
      .catch(() => {
        document.getElementById('errorMsg').style.display = 'inline';
      });
  });
});
