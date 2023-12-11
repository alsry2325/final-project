import SalesProductModal from "../../../components/modal/SalesProductModal";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callSalesRegistAPI} from "../../../apis/SalesAPICalls";

function SalesRegist() {

    const [salesProductModal, setSalesProductModal] = useState(false);
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const { postSuccess } = useSelector(state => state.salesReducer);

    useEffect(() => {
        //등록시 영업 메인으로 이동한다.
        if(postSuccess === true) {
            navigate('/sales/salesList/1', { replace : true });
        }
    }, [postSuccess]);

    /* 상품검색 모달창 오픈 */
    const onClickSalesProductHandler = () => {
        setSalesProductModal(true);
    };

    // 모달창 콜백 함수정의
    const handleSelectProduct = ({ productCode, productName }) => {
        // 선택된 상품 정보를 처리
        console.log("Selected Product Code:", productCode);
        console.log("Selected Product Name:", productName);
        setForm({
            ...form,
            productCode,
            productName
        });
    };


    /* 입력 양식 값 변경 시 state 수정 */
    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    /* 영업 등록 버튼 클릭 시 이벤트 */
    const onClickSalesRegistrationHandler = () => {
        
        //셀렉트박스의 현재 선택값 가져오기
        const select1 = document.getElementById('salesType')
        const selectedIndex1 = select1.selectedIndex
        form['salesType'] = select1.options[selectedIndex1].value
        const select2 = document.getElementById('customerRating')
        const selectedIndex2 = select2.selectedIndex
        form['customerRating'] = select2.options[selectedIndex2].value

        if(document.getElementById('productName').value == ""){	
            alert("상품을 선택해주세요.");
            document.getElementById('productName').focus();
            return false;
        }
        if(document.getElementById('accountName').value == ""){
            alert("거래처명을 입력하세요.");
            document.getElementById('accountName').focus();
            return false;
        }
        if(document.getElementById('salesWay').value == ""){	
            alert("영업유형을 입력하세요.");
            document.getElementById('salesWay').focus();
            return false;
        }
        if(document.getElementById('salesName').value == ""){
            alert("영업이름을 입력하세요.");
            document.getElementById('salesName').focus();
            return false;
        }		
        dispatch(callSalesRegistAPI({registRequest : form }));
    }

    return (
        <>
        {
            salesProductModal &&
            <SalesProductModal
                setSalesProductModal={setSalesProductModal}
                onSelectProduct={handleSelectProduct}
            />
        }
        <div>
            <div className="product-button-div">
                <button
                    onClick={ () => navigate(-1) } // navigate 주소 뿐만 아니라 (히스토리)숫자도 줄 수 있다.
                >
                    돌아가기
                </button>
                <button
                    onClick={ onClickSalesRegistrationHandler }
                >
                    영업 등록
                </button>
            </div>
            <div className="product-section">
                <div className="product-info-div">
                    <table>
                        <tbody>
                        <tr>
                            <td><label>영업형태</label></td>
                            <td>
                                <select id='salesType' name='salesType' vlaue="{form.salesType}">
                                    <option value='전화영업'>전화영업</option>
                                    <option value='방문영업'>방문영업</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>거래처명</label></td>
                            <td>
                            <input
                                    placeholder='거래처명'
                                    name='accountName'
                                    id='accountName'
                                    className="product-info-input"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>영업담당</label></td>
                            <td>
                            <input
                                    placeholder='로그인정보'
                                    name='memberName'
                                    className="product-info-input"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Grade</label></td>
                            <td>
                                <select id='customerRating' name='customerRating'>
                                    <option value='A'>A</option>
                                    <option value='B'>B</option>
                                    <option value='C'>C</option>
                                    <option value='D'>D</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>영업유형</label></td>
                            <td>
                            <input
                                    name='salesWay'
                                    id='salesWay'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>부서명</label></td>
                            <td>
                            <input
                                    placeholder='로그인정보'
                                    name='departmentName'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>상품 명</label></td>
                            <td>
                            <input
                                    placeholder='상품명'
                                    name='productName' id='productName'
                                    onChange={ onChangeHandler }
                                    readOnly={true}
                                    value={form.productName || ""}
                                />
                                <button
                                    className="review-write-button"
                                    onClick={() =>
                                        onClickSalesProductHandler()
                                    }
                                >
                                    상품검색
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td><label>영업 이름</label></td>
                            <td>
                                <textarea
                                    className="textarea-style"
                                    name='salesName'
                                    id='salesName'
                                    onChange={ onChangeHandler }
                                ></textarea>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    );
}

export default SalesRegist;