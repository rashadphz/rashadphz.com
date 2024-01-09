"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const WavingHand = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [isFirstLoad, setisFirstLoad] = useState(true);

  const animationControls = useAnimation();
  const animation = {
    rotate: 15,
  };

  if (!mounted) return <>👋🏿</>;

  return (
    <motion.div
      style={{
        marginBottom: "-20px",
        marginRight: "-45px",
        paddingBottom: "20px",
        paddingRight: "45px",
        display: "inline-block",
      }}
      animate={animationControls}
      //@ts-ignore
      whileInView={() => {
        if (isFirstLoad) {
          setIsAnimationPlaying(true);
          animationControls.start(animation);
        }
        setisFirstLoad(false);
      }}
      onHoverStart={() => {
        if (!isAnimationPlaying) {
          setIsAnimationPlaying(true);
          animationControls.start(animation);
        }
      }}
      onAnimationComplete={() => {
        setIsAnimationPlaying(false);
      }}
      transition={{
        yoyo: 5,
        from: 0,
        duration: 0.3,
        ease: "easeInOut",
        type: "tween",
      }}
    >
      👋🏿
    </motion.div>
  );
};

export default WavingHand;
