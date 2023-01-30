import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { styles } from "../constants";
import { MenuCardBackProps } from './MenuCard';

const NewGameCard: React.FC<MenuCardBackProps> = ({ flip }) => {
    const [players, setPlayers] = useState(2);
    const navigate = useNavigate();

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const queryString = new URLSearchParams(new FormData(e.currentTarget) as unknown as string[][]).toString();

            navigate(`/new-game?${queryString}`)
        }}>
            <h2>New Game</h2>
            <div style={{ margin: '24px 48px'}}>
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                <input type="number" name="players" value={players} onChange={(e) => setPlayers(parseInt(e.target.value))} min={2} max={8} />
                Players
            </label>
            </div>
            <div style={{ margin: '24px 0', display: 'flex', justifyContent: 'space-between'}}>
                <button type="submit" style={{
                    borderRadius: '8px',
                    width: '96px',
                    height: '36px',
                    backgroundColor: styles.colors.red,
                    color: styles.colors.white,
                    fontSize: '24px',
                    border: 'none',
                    cursor: 'pointer'
                }}>Start</button>
                <button type="button" onClick={flip} style={{
                    backgroundColor: styles.colors.white,
                    color: '#666',
                    fontSize: '18px',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px'
                }}>Back</button>
            </div>
        </form>
    );
};

export default NewGameCard;
