// 图片放大功能
document.addEventListener('DOMContentLoaded', function() {
    // 创建模态框（如果还不存在）
    let modal = document.querySelector('.modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal';
        document.body.appendChild(modal);
    }
    const playButton = document.getElementById('play-button');
    
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.muted = false;
// Add an event listener to the button to play/pause the audio
    playButton.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();  // Play the audio
            playButton.textContent = 'Pause Audio';  // Change button text to 'Pause'
        } else {
            audioPlayer.pause();  // Pause the audio
            playButton.textContent = 'Play Audio';  // Change button text back to 'Play'
        }
    });
    // 为所有可点击图片添加点击事件
    const allImages = document.querySelectorAll('.gallery-item img, .timeline-item img, .profile-card img, .profile-extra-image img, .carousel-item img');
    
    allImages.forEach(img => {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function() {
            modal.innerHTML = `
                <span class="close-modal">&times;</span>
                <img src="${this.src}" alt="${this.alt}">
            `;
            modal.style.display = 'flex';
        });
    });

    // 为照片集添加点击事件
    const galleryCategories = document.querySelectorAll('.gallery-category');
    galleryCategories.forEach((category, index) => {
        // 阻止点击事件冒泡，避免触发图片预览
        category.addEventListener('click', function(e) {
            e.stopPropagation();
            const galleryType = this.querySelector('img').alt.split(' ')[1].toLowerCase();
            if (fashionGalleries[galleryType]) {
                currentGallery = fashionGalleries[galleryType];
                currentIndex = 0;
                showGalleryImage(currentIndex);
                document.querySelector('.gallery-modal').style.display = 'flex';
            }
        });
    });

    function showGalleryImage(index) {
        const content = document.querySelector('.gallery-content');
        content.innerHTML = `<img src="${currentGallery[index]}" alt="Gallery Photo">`;
    }

    // 点击模态框关闭
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal') || e.target.classList.contains('close-modal')) {
            modal.style.display = 'none';
        }
    });

    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });

    // 为照片墙的图片添加点击事件
    const photoWallImages = document.querySelectorAll('.photo-item img, .fashion-gallery img, .stage-moment-card img');
    
    photoWallImages.forEach(img => {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function() {
            modal.innerHTML = `
                <span class="close-modal">&times;</span>
                <img src="${this.src}" alt="${this.alt}">
            `;
            modal.style.display = 'flex';
        });
    });
    
    // 点击模态框背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-close')) {
            modal.style.display = 'none';
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
});

// 初始化所有轮播
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => new Carousel(carousel));
});

// 轮播功能
class Carousel {
    constructor(element) {
        this.element = element;
        this.items = element.querySelectorAll('.carousel-item');
        this.totalItems = this.items.length;
        this.currentIndex = 0;

        this.init();
    }

    init() {
        this.element.innerHTML += `
            <div class="carousel-dots"></div>
        `;

        // 创建导航点
        const dotsContainer = this.element.querySelector('.carousel-dots');
        for (let i = 0; i < this.totalItems; i++) {
            dotsContainer.innerHTML += `<span class="dot" data-index="${i}"></span>`;
        }

        this.updateDisplay();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.updateDisplay();
    }

    updateDisplay() {
        // 更新轮播项显示
        this.items.forEach((item, index) => {
            item.style.display = index === this.currentIndex ? 'block' : 'none';
        });

        // 更新导航点
        const dots = this.element.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('heroVideo');  // 获取视频元素
    const playButton = document.getElementById('playButton');  // 获取播放按钮

    // 等待视频准备好播放（canplaythrough 表示视频完全加载）
    videoElement.addEventListener('canplaythrough', () => {
        console.log('视频已加载完毕，可以播放');

        // 给按钮添加点击事件
        playButton.addEventListener('click', () => {
            if (videoElement.paused) {
                // 如果视频是暂停的，播放视频
                videoElement.play();
                playButton.textContent = '暂停';  // 修改按钮文本为 "暂停"
            } else {
                // 如果视频是播放的，暂停视频
                videoElement.pause();
                playButton.textContent = '播放';  // 修改按钮文本为 "播放"
            }
        });
    });
});




// 更新轮播功能
function initSlideshow() {
    const slideshows = document.querySelectorAll('.carousel');
    
    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.carousel-item');
        const dots = slideshow.parentElement.querySelectorAll('.slideshow-nav button');
        let currentSlide = 0;
        let slideInterval;
        
        // 立即显示第一张图片
        slides[0].classList.add('active');
        dots[0].classList.add('active');
        
        function showSlide(n) {
            // 移除所有特殊类
            slides.forEach(slide => {
                slide.classList.remove('active', 'prev');
            });
            dots[currentSlide].classList.remove('active');
            
            // 设置当前slide的前一个为prev
            const prevIndex = currentSlide;
            currentSlide = (n + slides.length) % slides.length;
            
            if (prevIndex !== currentSlide) {
                slides[prevIndex].classList.add('prev');
            }
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // 开始自动播放
        function startSlideshow() {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
            slideInterval = setInterval(nextSlide, 3000);
        }
        
        // 暂停自动播放
        function pauseSlideshow() {
            clearInterval(slideInterval);
        }
      
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                pauseSlideshow();
                showSlide(index);
                startSlideshow();
            });
        });
        
        // 鼠标悬停时暂停，移开时继续
        slideshow.parentElement.addEventListener('mouseenter', pauseSlideshow);
        slideshow.parentElement.addEventListener('mouseleave', startSlideshow);
        
        // 立即启动自动播放
        requestAnimationFrame(() => {
            startSlideshow();
        });
    });
}

// 确保在页面加载完成后立即初始化和开始轮播
window.addEventListener('load', function() {
    initSlideshow();
    // ... 其他初始化代码 ...
});

// 图片预览功能
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector('.modal-content');
    const closeBtn = document.querySelector('.modal-close');
    const eventImages = document.querySelectorAll('.event-image');

    // 点击图片时显示预览
    eventImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        });
    });

    // 点击关闭按钮关闭预览
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // 点击modal背景关闭预览
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // ESC键关闭预览
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === "block") {
            modal.style.display = "none";
        }
    });
});

// 照片集数据
const fashionGalleries = {
    'caratland2024': [
        'images/IMG_7013.GIF',
        'images/IMG_7012.GIF'
    ],
    'followagain': [
        'images/IMG_7016.GIF'
    ],
    'caratland2023': [
        'images/IMG_7067.GIF'
    ],
    'attacca': [
        'images/IMG_7053.GIF'
    ],
    'musicbank': [
        'images/IMG_7038.GIF'
    ],
    'bethesun': [
        'images/IMG_7073.GIF'
    ],
    'aprilshower': [
        'images/IMG_7023.GIF'
    ],
    'mbcfestival': [
        'images/截屏0007-01-04 22.27.35.png'
    ],
    'paris': [
        'images/截屏0007-01-04 17.49.06.png',
        'images/截屏0007-01-04 17.49.32.png',
        'images/截屏0007-01-04 17.49.49.png',
        'images/截屏0007-01-04 17.50.14.png'
    ],
    'berlin': [
        'images/截屏0007-01-04 18.14.31.png',
        'images/截屏0007-01-04 18.14.58.png',
        'images/截屏0007-01-04 18.15.20.png',
        'images/截屏0007-01-04 18.15.32.png',
        'images/截屏0007-01-04 18.15.53.png',
        'images/截屏0007-01-04 18.16.09.png',
        'images/截屏0007-01-04 18.16.25.png',
        'images/截屏0007-01-04 18.16.37.png',
        'images/截屏0007-01-04 18.16.54.png'
    ],
    'paris2024': [
        'images/截屏0007-01-04 18.25.53.png',
        'images/截屏0007-01-04 18.26.04.png',
        'images/截屏0007-01-04 18.26.15.png',
        'images/截屏0007-01-04 18.26.26.png',
        'images/截屏0007-01-04 18.26.37.png',
        'images/截屏0007-01-04 18.26.45.png'
    ],
    'magazine1': [
        'images/IMG_7018.GIF',
        'images/IMG_7019.GIF',
        'images/截屏0007-01-04 18.45.11.png',
        'images/截屏0007-01-04 18.45.24.png',
        'images/截屏0007-01-04 18.45.34.png',
        'images/截屏0007-01-04 18.45.46.png'
    ],
    'magazine2': [
        'images/IMG_7075.GIF',
        'images/截屏0007-01-04 18.56.10.png',
        'images/截屏0007-01-04 18.56.25.png',
        'images/截屏0007-01-04 18.56.37.png',
        'images/截屏0007-01-04 18.56.54.png',
        'images/截屏0007-01-04 18.57.06.png'
    ],
    'magazine3': [
        'images/截屏0007-01-04 19.18.41.png',
        'images/截屏0007-01-04 19.18.54.png',
        'images/截屏0007-01-04 19.19.07.png'
    ],
    'brand1': [
        'images/IMG_7025.GIF',
        'images/IMG_7033.GIF',
        'images/截屏0007-01-04 19.35.48.png',
        'images/截屏0007-01-04 19.36.01.png',
        'images/截屏0007-01-04 19.36.13.png',
        'images/截屏0007-01-04 19.36.23.png',
        'images/截屏0007-01-04 19.36.34.png',
        'images/截屏0007-01-04 19.36.45.png',
        'images/截屏0007-01-04 19.36.56.png',
        'images/截屏0007-01-04 19.37.06.png',
        'images/截屏0007-01-04 19.39.11.png'
    ],
    'brand2': [
        'images/截屏0007-01-04 19.59.56.png',
        'images/截屏0007-01-04 20.00.09.png',
        'images/截屏0007-01-04 20.00.19.png',
        'images/截屏0007-01-04 20.00.58.png',
        'images/截屏0007-01-04 20.01.14.png',
        'images/截屏0007-01-04 20.01.29.png',
        'images/截屏0007-01-04 20.01.50.png',
        'images/截屏0007-01-04 20.02.02.png',
        'images/截屏0007-01-04 20.02.18.png',
        'images/截屏0007-01-04 20.02.30.png'
    ],
    'brand3': [
        'images/IMG_7015.GIF',
        'images/截屏0007-01-04 20.20.01.png',
        'images/IMG_7004.GIF',
        'images/IMG_7005.GIF',
        'images/IMG_7007.GIF',
        'images/IMG_7008.JPG'
    ]
};

// 初始化照片集功能
document.addEventListener('DOMContentLoaded', function() {
    const triggers = document.querySelectorAll('.gallery-trigger');
    const modal = document.querySelector('.gallery-modal');
    const content = document.querySelector('.gallery-content');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');
    let currentGallery = [];
    let currentIndex = 0;

    triggers.forEach((trigger, index) => {
        trigger.addEventListener('click', function() {
            // 根据触发器在页面中的位置决定使用哪个gallery
            const allKeys = ['paris', 'berlin', 'paris2024', 
                'magazine1', 'magazine2', 'magazine3',
                'brand1', 'brand2', 'brand3'];
            const galleryKey = allKeys[index];
            currentGallery = fashionGalleries[galleryKey];
            currentIndex = 0;
            showImage(currentIndex);
            modal.style.display = 'flex';
        });
    });

    function showImage(index) {
        content.innerHTML = `<img src="${currentGallery[index]}" alt="Fashion Week Photo">`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        showImage(currentIndex);
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});



const mvImages = {
    'spillthefeel': [
        'images/IMG_7010.GIF'
    ],
    'dontwannacry': [
        'images/IMG_7042.GIF'
    ],
    // ... 其他MV图片数组
};

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('heroVideo');
    if (video) {
        // 确保视频加载完成
        video.addEventListener('loadedmetadata', function() {
            // 尝试播放
            video.play().then(() => {
                // 成功播放后，1秒后取消静音
                setTimeout(() => {
                    video.muted = false;
                    video.volume = 0.3;
                }, 1000);
            }).catch(error => {
                console.log('Auto-play was prevented:', error);
                // 如果自动播放失败，添加点击事件让用户手动触发
                video.parentElement.addEventListener('click', () => {
                    video.play();
                    video.muted = false;
                    video.volume = 0.3;
                });
            });
        });

        // 处理视频错误
        video.addEventListener('error', function() {
            console.log('Video error:', video.error);
        });
    }
}); 