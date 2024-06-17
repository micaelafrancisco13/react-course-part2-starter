import useCounterStore from "./store";

const Counter = () => {
    // use the useCounterStore Zustand hook as a replacement for the useReducer hook
    const { counter, increment, reset } = useCounterStore();

    return (
        <div>
            Counter ({counter})
            <button
                onClick={() => increment()}
                className="btn btn-primary mx-1"
            >
                Increment
            </button>
            <button
                onClick={() => reset()}
                className="btn btn-primary mx-1"
            >
                Reset
            </button>
        </div>
    );
};

export default Counter;
