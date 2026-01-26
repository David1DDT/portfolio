'use client'
import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import './styles/StarBackground.css';

interface Star {
    x: number;
    y: number;
    radius: number;
    opacity: number;
    parallaxFactor: number;
    vx: number;
    vy: number;
    tailLength: number;
}

export interface StarBackgroundHandles {
    moveStarsRight: (speed?: number, duration?: number) => void;
    moveStarsLeft: (speed?: number, duration?: number) => void;
}

const StarBackground = forwardRef<StarBackgroundHandles>((_, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scrollY, setScrollY] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [scrollVelocity, setScrollVelocity] = useState(0);
    const [scrollDirection, setScrollDirection] = useState(1);

    const starsRef = useRef<Star[]>([]);
    const lastScrollRef = useRef(0);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const tailOpacityRef = useRef(0);

    // Right movement
    const moveRightRef = useRef(false);
    const rightSpeedRef = useRef(0);
    const targetRightSpeedRef = useRef(0);

    // Left movement
    const moveLeftRef = useRef(false);
    const leftSpeedRef = useRef(0);
    const targetLeftSpeedRef = useRef(0);

    // Initialize stars
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars: Star[] = [];
        const starCount = 80;
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.2 + 0.3,
                opacity: Math.random() * 0.8 + 0.4,
                parallaxFactor: Math.random() * 0.3 + 0.1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: Math.random() * 1.5 + 0.5,
                tailLength: Math.random() * 30 + 20,
            });
        }
        starsRef.current = stars;
    }, []);

    // Imperative handle
    useImperativeHandle(ref, () => ({
        moveStarsRight: (speed = 2, duration = 3) => {
            moveRightRef.current = true;
            targetRightSpeedRef.current = speed;
            setTimeout(() => {
                targetRightSpeedRef.current = 0;
            }, duration * 1000);
        },
        moveStarsLeft: (speed = 2, duration = 3) => {
            moveLeftRef.current = true;
            targetLeftSpeedRef.current = speed;
            setTimeout(() => {
                targetLeftSpeedRef.current = 0;
            }, duration * 1000);
        }
    }));

    // Animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const animate = () => {
            // Smoothly approach target speeds
            rightSpeedRef.current += (targetRightSpeedRef.current - rightSpeedRef.current) * 0.05;
            leftSpeedRef.current += (targetLeftSpeedRef.current - leftSpeedRef.current) * 0.05;

            if (Math.abs(rightSpeedRef.current) < 0.01) {
                rightSpeedRef.current = 0;
                moveRightRef.current = false;
            }
            if (Math.abs(leftSpeedRef.current) < 0.01) {
                leftSpeedRef.current = 0;
                moveLeftRef.current = false;
            }

            // Tail opacity only when moving left/right
            const targetOpacity = moveRightRef.current || moveLeftRef.current
                ? 1
                : 0;
            const fadeSpeed = targetOpacity > tailOpacityRef.current ? 0.08 : 0.03;
            tailOpacityRef.current += (targetOpacity - tailOpacityRef.current) * fadeSpeed;

            // Clear canvas
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            starsRef.current.forEach((star) => {
                let finalX = star.x;
                let finalY = star.y;

                // Movement
                if (moveRightRef.current || rightSpeedRef.current > 0) {
                    star.x += rightSpeedRef.current;
                    finalX = star.x;
                    if (star.x > canvas.width) star.x = 0;
                } else if (moveLeftRef.current || leftSpeedRef.current > 0) {
                    star.x -= leftSpeedRef.current;
                    finalX = star.x;
                    if (star.x < 0) star.x = canvas.width;
                } else {
                    // Scroll-based position
                    const yOffset = scrollY * star.parallaxFactor;
                    finalY = (star.y - yOffset + canvas.height) % canvas.height;
                    finalX = (star.x + scrollY * star.vx * 0.5 + canvas.width) % canvas.width;
                }

                // Tail - only horizontal during left/right animation
                if (tailOpacityRef.current > 0.01 && (moveRightRef.current || rightSpeedRef.current > 0 || moveLeftRef.current || leftSpeedRef.current > 0)) {
                    const tailVx = moveRightRef.current || rightSpeedRef.current > 0
                        ? -rightSpeedRef.current
                        : leftSpeedRef.current; // left movement
                    const tailVy = 0; // horizontal only

                    const tailLength = star.tailLength * (0.8 + tailOpacityRef.current * 0.6);

                    const gradient = ctx.createLinearGradient(
                        finalX,
                        finalY,
                        finalX + tailVx * tailLength,
                        finalY + tailVy * tailLength
                    );
                    gradient.addColorStop(0, `rgba(255,255,255,${star.opacity * tailOpacityRef.current})`);
                    gradient.addColorStop(0.3, `rgba(180,200,255,${star.opacity * tailOpacityRef.current * 0.6})`);
                    gradient.addColorStop(1, `rgba(180,200,255,0)`);

                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = star.radius * (0.6 + tailOpacityRef.current * 1.2);
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.moveTo(finalX, finalY);
                    ctx.lineTo(finalX + tailVx * tailLength, finalY + tailVy * tailLength);
                    ctx.stroke();
                }

                // Star
                ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
                ctx.beginPath();
                ctx.arc(finalX, finalY, star.radius, 0, Math.PI * 2);
                ctx.fill();

                // Glow
                ctx.fillStyle = `rgba(200,220,255,${star.opacity * 0.3})`;
                ctx.beginPath();
                ctx.arc(finalX, finalY, star.radius * 1.5, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);
        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [scrollY]);

    // Scroll tracking
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const velocity = Math.abs(currentScroll - lastScrollRef.current);
            const direction = currentScroll > lastScrollRef.current ? 1 : -1;

            setScrollY(currentScroll);
            setScrollVelocity(velocity);
            setScrollDirection(direction);
            setIsScrolling(true);
            lastScrollRef.current = currentScroll;

            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = setTimeout(() => {
                setIsScrolling(false);
                setScrollVelocity(0);
            }, 300);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, []);

    // Resize
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <canvas ref={canvasRef} className="stars-bg" />;
});

export default StarBackground;
