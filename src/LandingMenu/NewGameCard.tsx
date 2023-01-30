import React, { useState } from "react"
import { MenuCardBackProps } from './MenuCard';

const NewGameCard: React.FC<MenuCardBackProps> = ({ flip }) => {
    const [players, setPlayers] = useState(2);

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
        }}>
            <h2>New Game</h2>
            <label>
                <input type="number" value={players} onChange={(e) => setPlayers(parseInt(e.target.value))} min={2} max={8} />
                Players
            </label>
            <div>
                <button type="submit">Start</button>
                <button onClick={flip}>Back</button>
            </div>
        </form>
    );
};

export default NewGameCard;
