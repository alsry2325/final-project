import EmployeeRegistrationNavbar from "../components/nav/EmployeeRegistrationNavbar";
import {Outlet} from "react-router-dom";
import ProductsNavbar from "../components/nav/ProductsNavbar";

function ProductLayout() {
    return (
        <>

            <main className="products-layout-div">
                <ProductsNavbar/>
                <div className="products">
                    <Outlet/>
                </div>
            </main>
        </>
    );
}

export default ProductLayout;