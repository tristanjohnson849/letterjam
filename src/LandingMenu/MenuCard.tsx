import React, { CSSProperties, PropsWithChildren, useState } from 'react';
import { styles } from '../constants.js';
import HelpCard from './HelpCard.js';
import NewGameCard from './NewGameCard.js';
import SettingsCard from './SettingsCard.js';
import StatsCard from './StatsCard.js';

const cardWrapperStyle: CSSProperties = {
    border: `16px solid ${styles.colors.red}`,
    borderRadius: '12px',
    textAlign: 'center',
    padding: '32px',
    background: '#fff',
    boxShadow: '8px 8px 12px rgba(0, 0, 0, 0.5)',
    boxSizing: 'border-box',
    aspectRatio: '2/3',
    minWidth: '300px',
    translate: '-50% -50%'
};

const MenuCard: React.FC<{}> = () => {
    const [flipped, setFlipped] = useState(false);
    const [backCard, setBackCard] = useState<React.ReactNode>(<NewGameCard flip={() => setFlipped(false)} />);

    const flipToCard = (BackCard: React.FC<MenuCardBackProps>) => () => {
        setFlipped(true);
        setBackCard(<BackCard flip={() => setFlipped(false)} />);
    }
    return (
        <div className="fly-down" style={{ zIndex: 2 }}>
            <div className="pop-hover pop-transition flip-container">
                <div className="flipper" style={{ transform: flipped ? 'rotateY(180deg)' : '' }}>
                    <div className="front" style={cardWrapperStyle}>
                        <h1 style={{ fontFamily: 'Brush Script MT, cursive', fontSize: '48px'}}>Letter Jam</h1>
                        <MenuButton flip={flipToCard(NewGameCard)} style={{ fontSize: '24px', fontWeight: 'bold' }}>Play</MenuButton>
                        <MenuButton flip={flipToCard(StatsCard)}>Stats</MenuButton>
                        <MenuButton flip={flipToCard(SettingsCard)}>Settings</MenuButton>
                        <MenuButton flip={flipToCard(HelpCard)}>Help</MenuButton>
                    </div>
                    <div className="back" style={cardWrapperStyle}>
                        <h1 style={{ fontFamily: 'Brush Script MT, cursive', fontSize: '48px'}}>Letter Jam</h1>
                        {backCard}
                    </div>
                </div>
            </div>
        </div>
    );
};

export interface MenuCardBackProps {
    flip: () => void;
}


interface MenuButtonProps {
    flip: () => void;
    style?: CSSProperties;
}

const MenuButton: React.FC<PropsWithChildren<MenuButtonProps>> = ({ children, flip, style = {} }) => (
    <button
        style={{ width: '100%', fontSize: '20px', marginTop: '16px', ...style }}
        className="pop-hover pop-transition text-button"
        onClick={flip}>
        {children}
    </button>
);

export default MenuCard;