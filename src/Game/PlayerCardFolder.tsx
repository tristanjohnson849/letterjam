import React, { CSSProperties } from "react";
import PlayerCard from './PlayerCard.js';

import HoverAnimated from 'react-controlled-animations/components/HoverAnimated.js';
import ControlledAnimated from 'react-controlled-animations/components/ControlledAnimated.js';
import useTransitioningToggle, { ToggleTransitions } from 'react-controlled-animations/hooks/useTransitioningToggle.js';
import { toToggleAnimations, toPersistedAnimation } from 'react-controlled-animations/animationInputMappers.js';
import { AnimationInput } from 'react-controlled-animations/AnimationInput.js';

const ANIMATION_DURATION = 600;

const folderAnimation = (
    keyframes: Keyframe[],
    duration: number = ANIMATION_DURATION
): AnimationInput => ({
    keyframes: keyframes.map((keyframe): Keyframe => ({
        easing: 'cubic-bezier(.25, .75, .5, 1.2)',
        ...keyframe
    })),
    options: { duration }
});

const folderToggleAnimations = (
    keyframes: Keyframe[],
    duration: number = ANIMATION_DURATION
) => toToggleAnimations(folderAnimation(keyframes, duration));

const SLIDERS = folderToggleAnimations([{ translate: '-50% 40vh' }, { translate: '-50% 8vh' }]);

const playerCardFolderStyle: CSSProperties = {
    translate: "-50% 40vh",
    width: "50vw",
    height: "50vh",
    position: "fixed",
    bottom: "0",
    left: "50%",
    margin: "auto",
    filter: "drop-shadow(4px -4px 4px rgb(0, 0, 0, .2))"
};

// const persistAnimation = 

const PlayerCardFolder: React.FC<{}> = () => {
    const [
        isOpen, 
        _startToggle,
        endToggle, 
        currentTransition
    ] = useTransitioningToggle(false);

    const startToggle = () => _startToggle();
    
    const forceFinish = (_: ToggleTransitions | null, webAnimation: Animation | null) => {
        webAnimation?.finish();
        webAnimation?.commitStyles();
    }

    return (
        <div>
            <ControlledAnimated<ToggleTransitions>
                currentAnimation={currentTransition}
                animations={SLIDERS}
                className="text-button"
                style={{ zIndex: 10, ...playerCardFolderStyle }}
            >
                <div
                    style={{
                        position: "absolute",
                        left: "0",
                        bottom: "0",
                        width: "100%",
                        height: "102%",
                        borderRadius: "16px",
                        background: "beige",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                />
            </ControlledAnimated>
            <ControlledAnimated<ToggleTransitions, "button">
                as="button"
                currentAnimation={currentTransition}
                onAnimationEnd={endToggle}
                animations={SLIDERS}
                className="text-button"
                onClick={startToggle}
                style={{ zIndex: 12, ...playerCardFolderStyle }}
                disabled={isOpen || !!currentTransition}
                tabIndex={0}
            >
                <div
                    className="flip-container full-size"
                    style={{ position: 'relative' }}
                >
                    <HoverAnimated<ToggleTransitions>
                        currentAnimation={currentTransition}
                        animations={{
                            hovering: toPersistedAnimation(folderAnimation([{
                                transform: 'rotateX(-10deg) rotateY(-1deg)',
                                iterations: 'Infinity'
                            }], 100)),
                            notHovering: toPersistedAnimation(folderAnimation([{
                                transform: 'rotateX(0) rotateY(0)',
                                iterations: 'Infinity'
                            }], 100)),
                            ...folderToggleAnimations([
                                { transform: 'rotateX(0) rotateY(0)' },
                                { transform: 'rotateX(-40deg) rotateY(-2deg)' },
                                { transform: 'rotateX(0) rotateY(0)' }
                            ])
                        }}
                        style={{
                            transformOrigin: "bottom",
                            position: "absolute",
                            bottom: "0",
                            left: "0",
                            filter: "drop-shadow(4px -4px 4px rgb(0, 0, 0, .2))",
                            height: "100%",
                            width: "100%",
                            perspective: "0"
                        }}
                    >
                        <div style={{
                            position: "absolute",
                            left: "-1%",
                            bottom: "0",
                            width: "100%",
                            height: "85%",
                            borderRadius: "16px",
                            background: "beige"
                        }} />
                        <div style={{
                            position: "absolute",
                            left: "-1%",
                            bottom: "0",
                            borderRadius: "16px",
                            width: "66%",
                            height: "100%",
                            background: "linear-gradient(225deg,transparent 10%,beige 0)"
                        }} />
                    </HoverAnimated>
                </div>
            </ControlledAnimated>
            <ControlledAnimated<ToggleTransitions>
                currentAnimation={currentTransition}
                onAnimationEnd={forceFinish}
                animations={folderToggleAnimations([
                    { zIndex: 11 },
                    { zIndex: 13 },
                    { zIndex: 13 },
                ])}
                className="flip-container full-size"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 11
                }}
                onClick={isOpen && !currentTransition ? startToggle : undefined}
            >
                <ControlledAnimated<ToggleTransitions>
                    currentAnimation={currentTransition}
                    onAnimationEnd={forceFinish}
                    animations={folderToggleAnimations([
                        { 
                            transform: 'translate(-50%, -8vh) scale(60%)', 
                            filter: 'drop-shadow(4px -4px 4px rgb(0, 0, 0, .2))', 
                            top: '100%' 
                        }, { 
                            transform: 'translate(-50%, -50%) scale(60%) rotateX(-30deg)', 
                            filter: 'drop-shadow(4px 0 4px rgb(0, 0, 0, .2))', 
                            top: '50%' 
                        },
                        { 
                            transform: 'translate(-50%, -50%) scale(100%)', 
                            filter: 'drop-shadow(4px 4px 4px rgb(0, 0, 0, .2))', 
                            top: '50%' 
                        },
                    ])}
                    onClick={(e: any) => e.stopPropagation()}
                    style={{
                        position: "fixed",
                        top: "100%",
                        left: "50%",
                        width: "80vw",
                        height: "80vh",
                        background: "#fff",
                        transformOrigin: "top center",
                        transform: "translate(-50%,-8vh) scale(60%)",
                        filter: "drop-shadow(4px -4px 4px rgb(0, 0, 0, .2))"
                    }}
                >
                    <PlayerCard />
                    <button
                        style={{
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            position: 'absolute',
                            top: '12px',
                            right: '12px'
                        }}
                        onClick={startToggle}
                        disabled={!isOpen || !!currentTransition}
                    >
                        X
                    </button>
                </ControlledAnimated>
            </ControlledAnimated>
        </div>
    );
};


export default PlayerCardFolder;
