import React from "react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useInView,
} from "framer-motion";

interface AnimatedValueProps {
  value: number;
  className?: string;
}

export function AnimatedValue({ value, className }: AnimatedValueProps) {
  const count = useMotionValue(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref);
  const rounded = useTransform(count, (latest) => `$ ${latest.toFixed(2)}`);

  React.useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 4,
        ease: "easeOut",
      });

      return controls.stop;
    }
  }, [value, isInView, count]);

  return (
    <motion.p ref={ref} className={className}>
      {rounded}
    </motion.p>
  );
}
