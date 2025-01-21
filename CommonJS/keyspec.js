document.addEventListener('DOMContentLoaded', () => {
    const carouselContainers = document.querySelectorAll('.iso-carousel');
    carouselContainers.forEach(container => {
        new IsoCarousel(container);
    });
});

class IsoCarousel {
    constructor(container) {
        this.container = container;
        this.wrapper = container.querySelector('.iso-swiper-wrapper');
        this.slides = Array.from(container.querySelectorAll('.iso-swiper-slide'));
        this.pagination = container.querySelector('.iso-swiper-pagination');
        
        // Generate a unique ID for this carousel instance
        this.id = 'carousel-' + Math.random().toString(36).substr(2, 9);
        this.container.setAttribute('data-carousel-id', this.id);
        
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        this.isAnimating = false;
        this.isMobile = window.innerWidth <= 768;
        
        this.init();
    }
    
    init() {
        // Create pagination bullets
        this.createPagination();
        
        // Initial positioning
        this.updateSlidePositions();
        
        // Set up autoplay
        this.startAutoplay();
        
        // Add event listeners
        this.addEventListeners();
        
        // Add resize handler
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 768;
            this.updateSlidePositions();
        });
    }
    
    updateSlidePositions() {
        const slideWidth = this.isMobile ? this.container.offsetWidth : 280;
        const slideSpacing = this.isMobile ? 0 : 20;
        this.wrapper.style.transform = `translateX(-${this.currentIndex * (slideWidth + slideSpacing)}px)`;
    }
    
    createPagination() {
        this.bullets = [];
        this.pagination.innerHTML = ''; // Clear existing bullets
        
        for (let i = 0; i < this.slideCount; i++) {
            const bullet = document.createElement('div');
            bullet.className = `iso-pagination-bullet${i === 0 ? ' iso-pagination-bullet-active' : ''}`;
            bullet.setAttribute('data-carousel-id', this.id);
            bullet.addEventListener('click', () => this.goToSlide(i));
            this.pagination.appendChild(bullet);
            this.bullets.push(bullet);
        }
    }
    
    addEventListeners() {
        let startX = 0;
        let currentX = 0;
        
        const touchStart = (e) => {
            this.stopAutoplay();
            startX = e.touches ? e.touches[0].clientX : e.clientX;
            currentX = startX;
            this.wrapper.style.transition = 'none';
        };
        
        const touchMove = (e) => {
            if (this.isAnimating) return;
            currentX = e.touches ? e.touches[0].clientX : e.clientX;
            const diff = currentX - startX;
            const slideWidth = this.isMobile ? this.container.offsetWidth : 280;
            const slideSpacing = this.isMobile ? 0 : 20;
            const transform = -(this.currentIndex * (slideWidth + slideSpacing)) + diff;
            this.wrapper.style.transform = `translateX(${transform}px)`;
        };
        
        const touchEnd = () => {
            const diff = currentX - startX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) this.prev();
                else this.next();
            } else {
                this.goToSlide(this.currentIndex);
            }
            this.startAutoplay();
        };
        
        // Touch events
        this.wrapper.addEventListener('touchstart', touchStart);
        this.wrapper.addEventListener('touchmove', touchMove);
        this.wrapper.addEventListener('touchend', touchEnd);
        
        // Mouse events
        this.wrapper.addEventListener('mousedown', (e) => {
            e.preventDefault();
            touchStart(e);
            
            const mouseMoveHandler = (e) => {
                touchMove(e);
            };
            
            const mouseUpHandler = () => {
                touchEnd();
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            };
            
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        });
        
        // Mouse enter/leave for autoplay
        this.wrapper.addEventListener('mouseenter', () => this.stopAutoplay());
        this.wrapper.addEventListener('mouseleave', () => this.startAutoplay());
    }
    
    goToSlide(index, animate = true) {
        if (this.isAnimating || index < 0 || index >= this.slideCount) return;
        
        this.isAnimating = true;
        this.currentIndex = index;
        
        // Update pagination
        this.bullets.forEach((bullet, i) => {
            bullet.classList.toggle('iso-pagination-bullet-active', i === index);
        });
        
        // Calculate slide width based on viewport
        const slideWidth = this.isMobile ? this.container.offsetWidth : 280;
        const slideSpacing = this.isMobile ? 0 : 20;
        
        // Move wrapper
        const transform = -(index * (slideWidth + slideSpacing));
        this.wrapper.style.transition = animate ? 'transform 0.3s ease-out' : 'none';
        this.wrapper.style.transform = `translateX(${transform}px)`;
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 300);
    }
    
    next() {
        if (this.currentIndex < this.slideCount - 1) {
            this.goToSlide(this.currentIndex + 1);
        }
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.goToSlide(this.currentIndex - 1);
        }
    }
    
    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            if (this.currentIndex < this.slideCount - 1) {
                this.next();
            } else {
                this.goToSlide(0);
            }
        }, 5000);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}