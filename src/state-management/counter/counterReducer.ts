// action is an object that describes what the user is trying to do
// state variable is a number

interface Action {
    type: 'INCREMENT' | 'RESET';
}

const counterReducer = (state: number, action: Action): number => {
    // arbitrary values
    if (action.type === 'INCREMENT') return ++state;
    if (action.type === 'RESET') return 0;
    return state;
}

export default counterReducer;