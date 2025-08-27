// Videos array is now passed from Django template
let currentVideo = 0;

function openReels(index) {
    currentVideo = index;
    const modal = document.getElementById('reelsModal');
    const container = document.getElementById('reelsContainer');
    
    container.innerHTML = '';
    
    videos.forEach((video, i) => {
        const videoDiv = document.createElement('div');
        videoDiv.style.cssText = `
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            scroll-snap-align: start;
            background: black;
        `;
        
        videoDiv.innerHTML = `
            <video 
                style="width: 100%; height: 100%; object-fit: contain;" 
                ${i === index ? 'autoplay' : ''} 
                loop 
                muted
                id="video-${i}"
            >
                <source src="${video.src}" type="video/mp4">
            </video>
            <div style="position: absolute; bottom: 20px; left: 20px; color: white; font-size: 18px; font-weight: bold;">
                ${video.title}
            </div>
            <div style="position: absolute; right: 20px; bottom: 100px; display: flex; flex-direction: column; gap: 15px;">
                <button onclick="togglePlay(${i})" id="playBtn-${i}" style="background: rgba(0,0,0,0.5); border: none; color: white; width: 50px; height: 50px; border-radius: 50%; font-size: 20px; cursor: pointer;">⏸️</button>
                <button onclick="toggleMute(${i})" id="muteBtn-${i}" style="background: rgba(0,0,0,0.5); border: none; color: white; width: 50px; height: 50px; border-radius: 50%; font-size: 20px; cursor: pointer;">🔇</button>
            </div>
        `;
        
        container.appendChild(videoDiv);
    });
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        container.scrollTo({
            top: index * window.innerHeight,
            behavior: 'smooth'
        });
    }, 100);
}

document.getElementById('closeReels').onclick = function() {
    document.getElementById('reelsModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    
    const videos = document.querySelectorAll('#reelsContainer video');
    videos.forEach(video => video.pause());
};

document.getElementById('reelsContainer').addEventListener('scroll', function() {
    const videos = this.querySelectorAll('video');
    const scrollTop = this.scrollTop;
    const viewHeight = window.innerHeight;
    
    videos.forEach((video, index) => {
        const videoTop = index * viewHeight;
        const videoBottom = videoTop + viewHeight;
        
        if (scrollTop >= videoTop - viewHeight/2 && scrollTop < videoBottom - viewHeight/2) {
            video.play();
        } else {
            video.pause();
        }
    });
});

function togglePlay(index) {
    const video = document.getElementById(`video-${index}`);
    const btn = document.getElementById(`playBtn-${index}`);
    
    if (video.paused) {
        video.play();
        btn.innerHTML = '⏸️';
    } else {
        video.pause();
        btn.innerHTML = '▶️';
    }
}

function toggleMute(index) {
    const video = document.getElementById(`video-${index}`);
    const btn = document.getElementById(`muteBtn-${index}`);
    
    if (video.muted) {
        video.muted = false;
        btn.innerHTML = '🔊';
    } else {
        video.muted = true;
        btn.innerHTML = '🔇';
    }
}

function hoverPlay(element) {
    const video = element.querySelector('video');
    if (video) {
        video.play().catch(e => {
            console.log('Video play failed:', e);
        });
    }
}

function hoverPause(element) {
    const video = element.querySelector('video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
}

function toggleThumbnailMute(button) {
    const video = button.closest('.video-pinterest-item').querySelector('video');
    
    if (video.muted) {
        video.muted = false;
        button.innerHTML = '🔊';
    } else {
        video.muted = true;
        button.innerHTML = '🔇';
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('reelsModal');
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        const videos = document.querySelectorAll('#reelsContainer video');
        videos.forEach(video => video.pause());
    }
};