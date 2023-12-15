import SalesProductModal from "../../../components/modal/SalesProductModal";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callSalesAPI, callSalesModifyAPI} from "../../../apis/SalesAPICalls";

function SalesModify () {

    const [salesProductModal, setSalesProductModal] = useState(false);
    const { salesCode } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    /* 읽기 모드와 수정 모드를 전환 하는 state */
    const [form, setForm] = useState({});
    const [prevForm, setPrevForm] = useState({});
    const { sales, putSuccess } = useSelector(state => state.salesReducer);
    
    useEffect(() => {
        setForm({...sales});
    }, [sales]);

    /*  최초 랜더링 시 영업 상세 정보 조회 */
    useEffect(() => {
        dispatch(callSalesAPI({salesCode}));
    }, []);

    /* 수정 성공 시 영업 메인화면 이동 */
    useEffect(() => {
        if(putSuccess === true) {
            navigate('/sales/salesList/1', { replace : true })
        }
    }, [putSuccess]);

    /* 상품검색 모달창 오픈 */
    const onClickSalesProductHandler = () => {
        setPrevForm({...form});
        setSalesProductModal(true);
    };

    /* 입력 양식 값 변경 시 state 수정 */
    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    // 모달창 콜백 함수정의
    const handleSelectProduct = ({productCode, productName}) => {
        // 선택된 상품 정보를 처리
        console.log("Selected Product Code:", productCode);
        console.log("Selected Product Name:", productName);
        setForm({
            ...prevForm,
            productCode,
            productName
        });
    };

    /* 영업 수정 요청하는 이벤트 */
    const onClickSalesUpdateHandler = () => {
        //셀렉트박스의 현재 선택값 가져오기
        const select1 = document.getElementById('salesType')
        const selectedIndex1 = select1.selectedIndex
        form['salesType'] = select1.options[selectedIndex1].value
        const select2 = document.getElementById('customerRating')
        const selectedIndex2 = select2.selectedIndex
        form['customerRating'] = select2.options[selectedIndex2].value
        const select3 = document.getElementById('salesStatus')
        const selectedIndex3 = select3.selectedIndex
        form['salesStatus'] = select3.options[selectedIndex3].value
        //상품코드 가져오기
        form['productCode'] = document.getElementById('productCode').value;

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
        if(document.getElementById('productName').value == ""){	
            alert("상품을 선택해주세요.");
            document.getElementById('productName').focus();
            return false;
        }
        if(document.getElementById('salesName').value == ""){
            alert("영업이름을 입력하세요.");
            document.getElementById('salesName').focus();
            return false;
        }		
        
        dispatch(callSalesModifyAPI({salesCode, modifyRequest : form}));

    }

    return (
        <>
        {
            salesProductModal &&
            <SalesProductModal
                setSalesProductModal={setSalesProductModal}
                onSelectProduct={handleSelectProduct}
                sales = {sales}
            />
        }
        <div>
            <div className="product-button-div">
                <button
                    onClick={ () => navigate(-1) }
                >
                    돌아가기
                </button>
                <button
                    onClick={ onClickSalesUpdateHandler }
                >
                    수정하기
                </button>
            </div>
            <div className="sales-modify-section">
                <input type="hidden" name="productCode" id="productCode" onChange={ onChangeHandler } value={form.productCode || ''}/>
                <div className="sales-modify-info-div">
                    <div className="sales-h1">
                        <h1>영업관리 수정</h1>
                    </div>
                    <table className="sales-regist-table">
                        <tbody>
                        <tr>
                            <td><label>영업상태</label></td>
                            <td>
                                <select
                                    className="sales-modify__select"
                                    id='salesStatus' 
                                    name='salesStatus' 
                                    value={form.salesStatus}
                                    onChange={e => setForm({ ...form, salesStatus: e.target.value })}
                                >
                                    <option value='접수'>접수</option>
                                    <option value='진행'>진행</option>
                                    <option value='완결'>완결</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>영업형태</label></td>
                            <td>
                                <select 
                                    id='salesType' 
                                    name='salesType' 
                                    value={form.salesType}
                                    onChange={e => setForm({ ...form, salesType: e.target.value })}
                                >
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
                                    className="sales-input"
                                    onChange={ onChangeHandler }
                                    value={form.accountName || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>영업담당</label></td>
                            <td>
                            <input
                                    placeholder='로그인정보의 사원명'
                                    name='salesMember'
                                    className="sales-input"
                                    onChange={ onChangeHandler }
                                    value={form.salesMember || ''}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Grade</label></td>
                            <td>
                                <select 
                                    id='customerRating' 
                                    name='customerRating' 
                                    value={form.customerRating}
                                    onChange={e => setForm({ ...form, customerRating: e.target.value })}
                                >
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
                                    value={form.salesWay || ''}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td><label>부서명</label></td>
                            <td>
                            <input
                                    placeholder='로그인정보의 부서명'
                                    className="sales-input"
                                    name='memberName'
                                    onChange={ onChangeHandler }
                                    value={form.departmentName || ''}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td><label>상품 명</label></td>
                            <td>
                            <input
                                    placeholder='상품명'
                                    name='productName' id='productName'
                                    value={form.productName || ''}
                                    onChange={ onChangeHandler}
                                    readOnly={true}
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
                                    name='salesName' id='salesName'
                                    value={form.salesName || ''}
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

export default SalesModify;