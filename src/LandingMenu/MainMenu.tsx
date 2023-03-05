import React, { CSSProperties, PropsWithChildren, useContext } from "react"
import { FlipContext } from "../util/Flipper.js";
import HelpCard from "./HelpCard.js";
import { CardContainer } from './MenuCard.js';
import NewGameCard from "./NewGameCard.js";
import SettingsCard from "./SettingsCard.js";
import StatsCard from "./StatsCard.js";

const MainMenu: React.FC = () => (
    <CardContainer>
        <MenuButton target={NewGameCard} style={{ fontSize: '24px', fontWeight: 'bold' }}>Play</MenuButton>
        <MenuButton target={StatsCard}>Stats</MenuButton>
        <MenuButton target={SettingsCard}>Settings</MenuButton>
        <MenuButton target={HelpCard}>Help</MenuButton>
    </CardContainer>
);

interface MenuButtonProps {
    style?: CSSProperties;
    target: React.FC;
}

const MenuButton: React.FC<PropsWithChildren<MenuButtonProps>> = ({ 
    children, 
    target: Target,
    style = {} 
}) => {
    const { flipTo } = useContext(FlipContext);
    return (
        <button
            style={{ width: '100%', fontSize: '20px', marginTop: '16px', ...style }}
            className="pop-hover pop-transition text-button"
            onClick={() => flipTo(<Target/>)}
        >
            {children}
        </button>
    );
};

export default MainMenu;
