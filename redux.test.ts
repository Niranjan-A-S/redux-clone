import { describe, it, expect, vi } from 'vitest';
import { createStore } from './redux';

describe('our redux ', () => {
    it('should update state predictably', () => {
        const initialState = { count: 0 };
        type Action =
            { type: 'increment' }
            | { type: 'decrement' }
            | { type: 'incrementBy', payload: number }
            | { type: 'decrementBy', payload: number }
            | { type: 'reset' };

        const reducer = (state: typeof initialState, action: Action) => {
            switch (action.type) {
                case 'increment':
                    return { count: state.count + 1 };
                case 'decrement':
                    return { count: state.count - 1 };
                case 'incrementBy':
                    return { count: state.count + action.payload };
                case 'decrementBy':
                    return { count: state.count - action.payload };
                case 'reset':
                    return initialState;
                default:
                    return state;
            }
        }

        const store = createStore(initialState, reducer);

        const noop = { sub: () => { } }
        vi.spyOn(noop, 'sub');
        store.subscribe(noop.sub);

        expect(store.getState()).toEqual({ count: 0 });
        store.dispatch({ type: 'increment' });
        expect(noop.sub).toHaveBeenCalledTimes(1);
        expect(store.getState()).toEqual({ count: 1 });
        store.dispatch({ type: 'decrement' });
        expect(store.getState()).toEqual({ count: 0 });
        store.dispatch({ type: 'incrementBy', payload: 5 });
        expect(store.getState()).toEqual({ count: 5 });
        store.dispatch({ type: 'decrementBy', payload: 3 });
        expect(store.getState()).toEqual({ count: 2 });

    })
})
