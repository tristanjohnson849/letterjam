import React, { useEffect, useState } from 'react';
import { generate as newId } from 'shortid';
import Drop from './Drop.js';
import MenuCard from './MenuCard.js';
import Splatter from './Splatter.js';

interface DropData {
    id: string;
    x: number;
    color: 'red' | 'green';
    animateTime: number;
};

interface SplatterData { 
    id: string;
    color: 'red' | 'green';
    pos: [number, number]
}

const LandingMenu: React.FC<{}> = () => {
    const [dropIndex, setDrops] = useState<{ [id: string]: DropData }>({});
    const drops = Object.values(dropIndex);
    const removeDrop = (id: string) => {
        setDrops(({[id]: toRemove, ...rest}) => rest);
    }

    const [splatterIndex, setSplatters] = useState<{ [id: string]: SplatterData }>({});
    const splatters = Object.values(splatterIndex);
    const addSplatter = (id: string, color: 'red' | 'green', pos: [number, number]) => setSplatters(prev => ({
        ...prev,
        [id]: { id, color, pos }
    }));

    const removeSplatter = (id: string) => {
        setSplatters(({[id]: toRemove, ...rest}) => rest);
    }
    
    const [timerFlag, setTimerFlag] = useState<boolean | undefined>();
    
    useEffect(() => {
        setTimeout(() => setTimerFlag(true), 50);
    }, [])

    useEffect(() => {
        if (timerFlag !== undefined) {
            const id = newId();
            const animateTime = randomBetween(8000, 16000);

            setDrops(drops => ({...drops, [id]: {
                id,
                x: randomBetween(10, 90, false),
                color: randomBool() ? 'red' : 'green',
                animateTime
            } }));

            setTimeout(() => removeDrop(id), animateTime);

            setTimeout(() => {
                setTimerFlag(prev => !prev);
            }, randomBetween(500, 2000));
        }
    }, [timerFlag]);

    return (
        <div style={{ 
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <MenuCard/>
            {drops.map(({ id, x, color, animateTime }) => 
                <Drop key={id} x={x} color={color} animateTime={animateTime} onMouseDown={(e) => {
                    addSplatter(id, color, [e.pageX, e.pageY])
                    removeDrop(id)
                }}/>
            )}
            {splatters.map(({ id, color, pos }) => <Splatter key={id} color={color} pos={pos} remove={() => removeSplatter(id)}/>)}
        </div>
    );
};


export const randomBetween = (min: number, max: number, asInt: boolean = true) => {
    const num = (Math.random() * (max - min)) + min;
    return asInt ? Math.floor(num) : num;
};
export const randomBool = (): boolean => Math.random() > 0.5;


export default LandingMenu;
