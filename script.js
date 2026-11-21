// ========== ميلان المشهد في الواجهة ==========
const hero = document.querySelector('.hero');
const sceneInner = document.querySelector('.scene-inner');

// نشيك إذا المستخدم مفعّل "تقليل الحركة"
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  // لما يتحرك الماوس فوق الواجهة
  hero.addEventListener('mousemove', (event) => {
    const box = hero.getBoundingClientRect();

    // مكان الماوس: من -0.5 (يسار أو فوق) إلى 0.5 (يمين أو تحت)
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;

    const rotateX = 8 - y * 16;
    const rotateY = -18 + x * 28;

    sceneInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  // لما يطلع الماوس، يرجع المشهد لميلانه الأصلي
  hero.addEventListener('mouseleave', () => {
    sceneInner.style.transform = 'rotateX(8deg) rotateY(-18deg)';
  });
}

// ========== ميلان كروت المهارات والإنجازات ==========
if (!reduceMotion) {
  const skillCards = document.querySelectorAll('.skill-group, .highlight-card');

  skillCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;

      card.style.transform = `rotateX(${-y * 10}deg) rotateY(${x * 14}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ========== تبديل المشاريع ==========
const tabs = document.querySelectorAll('.project-tab');
const infos = document.querySelectorAll('.project-info');
const screens = document.querySelectorAll('.screen');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const active = Number(tab.dataset.index);

    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    infos.forEach((info) => info.classList.remove('active'));
    infos[active].classList.add('active');

    screens.forEach((screen, i) => {
      const pos = (i - active + screens.length) % screens.length;
      screen.dataset.pos = pos;
    });
  });
});

// ========== 3D مستمر وقت النزول والطلوع ==========
const sections3d = document.querySelectorAll('.reveal');
let ticking = false;

function update3D() {
  const viewH = window.innerHeight;

  sections3d.forEach((section) => {
    const box = section.getBoundingClientRect();
    const center = box.top + box.height / 2;

    // 0 لما القسم في نص الشاشة، موجب لما يكون تحت، سالب لما يكون فوق
    let progress = (center - viewH / 2) / viewH;
    progress = Math.max(-1, Math.min(1, progress));

    const rotateX = progress * 25;
    const depth = Math.abs(progress) * -200;
    const opacity = 1 - Math.abs(progress) * 0.7;

    section.style.transform = `perspective(1200px) rotateX(${rotateX}deg) translateZ(${depth}px)`;
    section.style.opacity = opacity;
  });

  ticking = false;
}

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(update3D);
    ticking = true;
  }
}

if (!reduceMotion) {
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update3D();
}
  