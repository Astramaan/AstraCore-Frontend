// squircle.js
if (typeof registerPaint !== "undefined") {
  registerPaint(
    "squircle",
    class {
      static get inputProperties() {
        return [
          "--squircle-radius",
          "--squircle-smooth",
          "--squircle-outline",
          "--squircle-fill",
          "--squircle-stroke-width",
          "--squircle-stroke-color",
        ];
      }

      paint(ctx, geom, properties) {
        const radius = properties.get("--squircle-radius").value;
        const smooth = properties.get("--squircle-smooth").value;
        const fill = properties.get("--squircle-fill")?.toString();
        const outline = properties.get("--squircle-outline")?.value;
        const strokeColor = properties.get("--squircle-stroke-color")?.toString();
        const strokeWidth = properties.get("--squircle-stroke-width")?.value;
        const { width: w, height: h } = geom;

        ctx.beginPath();
        let m = smooth * radius;
        // top left
        ctx.moveTo(0, radius);
        ctx.quadraticCurveTo(0, 0, radius, 0);

        // top right
        ctx.lineTo(w - radius, 0);
        ctx.quadraticCurveTo(w, 0, w, radius);

        // bottom right
        ctx.lineTo(w, h - radius);
        ctx.quadraticCurveTo(w, h, w - radius, h);

        // bottom left
        ctx.lineTo(radius, h);
        ctx.quadraticCurveTo(0, h, 0, h - radius);

        ctx.closePath();
        
        if (fill) {
            ctx.fillStyle = fill;
            ctx.fill();
        } else {
            ctx.fillStyle = "black";
            ctx.fill();
        }
      }
    },
  );
}