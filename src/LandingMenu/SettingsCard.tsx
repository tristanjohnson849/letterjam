import React from "react"
import { CardContainer, useFlipBack } from './MenuCard.js';

const SettingsCard: React.FC = () => {
    const flipBack = useFlipBack();

    return (
        <CardContainer>
            <h2>Settings</h2>
            <button onClick={flipBack}>Back</button>
        </CardContainer>
    );
};

export default SettingsCard;
