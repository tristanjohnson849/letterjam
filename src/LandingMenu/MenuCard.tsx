import React, { PropsWithChildren, useContext } from 'react';
import { styles } from '../constants.js';
import Flipper, { FlipContext } from '../util/Flipper.js';
import MainMenu from './MainMenu.js';

const MenuCard: React.FC = () => (
    <div className="fly-down" style={{ zIndex: 2 }}>
        <div className="pop-hover pop-transition">
            <Flipper 
                faceStyle={{
                    border: `16px solid ${styles.colors.red}`,
                    borderRadius: '12px',
                    textAlign: 'center',
                    padding: '32px',
                    background: '#fff',
                    boxSizing: 'border-box',
                    aspectRatio: '2/3',
                    minWidth: '300px',
                    translate: '-50% -50%',
                    filter: 'drop-shadow(4px 4px 4px rgb(0, 0, 0, .5))',
                }}
            >
                <MainMenu/>
            </Flipper>
        </div>
    </div>
);

export const useFlipBack = () => {
    const { flipTo } = useContext(FlipContext);
    return () => flipTo(<MainMenu/>, 'flipLeft');
}

export const CardContainer: React.FC<PropsWithChildren<{}>> = ({ children }) => (
    <>
        <h1 style={{ fontFamily: 'Brush Script MT, cursive', fontSize: '48px'}}>Letter Jam</h1>
        {children}
    </>
);

export default MenuCard;