import { useEffect, useRef } from 'react';
import { usePowerMode } from '../contexts/PowerModeContext';

interface Shape3D {
  type: 'cube' | 'octahedron' | 'ring' | 'tetrahedron';
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  rx: number;
  ry: number;
  rz: number;
  vrx: number;
  vry: number;
  vrz: number;
  colorType: 'primary' | 'secondary';
}

function rotatePoint(
  x: number, y: number, z: number,
  rx: number, ry: number, rz: number
): [number, number, number] {
  const cosX = Math.cos(rx), sinX = Math.sin(rx);
  const y1 = y * cosX - z * sinX;
  const z1 = y * sinX + z * cosX;

  const cosY = Math.cos(ry), sinY = Math.sin(ry);
  const x2 = x * cosY + z1 * sinY;
  const z2 = -x * sinY + z1 * cosY;

  const cosZ = Math.cos(rz), sinZ = Math.sin(rz);
  const x3 = x2 * cosZ - y1 * sinZ;
  const y3 = x2 * sinZ + y1 * cosZ;

  return [x3, y3, z2];
}

const CUBE_VERTICES: [number, number, number][] = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1],
];
const CUBE_EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

const OCTA_VERTICES: [number, number, number][] = [
  [0, -1.4, 0], [0, 1.4, 0],
  [-1, 0, 0], [1, 0, 0], [0, 0, -1], [0, 0, 1],
];
const OCTA_EDGES: [number, number][] = [
  [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 2], [1, 3], [1, 4], [1, 5],
  [2, 4], [4, 3], [3, 5], [5, 2],
];

const TETRA_VERTICES: [number, number, number][] = [
  [1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1],
];
const TETRA_EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [1, 2], [2, 3], [3, 1],
];

const RING_VERTICES: [number, number, number][] = [];
const RING_EDGES: [number, number][] = [];
const SEGMENTS = 14;
for (let i = 0; i < SEGMENTS; i++) {
  const theta = (i / SEGMENTS) * Math.PI * 2;
  RING_VERTICES.push([Math.cos(theta) * 1.25, 0, Math.sin(theta) * 1.25]);
  RING_EDGES.push([i, (i + 1) % SEGMENTS]);
}
RING_VERTICES.push([0, -0.7, 0], [0, 0.7, 0]);
RING_EDGES.push([SEGMENTS, SEGMENTS + 1]);

export function CyberBackground3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { powerSaving } = usePowerMode();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, pixelX: -1000, pixelY: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) - 0.5;
      mouseRef.current.pixelX = e.clientX;
      mouseRef.current.pixelY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
    };
    window.addEventListener('resize', handleResize);

    // 3D Terrain grid configuration
    const cols = 36;
    const rows = 26;
    const xSpacing = 65;
    const zSpacing = 55;

    // Floating 3D Shapes
    const floatingShapes: Shape3D[] = [
      { type: 'cube',        x: -380, y: -160, z: 280, vx: 0.15, vy: 0.08, size: 48, rx: 0.2, ry: 0.5, rz: 0.1, vrx: 0.008, vry: 0.012, vrz: 0.006, colorType: 'primary' },
      { type: 'octahedron',  x:  360, y: -220, z: 340, vx: -0.12, vy: 0.05, size: 52, rx: 0.4, ry: 0.2, rz: 0.5, vrx: 0.010, vry: 0.014, vrz: 0.008, colorType: 'secondary' },
      { type: 'ring',        x:  180, y: -90,  z: 160, vx: 0.10, vy: -0.06, size: 42, rx: 0.8, ry: 0.1, rz: 0.3, vrx: 0.006, vry: 0.016, vrz: 0.010, colorType: 'primary' },
      { type: 'tetrahedron', x: -220, y: -260, z: 420, vx: -0.08, vy: 0.07, size: 46, rx: 0.3, ry: 0.6, rz: 0.2, vrx: 0.012, vry: 0.009, vrz: 0.011, colorType: 'secondary' },
      { type: 'cube',        x:  460, y:  60,  z: 220, vx: -0.14, vy: -0.05, size: 38, rx: 0.5, ry: 0.3, rz: 0.7, vrx: 0.009, vry: 0.011, vrz: 0.007, colorType: 'primary' },
      { type: 'octahedron',  x: -480, y:  80,  z: 380, vx: 0.11, vy: -0.08, size: 44, rx: 0.1, ry: 0.7, rz: 0.4, vrx: 0.011, vry: 0.013, vrz: 0.009, colorType: 'secondary' },
    ];

    let time = 0;

    const render = () => {
      // Scale for HiDPI
      ctx.save();
      ctx.scale(dpr, dpr);

      const displayW = width / dpr;
      const displayH = height / dpr;

      ctx.clearRect(0, 0, displayW, displayH);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const mousePixX = mouseRef.current.pixelX;
      const mousePixY = mouseRef.current.pixelY;

      // Dynamic theme colors
      const styles = getComputedStyle(document.documentElement);
      const primaryGlow = styles.getPropertyValue('--primary-glow').trim() || '6, 182, 212';
      const secondaryGlow = styles.getPropertyValue('--secondary-glow').trim() || '168, 85, 247';

      time += 0.02;

      // 3D Camera / Perspective settings
      const fov = 480;
      const camY = 220 + mouseY * 120; // camera height looking down at the undulating wave grid
      const horizonY = displayH * 0.52;
      const centerX = displayW * 0.5 + mouseX * 60;

      // 1. COMPUTE 3D WAVE TERRAIN GRID
      const gridPoints: Array<Array<{ sx: number; sy: number; depth: number; alpha: number; wx: number; wy: number }>> = [];

      for (let r = 0; r < rows; r++) {
        const rowArr: Array<{ sx: number; sy: number; depth: number; alpha: number; wx: number; wy: number }> = [];
        const worldZ = 80 + r * zSpacing;

        for (let c = 0; c < cols; c++) {
          const worldX = (c - cols / 2) * xSpacing;

          // Undulating 3D Wave Formula
          const wave1 = Math.sin(c * 0.28 + time * 0.8) * Math.cos(r * 0.22 + time * 0.6) * 38;
          const wave2 = Math.sin((c + r) * 0.18 - time * 0.9) * 22;
          const wave3 = Math.cos(c * 0.12 - time * 0.4) * 16;
          let worldY = wave1 + wave2 + wave3;

          // Project to Screen
          const depth = fov + worldZ;
          const scale = fov / Math.max(20, depth);
          const screenX = centerX + worldX * scale;
          const screenY = horizonY + (worldY + camY) * scale;

          // Interactive ripple deformation from mouse
          const distToMouse = Math.hypot(screenX - mousePixX, screenY - mousePixY);
          if (distToMouse < 220) {
            const ripple = Math.sin(distToMouse * 0.06 - time * 3.5) * (1 - distToMouse / 220) * 45;
            worldY -= ripple;
          }

          // Recalculate screen position with ripple
          const finalScreenX = centerX + worldX * scale;
          const finalScreenY = horizonY + (worldY + camY) * scale;

          // Distance fading towards horizon
          const distanceRatio = r / rows;
          const alpha = Math.max(0.04, Math.min(0.65, (1 - distanceRatio * 0.75) * 0.6));

          rowArr.push({
            sx: finalScreenX,
            sy: finalScreenY,
            depth: worldZ,
            alpha,
            wx: worldX,
            wy: worldY
          });
        }
        gridPoints.push(rowArr);
      }

      // 2. DRAW 3D TERRAIN LATERAL & LONGITUDINAL LINES
      // Draw rows (horizontal wave lines)
      for (let r = 0; r < rows; r++) {
        const row = gridPoints[r];
        const isSecondaryRow = r % 4 === 0;
        const color = isSecondaryRow ? secondaryGlow : primaryGlow;
        const rowAlpha = row[0].alpha;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(${color}, ${rowAlpha * (isSecondaryRow ? 0.7 : 0.45)})`;
        ctx.lineWidth = Math.max(0.7, 1.8 * (1 - r / rows));

        for (let c = 0; c < cols; c++) {
          const pt = row[c];
          if (c === 0) ctx.moveTo(pt.sx, pt.sy);
          else ctx.lineTo(pt.sx, pt.sy);
        }
        ctx.stroke();
      }

      // Draw columns (perspective lines reaching into depth)
      for (let c = 0; c < cols; c += 2) {
        ctx.beginPath();
        const colAlpha = gridPoints[0][c].alpha * 0.4;
        ctx.strokeStyle = `rgba(${primaryGlow}, ${colAlpha})`;
        ctx.lineWidth = 0.8;

        for (let r = 0; r < rows; r++) {
          const pt = gridPoints[r][c];
          if (r === 0) ctx.moveTo(pt.sx, pt.sy);
          else ctx.lineTo(pt.sx, pt.sy);
        }
        ctx.stroke();
      }

      // Draw glowing intersection beads on front waves
      for (let r = 0; r < Math.min(12, rows); r += 2) {
        for (let c = 0; c < cols; c += 3) {
          const pt = gridPoints[r][c];
          const beadAlpha = pt.alpha * 0.9;
          ctx.beginPath();
          ctx.arc(pt.sx, pt.sy, Math.max(1, 2.2 * (1 - r / rows)), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${primaryGlow}, ${beadAlpha})`;
          ctx.shadowColor = `rgba(${primaryGlow}, 0.8)`;
          ctx.shadowBlur = 8;
          ctx.fill();
        }
      }
      ctx.shadowBlur = 0;

      // 3. DRAW FLOATING 3D POLYHEDRA & CYBER CRYSTALS
      floatingShapes.forEach((shape) => {
        if (!powerSaving) {
          shape.rx += shape.vrx;
          shape.ry += shape.vry;
          shape.rz += shape.vrz;
          shape.x += shape.vx;
          shape.y += shape.vy;

          // Bounds bounce
          if (shape.x > displayW * 0.55 || shape.x < -displayW * 0.55) shape.vx *= -1;
          if (shape.y > displayH * 0.35 || shape.y < -displayH * 0.45) shape.vy *= -1;
        }

        // Camera tilt to shape world pos
        const worldX = shape.x + mouseX * 80;
        const worldY = shape.y + mouseY * 60;
        const worldZ = shape.z;

        const depth = fov + worldZ;
        const scale = fov / Math.max(30, depth);
        const screenCenterX = centerX + worldX * scale;
        const screenCenterY = (displayH * 0.38) + worldY * scale;

        const color = shape.colorType === 'primary' ? primaryGlow : secondaryGlow;

        // Proximity to mouse
        const distToMouse = Math.hypot(screenCenterX - mousePixX, screenCenterY - mousePixY);
        const isNearMouse = distToMouse < 200;
        const hoverBoost = isNearMouse ? (1 - distToMouse / 200) * 0.5 : 0;

        let vertices = CUBE_VERTICES;
        let edges = CUBE_EDGES;
        if (shape.type === 'octahedron') {
          vertices = OCTA_VERTICES;
          edges = OCTA_EDGES;
        } else if (shape.type === 'tetrahedron') {
          vertices = TETRA_VERTICES;
          edges = TETRA_EDGES;
        } else if (shape.type === 'ring') {
          vertices = RING_VERTICES;
          edges = RING_EDGES;
        }

        // Project 3D rotated vertices
        const projected: Array<[number, number]> = vertices.map(([vx, vy, vz]) => {
          const [rx, ry, rz] = rotatePoint(vx * shape.size, vy * shape.size, vz * shape.size, shape.rx, shape.ry, shape.rz);
          const px = screenCenterX + rx * scale;
          const py = screenCenterY + ry * scale;
          return [px, py];
        });

        const shapeAlpha = Math.min(0.85, 0.35 + hoverBoost);

        // Draw laser tether to mouse if close
        if (isNearMouse && !powerSaving) {
          ctx.beginPath();
          ctx.moveTo(screenCenterX, screenCenterY);
          ctx.lineTo(mousePixX, mousePixY);
          ctx.strokeStyle = `rgba(${color}, ${0.3 * (1 - distToMouse / 200)})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Draw edges
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${color}, ${shapeAlpha})`;
        ctx.lineWidth = Math.max(1, 1.8 * scale + (isNearMouse ? 0.6 : 0));
        ctx.shadowColor = `rgba(${color}, 0.8)`;
        ctx.shadowBlur = isNearMouse ? 16 : 8;

        edges.forEach(([i1, i2]) => {
          const p1 = projected[i1];
          const p2 = projected[i2];
          if (p1 && p2) {
            ctx.moveTo(p1[0], p1[1]);
            ctx.lineTo(p2[0], p2[1]);
          }
        });
        ctx.stroke();

        // Draw glowing vertex nodes
        projected.forEach(([px, py]) => {
          ctx.beginPath();
          ctx.arc(px, py, Math.max(1.2, 2.4 * scale), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${Math.min(1, shapeAlpha * 1.5)})`;
          ctx.fill();
        });

        ctx.restore();
      });

      ctx.restore();

      if (!powerSaving) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [powerSaving]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none mix-blend-screen"
      style={{ opacity: 0.9 }}
    />
  );
}
