import {useEffect, useState} from "react";
import {callProductListAPI} from "../../../../apis/ProductAPICalls";
import {useDispatch, useSelector} from "react-redux";
import productReducer from "../../../../modules/ProductModule";
import ProductList from "../../../../components/lists/ProductList";

function Main(){


    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {products} = useSelector(state => state.productReducer);



    useEffect(() => {
        //모든 상품에 대한 정보 요청
        dispatch(callProductListAPI({currentPage}));
    }, []);

    return(

        <>
            {products
                &&
                <>
                    <ProductList data={products.data}/>

                </>
            }





        </>



    );
}
export default Main;