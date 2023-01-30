import React, { CSSProperties, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../constants';
import { generate as newId } from 'shortid';
import Drop from './Drop';


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
            <div className="pop-hover-sm" style={{
                border: `8px solid ${styles.colors.red}`,
                borderRadius: '12px',
                textAlign: 'center',
                padding: '32px',
                boxShadow: '8px 8px 12px #d4d4d4',
                height: '400px',
                width: '240px',
                zIndex: 2,
                background: '#fff'
            }}>
                <h1>Letter Jam</h1>
                <MenuLink to="/play" style={{ fontSize: '24px', fontWeight: 'bold'}}>Play</MenuLink>
                <MenuLink to="/stats">Stats</MenuLink>
                <MenuLink to="/settings">Settings</MenuLink>
                <MenuLink to="/help">Help</MenuLink>
            </div>
            {drops.map(({ id, x, color, animateTime }) => 
                <Drop key={id} x={x} color={color} animateTime={animateTime} onClick={(e) => {
                    addSplatter(id, color, [e.pageX, e.pageY])
                    removeDrop(id)
                }}/>
            )}
            {splatters.map(({ id, color, pos }) => <Splatter key={id} color={color} pos={pos} remove={() => removeSplatter(id)}/>)}
        </div>
    );
};

interface MenuLinkProps {
    to: string;
    style?: CSSProperties;
}

const randomBetween = (min: number, max: number, asInt: boolean = true) => {
    const num = (Math.random() * (max - min)) + min;
    return asInt ? Math.floor(num) : num;
};
const randomBool = (): boolean => Math.random() > 0.5;

const MenuLink: React.FC<PropsWithChildren<MenuLinkProps>> = ({ to, children, style = {} }) => (
    <div style={{
        margin: '24px',
        fontSize: '20px',
    }}>
        <Link to={to} style={{textDecoration: 'none', color: '#000'}}><div style={{ width: '100%', ...style }} className="menu-link pop-hover-lg ">{children}</div></Link>
    </div>
)

const Splatter: React.FC<{color: 'red' | 'green', pos: [number, number], remove: () => void}> = ({ color, pos: [x, y], remove }) => {
    const [isFading, setIsFading] = useState(false);
    const splashBackground = useRef(randomSplatterBackground());
    const randomRotate = useRef(`rotate(${randomBetween(0, 180)}deg)`);

    useEffect(() => {
        setIsFading(true);
    }, []);

    return (
        <div style={{ 
            mixBlendMode: 'multiply',
        }}>
            <div 
                className={`splatter-${color}`}
                style={{
                    position: 'fixed',
                    left: `${x}px`,
                    top: `${y}px`,
                    filter: 'contrast(20)',
                    transform: `translate(-50%, ${isFading ? 0 : -50}%)`,
                    transition: 'all 3000ms ease-in-out',
                    background: '#fff'
                }}
            >
                <div 
                    onTransitionEnd={() => remove()}
                    style={{
                        width: '120px',
                        height: '120px',
                        background: splashBackground.current,
                        backgroundClip: 'padding-box',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: '50%',
                        boxShadow: '0 0 0 20px #fff',
                        filter: 'blur(8px)',
                        transform: randomRotate.current,
                        transition: 'all 3000ms ease-in-out',
                        opacity: isFading ? 0 : 1
                    }}
                />
            </div>
        </div>
    );
};

const earlyPrimes = [3, 5, 7, 11, 13, 17, 19];

const randomPrime = (excludes: number[] = [], lowerBound: number = 0, upperBound=13): number => {
    const toPick = earlyPrimes.filter(num => num > lowerBound && num <= upperBound && !excludes.includes(num));
    return toPick[randomBetween(0, toPick.length - 1)];
}

const randomSplatterBackground = (): string => {
    const [lower1, grad1] = randomSplatterGradient([], randomBetween(70, 90));
    const [, grad2] = randomSplatterGradient([lower1]);

    return `${grad1},${grad2},radial-gradient(#000 ${randomBetween(10, 30)}%, #0000 0), #fff`;
}

const randomSplatterGradient = (lowerExcludes?: number[], sizeOverride?: number): [number, string] => {
    const lower = randomPrime(lowerExcludes, 0, 11);
    const higher = randomBetween(lower + 8, lower + 15);

    const pos = randomBetween(40, 60);
    const size = sizeOverride || randomBetween(40, 60);
    return [lower, `repeating-conic-gradient(#0000 0 ${lower}%, #000 0 ${higher}%) ${pos}% / ${size}% ${size}%`];
}

export default LandingMenu;
