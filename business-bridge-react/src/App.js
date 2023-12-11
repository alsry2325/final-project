import './css/Sales.css';
import './css/loginform.css';
import './css/Header.css';
import './css/MyPage.css';
import './css/EmployeeRegistrationNavbar.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/businessbridge/employee/Login";
import Main from "./pages/businessbridge/Main";
import FindPassword from "./pages/businessbridge/employee/FindPassword";
import ProtectedRoute from "./components/router/ProtectedRoute";
import Error from "./pages/error/Error";
import MyPage from "./pages/businessbridge/employee/MyPage";
import EmployeeRegistrationNavbarLayout from "./layouts/EmployeeRegistrationNavbarLayout";
import EmployeeRegistration from "./pages/businessbridge/employee/EmployeeRegistration";
import SalesLayout from "./layouts/SalesLayout";
import SalesList from "./pages/businessbridge/sales/SalesList";
import SalesDetail from "./pages/businessbridge/sales/SalesDetail";
import SalesRegist from "./pages/businessbridge/sales/SalesRegist";
import SalesModify from "./pages/businessbridge/sales/SalesModify";
import SalesStatistics from "./pages/businessbridge/sales/SalesStatistics";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={ <ProtectedRoute loginCheck={true}><Layout/></ProtectedRoute> }>
                <Route index element={<Main/>}/>
                <Route path="emp/employee/mypage" element={ <ProtectedRoute loginCheck={true}> <MyPage/> </ProtectedRoute>}/>
                <Route path="emp/employee/registration" element={ <ProtectedRoute loginCheck={true}><EmployeeRegistrationNavbarLayout/></ProtectedRoute>}>
                    <Route index element={ <ProtectedRoute loginCheck={true}> <EmployeeRegistration/> </ProtectedRoute>}/>
                </Route>
            <Route path="sales" element={<SalesLayout/>}>
                <Route index element={ <Navigate to="/sales/salesList/0" replace/>}/>
                <Route path="salesList/:salesStatus" element={ <SalesList/> }/>
                <Route path=":salesCode" element={ <SalesDetail/> }/>
                <Route path="sales-regist" element={ <SalesRegist/> }/>
                <Route path="sales-modify/:salesCode" element={ <SalesModify/> }/>
                <Route path="salesStatistics" element={ <SalesStatistics/> }/>
            </Route>
            </Route>
            <Route path="/emp/employee">
                <Route path="login" element={ <ProtectedRoute loginCheck={false}><Login/></ProtectedRoute> }/>
                <Route path="findpassword" element={ <ProtectedRoute loginCheck={false}><FindPassword/></ProtectedRoute> }/>
            </Route>
            <Route path="/*" element={<Error/>}/>

        </Routes>
      </BrowserRouter>
  );
}

export default App;
