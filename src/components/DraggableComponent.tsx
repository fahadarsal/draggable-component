import React, { useState, useRef, useEffect } from "react";
import "../styles/DraggableComponent.css";

interface DraggableButtonProps {
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  randomPosition?: boolean;
  showTooltip?: boolean;
}

const DraggableComponent: React.FC<DraggableButtonProps> = ({
  children,
  initialPosition,
  randomPosition = false,
  showTooltip,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false); // State to track if the button has been dragged
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Determine initial position
    if (randomPosition && buttonRef.current) {
      // Set random position within viewport
      const randomX = Math.floor(
        Math.random() * (window.innerWidth - buttonRef.current.offsetWidth)
      );
      const randomY = Math.floor(
        Math.random() * (window.innerHeight - buttonRef.current.offsetHeight)
      );
      setPosition({ x: randomX, y: randomY });
    } else if (initialPosition) {
      // Use provided initial position
      setPosition(initialPosition);
    } else if (buttonRef.current) {
      // Default to DOM position if it's not already moved
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
      });
    }
  }, [initialPosition, randomPosition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && buttonRef.current) {
        const newX = e.clientX - dragOffset.current.x;
        const newY = e.clientY - dragOffset.current.y;
        setPosition({ x: newX, y: newY });
        setHasMoved(true); // Update hasMoved to true when dragging
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && buttonRef.current) {
        e.preventDefault(); // Prevent the default touch behavior
        const touch = e.touches[0];
        const newX = touch.clientX - dragOffset.current.x;
        const newY = touch.clientY - dragOffset.current.y;
        setPosition({ x: newX, y: newY });
        setHasMoved(true); // Update hasMoved to true when dragging
      }
    };

    const handleMouseUpOrTouchEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("mouseup", handleMouseUpOrTouchEnd);
    document.addEventListener("touchend", handleMouseUpOrTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseup", handleMouseUpOrTouchEnd);
      document.removeEventListener("touchend", handleMouseUpOrTouchEnd);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const touch = e.touches[0];
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
  };

  // Determine class based on position
  const positionClass = () => {
    const { x, y } = position;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    if (x < centerX / 2) return "left-side";
    if (x > centerX * 1.5) return "right-side";
    if (y < centerY / 2) return "top-side";
    if (y > centerY * 1.5) return "bottom-side";
    return "center";
  };

  return (
    <div
      className={`draggable-component ${
        isDragging ? "dragging" : ""
      } ${positionClass()}`}
      style={
        hasMoved || randomPosition || initialPosition
          ? {
              left: `${position.x}px`,
              top: `${position.y}px`,
              position: hasMoved ? "fixed" : "absolute",
            }
          : {
              position: "sticky",
            }
      }
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      ref={buttonRef}
    >
      {children}
    </div>
  );
};

export default DraggableComponent;
