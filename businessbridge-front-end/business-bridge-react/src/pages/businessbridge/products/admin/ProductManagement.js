import {useParams} from "react-router-dom";
import {callAdminProductListAPI } from "../../../../apis/ProductAPICalls";

import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ProductList from "../../../../components/lists/ProductList";
import PagingBar from "../../../../components/common/PagingBar";
import {ToastContainer} from "react-toastify";

function ProductManagement(){

    const { productState } = useParams();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { adminProducts } = useSelector(state => state.productReducer);
    console.log(adminProducts);

    useEffect(() => {
        dispatch(callAdminProductListAPI({currentPage, productState}));
    }, [currentPage]);

    return(

            <div className="management-div">
                <h2 className="approval-title product-title">상품목록</h2>

                {
                    adminProducts &&

                    <>
                        <ToastContainer hideProgressBar={true} position="top-center"/>
                    <ProductList data={adminProducts.data}/>
                    <PagingBar pageInfo={adminProducts.pageInfo} setCurrentPage={setCurrentPage}/>
                    </>
                }
            </div>














    );

}

export default ProductManagement;