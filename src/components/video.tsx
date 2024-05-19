"use client";
import React, { useState } from "react";

interface VideoProps {
  src: string;
  caption?: string;
}

export function Video({ src, caption, ...props }: VideoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <video
        {...props}
        autoPlay
        playsInline
        loop
        muted
        className="my-1 rounded-xl border border-accent-foreground/10 cursor-zoom-in"
        src={src}
        onClick={handleVideoClick}
      />
      {caption && (
        <figcaption className="text-center mb-2">{caption}</figcaption>
      )}
      {isModalOpen && (
        <div className="inset-0 bg-black fixed flex bg-opacity-75">
          <div className="fixed inset-20 flex items-center justify-center z-50">
            <div className="relative">
              <video
                className="rounded-xl hover:cursor-zoom-out"
                src={src}
                autoPlay
                playsInline
                loop
                muted
                onClick={handleCloseModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
