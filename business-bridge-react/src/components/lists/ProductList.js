import ProductListItem from "../items/ProductListItem";

function  ProductList({data}){

    return(


            <div className="product-div">

                <table className="Product-information">
                    <thead>
                    <tr>
                        <td style={{backgroundColor: '#F1F0F6'}}>상품코드</td>
                        <td style={{backgroundColor: '#F1F0F6'}}>상품명</td>
                        <td style={{backgroundColor: '#F1F0F6'}}>수량</td>
                        <td style={{backgroundColor: '#F1F0F6'}}>단가</td>
                        <td style={{backgroundColor: '#F1F0F6'}}>세액</td>
                        <td style={{backgroundColor: '#F1F0F6'}}>공급가액</td>
                        <td style={{backgroundColor: '#F1F0F6'}}>비고</td>
                    </tr>

                    </thead>
                    <tbody>
            {
                data &&
                data.map(product => <ProductListItem key={product.productCode} product={product}/> )
            }




</tbody>
</table>

</div>

    );



}

export default ProductList;