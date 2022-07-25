class StaticNoisePainter {
  // inputProperties returns a list of CSS properties that this paint function gets access to
  static get inputProperties() { return ['--staticnoise-size']; }

  paint(ctx, geom, properties) {
    // Paint worklet uses CSS Typed OM to model the input values.
    // As of now, they are mostly wrappers around strings,
    // but will be augmented to hold more accessible data over time.
    const size = parseInt(properties.get('--staticnoise-size').toString());
    for (let y = 0; y < geom.height / size; y++) {
      for (let x = 0; x < geom.width / size; x++) {
        const getRandomColor = () => ((255 * Math.random()) | 0) << 24;
        const r = getRandomColor(),
          b = getRandomColor(),
          g = getRandomColor();
        // grayscale
        const avg = (r + b + g) / 3;
        ctx.fillStyle = `rgba(${avg}, ${avg}, ${avg}, .8)`;
        ctx.beginPath();
        ctx.rect(x * size, y * size, size, size);
        ctx.fill();
      }
    }
  }
}

registerPaint('staticnoise', StaticNoisePainter);
