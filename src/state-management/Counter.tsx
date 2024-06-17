import {useReducer} from 'react';
import counterReducer from "./reducers/counterReducer";

const Counter = () => {
    // state hook is not needed anymore
    // const [value, setValue] = useState(0);

    const [value, dispatch] = useReducer(counterReducer, 0);

    // by dispatching an action, we're telling React that the user is trying to increment the counter

    return (
        <div>
            Counter ({value})
            <button
                onClick={() => dispatch({type: 'INCREMENT'})}
                className="btn btn-primary mx-1"
            >
                Increment
            </button>
            <button
                onClick={() => dispatch({type: 'RESET'})}
                className="btn btn-primary mx-1"
            >
                Reset
            </button>
        </div>
    );
};

export default Counter;
