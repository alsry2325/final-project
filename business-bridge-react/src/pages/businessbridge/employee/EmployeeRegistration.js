
import {useEffect, useState} from "react";
import {callEmployeeListAPI} from "../../../apis/EmployeeAPICalls";
import {useDispatch, useSelector} from "react-redux";
import EmployeeRegistrationItem from "../../../components/items/EmployeeRegistrationItem";
import PagingBar from "../../../components/common/PagingBar";

function EmployeeRegistration(data){
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentEmplyName, setCurrentEmplyName] = useState();
    const [currentPositionName, setCurrentPositionName] = useState();
    const { employeesInfo } = useSelector(state => state.memberReducer);
    useEffect(() => {

         dispatch(callEmployeeListAPI(currentPage,currentEmplyName,currentPositionName));

    }, [currentPage]);

    return (
        <>
            <div className="employeeRegistration-title">
                <h2> 부서/직위목록</h2>
            </div>
            <div className="employeeRegistration-type">
                <strong>전체</strong>
            </div>
            {
                employeesInfo &&
                    <EmployeeRegistrationItem data={employeesInfo.data}/>
            }
                <div className="employeeRegistration-Select">
                   <select className="employeeRegistration-Select-box" >
                      <option value="option1">이름</option>
                       <option value="option2">부서</option>
                       <option value="option3">직위</option>
                  </select>
                    <div className="employeeRegistration-input">
                       <input className="employeeRegistration-input-box"></input>
                    </div>
                    <div className="employeeRegistration-input-btn">검색</div>
                 </div>
            {/*{*/}
            {/*    employeesInfo &&*/}
            {/*    <PagingBar pageInfo={employeesInfo.pageinfo} setCurrentPage={setCurrentPage}/>*/}
            {/*}*/}
        </>
    );
}

export default EmployeeRegistration;