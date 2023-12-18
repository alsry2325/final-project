
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import { callEmployeeListAPI, callSearchEmployeeListAPI } from "../../../apis/EmployeeAPICalls";
import PagingBar from "../../../components/common/PagingBar";
import { ToastContainer } from "react-toastify";
import EmployeeRegistrationListItem from "../../../components/items/EmployeeRegistrationItem";

function EmployeeRegistrationList(){
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [currentEmplyName, setCurrentEmplyName] = useState("");
    const [currentDartMentName, setCurrentDartMentName] = useState("");
    const [currentPositionName, setCurrentPositionName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { employeesListInfo } = useSelector((state) => state.memberReducer);

    // 페이징 처리 함수
    const handlePaging = (page) => {
        const searchParams = new URLSearchParams(location.search);
        const searchEmplyName = searchParams.get("empName");
        const searchDartMentName = searchParams.get("dartMentName");
        const searchPositionName = searchParams.get("positionName");

        setCurrentPage(page);

        // 검색어가 입력되어 있을 때와 아닐 때의 API 호출을 분기 처리
        if (searchEmplyName || searchDartMentName || searchPositionName) {
            dispatch(
                callSearchEmployeeListAPI({
                    currentPage: page,
                    currentEmplyName: searchEmplyName,
                    currentDartMentName: searchDartMentName,
                    currentPositionName: searchPositionName,
                })
            );
        } else {
            dispatch(callEmployeeListAPI({ currentPage: page }));
        }
    };

// useEffect 내에서의 페이징 처리
    useEffect(() => {
        // 페이징 처리 함수 호출
        handlePaging(currentPage);
    }, [currentPage]);
    const onClickSearchHandler = () => {
        const searchParams = new URLSearchParams();
        searchParams.set("page", currentPage);
        searchParams.set("empName", currentEmplyName);
        searchParams.set("dartMentName", currentDartMentName);
        searchParams.set("positionName", currentPositionName);

        navigate(`?${searchParams.toString()}`);

        dispatch(
            callSearchEmployeeListAPI({
                currentPage: 1,
                currentEmplyName,
                currentDartMentName,
                currentPositionName,
            })
        );
    };
    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <div className="employeeRegistration-title">
                <h2> 부서/직위 수정</h2>
            </div>
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
            <div className="employeeRegistration-type">
                <strong>전체</strong>
            </div>
            {employeesListInfo && employeesListInfo.data.length > 0 ? (
                <table className="employee-table">
                    <thead>
                    <tr>
                        <th>이름</th>
                        <th>부서</th>
                        <th>직위</th>
                        <th>휴대폰</th>
                        <th>이메일</th>
                        <th>사내번호</th>
                        <th>소속</th>
                    </tr>
                    </thead>
                    <EmployeeRegistrationListItem data={employeesListInfo.data} />
                </table>
            ) : (
                <>
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
                    </table>
                    <div className="no-results-message">
                        사원이 존재하지 않습니다.
                    </div>
                </>
            )
            }
            {
                employeesListInfo &&
                    <PagingBar pageInfo={ employeesListInfo.pageInfo } setCurrentPage={ setCurrentPage }/>
            }
                </>
    );
}

export default EmployeeRegistrationList;