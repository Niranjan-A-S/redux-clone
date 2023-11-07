import { createStore } from "./redux";

const initialState = { count: 50 };
type Action =
    { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'incrementBy', payload: number }
    | { type: 'decrementBy', payload: number }
    | { type: 'reset' }
    | { type: 'set', payload: number };

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
        case 'set':
            return { count: action.payload }
        default:
            return state;
    }
}

const store = createStore(initialState, reducer);
store.subscribe((newState) => {
    console.dir(`State changed! ${newState.count}`);
})
store.subscribe((newState) => {
    demo.innerText = `${newState.count}`;
})


myRange.addEventListener('input', (event) => {
    const value = (event.target as HTMLInputElement).value;
    store.dispatch({ type: 'set', payload: Number(value) });
})