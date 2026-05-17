(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // BibTeX copy button
    const btn = document.getElementById('copy-bibtex');
    const code = document.getElementById('bibtex-code');
    if (btn && code) {
      btn.addEventListener('click', async () => {
        const text = code.textContent.trim();
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
          } else {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
          }
          const label = btn.querySelector('.copy-text');
          const original = label.textContent;
          btn.classList.add('copied');
          label.textContent = 'Copied!';
          setTimeout(() => {
            btn.classList.remove('copied');
            label.textContent = original;
          }, 1600);
        } catch (err) {
          console.warn('Copy failed', err);
        }
      });
    }

    // Disable click on placeholder buttons (arXiv / Code)
    document.querySelectorAll('a.is-placeholder').forEach(a => {
      a.addEventListener('click', e => e.preventDefault());
    });

    // KaTeX: render math inline within the Algorithm card (and anywhere else
    // we sprinkle $...$). Wait for the auto-render script to land.
    const renderMath = () => {
      if (typeof window.renderMathInElement !== 'function') return false;
      const targets = [document.getElementById('algorithm-1')].filter(Boolean);
      for (const el of targets) {
        try {
          window.renderMathInElement(el, {
            delimiters: [
              { left: '$', right: '$', display: false },
              { left: '\\(', right: '\\)', display: false },
            ],
            throwOnError: false,
          });
        } catch (err) {
          console.warn('KaTeX render failed', err);
        }
      }
      return true;
    };
    if (!renderMath()) {
      // auto-render.min.js still loading — retry up to ~3s
      let tries = 0;
      const iv = setInterval(() => {
        tries += 1;
        if (renderMath() || tries > 30) clearInterval(iv);
      }, 100);
    }

    // Real-world demo videos: pause when off-screen, resume autoplay when in view.
    // Avoids CPU thrash from 12 simultaneous decoders.
    const demoVideos = document.querySelectorAll('#real-world-demos video');
    // Source clips are pre-encoded at 8x; double the playback rate to land at 16x.
    demoVideos.forEach(v => {
      const setRate = () => { v.playbackRate = 2.0; };
      setRate();
      v.addEventListener('loadedmetadata', setRate);
    });
    if (demoVideos.length && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const v = entry.target;
          if (entry.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      }, { threshold: 0.15, rootMargin: '120px 0px' });
      demoVideos.forEach(v => io.observe(v));
    }
  });
})();
