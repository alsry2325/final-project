// import {useNavigate, useParams} from "react-router-dom";
// import {useEffect, useRef, useState} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {callAdminProductAPI, callAdminProductModifyAPI, callAdminProductRemoveAPI} from "../../apis/ProductAPICalls";
//
// function ProductDetail () {
//
//     const { productCode } = useParams();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     /* 읽기 모드와 수정 모드를 전환 하는 state */
//     const [modifyMode, setModifyMode] = useState(false);
//     const [form, setForm] = useState({});
//     const { Product, putSuccess} = useSelector(state => state.productReducer);
//
//     /* 최초 랜더링 시 상품 상세 정보 조회 */
//     useEffect(() => {
//         dispatch(callAdminProductAPI({productCode}));
//     }, []);
//
//     /* 수정 성공 시 상품 목록으로 이동 */
//     useEffect(() => {
//         if(putSuccess === true) {
//
//             const productState = 'sales';
//             navigate(`/products/management/productState/${productState}`, { replace : true })
//         }
//     }, [putSuccess]);
//
//
//     /* 입력 양식 값 변경 시 state 수정 */
//     const onChangeHandler = e => {
//         setForm({
//             ...form,
//             [e.target.name] : e.target.value
//         })
//     }
//
//
//
//     /* 수정 모드로 변환하는 이벤트 */
//     const onClickModifyModeHandler = () => {
//         setModifyMode(true);
//         setForm({...Product});
//     }
//
//     /* 상품 수정 요청하는 이벤트 */
//     const onClickProductUpdateHandler = () => {
//         const formData = new FormData();
//
//
//
//         dispatch(callAdminProductModifyAPI({productCode, modifyRequest : form}));
//
//     }
//
//     /* 상품 삭제 요청하는 이벤트 */
//
//     {/*    const onClickProductDeleteHandler = () => {
//         dispatch(callAdminProductRemoveAPI({productCode}));
//     }
//
//     const inputStyle = !modifyMode ? { backgroundColor : 'gray' } : null;
// */}
//
//     return (
//         <div>
//             <div className="product-button-div">
//                 <button
//                     onClick={ () => navigate(-1) }
//                 >
//                     돌아가기
//                 </button>
//                 {!modifyMode &&
//                     <button
//                         onClick={ onClickModifyModeHandler }
//                     >
//                         수정 모드
//                     </button>
//                 }
//                 { modifyMode &&
//                     <button
//                         onClick={ onClickProductUpdateHandler }
//                     >
//                         상품 수정 저장하기
//                     </button>
//                 }
//                 <button
//                     onClick={ onClickProductDeleteHandler }
//                 >
//                     상품 삭제 하기
//                 </button>
//
//                     <div className="product-info">
//                         <table>
//                             <tbody>
//                             <tr>
//                                 <td><label>상품이름</label></td>
//                                 <td>
//                                     <input
//                                         name='productName'
//                                         placeholder='상품 이름'
//                                         className="product-info-input"
//                                         onChange={ onChangeHandler }
//                                         value={ !modifyMode ? Product.productName : form.productName }
//                                         readOnly={ !modifyMode }
//                                         style={ inputStyle }
//                                     />
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td><label>상품가격</label></td>
//                                 <td>
//                                     <input
//                                         name='productPrice'
//                                         placeholder='상품 가격'
//                                         type='number'
//                                         className="product-info-input"
//                                         onChange={ onChangeHandler }
//                                         value={ !modifyMode ? adminProduct.productPrice : form.productPrice }
//                                         readOnly={ !modifyMode }
//                                         style={ inputStyle }
//                                     />
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td><label>판매 여부</label></td>
//                                 <td>
//                                     <label>
//                                         <input
//                                             type="radio"
//                                             name="status"
//                                             onChange={ onChangeHandler }
//                                             value="usable"
//                                             readOnly={ !modifyMode }
//                                             checked={ (!modifyMode ? adminProduct.status === 'usable' : form.status === 'usable')  }
//                                         />
//                                         판매
//                                     </label> &nbsp;
//                                     <label>
//                                         <input
//                                             type="radio"
//                                             name="status"
//                                             onChange={ onChangeHandler }
//                                             value="disable"
//                                             readOnly={ !modifyMode }
//                                             checked={ (!modifyMode ? adminProduct.status === 'disable' : form.status === 'disable')  }
//                                         />판매중단</label>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td><label>상품 종류</label></td>
//                                 <td>
//                                     <label>
//                                         <input
//                                             type="radio"
//                                             name="categoryCode"
//                                             onChange={ onChangeHandler }
//                                             value={1}
//                                             readOnly={ !modifyMode }
//                                             checked={ (!modifyMode ? adminProduct.categoryCode === 1 : form.categoryCode == 1)  }
//                                         /> 식사
//                                     </label> &nbsp;
//                                     <label>
//                                         <input
//                                             type="radio"
//                                             name="categoryCode"
//                                             onChange={ onChangeHandler }
//                                             value={2}
//                                             readOnly={ !modifyMode }
//                                             checked={ (!modifyMode ? adminProduct.categoryCode === 2 : form.categoryCode == 2)  }
//                                         /> 디저트
//                                     </label> &nbsp;
//                                     <label>
//                                         <input
//                                             type="radio"
//                                             name="categoryCode"
//                                             onChange={ onChangeHandler }
//                                             value={3}
//                                             readOnly={ !modifyMode }
//                                             checked={ (!modifyMode ? adminProduct.categoryCode === 3 : form.categoryCode == 3)  }
//                                         /> 음료
//                                     </label>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td><label>상품 재고</label></td>
//                                 <td>
//                                     <input
//                                         placeholder='상품 재고'
//                                         type='number'
//                                         name='productStock'
//                                         onChange={ onChangeHandler }
//                                         className="product-info-input"
//                                         value={ !modifyMode ? adminProduct.productStock : form.productStock }
//                                         readOnly={ !modifyMode }
//                                         style={ inputStyle }
//                                     />
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td><label>상품 설명</label></td>
//                                 <td>
//                                     <textarea
//                                         className="product-img-input"
//                                         name='productDescription'
//                                         onChange={ onChangeHandler }
//                                         value={ !modifyMode ? adminProduct.productDescription : form.productDescription }
//                                         readOnly={ !modifyMode }
//                                         style={ inputStyle }
//                                     ></textarea>
//                                 </td>
//                             </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             }
//         </div>
//     );
// }
//
// export default ProductDetail;