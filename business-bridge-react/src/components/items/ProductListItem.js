function ProductListItem({product}) {



    return(

        <div className="product-div">

            <table className="Product-information">
                <thead>
                <tr>
                    <th>

                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style={{backgroundColor: '#F1F0F6'}}>상품코드</td>
                    <td style={{backgroundColor: '#F1F0F6'}}>상품명</td>
                    <td style={{backgroundColor: '#F1F0F6'}}>수량</td>
                    <td>단가</td>
                    <td>세액</td>
                    <td>공급가액</td>
                    <td>비고</td>
                </tr>
                <tr>
                    <td>{product.productCode}</td>
                    <td>{product.productName}</td>
                    <td>{product.productCnt}</td>
                    <td>{product.productPrice}</td>
                    <td>{product.taxCnt}</td>
                    <td>{product.provideValue}</td>
                    <td>{product.productNote}</td>
                </tr>
                </tbody>
            </table>

        </div>
    );





}

export default ProductListItem;