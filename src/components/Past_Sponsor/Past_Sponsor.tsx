// gallery.tsx
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useMemo } from 'react';
import './gallery.css';

interface Image {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate random positions for images beyond the first 7
  const randomPositions = useMemo(() => {
    const extraImages = images.slice(7);
    const count = extraImages.length;

    // Create a grid layout to prevent overlaps
    // For 30 images, we need roughly 5x6 or 6x6 grid
    const cols = Math.ceil(Math.sqrt(count)) + 2; // Add some padding cols
    const rows = Math.ceil(count / Math.ceil(Math.sqrt(count)));

    // Shuffle available grid positions
    const positions: Array<{ r: number; c: number }> = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        positions.push({ r, c });
      }
    }

    // Shuffle positions array (Fisher-Yates)
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    return extraImages.map((_, i) => {
      // Use assigned grid position if available, or fallback to random
      const gridPos = positions[i] || { r: Math.floor(Math.random() * rows), c: Math.floor(Math.random() * cols) };

      // Calculate strict grid position
      const cellWidth = 90 / cols; // 90vw total width (leave margins)
      const cellHeight = 90 / rows; // 90vh total height

      // Add randomness within the cell
      const jitterX = Math.random() * (cellWidth * 0.6); // 60% jitter variance
      const jitterY = Math.random() * (cellHeight * 0.6);

      const top = 5 + (gridPos.r * cellHeight) + jitterY; // Start at 5vh
      const left = 5 + (gridPos.c * cellWidth) + jitterX; // Start at 5vw

      const width = Math.floor(Math.random() * 10) + 10; // 10vw to 20vw (slightly smaller than before for density)
      return {
        position: 'absolute' as const,
        top: `${top}vh`,
        left: `${left}vw`,
        width: `${width}vw`,
        height: 'auto', // Let aspect ratio handle height, or fix it? CSS has object-fit.
        transform: 'translate(-50%, -50%)',
      };
    });
  }, [images]);

  // Smooth fade in at start (0 -> 0.1) and fade out at end (0.9 -> 1)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.1, 0.85, 0.95, 1],
    [0, 0.5, 1, 1, 0.5, 0]
  );

  // Smooth visibility - keeps element in DOM but hidden
  const display = useTransform(scrollYProgress, (value) => {
    return value <= 0 || value >= 1 ? 'none' : 'flex';
  });

  return (
    <>
      {/* Scroll trigger container */}
      <div ref={containerRef} className="zoom-parallax-container" />

      {/* Pinned/Fixed content with smooth opacity */}
      <motion.div
        className="zoom-parallax-pinned"
        style={{
          opacity,
          display,
        }}
      >
        {images.map(({ src, alt }, index) => {
          // Generate transforms dynamically based on index to create depth variation
          const scaleBase = 1; // Start at normal size (static)
          const scaleTarget = 1; // Stay normal briefly

          // Vary the final scale to create depth (some move faster/closer than others)
          // For 30+ images, we want a wider range of depths
          // range: 3x to 12x
          const scaleFinal = 3 + (index % 10);

          const scale = useTransform(
            scrollYProgress,
            [0, 0.1, 1],
            [scaleBase, scaleTarget, scaleFinal]
          );

          // Vary opacity fade-out slightly so they don't all disappear at once
          const fadeOutStart = 0.5 + (index % 8) * 0.05; // 0.5 to 0.9
          const fadeOutEnd = fadeOutStart + 0.1;

          const imageOpacity = useTransform(
            scrollYProgress,
            [0, 0.05, fadeOutStart, fadeOutEnd],
            [0, 1, 1, 0]
          );

          // For index >= 7, we use random positions generated once
          const isExtra = index >= 7;
          const extraStyle = isExtra ? randomPositions[index - 7] : {};

          return (
            <motion.div
              key={index}
              style={{
                scale,
                opacity: imageOpacity,
              }}
              className="zoom-parallax-item"
              data-index={index + 1} // CSS uses 1-based data-index for first 6 items roughly
            >
              <div
                className="zoom-parallax-image-container"
                style={isExtra ? extraStyle : undefined}
              >
                <img
                  src={src}
                  alt={alt || `Parallax image ${index + 1}`}
                  className="zoom-parallax-image"
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}

// remove unused helper function at bottom
export default ZoomParallax;