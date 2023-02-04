import React, { CSSProperties, MouseEventHandler, useState } from "react";
import { styles } from "../constants";

interface DropProps {
    color: 'red' | 'green';
    x: number;
    animateTime: number;
    onMouseDown?: MouseEventHandler<HTMLElement>
}
const Drop: React.FC<DropProps> = ({ color, x, animateTime, onMouseDown }) => {
    const [hover, setHover] = useState(false);
    const colorClass = color === 'red' ? "shiny-red" : "shiny-green";
    const shadowColor = color === 'red'
        ? styles.colors.redShadow
        : styles.colors.greenShadow;
    return (
        <button
            
            onMouseDown={onMouseDown}
            className={`text-button drop ${colorClass}`}
            style={{
                '--drop-size': '64px',
                boxShadow: `2px 3px 6px ${shadowColor}`,
                left: `${x}vw`,
                animation: `falling ${animateTime}ms linear forwards`,
            } as CSSProperties}
        />
    );
};


export default Drop;