import React, { useState } from "react";


const PlayerCardFolder: React.FC<{}> = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div 
            onClick={() => setIsOpen(prev => !prev)}
            className={`player-card-folder ${isOpen ? 'folder-open' : 'folder-closed'}`}
            style={{
                position: 'fixed',
                bottom: 0,
                width: '720px',
                height: '480px',
                margin: 'auto',
                filter: 'drop-shadow(4px -4px 4px rgb(0,0,0,.2))',
                zIndex: 10,
                cursor: 'pointer'
            }}
        >
            <div className="pop-hover" style={{
                height: '100%',
                width: '100%'
            }}>
            <div style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                height: '102%',
                borderRadius: '16px',
                background: 'beige',
                zIndex: 11
            }}/>
            <div style={{
                position: 'relative',
                filter: 'drop-shadow(4px -4px 4px rgb(0,0,0,.2))',
                height: '100%',
                width: '100%',
                zIndex: 13
            }}>
                <div style={{
                    position: 'absolute',
                    left: '-1%',
                    bottom: 0,
                    width: '100%',
                    height: '85%',
                    borderRadius: '16px',
                    background: 'beige',
                }}/>
                <div style={{
                    position: 'absolute',
                    left: '-1%',
                    bottom: 0,
                    borderRadius: '16px',
                    width: '66%',
                    height: '100%',
                    background: 'linear-gradient(225deg, transparent 10%, beige 0)',
                }}/>
                </div>
            </div>
        </div>
    );
};

export default PlayerCardFolder;