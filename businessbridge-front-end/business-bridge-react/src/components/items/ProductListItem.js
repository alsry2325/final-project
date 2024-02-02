import {useNavigate} from "react-router-dom";

function ProductListItem({product}) {

    const navigate = useNavigate();


/*테이블 상품 행 클릭시 상품 상세 및 수정 페이지 이동*/

    const onClickTableTr = (productCode) => {

            navigate(`/products-allstate/${productCode}`);

    }



    return(



                        <tr key={product.productCode}
                        onClick={()=> onClickTableTr(product.productCode)}>
                            <td>{product.productCode}</td>
                            <td>{product.productName}</td>
                            <td>{product.productCnt}</td>
                            <td>{product.productPrice}</td>
                            <td>{product.taxCnt}</td>
                            <td>{product.provideValue}</td>
                            <td>{product.productNote}</td>
                        </tr>

    );





}

export default ProductListItem;