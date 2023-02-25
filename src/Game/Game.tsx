import React from "react";
import PlayerCardFolder from './PlayerCardFolder.js';

const Game: React.FC<{}> = () => {

    return (
        <div style={{ 
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <PlayerCardFolder />
        </div>
    );
}

export default Game;