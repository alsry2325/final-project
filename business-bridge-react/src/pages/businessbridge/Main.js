import {Link, NavLink, useNavigate} from "react-router-dom";
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

function Main(){


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickSalesMain = () =>{
        navigate("/sales/salesList/1");
    }

    return(
        <>
            <Outlet/>
            메인입니다!!!
            <button onClick={ onClickSalesMain }>영업관리(임시)메인이동</button>
        </>

        
    );
}

export default Main;