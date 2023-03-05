import React from "react"
import { CardContainer, useFlipBack } from './MenuCard.js';

const StatsCard: React.FC = () => {
    const flipBack = useFlipBack();

    return (
        <CardContainer>
            <h2>Stats</h2>
            <button onClick={flipBack}>Back</button>
        </CardContainer>
    );
};

export default StatsCard;
