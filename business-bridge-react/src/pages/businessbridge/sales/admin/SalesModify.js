// import {useNavigate, useParams} from "react-router-dom";
// import {useDispatch} from "react-redux";
// import {useEffect, useState} from "react";
// import {putSuccess} from "../../../../modules/SalesModule";
//
// function SalesModify () {
//
//     const { salesCode } = useParams();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//
//     /* 읽기 모드와 수정 모드를 전환 하는 state */
//     const [modifyMode, setModifyMode] = useState(false);
//
//     /* 최초 렌더링 시 상품 상세 정보 조회 */
//     useEffect(() => {
//         dispatch(callAdminSalesAPI({salesCode}));
//     }, []);
//
//
//
//     /* 수정 성공시 영업 목록으로 이동*/
//     useEffect(() => {
//         if (putSuccess === true) {
//             navigate('/sales-salesList', { replace : true })
//         }
//     }, [putSuccess]);
// }
//
//
//     /* 입력 양식 값 변경 시 state 수정 */
//     const onChangeHandler = e => {
//         setForm({
//             ...form,
//             [e.target.name] : e.target.value
//         })
//     }