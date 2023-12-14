import {useParams} from "react-router-dom";
import {callProductListAPI} from "../../../../apis/ProductAPICalls";
import {callSalesListAPI} from "../../../../apis/SalesAPICalls";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ProductList from "../../../../components/lists/ProductList";

function ProductManagement(){

    const { productState } = useParams();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { products } = useSelector(state => state.productReducer);
    console.log(products);

    useEffect(() => {
        dispatch(callProductListAPI({currentPage}));
    }, []);

    return(
            <>
            <div className="management-div">
                상품목록
            </div>
                {
                    products && <ProductList data={products.data}/>
                }


{/*

                <div className="productState-sales">
                    판매
                </div>

                <div className="productState-discontinued">
                    판매중지
                </div>



                <div className="search-div"  style={{ float: "right" }}>
                    <select name="product-search" id="product-search">
                        <option value="">전체</option>
                        <option value="productName">상품명</option>
                    </select>
                    <input type="text" name="search-" id="schText" placeholder="검색어" />
                    <button type="button">검색</button>
                </div>

                <div>
                    <div>상품코드</div>
                    <div>상품명</div>
                    <div>수량</div>
                    <div>단가</div>
                    <div>세액</div>
                    <div>공급가액</div>
                    <div>비고</div>
                </div>

*/}





            </>


    );

}

export default ProductManagement;