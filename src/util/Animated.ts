import { SetStateAction, useState } from 'react';

/* 
Examples

const MyAnimation = () => {
    const [
        counter, 
        animatedSetCounter, 
        onAnimationEnd, 
        animationName
    ] = useAnimationState<number, 'bouncing'|'squishing'|'spinning'>(0);

    const nextAnimationState = ['bouncing','squishing','spinning'][Math.floor(Math.random() * 3)] as 'bouncing'|'squishing'|'spinning';
    const setCounter = animatedSetCounter(nextAnimationState);

    return <div>
        <div 
            style={{ animation: `${animationName} 1s linear` }}
            onAnimationEnd={onAnimationEnd}
        >Counter updates after animation completes: {}</div>
        <button disabled={!!animationName} onClick={() => setCounter(counter => {
            console.log(`Smash that button to see all counter transitions are queued, even though we skip to the last counter after animating. Counter: ${counter}`);
            return counter + 1;
        })}></button>
    </div>
}

const PowerButton = () => {
    const [
        isToggled, 
        animateToggle, 
        onAnimationEnd, 
        animationState
    ] = useAnimatedToggle(false);

    const animationName = animationState === null 
        ? animationState 
            ? 'toggling-on'
            : 'toggling-off'
        : 'none';

    return (
        <button 
            style={{ animation: `${animationName} 1s linear` }}
            onClick={animateToggle}
            onAnimationEnd={onAnimationEnd}
        >
            {isToggled ? 'On' : 'Off'}
        </button>
    );
}
*/

// [state, animateSetState, onAnimationEnd, animationState]
// state is the desired state to represent
// when animatedSetState is called on a given nextAnimationState, updates animationState
// when onAnimationEnd is called, dispatches the setState action
// when animating, animationState is the last called animationState. when not animating, animationState is null
export type AnimatedTransitionState<T, A> = [
    T,
    (nextAnimationState:  SetStateAction<A>) => (action: SetStateAction<T>) => void,
    () => void,
    A | null,
];

export const useAnimatedTransitionState = <T, A>(initialState?: T, initialAnimationState: A = null): AnimatedTransitionState<T, A> => {
    const [state, setState] = useState<T>(initialState);
    const [animationState, setAnimationState] = useState<{
        animationState: A | null;
        actionQueue: SetStateAction<T>[]
    }>({ 
        animationState: initialAnimationState, 
        actionQueue: [] 
    });

    const animatedSetState = (nextAnimationState: A | null) => (action: SetStateAction<T>) => {
        setAnimationState({ animationState: nextAnimationState, actionQueue: [...animationState.actionQueue, action] });
    };
    const onAnimationEnd = () => {
        animationState.actionQueue.forEach(setState);
        setAnimationState(null);
    };

    return [
        state,
        animatedSetState,
        onAnimationEnd,
        animationState.animationState,
    ]
}

// [isToggled, animateToggle, onAnimationEnd, animationState]
// when called, animatedToggle starts animation and queues a toggle switch
// onAnimationEnd, queued switches are completed and animationState is set to null
// animationState is true when toggling on, false when toggling off, and null when not animating.
export type AnimatedToggleState = [
    boolean,
    () => void,
    () => void,
    boolean | null,
];

export const useAnimatedToggle = (
    initialState?: boolean, 
    initialAnimationState: boolean = null
): AnimatedToggleState => {
    const [
        state, 
        animatedSetState, 
        onAnimationEnd, 
        animationState
    ] = useAnimatedTransitionState(initialState, initialAnimationState);
    const animatedToggle = () => animatedSetState(prev => !prev)(prev => !prev);

    return [state, animatedToggle, onAnimationEnd, animationState];
}
