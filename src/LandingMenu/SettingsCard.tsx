import React from "react"
import { MenuCardBackProps } from './MenuCard';

const SettingsCard: React.FC<MenuCardBackProps> = ({ flip }) => {

    return (
        <>
            <h2>Settings</h2>
            <button onClick={flip}>Back</button>
        </>
    );
};

export default SettingsCard;
