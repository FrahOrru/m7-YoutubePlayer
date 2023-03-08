import { AnimatePresence, motion } from "framer-motion";

export default function LoadingMotion() {
  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const circleVariants = {
    start: {
      y: "50%",
    },
    end: {
      y: "150%",
    },
  };

  const circleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut",
  };

  return (
    <motion.div
      style={{
        width: "100px",
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
      }}
      variants={containerVariants}
      initial="start"
      animate="end"
    >
      <motion.div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: "#fff",
        }}
        variants={circleVariants}
        transition={circleTransition}
      />
      <motion.div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: "#fff",
        }}
        variants={circleVariants}
        transition={circleTransition}
      />
      <motion.div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: "#fff",
        }}
        variants={circleVariants}
        transition={circleTransition}
      />
    </motion.div>
  );
}
