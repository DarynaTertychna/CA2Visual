document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('navbarNav');

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (window.getComputedStyle(document.querySelector('.navbar-toggler')).display !== 'none') {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
      }
    });
  });
});




// window.addEventListener("scroll", function () {
//     let scrollPos = window.scrollY;
//     let maxScroll = document.body.scrollHeight - window.innerHeight;

//     let percent = scrollPos / maxScroll;
//     percent = Math.min(Math.max(percent, 0), 1);


//     let r = Math.round(245 + (1 - 245) * percent);
//     let g = Math.round(245 + (50 - 245) * percent);
//     let b = Math.round(220 + (32 - 220) * percent);

//     document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
// });
