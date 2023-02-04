import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { useAnimatedToggle } from "../util/Animated";
import PlayerCard from "./PlayerCard";

const PlayerCardFolder: React.FC<{}> = () => {
    const [
        isOpen, toggleFolder,
        onAnimationEnd, animationState
    ] = useAnimatedToggle(false);

    const folderClass = `text-button player-card-folder player-card-folder-${isOpen ? 'open' : ''}`;
    const isClosing = animationState === false;

    return (
        <div>
            <div
                className={folderClass}
                style={{ zIndex: 10 }}
            >
                <div className="folder-back" />
            </div>
            <button
                className={folderClass}
                onClick={toggleFolder}
                style={{ zIndex: 13 }}
                disabled={isOpen}
                tabIndex={0}
            >
                <div
                    className="flip-container full-size"
                    style={{ position: 'relative' }}
                >
                    <div
                        className={`folder-front 'folder-front-${animationState}`}
                    >
                        <div className="folder-front-panel" />
                        <div className="folder-front-tab" />
                    </div>
                </div>
            </button>
            <div
                className="flip-container full-size"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: isOpen || isClosing ? 14 : 12
                }}
                onClick={isOpen && toggleFolder}
            >
                <div
                    className={`player-card-container ${animationState
                        ? 'player-card-container-opening'
                        : isOpen
                            ? 'player-card-container-open'
                            : ''
                        }`}
                    onTransitionEnd={onAnimationEnd}
                    onClick={(e) => e.stopPropagation()}
                >
                    <PlayerCard/>
                    <button
                        style={{
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            position: 'absolute',
                            top: '12px',
                            right: '12px'
                        }}
                        onClick={toggleFolder}
                        disabled={!isOpen}
                    >
                        X
                    </button>
                </div>
            </div>
        </div>
    );
};


export default PlayerCardFolder;
