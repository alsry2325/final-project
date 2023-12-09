import './css/Sales.css';
import './css/loginform.css';
import './css/Header.css';
import './css/MyPage.css';
import './css/EmployeeRegistrationNavbar.css'
import './css/approval.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/businessbridge/employee/Login";
import Main from "./pages/businessbridge/Main";
import FindPassword from "./pages/businessbridge/employee/FindPassword";
import ProtectedRoute from "./components/router/ProtectedRoute";
import Error from "./pages/error/Error";
import MyPage from "./pages/businessbridge/employee/MyPage";
import SalesLayout from "./layouts/SalesLayout";
import SalesList from "./pages/sales/SalesList";
import SalesDetail from "./pages/sales/SalesDetail";
import EmployeeRegistrationNavbarLayout from "./layouts/EmployeeRegistrationNavbarLayout";
import EmployeeRegistration from "./pages/businessbridge/employee/EmployeeRegistration";
import ApprovalLayout from "./layouts/ApprovalLayout";
import BDWriteForm from "./components/approval/form/BDWriteForm";
import AppMain from "./pages/approval/AppMain";
import ReceiveApps from "./pages/approval/ReceiveApps";
import ReceiveAppsByStatus from "./pages/approval/ReceiveAppsByStatus";
import UpcomingApps from "./pages/approval/UpcomingApps";
import AppDetail from "./pages/approval/AppDetail";
import DraftApps from "./pages/approval/DraftApps";
import DraftAppsByStatus from "./pages/approval/DraftAppsByStatus";
import DraftCollect from "./pages/approval/DraftCollect";
import TempStorageApps from "./pages/approval/TempStorageApps";
import ApproveApps from "./pages/approval/ApproveApps";
import ApproveAppsByStatus from "./pages/approval/ApproveAppsByStatus";
import ERWriteForm from "./components/approval/form/ERWriteForm";
import WriteBusinessDraft from "./pages/approval/Write-BusinessDraft";

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
                    <Route index element={ <Navigate to="/sales/salesList/1" replace/>}/>
                    <Route path="salesList/:salesStatus" element={ <SalesList/> }/>
                    <Route path=":salesCode" element={ <SalesDetail/> }/>
                </Route>
                {/* == 전자결재 시작 == */}
                <Route path="/approval"element={<ApprovalLayout/>}>
                    <Route path="home" element={<AppMain/>}/>
                    <Route path="receive-approvals/all" element={<ReceiveApps/>}/>
                    <Route path="receive-approvals/:approvalStatus" element={<ReceiveAppsByStatus/>}/>
                    <Route path="upcoming-approvals" element={<UpcomingApps/>}/>
                    <Route path="draft-approvals/all" element={<DraftApps/>}/>
                    <Route path="draft-approvals/:docStatus" element={<DraftAppsByStatus/>} />
                    <Route path="draft-collects" element={<DraftCollect/>}/>
                    <Route path="temp-storages" element={<TempStorageApps/>}/>
                    <Route path="approve-approvals/all" element={<ApproveApps/>}/>
                    <Route path="approve-approvals/:docStatus" element={<ApproveAppsByStatus/>}/>

                    <Route path="document/:approvalCode" element={<AppDetail/>} />
                    <Route path="write">
                        <Route path="businessDraft" element={<WriteBusinessDraft/>}/>
                        <Route path="expenseReport" element={<ERWriteForm/>}/>
                    </Route>
                </Route>
                {/* == 전자결재 끝 == */}
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
