import {ToastContainer} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callEmloyeeinformationAPI, callEmployeeModifyAPI} from "../../../apis/EmployeeAPICalls";

function EmployeeModify() {

    const { emplyCode } = useParams();
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState();
    const dispatch = useDispatch();
    /* 읽기 모드와 수정 모드를 전환 하는 state */
    const [modifyMode, setModifyMode] = useState(false);
    const [form, setForm] = useState({});
    const {employeeInfo,putEmployeeSuccess} = useSelector(state => state.memberReducer);

    /* 입력 양식 값 변경 시 state 수정 */
    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        dispatch(callEmloyeeinformationAPI({emplyCode}));
    }, []);

    /* 수정 성공 시 사원목록으로 이동 */
    useEffect(() => {
        if(putEmployeeSuccess === true) {
            navigate(`/emp/employee/registrationList`, { replace : true })
        }
    }, [putEmployeeSuccess]);

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
    }

    const onClickEmployeeUpdateHandler = () => {
        const updateData = {
            positionCode: form.positionCode,
            departmentCode: form.departmentCode,
        };
        dispatch(callEmployeeModifyAPI({emplyCode, updateData}));
    }


    return(
        <>
        <div>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <div className="employeeRegistration-title">
                <h2> 사원정보 </h2>
            </div>
        </div>
            {
                employeeInfo &&
            <table className="employeeRegist-employee-information">
                <thead>
                <tr>
                    <th>
                        <img src={employeeInfo.emplyPhoto} alt="employeephoto" style={{ width: 180 ,display: "inline-block",borderRadius:20}} />
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style={{ backgroundColor: '#F1F0F6' }}>이름</td>
                    <td style={{ backgroundColor: '#F1F0F6' }}>소속</td>
                    <td colSpan="2">(주)비즈니스브릿지</td>
                    <td style={{ backgroundColor: '#F1F0F6' }}>사내번호</td>
                    <td>
                        {employeeInfo.emplyInternalNumber}
                    </td>
                </tr>
                <tr>
                    <td rowSpan='5'>
                        {employeeInfo.emplyName}
                    </td>
                    <td style={{ backgroundColor: '#F1F0F6' }}>사번</td>
                    <td colSpan="2">
                        {employeeInfo.emplyId}
                    </td>
                    <td style={{ backgroundColor: '#F1F0F6' }}>개인번호</td>
                    <td>
                        {employeeInfo.emplyPhoneNumber}
                    </td>
                </tr>
                <tr>
                    <td style={{ backgroundColor: '#F1F0F6' }}>이메일</td>
                    <td colSpan="2"> {employeeInfo.emplyEmail}</td>
                </tr>
                <tr>
                    <td style={{ backgroundColor: '#F1F0F6' }}>직위</td>
                    <td colSpan="2">
                        {modifyMode ? (
                        <select onChange={ onChangeHandler } name="positionCode" value={form.positionCode} >
                            <option value={0} selected disabled hidden>선택하세요</option>
                            <option value={1}  >사원</option>
                            <option value={2}  >주임</option>
                            <option value={3}  >대리</option>
                            <option value={4}  >과장</option>
                            <option value={5}  >차장</option>
                            <option value={6}  >부장</option>
                            <option value={7}  >상무</option>
                            <option value={8}  >전무</option>
                            <option value={9}  >이사</option>
                            <option value={10} >대표이사</option>
                        </select>
                        ) : (
                            <span>{employeeInfo.positionName}</span>
                        )}
                    </td>
                    <td style={{ backgroundColor: '#F1F0F6' }}>부서</td>
                    <td>
                        { modifyMode ?(
                        <select onChange={ onChangeHandler } name="departmentCode" value={form.departmentCode}>
                            <option value={0}  disabled hidden>선택하세요</option>
                            <option value={1} >영업본부</option>
                            <option value={2} >경영관리본부</option>
                            <option value={3} >마케팅본부</option>
                            <option value={4} >일반영업부</option>
                            <option value={5} >재무회계부</option>
                            <option value={6} >거래처관리부</option>
                            <option value={7} >기획부</option>
                        </select>
                        ):(
                            <span>{employeeInfo.departmentName}</span>
                        )}
                    </td>
                </tr>
                </tbody>
            </table>
            }
            <div className="employee-button-div">

                <div className="employee-modify-btn"
                     onClick={ () => navigate(-1) }
                >
                    돌아가기
                </div>
                { modifyMode &&
                    <div className="employee-modify-btn"
                         onClick={ onClickEmployeeUpdateHandler }
                    >
                        부서/직위 수정 저장하기
                    </div>
                }
                {!modifyMode &&
                    <div className="employee-modify-btn"
                         onClick={ onClickModifyModeHandler }
                    >
                        수정모드
                    </div>
                }
            </div>

        </>
    );

}

export default EmployeeModify;