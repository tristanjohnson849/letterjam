import { SetStateAction, useEffect, useState, Dispatch, useRef, Ref, useDebugValue } from "react";
import { times } from 'lodash';

export const isFunctionAction = <T>(action: SetStateAction<T>): action is (prevState: T) => T => (
    typeof action === 'function'
);

export interface QueuedState<T> {
    current: T;
    enqueue: (action: SetStateAction<T>) => void;
    transition: () => void;
    transitionAll: () => void;
}

interface InternalQueuedState<T> {
    current: T;
    actionQueue: SetStateAction<T>[];
}

export const useQueuedState = <T>(initialState?: T): QueuedState<T> => {
    const [queuedState, setQueuedState] = useState<InternalQueuedState<T>>({ current: initialState, actionQueue: [] });

    const transition = () => setQueuedState(({ current, actionQueue }: InternalQueuedState<T>) => {
        if (actionQueue.length <= 0) {
            return { current, actionQueue };
        }
        const [action, ...remaining] = actionQueue;
        return {
            current: isFunctionAction(action)
                ? action(current)
                : action,
            actionQueue: remaining
        };
    });

    return {
        current: queuedState.current,
        enqueue: (newAction: SetStateAction<T>) => setQueuedState(({ current, actionQueue }) => (
            { current, actionQueue: [...actionQueue, newAction] }
        )),
        transition,
        transitionAll: () => times(queuedState.actionQueue.length, transition)
    };
}

export function useControllableState<T>(value: T, initialValue?: T | undefined): [state: T, setState: (action: React.SetStateAction<T>) => void] {
    const [stateValue, setState] = useState(value !== undefined ? value : initialValue);
    const effectiveValue = value !== undefined ? value : stateValue;
    return [effectiveValue, setState];
}

export const useIsHovered = <E extends HTMLElement>(): [boolean, Ref<E>] => {
    const [value, setValue] = useState(false);
    const ref = useRef<E>(null);
    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);
    useEffect(
        () => {
            const node = ref.current;
            if (node) {
                node.addEventListener("mouseover", handleMouseOver);
                node.addEventListener("mouseout", handleMouseOut);
                return () => {
                    node.removeEventListener("mouseover", handleMouseOver);
                    node.removeEventListener("mouseout", handleMouseOut);
                };
            }
        },
        [ref.current] // Recall only if ref changes
    );
    return [value, ref];
}
