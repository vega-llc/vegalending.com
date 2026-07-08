(() => {
  const canvas = document.getElementById("heroScene");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const colors = ["#29a98b", "#d99729", "#e45c3e", "#395ccf"];
  const labels = [
    "AI-Term",
    "BallisticTracker",
    "ExpenseOnTheGo",
    "workflow",
    "operator",
    "model",
    "data",
    "ship",
  ];

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrame = 0;

  const nodes = Array.from({ length: 44 }, (_, index) => ({
    x: Math.random(),
    y: Math.random(),
    radius: 2 + Math.random() * 4,
    color: colors[index % colors.length],
    drift: 0.12 + Math.random() * 0.34,
    phase: Math.random() * Math.PI * 2,
  }));

  const panels = Array.from({ length: 9 }, (_, index) => ({
    x: Math.random(),
    y: Math.random(),
    width: 118 + Math.random() * 118,
    height: 34 + Math.random() * 54,
    color: colors[index % colors.length],
    label: labels[index % labels.length],
    phase: Math.random() * Math.PI * 2,
  }));

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.floor(bounds.width));
    height = Math.max(1, Math.floor(bounds.height));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawGrid(time) {
    context.save();
    context.globalAlpha = 0.16;
    context.strokeStyle = "#ffffff";
    context.lineWidth = 1;

    const gridSize = width < 720 ? 56 : 74;
    const offset = reduceMotion ? 0 : (time * 0.012) % gridSize;

    for (let x = -gridSize; x < width + gridSize; x += gridSize) {
      context.beginPath();
      context.moveTo(x + offset, 0);
      context.lineTo(x + offset, height);
      context.stroke();
    }

    for (let y = -gridSize; y < height + gridSize; y += gridSize) {
      context.beginPath();
      context.moveTo(0, y + offset);
      context.lineTo(width, y + offset);
      context.stroke();
    }

    context.restore();
  }

  function drawPanels(time) {
    context.save();
    context.font = "700 13px Inter, system-ui, sans-serif";
    panels.forEach((panel, index) => {
      const motion = reduceMotion ? 0 : Math.sin(time * 0.00045 + panel.phase) * 18;
      const x = panel.x * width + motion - 40;
      const y = panel.y * height + index * 4;
      const wrappedX = ((x % (width + panel.width)) + width + panel.width) % (width + panel.width) - panel.width;
      const wrappedY = ((y % (height + panel.height)) + height + panel.height) % (height + panel.height) - panel.height;

      context.globalAlpha = 0.2;
      context.fillStyle = "#ffffff";
      context.fillRect(wrappedX, wrappedY, panel.width, panel.height);
      context.globalAlpha = 0.82;
      context.fillStyle = panel.color;
      context.fillRect(wrappedX, wrappedY, 5, panel.height);
      context.globalAlpha = 0.42;
      context.fillStyle = "#ffffff";
      context.fillText(panel.label, wrappedX + 16, wrappedY + 22);
    });
    context.restore();
  }

  function drawNodes(time) {
    context.save();

    nodes.forEach((node, index) => {
      const motionX = reduceMotion ? 0 : Math.cos(time * 0.00032 * node.drift + node.phase) * 22;
      const motionY = reduceMotion ? 0 : Math.sin(time * 0.00038 * node.drift + node.phase) * 26;
      const x = node.x * width + motionX;
      const y = node.y * height + motionY;

      for (let next = index + 1; next < nodes.length; next += 1) {
        const other = nodes[next];
        const otherX = other.x * width;
        const otherY = other.y * height;
        const distance = Math.hypot(x - otherX, y - otherY);

        if (distance < 150) {
          context.globalAlpha = 0.16 * (1 - distance / 150);
          context.strokeStyle = "#ffffff";
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(otherX, otherY);
          context.stroke();
        }
      }

      context.globalAlpha = 0.82;
      context.fillStyle = node.color;
      context.beginPath();
      context.arc(x, y, node.radius, 0, Math.PI * 2);
      context.fill();
    });

    context.restore();
  }

  function draw(time = 0) {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#111614";
    context.fillRect(0, 0, width, height);

    drawGrid(time);
    drawPanels(time);
    drawNodes(time);

    if (!reduceMotion) {
      animationFrame = window.requestAnimationFrame(draw);
    }
  }

  window.addEventListener("resize", () => {
    window.cancelAnimationFrame(animationFrame);
    resize();
    draw();
    if (!reduceMotion) {
      animationFrame = window.requestAnimationFrame(draw);
    }
  });

  resize();
  draw();

  if (!reduceMotion) {
    animationFrame = window.requestAnimationFrame(draw);
  }
})();
