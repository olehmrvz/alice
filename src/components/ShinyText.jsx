import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "motion/react";
import "./ShinyText.css";

export default function ShinyText({
  text,
  disabled = false,
  speed = 2,
  className = "",
  color = "#17211a",
  shineColor = "#33453a",
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = "left",
  delay = 0,
}) {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);
  const directionRef = useRef(direction === "left" ? 1 : -1);

  useAnimationFrame((time) => {
    if (disabled || isPaused) {
      lastTimeRef.current = null;
      return;
    }
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    const animationDuration = speed * 1000;
    const delayDuration = delay * 1000;
    const cycleDuration = animationDuration + delayDuration;
    const fullCycle = yoyo ? cycleDuration * 2 : cycleDuration;
    const cycleTime = elapsedRef.current % fullCycle;
    const isReverse = yoyo && cycleTime >= cycleDuration;
    const activeTime = isReverse ? cycleTime - cycleDuration : cycleTime;
    const isAnimating = activeTime < animationDuration;
    const baseProgress = isAnimating ? (activeTime / animationDuration) * 100 : 100;
    const animatedProgress = isReverse ? 100 - baseProgress : baseProgress;

    progress.set(directionRef.current === 1 ? animatedProgress : 100 - animatedProgress);
  });

  useEffect(() => {
    directionRef.current = direction === "left" ? 1 : -1;
    elapsedRef.current = 0;
    progress.set(0);
  }, [direction, progress]);

  const backgroundPosition = useTransform(progress, (value) => `${150 - value * 2}% center`);
  const handleMouseEnter = useCallback(() => pauseOnHover && setIsPaused(true), [pauseOnHover]);
  const handleMouseLeave = useCallback(() => pauseOnHover && setIsPaused(false), [pauseOnHover]);

  return (
    <motion.span
      className={`shiny-text ${className}`.trim()}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 47%, ${shineColor} 50%, ${color} 53%, ${color} 100%)`,
        backgroundPosition,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </motion.span>
  );
}
