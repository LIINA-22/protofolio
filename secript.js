// نجيب العناصر اللي نحتاجها من الصفحة
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