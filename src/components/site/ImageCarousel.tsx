import { useEffect, useState } from "react";

export function ImageCarousel({
  images,
  auto = true,
  className = "",
}: {
  images: string[];
  auto?: boolean;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!auto || images.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      3500,
    );
    return () => clearInterval(id);
  }, [auto, images.length]);

  if (images.length === 0) {
    return (
      <div
        className={`grid place-items-center bg-gradient-to-br from-secondary to-accent ${className}`}
      >
        <span className="font-display text-3xl font-bold text-muted-foreground/40">
          GD
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-background" : "w-1.5 bg-background/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
