(() => {
  // Abstract optical sculpture, not a scientific diagram or experimental data.
  const canvas = document.querySelector('[data-science-field]');
  const context = canvas?.getContext('2d');
  if (!context) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const rings = [];
  for (let j = 0; j < 104; j++) {
    const v = j / 104 * Math.PI * 2;
    const points = [];
    for (let i = 0; i <= 240; i++) {
      const u = i / 240 * Math.PI * 2;
      const radius = 1.65 + 0.57 * Math.cos(v);
      const twist = v + 0.65 * Math.sin(u * 2);
      points.push([
        (radius + 0.19 * Math.cos(u * 3 + v)) * Math.cos(u),
        (radius + 0.19 * Math.cos(u * 3 + v)) * Math.sin(u),
        0.57 * Math.sin(twist) + 0.28 * Math.sin(u * 2),
      ]);
    }
    rings.push(points);
  }
  let width = 0, height = 0, frame = 0, visible = true, last = 0;
  const draw = (time = 0) => {
    context.clearRect(0, 0, width, height);
    const mobile = width < 781;
    const scale = mobile ? width * 0.31 : Math.min(width * 0.225, height * 0.47);
    const centerX = width * (mobile ? 0.93 : 0.81);
    const centerY = height * (mobile ? 0.54 : 0.48);
    const angle = -0.62 + (motion.matches ? 0 : Math.sin(time / 18000) * 0.045);
    const ca = Math.cos(angle), sa = Math.sin(angle);
    const tilt = 1.04;
    const ct = Math.cos(tilt), st = Math.sin(tilt);
    const glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, scale * 2.6);
    glow.addColorStop(0, '#afd9d211');
    glow.addColorStop(0.55, '#72bbc80c');
    glow.addColorStop(1, '#72bbc800');
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);
    const projected = rings.map((points, index) => {
      let depth = 0;
      const vertices = points.map(([x, y, z]) => {
        const yy = y * ct - z * st;
        const zz = y * st + z * ct;
        depth += zz;
        const xx = x * ca - yy * sa;
        const y2 = x * sa + yy * ca;
        const perspective = 4.8 / (4.8 - zz * 0.3);
        return [centerX + xx * scale * perspective, centerY + y2 * scale * perspective];
      });
      return { vertices, depth: depth / points.length, index };
    }).sort((a, b) => a.depth - b.depth);
    for (const ring of projected) {
      const brightness = 0.22 + (ring.depth + 0.7) * 0.32;
      const warm = Math.sin(ring.index / 104 * Math.PI * 2) > 0.65;
      context.strokeStyle = warm ? `rgba(231,220,191,${brightness})` : `rgba(156,213,220,${brightness})`;
      context.lineWidth = ring.index % 13 === 0 ? 1.05 : 0.65;
      context.beginPath();
      ring.vertices.forEach(([x, y], index) => index ? context.lineTo(x, y) : context.moveTo(x, y));
      context.stroke();
    }
  };
  const tick = time => {
    if (!visible || document.hidden || motion.matches) { frame = 0; return; }
    if (time - last > 48) { draw(time); last = time; }
    frame = requestAnimationFrame(tick);
  };
  const start = () => {
    if (visible && !document.hidden && !motion.matches && !frame) frame = requestAnimationFrame(tick);
  };
  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
    start();
  };
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); }).observe(canvas);
  document.addEventListener('visibilitychange', start);
  motion.addEventListener('change', () => { draw(); start(); });
  resize();
})();
