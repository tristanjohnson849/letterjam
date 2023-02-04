import React, { useState, useRef, useEffect } from "react";
import { randomBetween } from ".";

export interface SplatterProps {
    color: 'red' | 'green';
    pos: [number, number];
    remove: () => void;
}

const Splatter: React.FC<SplatterProps> = ({ color, pos: [x, y], remove }) => {
    const [isFading, setIsFading] = useState(false);
    const splashBackground = useRef(randomSplatterBackground());
    const randomRotate = useRef(`rotate(${randomBetween(0, 180)}deg)`);

    useEffect(() => {
        setIsFading(true);
    }, []);

    return (
        <div style={{ 
            mixBlendMode: 'multiply',
        }}>
            <div 
                className={`splatter-${color}`}
                style={{
                    position: 'fixed',
                    left: `${x}px`,
                    top: `${y}px`,
                    filter: 'contrast(20)',
                    transform: `translate(-50%, ${isFading ? 200 : -50}%)`,
                    transition: 'all 8000ms ease-in',
                    background: '#fff',
                }}
            >
                <div 
                    onTransitionEnd={() => remove()}
                    style={{

                        width: '120px',
                        height: '120px',
                        background: splashBackground.current,
                        backgroundClip: 'padding-box',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: '50%',
                        boxShadow: '0 0 0 20px #fff',
                        filter: 'blur(8px)',
                        transform: randomRotate.current,
                        transition: 'all 8000ms ease-in',
                        opacity: isFading ? 0 : 1
                    }}
                />
            </div>
        </div>
    );
};

const earlyPrimes = [3, 5, 7, 11, 13, 17, 19];

const randomPrime = (excludes: number[] = [], lowerBound: number = 0, upperBound=13): number => {
    const toPick = earlyPrimes.filter(num => num > lowerBound && num <= upperBound && !excludes.includes(num));
    return toPick[randomBetween(0, toPick.length - 1)];
}

const randomSplatterBackground = (): string => {
    const [lower1, grad1] = randomSplatterGradient([], randomBetween(70, 90));
    const [, grad2] = randomSplatterGradient([lower1]);

    return `${grad1},${grad2},radial-gradient(#000 ${randomBetween(10, 30)}%, #0000 0), #fff`;
}

const randomSplatterGradient = (lowerExcludes?: number[], sizeOverride?: number): [number, string] => {
    const lower = randomPrime(lowerExcludes, 0, 11);
    const higher = randomBetween(lower + 8, lower + 15);

    const pos = randomBetween(40, 60);
    const size = sizeOverride || randomBetween(40, 60);
    return [lower, `repeating-conic-gradient(#0000 0 ${lower}%, #000 ${higher}%) ${pos}% / ${size}% ${size}%`];
}

export default Splatter;
