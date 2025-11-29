import { useEffect, useState } from 'react';
import './CustomCursor.css';

export const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('button') !== null ||
                target.closest('a') !== null ||
                target.onclick !== null ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(isInteractive);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* Outer Ring */}
            <div
                className="cursor-ring"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering ? 1.5 : 1})`,
                }}
            />

            {/* Inner Dot */}
            <div
                className="cursor-dot"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%) scale(${isClicking ? 0.5 : 1})`,
                    background: isHovering
                        ? 'linear-gradient(135deg, #ff4500 0%, #ff6b00 50%, #ffaa00 100%)'
                        : '#ff4500',
                }}
            />

            {/* Glow Effect */}
            {isHovering && (
                <div
                    className="cursor-glow"
                    style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                    }}
                />
            )}

            {/* Tech Corners */}
            {isHovering && (
                <div className="cursor-corners-container">
                    {[0, 90, 180, 270].map((rotation) => (
                        <div
                            key={rotation}
                            className="cursor-corner"
                            style={{
                                left: `${position.x}px`,
                                top: `${position.y}px`,
                                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                            }}
                        >
                            <div className="corner-line-h" />
                            <div className="corner-line-v" />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};
