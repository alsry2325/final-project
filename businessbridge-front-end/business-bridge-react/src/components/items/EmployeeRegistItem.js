import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callEmployeeRegistAPI, callLoginEmployeeAPI} from "../../apis/EmployeeAPICalls";
import {ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";

function EmployeeRegistItem() {
    const navigate = useNavigate();
    const imageInput = useRef();
    const [imageUrl, setImageUrl] = useState('');
    const initialFormState = {
        emplyImg: null, // 파일 업로드를 위한 이미지
        emplyInternalNumber: '', // 사내번호
        emplyName: '', // 사원이름
        emplyId: '', // 사원아이디
        emplyPhoneNumber: '', // 개인번호
        emplyEmail: '', // 이메일
        positionCode: 0, // 직위
        departmentCode: 0, // 부서
    };
    const [form, setForm] = useState(initialFormState);
    const dispatch = useDispatch();
    const { postEmployeeSuccess }= useSelector(state => state.memberReducer);
    useEffect(() => {
        dispatch(callLoginEmployeeAPI());
    }, []);

    useEffect(() => {
        if ( postEmployeeSuccess === true){
            // 입력 필드 초기화
            imageInput.current.value = null;
            setForm(initialFormState); // initialFormState는 초기 폼 상태로 설정된 값이어야 합니다.
            navigate('/emp/employee/registrationList', { replace : true })
        }
    }, [postEmployeeSuccess]);
    /* 이미지 업로드 버튼 클릭 시 input type file이 클릭 되도록 하는 이벤트 */
    const onClickImageUpload = () => {

        imageInput.current.click();

    }

    /* 이미지 파일 첨부 시 동작하는 이벤트 */
    const onChangeImageUpload = () => {
        const fileReader = new FileReader();
        fileReader.onload = e => {
            const { result } = e.target;
            if(result) setImageUrl(result);
        }
        if(imageInput.current.files[0])
            fileReader.readAsDataURL(imageInput.current.files[0]);
    }

    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }


    const onClickEmployeeRegistHandler = () =>{
        /* 서버로 전달한 FormData 형태의 객체 설정 */
        const formData = new FormData();


        formData.append("emplyImg", imageInput.current.files[0]);
        formData.append("employeeRegistrationRequest", new Blob([JSON.stringify(form)], { type : 'application/json' }));

        dispatch(callEmployeeRegistAPI({employeeRegistrationRequest: formData}));


    }

    return(
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <table className="employeeRegist-employee-information">
                <thead>
                <tr>
                    <th>
                        { imageUrl &&
                            <img
                                className="employee-img"
                                alt="preview"
                                src={ imageUrl }
                            />
                        }
                            <>
                                <input
                                    style={{ display: 'none' }}
                                    type="file"
                                    name='emplyImg'
                                    accept="image/jpg,image/png,image/jpeg,image/gif"
                                    onChange={onChangeImageUpload}
                                    ref={imageInput}
                                    value={form.emplyImg}
                                />
                            </>
                        <button
                            className="employee-image-button"
                            onClick={ onClickImageUpload }
                        >
                            이미지 업로드
                        </button>
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
                        <input type="tel" placeholder="사내번호 입력" name="emplyInternalNumber" onChange={ onChangeHandler } value={form.emplyInternalNumber}/>
                    </td>
                </tr>
                <tr>
                    <td rowSpan='5'>
                        <input type="text" placeholder="사원이름 입력" name="emplyName" onChange={ onChangeHandler } value={form.emplyName} />
                    </td>
                    <td style={{ backgroundColor: '#F1F0F6' }}>사번</td>
                    <td colSpan="2">
                        <input type="text" placeholder="사원아이디 입력" name="emplyId" onChange={ onChangeHandler } value={form.emplyId}/>
                    </td>
                    <td style={{ backgroundColor: '#F1F0F6' }}>개인번호</td>
                    <td>
                        <input type="tel" placeholder="개인번호 입력" onChange={ onChangeHandler }  name="emplyPhoneNumber" value={form.emplyPhoneNumber}/>
                    </td>
                </tr>
                <tr>
                    <td style={{ backgroundColor: '#F1F0F6' }}>이메일</td>
                    <td colSpan="2"><input type="email" placeholder="사원이메일 입력" onChange={ onChangeHandler } name="emplyEmail" value={form.emplyEmail}/></td>
                </tr>
                <tr>
                    <td style={{ backgroundColor: '#F1F0F6' }}>직위</td>
                    <td colSpan="2">
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
                    </td>
                    <td style={{ backgroundColor: '#F1F0F6' }}>부서</td>
                    <td>
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
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="myPage-password-btn"
                 onClick={ onClickEmployeeRegistHandler }
            >
                사원등록
            </div>
        </>
    );
}
export default EmployeeRegistItem;