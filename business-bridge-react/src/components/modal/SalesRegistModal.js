// import {useEffect, useState} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {useNavigate} from "react-router-dom";
// import {callSalesRegistAPI} from "../../apis/SalesAPICalls";
//
// function SalesRegistModal({ salesCode, setSalesRegistModal }) {
//     const [form, setForm] = useState({ salesCode });
//     const dispatch = useDispatch();
//     const { postSuccess } = useSelector( state => state.salesReducer);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         if(postSuccess === true ) {
//             navigate(`/sales/salesList`);
//         }
//     }, [postSuccess]);
//
//
//     const onChangeHandler = e => {
//         setForm( {
//             ...form,
//             [e.target.name] : e.target.value
//         })
//     }
//
//     const onClickSalesRegistHandler = () => {
//         dispatch(callSalesRegistAPI({registRequest : form}));
//     };
//
//     return (
//         <div className="modal">
//             <div className="modal-container">
//                 <div className="product-review-modal-div">
//                     <h1>리뷰</h1>
//                     <input
//                         type="text"
//                         name="reviewTitle"
//                         placeholder="리뷰 제목"
//                         onChange={onChangeHandler}
//                     />
//                     <textarea
//                         placeholder="리뷰 본문"
//                         name="reviewContent"
//                         onChange={onChangeHandler}
//                     ></textarea>
//                     <button onClick={onClickSalesRegistHandler}>리뷰 작성하기</button>
//                     <button
//                         style={{
//                             border: "none",
//                             margin: 0,
//                             fontSize: "10px",
//                             height: "10px",
//                         }}
//                         onClick={() => setSalesRegistModal(false)}
//                     >
//                         돌아가기
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }