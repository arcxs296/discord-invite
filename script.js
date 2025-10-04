// script.js
document.addEventListener('DOMContentLoaded', () => {
  const acceptBtn = document.getElementById('acceptBtn');
  const declineBtn = document.getElementById('declineBtn');
  const banner = document.getElementById('cookieBanner');
  const jumpscareWrap = document.getElementById('jumpscareWrap');
  const jumpscareVideo = document.getElementById('jumpscareVideo');
  const closeBtn = document.getElementById('closeBtn');

  // Khi nhấn Accept -> hiện jumpscare
  acceptBtn.addEventListener('click', async (e) => {
    // user gesture - cho phép phát tiếng
    try {
      // hiển thị wrap
      jumpscareWrap.classList.add('active');
      jumpscareWrap.setAttribute('aria-hidden','false');
      // cố gắng play video (user clicked => browser thường cho phép âm thanh)
      await jumpscareVideo.play();
    } catch (err) {
      // nếu không play (hiếm), fallback: mở to full-screen (k có âm thanh)
      console.warn('Could not autoplay video with sound:', err);
      jumpscareVideo.muted = true;
      jumpscareVideo.play().catch(()=>{});
    }
    // ẩn banner
    banner.style.display = 'none';
  });

  // Decline chỉ ẩn banner
  declineBtn.addEventListener('click', () => {
    banner.style.display = 'none';
  });

  // Khi video kết thúc, vẫn giữ overlay để người dùng bấm close
  jumpscareVideo.addEventListener('ended', () => {
    // show close button in case it's hidden
  });

  // Close
  closeBtn.addEventListener('click', () => {
    jumpscareVideo.pause();
    jumpscareVideo.currentTime = 0;
    jumpscareWrap.classList.remove('active');
    jumpscareWrap.setAttribute('aria-hidden','true');
  });

  // ESC để tắt
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && jumpscareWrap.classList.contains('active')) {
      closeBtn.click();
    }
  });
});
