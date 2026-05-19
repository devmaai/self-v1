"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroImage() {
  return (
    <div className="flex w-full items-center justify-center">
      {/* Gentle infinite float + subtle 3D tilt */}
      <motion.div
        className="w-full max-w-[560px]"
        style={{ transformPerspective: 1400 }}
        animate={{
          y: [0, -12, 0],
          rotateZ: [0, 0.6, 0],
          rotateY: [0, -1.2, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Inner: zoomed in a little + rich hover interaction */}
        <motion.div
          className="origin-center"
          initial={{ scale: 1.08 }}
          whileHover={{
            scale: 1.16,
            y: -10,
            rotateX: 6,
            rotateY: -8,
            filter: "drop-shadow(0 24px 40px rgba(26,22,20,0.22)) brightness(1.04)",
          }}
          whileTap={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
        >
          <Image
            src="/images/hero-homepage.png"
            alt="Locally owned self storage facility ranking on Google Maps"
            width={1636}
            height={1475}
            priority
            quality={95}
            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 560px"
            className="h-auto w-full select-none mix-blend-multiply"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
