import React, { ChangeEventHandler, FocusEventHandler, useState } from "react"
import { useNavigate } from "react-router-dom";
import { validate } from "schema-utils";

import { styles } from "../constants";
import { MenuCardBackProps } from './MenuCard';

const isValid = (players: number) => (
     players >= 2 && players <= 8
);

const NewGameCard: React.FC<MenuCardBackProps> = ({ flip }) => {

    const [players, setPlayers] = useState<string | number>(2);
    const [validatedPlayers, setValidatedPlayers] = useState(players);
    
    const navigate = useNavigate();
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const newPlayers = e.target.valueAsNumber || e.target.value;
        setPlayers(newPlayers);
        if (e.target.reportValidity()) {
            setValidatedPlayers(players);
        }
    };

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const queryString = new URLSearchParams(new FormData(e.currentTarget) as unknown as string[][]).toString();

            navigate(`/new-game?${queryString}`)
        }}>
            <h2>New Game</h2>
            <div className="pop-hover" style={{ margin: '24px 48px'}}>
                <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <input 
                        type="number"
                        name="players" 
                        min={2} 
                        max={8} 
                        value={players} 
                        onChange={onChange}
                        onBlur={() => setPlayers(validatedPlayers)}
                        style={{ 
                            marginRight: '8px',
                            border: 'none',
                            borderBottom: '2px solid #999',
                            fontSize: '18px',
                            padding: '8px',
                            width: '32px',
                            textAlign: 'center'
                        }}
                    />
                    Players
                </label>
            </div>
            <div style={{ margin: '24px 0', display: 'flex', justifyContent: 'space-between'}}>
                <button type="submit" style={{
                    borderRadius: '8px',
                    width: '96px',
                    height: '36px',
                    backgroundColor: styles.colors.green,
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
