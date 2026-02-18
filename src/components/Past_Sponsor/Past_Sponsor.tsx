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

interface ParallaxItemProps {
  image: Image;
  index: number;
  scrollYProgress: any;
  isExtra: boolean;
  extraStyle?: React.CSSProperties;
}

const ParallaxItem: React.FC<ParallaxItemProps> = ({
  image,
  index,
  scrollYProgress,
  isExtra,
  extraStyle,
}) => {
  // Generate transforms dynamically based on index to create depth variation
  const scaleBase = 1;
  const scaleTarget = 1;
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

  return (
    <motion.div
      style={{
        scale,
        opacity: imageOpacity,
      }}
      className="zoom-parallax-item"
      data-index={index + 1}
    >
      <div
        className="zoom-parallax-image-container"
        style={isExtra ? extraStyle : undefined}
      >
        <img
          src={image.src}
          alt={image.alt || `Parallax image ${index + 1}`}
          className="zoom-parallax-image"
        />
      </div>
    </motion.div>
  );
};

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
    if (count === 0) return [];

    const cols = Math.ceil(Math.sqrt(count)) + 2;
    const rows = Math.ceil(count / Math.ceil(Math.sqrt(count)));

    const positions: Array<{ r: number; c: number }> = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        positions.push({ r, c });
      }
    }

    // Shuffle positions
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    return extraImages.map((_, i) => {
      const gridPos = positions[i] || { r: Math.floor(Math.random() * rows), c: Math.floor(Math.random() * cols) };
      const cellWidth = 90 / cols;
      const cellHeight = 90 / rows;
      const jitterX = Math.random() * (cellWidth * 0.6);
      const jitterY = Math.random() * (cellHeight * 0.6);

      const top = 5 + (gridPos.r * cellHeight) + jitterY;
      const left = 5 + (gridPos.c * cellWidth) + jitterX;
      const width = Math.floor(Math.random() * 10) + 10;

      return {
        position: 'absolute' as const,
        top: `${top}vh`,
        left: `${left}vw`,
        width: `${width}vw`,
        height: 'auto',
        transform: 'translate(-50%, -50%)',
      };
    });
  }, [images]);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.1, 0.85, 0.95, 1],
    [0, 0.5, 1, 1, 0.5, 0]
  );

  const display = useTransform(scrollYProgress, (value) => {
    return value <= 0 || value >= 1 ? 'none' : 'flex';
  });

  return (
    <div className="zoom-parallax-outer">
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
        {images.map((image, index) => {
          const isExtra = index >= 7;
          return (
            <ParallaxItem
              key={index}
              image={image}
              index={index}
              scrollYProgress={scrollYProgress}
              isExtra={isExtra}
              extraStyle={isExtra ? randomPositions[index - 7] : undefined}
            />
          );
        })}
      </motion.div>
    </div>
  );
}

// remove unused helper function at bottom
export default ZoomParallax;