import React, { CSSProperties, PropsWithChildren, useState } from 'react';
import { styles } from '../constants';
import HelpCard from './HelpCard';
import NewGameCard from './NewGameCard';
import SettingsCard from './SettingsCard';
import StatsCard from './StatsCard';


const cardWrapperStyle: CSSProperties = {
    border: `16px solid ${styles.colors.red}`,
    borderRadius: '12px',
    textAlign: 'center',
    padding: '32px',
    background: '#fff',
    boxShadow: '8px 8px 12px rgba(0, 0, 0, 0.5)',
    height: '400px',
    width: '320px',
    boxSizing: 'border-box'
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
            <div className="pop-hover flip-container" style={{
                height: '400px',
                width: '320px',
            }}>
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
    <div
        style={{ width: '100%', fontSize: '20px', marginTop: '16px', cursor: 'pointer', ...style }}
        className="pop-hover"
        onClick={flip}>
        {children}
    </div>
);

export default MenuCard;