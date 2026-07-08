import { motion } from "framer-motion";

// Direction-aware push transitions — matches the native iOS feel: forward
// navigation pushes the new screen in from the right while the old one
// slides left underneath it; back navigation reverses it.
const variants = {
  initial: (direction) => ({ opacity: 0, x: direction < 0 ? -36 : 36 }),
  animate: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction < 0 ? 28 : -28 }),
};

const transition = { duration: 0.22, ease: [0.32, 0.72, 0, 1] };

export default function ScreenShell({ children, className = "", noPad = false, direction = 1 }) {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className={`absolute inset-0 flex h-full w-full flex-col ${noPad ? "" : "px-6"} ${className}`}
    >
      {children}
    </motion.div>
  );
}
