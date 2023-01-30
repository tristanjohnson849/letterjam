import React from "react"
import { MenuCardBackProps } from './MenuCard';

const HelpCard: React.FC<MenuCardBackProps> = ({ flip }) => {

    return (
        <>
            <h2>Help</h2>
            <button onClick={flip}>Back</button>
        </>
    );
};

export default HelpCard;
