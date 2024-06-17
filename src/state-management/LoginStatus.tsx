import useAuth from "./hooks/useAuth";

const LoginStatus = () => {
    // by encapsulating the useContext inside useAuth, we don't have to think about a particular
    // context to utilize, we can simply use our hook to get the shared objects
    const {user, dispatch} = useAuth();

    if (user)
        return (
            <>
                <div>
                    <span className="mx-2">{user}</span>
                    <a onClick={() => dispatch({type: 'LOGOUT'})} href="#">
                        Logout
                    </a>
                </div>
            </>
        );
    return (
        <div>
            <a onClick={() => dispatch({type: 'LOGIN', username: 'mosh.hamedani'})} href="#">
                Login
            </a>
        </div>
    );
};

export default LoginStatus;
