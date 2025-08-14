document.addEventListener('DOMContentLoaded', function() {
    
    const modal = document.querySelector('.modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.querySelector('.caption');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const images = Array.from(document.querySelectorAll('.gallery img'));
    const body = document.body;
    
    let currentIndex = 0;
    let scrollPosition = 0;
    
    
    function disableScroll() {
        scrollPosition = window.pageYOffset;
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.width = '100%';
        body.style.top = `-${scrollPosition}px`;
    }
    
    function enableScroll() {
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
        body.style.top = '';
        window.scrollTo(0, scrollPosition);
    }
    
    function openModal(index) {
        currentIndex = index;
        modal.style.display = 'block';
        modalImg.src = images[currentIndex].src;
        captionText.textContent = images[currentIndex].alt;
        disableScroll();
        
        
        const windowHeight = window.innerHeight * 0.9;
        const img = new Image();
        img.onload = function() {
            const ratio = img.width / img.height;
            modalImg.style.height = `${windowHeight}px`;
            modalImg.style.width = `${windowHeight * ratio}px`;
        };
        img.src = images[currentIndex].src;
    }
    
    function closeModal() {
        modal.style.display = 'none';
        enableScroll();
    }
    
    function navigate(direction) {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        modalImg.src = images[currentIndex].src;
        captionText.textContent = images[currentIndex].alt;
        
        
        const windowHeight = window.innerHeight * 0.9;
        const img = new Image();
        img.onload = function() {
            const ratio = img.width / img.height;
            modalImg.style.height = `${windowHeight}px`;
            modalImg.style.width = `${windowHeight * ratio}px`;
        };
        img.src = images[currentIndex].src;
    }
    
    
    images.forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
    });
    
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));
    
    
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        }
    });
    
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    
    window.addEventListener('resize', () => {
        if (modal.style.display === 'block') {
            const windowHeight = window.innerHeight * 0.9;
            const img = new Image();
            img.onload = function() {
                const ratio = img.width / img.height;
                modalImg.style.height = `${windowHeight}px`;
                modalImg.style.width = `${windowHeight * ratio}px`;
            };
            img.src = images[currentIndex].src;
        }
    });
});