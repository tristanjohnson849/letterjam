import React, { useRef, useState } from "react";


const PlayerCardFolder: React.FC<{}> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [opening, setIsOpening] = useState(false);

    const onClick = () => {
        setIsOpen(prev => !prev);
        setIsOpening(true);
    };

    return (
        <div>
            <div
                className={`player-card-folder player-card-folder-${isOpen ? 'open' : ''}`}
                onClick={onClick}
                style={{ zIndex: 10 }}
            >
                <div className="folder-back"/>
            </div>
            <div
                className={`player-card-folder player-card-folder-${isOpen ? 'open' : ''}`}
                onClick={onClick}
                style={{ zIndex: 13 }}
            >
                <div
                    className="flip-container full-size"
                    style={{ position: 'relative' }}
                >
                    <div
                        className={`folder-front ${opening ? 'folder-front-opening' : ''}`}
                        onTransitionEnd={() => setIsOpening(false)}
                    >
                        <div className="folder-front-panel"/>
                        <div className="folder-front-tab"/>
                    </div>
                </div>
            </div>
            <div className="flip-container full-size" style={{ position: 'fixed', top: 0, left: 0, zIndex: isOpen ? 14 : 12 }}>
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
