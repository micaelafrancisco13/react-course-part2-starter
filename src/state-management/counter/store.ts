import { create } from "zustand";

interface CounterStore {
    counter: number;
    max: number;
    increment: () => void;
    reset: () => void;
}

const useCounterStore = create<CounterStore>((set) => ({
    counter: 0,

    // demo to make the nav bar only re-render if counter changes, but not the max value
    max: 5,

    // takes the current state and returns the next state
    increment: () => set(store => ({ counter: store.counter + 1 })),

    reset: () => set(() => ({ max: 10 }))
}));

export default useCounterStore;