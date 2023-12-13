
import {useEffect, useState} from "react";
import {callEmployeeListAPI, callSearchEmployeeListAPI} from "../../../apis/EmployeeAPICalls";
import {useDispatch, useSelector} from "react-redux";
import EmployeeRegistrationItem from "../../../components/items/EmployeeRegistrationItem";
import PagingBar from "../../../components/common/PagingBar";
import {ToastContainer} from "react-toastify";
import Error from "../../error/Error";

function EmployeeRegistration(){
    const dispatch = useDispatch();
    const [currentEmplyName, setCurrentEmplyName] = useState("");
    const [currentDartMentName, setCurrentDartMentName] = useState("");
    const [currentPositionName, setCurrentPositionName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { employeesListInfo } = useSelector(state => state.memberReducer);

    useEffect(() => {

         dispatch(callEmployeeListAPI({currentPage}));

    }, [currentPage]);

    const onClickSearchHandler =  () => {

        dispatch(callSearchEmployeeListAPI({currentPage,currentEmplyName,currentDartMentName,currentPositionName}));
    }
    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <div className="employeeRegistration-title">
                <h2> 부서/직위목록</h2>
            </div>
            <div className="employeeRegistration-type">
                <strong>전체</strong>
            </div>
            {employeesListInfo && employeesListInfo.data.length > 0 ? (
                <table className="employee-table">
                    <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>이름</th>
                        <th>부서</th>
                        <th>직위</th>
                        <th>휴대폰</th>
                        <th>이메일</th>
                        <th>사내번호</th>
                        <th>소속</th>
                    </tr>
                    </thead>
                    <EmployeeRegistrationItem data={employeesListInfo.data} />
                </table>
            ) : (
                <div className="no-results-message">
                    사원이 존재하지 않습니다.
                </div>
            )}
            { employeesListInfo &&
                        <div className="employeeRegistration-Select">
                            <div className="employeeRegistration-input">
                                <input className="employeeRegistration-input-box"
                                       value={currentEmplyName}
                                       placeholder="이름"
                                       onChange={(e) => setCurrentEmplyName(e.target.value)}
                                />
                            </div>
                            <div className="employeeRegistration-input">
                                <input className="employeeRegistration-input-box"
                                       value={currentDartMentName}
                                       placeholder="부서"
                                       onChange={(e) => setCurrentDartMentName(e.target.value)}
                                />
                            </div>
                            <div className="employeeRegistration-input">
                                <input className="employeeRegistration-input-box"
                                       value={currentPositionName}
                                       placeholder="직위"
                                       onChange={(e) => setCurrentPositionName(e.target.value)}
                                />
                            </div>
                            <div
                                className="employeeRegistration-input-btn"
                                 onClick={ onClickSearchHandler }
                            >검색</div>
                        </div>
            }
            {
                employeesListInfo &&
                    <PagingBar pageInfo={ employeesListInfo.pageInfo } setCurrentPage={ setCurrentPage }/>
            }
                </>
    );
}

export default EmployeeRegistration;