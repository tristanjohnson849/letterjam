import React, { useContext } from "react"
import { FlipContext } from "../util/Flipper.js";
import { CardContainer, useFlipBack } from './MenuCard.js';

const HelpCard: React.FC = () => {
    const flipBack = useFlipBack();

    return (
        <CardContainer>
            <h2>Help</h2>
            <button onClick={flipBack}>Back</button>
        </CardContainer>
    );
};

export default HelpCard;
