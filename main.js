// Staggered animation for content buttons
document.querySelectorAll('.content-list button').forEach((btn, index) => {
    btn.style.opacity = '0';
    btn.style.transform = 'translateY(10px)';
    setTimeout(() => {
      btn.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      btn.style.opacity = '1';
      btn.style.transform = 'translateY(0)';
    }, index * 100);
  });