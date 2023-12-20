import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {callSalesRegistAPI} from "../../../../apis/SalesAPICalls";
import {callProductRegistAPI} from "../../../../apis/ProductAPICalls";

function ProductRegist() {

    const navigate = useNavigate();
    const [form, setForm] = useState({

        productCategory : '',
        productNum: '',
        productName: '',
        productCnt: 0,
        productStandard: '',
        productPrice: 0,
        provideValue: 0,
        taxCnt: 0,
        productNote: ''


    });
    const dispatch = useDispatch();
    const {postSuccess} = useSelector(state => state.productReducer);

    useEffect(() => {
        //등록시 상품목록페이지로  이동한다.
        if (postSuccess === true) {


            const productState = 'sales';
            navigate(`/products/management/productState/${productState}`, {replace: true});
        }
    }, [postSuccess]);




    /* 입력 양식 값 변경 시 state 수정 */
    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onClickProductRegistraionHandler = () => {

        dispatch(callProductRegistAPI({registRequest : form }));


    }












    return (

        <>

            {

                <>
                    <div className="product-button-div">
                    <button
                        onClick={ () => navigate(-1) }
                    >
                        돌아가기
                    </button>
                    </div>
                <div className="product-regist-form">
                    <div className="product-first-row">

                        <div className="product-category">카테고리</div>
                        <input className="product-category-input"
                               id="productCategory"
                               name="productCategory"
                               onChange={onChangeHandler}
                               value={form.productCategory}/>
                        <div className="product-num">상품번호</div>
                        <input className="product-num-input"
                               id="productNum"
                               name="productNum"
                               onChange={onChangeHandler}
                               value={form.productNum}/>

                        <div className="product-name">상품명</div>
                        <input className="product-name-input"
                               id="productName"
                               name="productName"
                               onChange={onChangeHandler}
                               value={form.productName}/>

                    </div>

                    <div className="product-second-row">

                        <div className="product-cnt">수량</div>
                        <input className="product-cnt-input"
                               id="productCnt"
                               name="productCnt"
                               onChange={onChangeHandler}
                               value={form.productCnt}/>


                        <div className="product-standard">규격</div>
                        <input className="product-standard-input"
                               id="productStandard"
                               name="productStandard"
                               onChange={onChangeHandler}
                               value={form.productStandard}/>

                        <div className="product-price">단가</div>
                        <input className="product-price-input"
                               id="productPrice"
                               name="productPrice"
                               onChange={onChangeHandler}
                               value={form.productPrice}/>


                    </div>


                    <div className="product-third-row">

                        <div className="provide-value">공급가액</div>
                        <input className="provide-value-input"
                               id="provideValue"
                               name="provideValue"
                               onChange={onChangeHandler}
                               value={form.provideValue}/>

                        <div className="tax-cnt">세액</div>
                        <input className="tax-cnt-input"
                               id="taxCnt"
                               name="taxCnt"
                               onChange={onChangeHandler}
                               value={form.taxCnt}/>
                    </div>

                    <div className="product-fourth-row">
                        <div className="product-note">비고</div>
                        <input className="product-note-input"
                               id="productNote"
                               name="productNote"
                               onChange={onChangeHandler}
                               value={form.productNote}/>
                    </div>
                </div>


                <button onClick={ onClickProductRegistraionHandler }>저장</button>

                </>
            }


        </>


    );
}
export default ProductRegist;