import { useState, useRef, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

interface UseDraggableOptions {
  initialPosition?: Position;
  randomPosition?: boolean;
}

export const useDraggable = ({
  initialPosition,
  randomPosition = false,
}: UseDraggableOptions) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (randomPosition && elementRef.current) {
      const randomX = Math.floor(
        Math.random() * (window.innerWidth - elementRef.current.offsetWidth)
      );
      const randomY = Math.floor(
        Math.random() * (window.innerHeight - elementRef.current.offsetHeight)
      );
      setPosition({ x: randomX, y: randomY });
    } else if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition, randomPosition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.current.x;
        const newY = e.clientY - dragOffset.current.y;
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  return {
    position,
    isDragging,
    elementRef,
    handleMouseDown,
  };
};
