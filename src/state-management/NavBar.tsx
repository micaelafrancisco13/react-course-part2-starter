import LoginStatus from './auth/LoginStatus';
import useTasks from "./tasks/useTasks";
import useCounterStore from "./counter/store";

const NavBar = () => {
    const { tasks, } = useTasks();
    const { counter } = useCounterStore();

    return (
        <nav className="navbar d-flex justify-content-between">
            <span className="badge text-bg-secondary">{counter}</span>
            <span className="badge text-bg-secondary">{tasks.length}</span>
            <LoginStatus/>
        </nav>
    );
};

export default NavBar;
