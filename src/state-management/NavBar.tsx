import LoginStatus from './LoginStatus';
import {useContext} from "react";
import TasksContext from "./context/tasksContext";

const NavBar = () => {
    const { tasks, } = useContext(TasksContext);

    return (
    <nav className="navbar d-flex justify-content-between">
      <span className="badge text-bg-secondary">{ tasks.length }</span>
      <LoginStatus />
    </nav>
  );
};

export default NavBar;
