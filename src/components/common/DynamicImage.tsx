"use client";

import React, { useState } from "react";
import Image, { type ImageProps } from "next/image";

interface DynamicImageProps extends Omit<ImageProps, "src" | "onError"> {
  src: string;
  fallbackSrc?: string;
}

export default function DynamicImage({
  src,
  fallbackSrc = "/images/hero-pets.jpg",
  alt,
  className = "",
  ...rest
}: DynamicImageProps): React.JSX.Element {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [loaded, setLoaded] = useState<boolean>(false);

  // Sync smoothly if parent passes a new dynamic image src (e.g. hero slide switch)
  const resolvedSrc = src !== imgSrc && imgSrc !== fallbackSrc ? src : imgSrc;

  return (
    <Image
      {...rest}
      src={resolvedSrc}
      alt={alt}
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (resolvedSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
      className={`${className} transition-opacity duration-500 ${
        loaded ? "opacity-100" : "opacity-90"
      }`}
    />
  );
}

