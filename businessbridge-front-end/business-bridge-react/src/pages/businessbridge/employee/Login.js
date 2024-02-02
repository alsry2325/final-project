import LoginForm from "../../../components/form/login/LoginForm";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import "react-toastify/dist/ReactToastify.css";
import {toast, ToastContainer} from "react-toastify";

function Login() {

    const { loginSuccess } = useSelector(state => state.memberReducer);

    useEffect(() => {
        console.log("Effect is running. Login success:", loginSuccess);
        if(loginSuccess === true) {
            window.location.replace("/");
        }
    },[loginSuccess]);

    return(
        <>
            <ToastContainer hideProgressBar={true} position="top-center" />
            <div className="background-div">
                <div className="login-div">
                    <LoginForm/>
                </div>
            </div>
        </>
    );
}

export default Login;