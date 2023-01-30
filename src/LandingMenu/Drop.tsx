import React, { MouseEventHandler } from "react";
import { styles } from "../constants";


interface DropProps {
    color: 'red' | 'green';
    x: number;
    animateTime: number;
    onClick?: MouseEventHandler<HTMLDivElement>
}
const Drop: React.FC<DropProps> = ({ color, x, animateTime, onClick }) => {
    return (
        <div 
            onClick={onClick}
            className={`drop ${color === 'red' ? "shiny-red" : "shiny-green"}`}
            style={{
                position: 'fixed',
                boxShadow: `2px 3px 6px ${color === 'red' ? styles.colors.redShadow : styles.colors.greenShadow}`,
                bottom: 0,
                left: `${x}vw`,
                animation: `falling ${animateTime}ms linear forwards`,
                cursor: onClick ? 'pointer' : 'default',
                zIndex: 1
            }}
        />
    );
};


export default Drop;