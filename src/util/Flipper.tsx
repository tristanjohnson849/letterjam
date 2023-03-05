import React, { CSSProperties, PropsWithChildren, useState } from 'react';
import ControlledAnimated from 'react-controlled-animations/components/ControlledAnimated.js';
import useTransitioningState from 'react-controlled-animations/hooks/useTransitioningState.js';

export type FlipDirection = 'flipLeft' | 'flipRight'

export interface FlipperProps {
    easing?: string;
    duration?: number;
    faceStyle?: CSSProperties;
    containerStyle?: CSSProperties;
}

export interface FlipContext {
    readonly flipTo: (newFace: React.ReactNode, flipDirection?: FlipDirection) => void;
}

export const FlipContext = React.createContext<FlipContext>({
    flipTo: () => {}
});

const Flipper: React.FC<PropsWithChildren<FlipperProps>> = ({
    children,
    easing =  'cubic-bezier(.25, .75, .5, 1.2)',
    duration = 600,
    faceStyle = {},
    containerStyle = {}
}) => {
    const [frontFace, startFlippingTo, finishFlip, currentTransition] = useTransitioningState<React.ReactNode, FlipDirection>(children);
    const [backFace, setBackFace] = useState<React.ReactNode>(null);

    const flipTo = (newFace: React.ReactNode, flipDirection: FlipDirection = 'flipRight') => {
        setBackFace(newFace);
        startFlippingTo(newFace, flipDirection);
    };

    const onAnimationEnd = () => {
        finishFlip();
        setBackFace(null);
    };

    return (
        <div style={{ ...containerStyle, perspective: '1000px' }}>
            <ControlledAnimated<FlipDirection> 
                currentAnimation={currentTransition}
                onAnimationEnd={onAnimationEnd}
                animations={{
                    flipRight: [{ transform: 'rotateY(180deg)' }],
                    flipLeft: [{ transform: 'rotateY(-180deg)' }],
                }}
                animationOptions={{ easing, duration }}
                commitStylesOnEnd={false}
                style={{
                    transform: 'rotateY(0)',
                    transformStyle: 'preserve-3d',
                    position: 'relative',
                    height: '100%',
                    width: '100%',
                }}
            >
                <FlipContext.Provider value={{ flipTo }}>
                    <div
                        style={{
                            ...faceStyle,
                            transform: 'rotateY(0)',
                            zIndex: 2,
                            ...faceContainer,
                        }}
                    >
                        {frontFace}
                    </div>
                    <div
                        style={{
                            ...faceStyle,
                            transform: 'rotateY(180deg)',
                            ...faceContainer,
                        }}
                    >
                        {backFace}
                    </div>
                </FlipContext.Provider>
            </ControlledAnimated>
        </div>
    );
};

const faceContainer: CSSProperties = {
    position: 'absolute',
    backfaceVisibility: 'hidden',
    top: 0,
    left: 0
}

export default Flipper;
