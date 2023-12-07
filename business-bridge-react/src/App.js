import './css/loginform.css';
import './css/Header.css';
import './css/MyPage.css';
import './css/EmployeeRegistrationNavbar.css'
import './css/approval.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/businessbridge/employee/Login";
import Main from "./pages/businessbridge/Main";
import FindPassword from "./pages/businessbridge/employee/FindPassword";
import ProtectedRoute from "./components/router/ProtectedRoute";
import Error from "./pages/error/Error";
import MyPage from "./pages/businessbridge/employee/MyPage";
import EmployeeRegistrationNavbarLayout from "./layouts/EmployeeRegistrationNavbarLayout";
import EmployeeRegistration from "./pages/businessbridge/employee/EmployeeRegistration";
import ApprovalLayout from "./layouts/ApprovalLayout";
import BusinessDraftForm from "./components/approval/form/BusinessDraftForm";
import ApprovalMain from "./pages/approval/ApprovalMain";

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
            </Route>
            <Route path="/emp/employee">
                <Route path="login" element={ <ProtectedRoute loginCheck={false}><Login/></ProtectedRoute> }/>
                <Route path="findpassword" element={ <ProtectedRoute loginCheck={false}><FindPassword/></ProtectedRoute> }/>
            </Route>
            <Route path="/*" element={<Error/>}/>

            <Route path="/approval"element={<ApprovalLayout/>}>
                <Route path="home" element={<ApprovalMain/>}/>
                <Route path="write">
                    <Route path="businessDraft" element={<BusinessDraftForm/>}/>
                    <Route path="expenxeReport"/>
                </Route>
            </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
