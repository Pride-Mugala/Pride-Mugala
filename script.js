document.addEventListener('DOMContentLoaded', function(){

  /* ---- Footer year ---- */
  const yr = document.getElementById('year');
  if(yr) yr.textContent = new Date().getFullYear();

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(elm => io.observe(elm));
  } else {
    revealEls.forEach(elm => elm.classList.add('is-visible'));
  }

  /* ---- Navbar shadow on scroll ---- */
  const nav = document.getElementById('mainNav');
  if(nav){
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 12);
    });
  }
});
