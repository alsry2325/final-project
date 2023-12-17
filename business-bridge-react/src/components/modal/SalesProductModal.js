import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callSalesProductListAPI} from "../../apis/SalesAPICalls";
import {useNavigate} from "react-router-dom";

function SalesProductModal({setSalesProductModal, onSelectProduct }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { salesProductList } = useSelector(state => state.salesReducer);
    //목록 api 호출
    useEffect(() => {
        dispatch(callSalesProductListAPI());
    }, []);

    const onClickSalesCancle = () => {
        setSalesProductModal(false);
    }

    const onClickTableTr = (productCode, productName) => {
        // onSelectProduct 함수 호출하여 데이터 전달
        onSelectProduct({ productCode, productName });
        // 모달 닫기
        setSalesProductModal(false);
      };

    return (
        <>
            {
                salesProductList &&
                <>
                <div className="modal">
                    <div className="modal-container">
                        <div className="product-review-modal-div">
                            <h1>상품 목록</h1>
                            <div className="sales-div">
                                <table className="sales-table">
                                    <colgroup>
                                        <col width="15%" />
                                        <col width="30%" />
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>상품코드</th>
                                        <th>상품명</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { salesProductList.map(product => (
                                        <tr key={product.productCode}
                                            onClick={() => onClickTableTr(product.productCode, product.productName)}
                                        >
                                            <td>{product.productCode}</td>
                                            <td>{product.productName}</td>
                                        </tr>
                                    ))
                                    }
                                    </tbody>
                                </table>
                                <button
                                    className="app-cancle"
                                    onClick={onClickSalesCancle}
                                >취소</button>
                            </div>
                        </div>
                    </div>
                </div>

                </>
            }
        </>
    );
}

export default SalesProductModal;
