import React, { useRef, useState } from "react";


const PlayerCardFolder: React.FC<{}> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [opening, setIsOpening] = useState(false);

    const onClick = () => {
        setIsOpen(prev => !prev);
        setIsOpening(true);
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div
                className={`player-card-folder player-card-folder-${isOpen ? 'open' : ''}`}
                onClick={onClick}
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: '50%',
                    width: '720px',
                    height: '480px',
                    margin: 'auto',
                    filter: 'drop-shadow(4px -4px 4px rgb(0,0,0,.2))',
                    zIndex: 10,
                    cursor: 'pointer'
                }}
            >
                <div
                    className="pop-hover flip-container"
                    style={{
                        height: '100%',
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    <div
                        className="flip-container"
                        style={{
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            height: '102%',
                            borderRadius: '16px',
                            background: 'beige',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    />
                </div>
            </div>
            <div
                className={`player-card-folder player-card-folder-${isOpen ? 'open' : ''}`}
                onClick={onClick}
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: '50%',
                    width: '720px',
                    height: '480px',
                    margin: 'auto',
                    zIndex: 13,
                    cursor: 'pointer'
                }}
            >
                <div
                    className="pop-hover flip-container"
                    style={{
                        height: '100%',
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    <div
                        className={`folder-front ${opening ? 'folder-front-opening' : ''}`}
                        onTransitionEnd={() => setIsOpening(false)}
                        style={{
                            position: 'absolute',
                            bottom: 0, left: 0,
                            filter: 'drop-shadow(4px -4px 4px rgb(0,0,0,.2))',
                            height: '100%',
                            width: '100%',
                            perspective: 0,
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            left: '-1%',
                            bottom: 0,
                            width: '100%',
                            height: '85%',
                            borderRadius: '16px',
                            background: 'beige',
                        }} />
                        <div style={{
                            position: 'absolute',
                            left: '-1%',
                            bottom: 0,
                            borderRadius: '16px',
                            width: '66%',
                            height: '100%',
                            background: 'linear-gradient(225deg, transparent 10%, beige 0)',
                        }} />
                    </div>
                </div>
            </div>
            <div style={{ perspective: '1000px', height: '100%', width: '100%', position: 'fixed', zIndex: isOpen ? 14 : 12 }}>
                <div
                    className={`player-card-container ${opening ?
                        'player-card-container-opening'
                        : isOpen
                            ? 'player-card-container-open'
                            : ''
                        }`}
                >
                    <h1 style={{ width: '100%', textAlign: 'center' }}>Player Card</h1>
                    <button style={{ position: 'absolute', top: '12px', right: '12px'}} onClick={onClick} disabled={!isOpen}>X</button>
                </div>
            </div>
        </div>
    );
};

export default PlayerCardFolder;
