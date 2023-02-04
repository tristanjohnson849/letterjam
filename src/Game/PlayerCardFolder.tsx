import React, { useRef, useState } from "react";


const PlayerCardFolder: React.FC<{}> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [animating, setIsAnimating] = useState<'opening'|'closing'|null>(null);

    const onClick = (animating: 'opening'|'closing'|null)=> () => {
        setIsOpen(prev => !prev);
        setIsAnimating(animating);
    };

    return (
        <div>
            <div
                className={`player-card-folder player-card-folder-${isOpen ? 'open' : ''}`}
                style={{ zIndex: 10 }}
            >
                <div className="folder-back"/>
            </div>
            <button
                className={`player-card-folder player-card-folder-${isOpen ? 'open' : ''}`}
                onClick={onClick('opening')}
                style={{ zIndex: 13 }}
                disabled={isOpen}
                tabIndex={0}
            >
                <div
                    className="flip-container full-size"
                    style={{ position: 'relative' }}
                >
                    <div
                        className={`folder-front ${animating ? 'folder-front-opening' : ''}`}
                    >
                        <div className="folder-front-panel"/>
                        <div className="folder-front-tab"/>
                    </div>
                </div>
            </button>
            <div className="flip-container full-size" style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                zIndex: isOpen || animating === 'closing' ? 14 : 12 }}>
                <div
                    onTransitionEnd={() => setIsAnimating(null)}
                    className={`player-card-container ${animating 
                        ? 'player-card-container-opening'
                        : isOpen
                            ? 'player-card-container-open'
                            : ''
                        }`}
                >
                    <h1 style={{ width: '100%', textAlign: 'center' }}>Player Card</h1>
                    <button 
                        style={{ 
                            border: 'none', 
                            background: 'none', 
                            cursor: 'pointer', 
                            position: 'absolute', 
                            top: '12px', 
                            right: '12px'
                        }} 
                        onClick={onClick('closing')} 
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
