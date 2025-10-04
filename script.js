document.addEventListener('DOMContentLoaded', () => {
  const acceptBtn = document.getElementById('acceptBtn');
  const bannerCard = document.querySelector('.invite-card');
  const jumpscareWrap = document.getElementById('jumpscareWrap');
  const jumpscareVideo = document.getElementById('jumpscareVideo');
  const closeBtn = document.getElementById('closeBtn');

  acceptBtn.addEventListener('click', async () => {
    // show overlay and try to play video with audio (click = user gesture)
    jumpscareWrap.classList.add('active');
    jumpscareWrap.setAttribute('aria-hidden','false');
    try {
      await jumpscareVideo.play();
    } catch (err) {
      console.warn('Autoplay failed, muting then play', err);
      jumpscareVideo.muted = true;
      jumpscareVideo.play().catch(()=>{});
    }
    // optionally hide invite card
    bannerCard.style.display = 'none';
  });

  closeBtn.addEventListener('click', () => {
    jumpscareVideo.pause();
    jumpscareVideo.currentTime = 0;
    jumpscareWrap.classList.remove('active');
    jumpscareWrap.setAttribute('aria-hidden','true');
    bannerCard.style.display = '';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && jumpscareWrap.classList.contains('active')) {
      closeBtn.click();
    }
  });
});
