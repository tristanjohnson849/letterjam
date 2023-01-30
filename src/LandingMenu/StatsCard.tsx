import React from "react"
import { MenuCardBackProps } from './MenuCard';

const StatsCard: React.FC<MenuCardBackProps> = ({ flip }) => {

    return (
        <>
            <h2>Stats</h2>
            <button onClick={flip}>Back</button>
        </>
    );
};

export default StatsCard;
