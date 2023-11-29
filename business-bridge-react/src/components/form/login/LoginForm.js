import {useDispatch} from "react-redux";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function LoginForm(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({});

    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickLoginHandler = () => {

    }

    const onClickPasswordHandler = () =>{
        navigate('/emp/employee/FindPassword');
    }

    return(
            <div className="page">
                <div className="cover">
                    <img className="main-Image" src="/images/mainImage.png" alt="My Image" />
                    <h1>BusinessBridge</h1>
                    <input
                        type="text"
                        name="emplyId"
                        placeholder="사원번호"
                        onChange={onChangeHandler}
                    />
                    <input
                        type="password"
                        name="emplyPassword"
                        placeholder="비밀번호"
                        onChange={onChangeHandler}
                    />
                    <div className="login-btn"
                         onClick={ onClickLoginHandler }
                    >로그인</div>
                    <div className="password-btn"
                         onClick={ onClickPasswordHandler }
                    >비밀번호 찾기</div>
                </div>
            </div>


    );
}

export default LoginForm;