import { create } from "zustand";

interface CounterStore {
    counter: number;
    increment: () => void;
    reset: () => void;
}

const useCounterStore = create<CounterStore>((set) => ({
    counter: 0,

    // takes the current state and returns the next state
    increment: () => set(store => ({ counter: store.counter + 1 })),

    reset: () => set(() => ({ counter: 0 }))
}));

export default useCounterStore;