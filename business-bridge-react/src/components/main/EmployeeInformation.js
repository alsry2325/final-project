import SideCalendar from "./SideCalendar";
import {useEffect} from "react";
import { callLoginEmployeeAPI} from "../../apis/EmployeeAPICalls";
import {useDispatch, useSelector} from "react-redux";
import EmployeeInformationItem from "../items/EmployeeInformationItem";

function EmployeeInformation(){

    const dispatch = useDispatch();
    const { myPageInfo } = useSelector(state => state.memberReducer);

    useEffect(() => {
        dispatch(callLoginEmployeeAPI());
    }, []);
    return(

            <div className="main-employee-area">
                {
                    myPageInfo &&
                    <EmployeeInformationItem myPageInfo={ myPageInfo }/>
                }
                <div className="main-mailImage-cover">
                        <SideCalendar/>
                </div>
            </div>

    );
}

export default EmployeeInformation;