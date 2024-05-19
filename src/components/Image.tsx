"use client";
import React, { useState } from "react";

interface ImageProps {
  src: string;
  alt?: string;
  caption?: string;
}

export function Image({ src, alt, caption, ...props }: ImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        {...props}
        className="my-1 rounded-xl border border-accent-foreground/10 cursor-zoom-in"
        src={src}
        alt={alt}
        onClick={handleImageClick}
      />
      {caption && (
        <figcaption className="text-center mb-2">{caption}</figcaption>
      )}
      {isModalOpen && (
        <div className="inset-0 bg-black fixed flex bg-opacity-75">
          <div className="fixed inset-16 flex items-center justify-center z-50">
            <div className="relative">
              <img
                className="rounded-xl hover:cursor-zoom-out"
                src={src}
                alt={alt}
                onClick={handleCloseModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
