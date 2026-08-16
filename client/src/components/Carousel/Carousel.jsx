import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight } from "lucide-react";

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

function CarouselItem({ item, index, itemWidth, round, trackItemOffset, x, transition }) {

    return (
        <motion.div
            key={`${item?.id ?? index}-${index}`}
            className={`relative shrink-0 flex flex-col items-start justify-between overflow-hidden rounded-3xl border border-[#2A4566] bg-[#11284A] p-6 cursor-grab active:cursor-grabbing ${round
                ? 'items-center justify-center text-center bg-[#120F17] border-0'
                : 'items-start justify-between bg-[#222] border border-[#222] rounded-[12px]'
                } overflow-hidden cursor-grab active:cursor-grabbing`}
            style={{
                width: itemWidth,
                height: round ? itemWidth : '220px',

                ...(round && { borderRadius: '50%' })
            }}
            transition={transition}
        >
            <div className="p-1">
                <div className="flex items-center gap-3 ">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A3D63] text-sm font-semibold text-[#B3CFE5]">
                        {item.initials}
                    </div>

                    <div>
                        <div className="font-semibold text-lg text-white">
                            {item.name}
                        </div>

                        <p className="text-sm text-gray-400">
                            {item.role} · {item.company}
                        </p>
                    </div>
                </div>
                <div className="my-5 h-px bg-[#2A4566]" />
                <p className="text-base leading-7 text-gray-300 mt-5">
                    "{item.quote}"
                </p>
            </div>
        </motion.div>
    );
}

export default function Carousel({
    items,
    baseWidth = 420,
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = false,
    loop = false,
    round = false,
    showArrows = false
}) {
    if (!items || items.length === 0) {
        return null;
    }
    const [position, setPosition] = useState(loop ? 1 : 0);
    const x = useMotionValue(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const containerPadding = 16;
    const itemWidth = Math.min(baseWidth, containerWidth || baseWidth);
    const trackItemOffset = itemWidth + GAP;

    const itemsForRender = useMemo(() => {
        if (!loop) return items;
        if (items.length === 0) return [];
        return [items[items.length - 1], ...items, items[0]];
    }, [items, loop]);
    const visibleItems = Math.max(
        1,
        Math.floor((containerWidth + GAP) / trackItemOffset)
    );

    const maxPosition = Math.max(
        0,
        itemsForRender.length - visibleItems
    );

    const [isHovered, setIsHovered] = useState(false);
    const [isJumping, setIsJumping] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const containerRef = useRef(null);
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            const width = entries[0].contentRect.width;
            setContainerWidth(width);
        });

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        if (pauseOnHover && containerRef.current) {
            const container = containerRef.current;
            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);
            container.addEventListener('mouseenter', handleMouseEnter);
            container.addEventListener('mouseleave', handleMouseLeave);
            return () => {
                container.removeEventListener('mouseenter', handleMouseEnter);
                container.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [pauseOnHover]);

    useEffect(() => {
        if (!autoplay || itemsForRender.length <= 1) return undefined;
        if (pauseOnHover && isHovered) return undefined;

        const timer = setInterval(() => {
            setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
        }, autoplayDelay);

        return () => clearInterval(timer);
    }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

    useEffect(() => {
        const startingPosition = loop ? 1 : 0;
        setPosition(startingPosition);
        x.set(-startingPosition * trackItemOffset);
    }, [items.length, loop, trackItemOffset, x]);

    useEffect(() => {
        if (!loop && position > itemsForRender.length - 1) {
            setPosition(Math.max(0, itemsForRender.length - 1));
        }
    }, [itemsForRender.length, loop, position]);

    const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

    const handleAnimationStart = () => {
        setIsAnimating(true);
    };

    const handleAnimationComplete = () => {
        if (!loop || itemsForRender.length <= 1) {
            setIsAnimating(false);
            return;
        }
        const lastCloneIndex = itemsForRender.length - 1;

        if (position === lastCloneIndex) {
            setIsJumping(true);
            const target = 1;
            setPosition(target);
            x.set(-target * trackItemOffset);
            requestAnimationFrame(() => {
                setIsJumping(false);
                setIsAnimating(false);
            });
            return;
        }

        if (position === 0) {
            setIsJumping(true);
            const target = items.length;
            setPosition(target);
            x.set(-target * trackItemOffset);
            requestAnimationFrame(() => {
                setIsJumping(false);
                setIsAnimating(false);
            });
            return;
        }

        setIsAnimating(false);
    };

    const handleDragEnd = (_, info) => {
        const { offset, velocity } = info;
        const direction =
            offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
                ? 1
                : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
                    ? -1
                    : 0;

        if (direction === 0) return;

        setPosition(prev => {
            const next = prev + direction;
            const max = maxPosition;
            return Math.max(0, Math.min(next, max));
        });
    };

    const dragProps = loop
        ? {}
        : {
            dragConstraints: {
                left: -trackItemOffset * Math.max(maxPosition, 0),
                right: 0
            }
        };

    const activeIndex =
        items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden p-4 ${round ? 'rounded-full border border-white' : 'rounded-[24px] border border-[#222]'
                }`}
            style={{
                width: "100%",
                ...(round && { height: `${baseWidth}px` })
            }}
        >
            {showArrows && (
                <>
                    <button
                        type="button"
                        onClick={() => setPosition(prev => Math.max(0, prev - 1))}
                        className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#2A4566] bg-[#0A1832]/80 text-white backdrop-blur-sm transition-colors duration-300 hover:border-[#4A7FA7]"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setPosition(prev =>
                                Math.min(maxPosition, prev + 1)
                            )
                        }
                        className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#2A4566] bg-[#0A1832]/80 text-white backdrop-blur-sm transition-colors duration-300 hover:border-[#4A7FA7]"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={20} />
                    </button>
                </>
            )}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0A1832] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0A1832] to-transparent" />
            <motion.div
                className="flex"
                drag={isAnimating ? false : 'x'}
                {...dragProps}
                style={{
                    width: itemWidth,
                    gap: `${GAP}px`,
                    perspective: 1000,
                    perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
                    x
                }}
                onDragEnd={handleDragEnd}
                animate={{ x: -(position * trackItemOffset) }}
                transition={effectiveTransition}
                onAnimationStart={handleAnimationStart}
                onAnimationComplete={handleAnimationComplete}
            >
                {itemsForRender.map((item, index) => (
                    <CarouselItem
                        key={`${item?.id ?? index}-${index}`}
                        item={item}
                        index={index}
                        itemWidth={itemWidth}
                        round={round}
                        trackItemOffset={trackItemOffset}
                        x={x}
                        transition={effectiveTransition}
                    />
                ))}
            </motion.div>
            <div className={`flex w-full justify-center ${round ? 'absolute z-20 bottom-12 left-1/2 -translate-x-1/2' : ''}`}>
                <div className="mt-4 flex w-[150px] justify-between px-8">
                    {items.map((_, index) => (
                        <motion.button
                            type="button"
                            key={index}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={activeIndex === index}
                            className={`h-2 w-2 rounded-full cursor-pointer border-0 p-0 appearance-none transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${activeIndex === index
                                ? round
                                    ? 'bg-white'
                                    : 'bg-[#333333]'
                                : round
                                    ? 'bg-[#555]'
                                    : 'bg-[rgba(51,51,51,0.4)]'
                                }`}
                            animate={{
                                scale: activeIndex === index ? 1.2 : 1
                            }}
                            onClick={() => setPosition(loop ? index + 1 : index)}
                            transition={{ duration: 0.15 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
