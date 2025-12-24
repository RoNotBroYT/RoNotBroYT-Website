"use client";
import { useEffect, useRef } from "react";

export function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let snowflakes = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 2,
      d: Math.random() * 1 + 0.5,
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains("dark");
      ctx.fillStyle = isDark ? "#fff" : "#60a5fa"; // white for dark, light blue for light
      ctx.globalAlpha = 0.8;
      snowflakes.forEach(flake => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        ctx.fill();
      });
      update();
      requestAnimationFrame(draw);
    }

    function update() {
      snowflakes.forEach(flake => {
        flake.y += flake.d;
        if (flake.y > height) {
          flake.x = Math.random() * width;
          flake.y = -flake.r;
        }
      });
    }

    draw();
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 50,
      }}
    />
  );
}
