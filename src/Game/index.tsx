import React from "react";

const Game: React.FC<{}> = () => {

    return (
        <div style={{ 
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div
                style={{
                    position: 'absolute',
                    bottom: '-16px',
                    margin: 'auto',
                    border: '16px solid #BBB',
                    borderRadius: '16px',
                    width: '720px',
                    height: '64px'
                }}
            ></div>
        </div>
    );
}

export default Game;