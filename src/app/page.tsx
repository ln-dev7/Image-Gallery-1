"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { motion, AnimatePresence, spring } from "framer-motion";

export default function Home() {
  const [expanded, setExpanded] = useState(false);
  const [activePhoto, setActivePhoto] = useState<
    (typeof PHOTOS)[number] | null
  >(null);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setActivePhoto(null));
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActivePhoto(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  return (
    <main className="relative w-full h-screen flex items-center justify-center p-12">
      <div className="w-full h-full max-w-6xl flex flex-col items-center justify-start">
        <motion.div
          className="relative cursor-pointer flex items-center justify-center w-64 h-64 gap-4 place-items-center"
          onClick={() => setExpanded(true)}
          animate={{
            width: expanded ? 1200 : 256,
            height: expanded ? 1000 : 256,
          }}
        >
          {PHOTOS.map((photo, index) => {
            return (
              <motion.div
                key={index}
                className={`absolute w-36 h-36 border border-white overflow-hidden flex items-center justify-center`}
                onClick={() => {
                  if (expanded) {
                    setActivePhoto(photo);
                  }
                }}
                animate={{
                  width: expanded ? 280 : 144,
                  height: expanded ? 150 : 144,
                  position: expanded ? "static" : "absolute",
                  marginBottom: expanded ? -600 : 0,
                }}
                transition={spring}
                layoutId={`card-${photo.src}`}
              >
                <Image
                  className="object-cover w-full h-full bg-slate-100"
                  width={867}
                  height={1300}
                  src={photo.src}
                  alt="Photo"
                  key={index}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {activePhoto ? (
          <div className="absolute inset-0 grid place-items-center z-20">
            <motion.div
              layoutId={`card-${activePhoto.src}`}
              className="flex w-96 h-[500px] cursor-pointer flex-col overflow-hidden bg-white p-4 mb-60"
              ref={ref}
            >
              <Image
                className="object-cover w-full h-full bg-slate-100"
                width={867}
                height={1300}
                src={activePhoto.src}
                alt="Photo"
              />
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activePhoto ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overlay z-50"
          />
        ) : null}
      </AnimatePresence>
      <CopyRight />
    </main>
  );
}

function CopyRight() {
  return (
    <div className="absolute top-0 left-0 right-0 flex items-center gap-10 p-4 border-b bg-white z-20">
      <a href="https://x.com/ln_dev7" className="underline underline-offset-2">
        Code by LN
      </a>
      <a
        href="https://github.com/ln-dev7/grid-transition-media"
        className="underline underline-offset-2"
      >
        GitHub
      </a>
      <a
        href="https://www.figma.com/design/dQaRKGQq76FYVA1E34PHOi/%F0%9F%8C%BB-Image-Gallery-(Community)?node-id=51-3333&t=FIDz5JK3BUfhTa2e-1"
        className="underline underline-offset-2"
      >
        Figma
      </a>
    </div>
  );
}

const PHOTOS = [
  {
    src: "/image1.png",
  },
  {
    src: "/image2.png",
  },
  {
    src: "/image3.png",
  },
  {
    src: "/image4.png",
  },
  {
    src: "/image5.png",
  },
  {
    src: "/image6.png",
  },
  {
    src: "/image7.png",
  },
  {
    src: "/image8.png",
  },
  {
    src: "/image9.png",
  },
  {
    src: "/image10.png",
  },
];
