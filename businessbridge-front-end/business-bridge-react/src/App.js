import './css/stylee.css';
import './css/Sales.css';
import './css/loginform.css';
import './css/Header.css';
import './css/MyPage.css';
import './css/EmployeeRegistrationNavbar.css'
import './css/approval.css';
import './css/AddressBook.css'
import './css/Note.css'
import './css/MiniCalendar.css';
import './css/Products.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/businessbridge/employee/Login";
import Main from "./pages/businessbridge/Main";
import FindPassword from "./pages/businessbridge/employee/FindPassword";
import ProtectedRoute from "./components/router/ProtectedRoute";
import Error from "./pages/error/Error";
import MyPage from "./pages/businessbridge/employee/MyPage";
import EmployeeRegistrationLayout from "./layouts/EmployeeRegistrationLayout";
import EmployeeRegistrationList from "./pages/businessbridge/employee/EmployeeRegistrationList";
import SalesLayout from "./layouts/SalesLayout";
import SalesList from "./pages/businessbridge/sales/SalesList";
import SalesDetail from "./pages/businessbridge/sales/SalesDetail";
import SalesRegist from "./pages/businessbridge/sales/SalesRegist";
import SalesModify from "./pages/businessbridge/sales/SalesModify";
import SalesStatistics from "./pages/businessbridge/sales/SalesStatistics";
import ApprovalLayout from "./layouts/ApprovalLayout";
import AppMain from "./pages/businessbridge/approval/AppMain";
import ReceiveApps from "./pages/businessbridge/approval/ReceiveApps";
import ReceiveAppsByStatus from "./pages/businessbridge/approval/ReceiveAppsByStatus";
import UpcomingApps from "./pages/businessbridge/approval/UpcomingApps";
import AppDetail from "./pages/businessbridge/approval/AppDetail";
import DraftApps from "./pages/businessbridge/approval/DraftApps";
import DraftAppsByStatus from "./pages/businessbridge/approval/DraftAppsByStatus";
import DraftCollect from "./pages/businessbridge/approval/DraftCollect";
import TempStorageApps from "./pages/businessbridge/approval/TempStorageApps";
import ApproveApps from "./pages/businessbridge/approval/ApproveApps";
import ApproveAppsByStatus from "./pages/businessbridge/approval/ApproveAppsByStatus";
import WriteBusinessDraft from "./pages/businessbridge/approval/Write-BusinessDraft";
import WriteExpenseReport from "./pages/businessbridge/approval/Write-ExpenseReport";
import AddressBookMain from "./pages/businessbridge/addressBook/AddressBookMain";
import AddressBookLayout from "./layouts/AddressBookLayout";
import AddressBookDepartment from "./pages/businessbridge/addressBook/AddressBookDepartment";
import AddressDetail from "./pages/businessbridge/addressBook/AddressDetail";
import AddressAdminItem from "./components/items/AddressAdminItem";
import NoteLayout from "./layouts/NoteLayout";
import NoteRecipeient from "./pages/businessbridge/note/NoteRecipient";
import NoteSender from "./pages/businessbridge/note/NoteSender";
import NoteStorage from "./pages/businessbridge/note/NoteStorage";
import NoteTrash from "./pages/businessbridge/note/NoteTrash";
import NoteRecipientDetail from "./pages/businessbridge/note/NoteRecipientDetail";
import NoteStorageDetail from "./pages/businessbridge/note/NoteStorageDetail";
import NoteTrashDetail from "./pages/businessbridge/note/NoteTrashDetail";
import NoteSenderDetail from "./pages/businessbridge/note/NoteSenderDetail";
import EmployeeRegist from "./pages/businessbridge/employee/EmployeeRegist";
import SalesRegistModal from "./components/modal/SalesRegistModal";
import UpdateApp from "./pages/businessbridge/approval/UpdateApp";
import AccountList from "./pages/businessbridge/account/AccountList";
import AccountDetail from "./pages/businessbridge/account/AccountDetail";
import AccountRegist from "./pages/businessbridge/account/AccountRegist";
import AccountModify from "./pages/businessbridge/account/AccountModify";
import NoteWrite from "./pages/businessbridge/note/NoteWrite";
import {ToastContainer} from "react-toastify";
import EmployeeModify from "./pages/businessbridge/employee/EmployeeModify";
import ProductManagement from "./pages/businessbridge/products/admin/ProductManagement";
import ProductLayout from "./layouts/ProductsLayout";
import React from "react";
import CategoryMain from "./pages/businessbridge/products/employee/CategoryMain";
import ProductRegist from "./pages/businessbridge/products/admin/ProductRegist";
import ProductMain from "./pages/businessbridge/products/employee/ProductMain";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute loginCheck={true}><Layout/></ProtectedRoute>}>
                    <Route index element={<Main/>}/>
                    {/* 마이페이지 */}
                    <Route path="emp/employee/mypage" element={<MyPage/>}/>
                    {/* 사원관리 */}
                    <Route path="emp/employee" element={<EmployeeRegistrationLayout authCheck={true}/>}>
                        <Route path="registrationList" element={<EmployeeRegistrationList loginCheck={true}/>}/>
                        <Route path="registration" element={<EmployeeRegist loginCheck={true}/>}/>
                        <Route path="employee-modify/:emplyCode" element={<EmployeeModify loginCheck={true}/>}/>
                    </Route>

                    {/* 영업관리 시작*/}
                    <Route path="sales" element={<ProtectedRoute loginCheck={true}><SalesLayout/></ProtectedRoute>}>
                        <Route index element={<ProtectedRoute loginCheck={true}><Navigate to="/sales/salesList/0"
                                                                                          replace/></ProtectedRoute>}/>
                        <Route path="salesList/:salesStatus"
                               element={<ProtectedRoute loginCheck={true}><SalesList/></ProtectedRoute>}/>
                        <Route path=":salesCode"
                               element={<ProtectedRoute loginCheck={true}><SalesDetail/></ProtectedRoute>}/>
                        <Route path="sales-modify/:salesCode"
                               element={<ProtectedRoute loginCheck={true}><SalesModify/></ProtectedRoute>}/>
                        <Route path="salesStatistics"
                               element={<ProtectedRoute loginCheck={true}><SalesStatistics/></ProtectedRoute>}/>
                    </Route>
                    {/* 영업관리 끝*/}

                    {/* 거래처관리 시작*/}
                    <Route path="account" element={<ProtectedRoute loginCheck={true}><SalesLayout/></ProtectedRoute>}>
                        <Route index element={<ProtectedRoute loginCheck={true}><Navigate to="/account/accountList/0"
                                                                                          replace/></ProtectedRoute>}/>
                        <Route path="accountList/:departmentCode"
                               element={<ProtectedRoute loginCheck={true}><AccountList/></ProtectedRoute>}/>
                        <Route path=":accountCode"
                               element={<ProtectedRoute loginCheck={true}> <AccountDetail/> </ProtectedRoute>}/>
                        <Route path="account-modify/:accountCode"
                               element={<ProtectedRoute loginCheck={true}> <AccountModify/></ProtectedRoute>}/>
                    </Route>

                    {/* 거래처관리 끝*/}

                    {/* == 전자결재 시작 == */}
                    <Route path="/approval" element={<ApprovalLayout/>}>
                        <Route path="home" element={<AppMain/>}/>
                        <Route path="receive-approvals/all" element={<ReceiveApps/>}/>
                        <Route path="receive-approvals/:approvalStatus" element={<ReceiveAppsByStatus/>}/>
                        <Route path="upcoming-approvals" element={<UpcomingApps/>}/>
                        <Route path="draft-approvals/all" element={<DraftApps/>}/>
                        <Route path="draft-approvals/:docStatus" element={<DraftAppsByStatus/>}/>
                        <Route path="draft-collects" element={<DraftCollect/>}/>
                        <Route path="temp-storages" element={<TempStorageApps/>}/>
                        <Route path="approve-approvals/all" element={<ApproveApps/>}/>
                        <Route path="approve-approvals/:docStatus" element={<ApproveAppsByStatus/>}/>

                        <Route path="document/:approvalCode" element={<AppDetail/>}/>
                        <Route path="write">
                            <Route path="businessDraft" element={<WriteBusinessDraft/>}/>
                            <Route path="expenseReport" element={<WriteExpenseReport/>}/>
                        </Route>

                        <Route path="update/:approvalCode" element={<UpdateApp/>}/>

                    </Route>
                    {/* == 전자결재 끝 == */}

                    {/* == 상품관리 == */}
                    <Route path="products"
                           element={<ProtectedRoute loginCheck={true}><ProductLayout/></ProtectedRoute>}>
                        <Route path="employee"
                               element={<ProtectedRoute loginCheck={true}><ProductMain/></ProtectedRoute>}/>
                        <Route path="management/productState/:productState"
                               element={<ProtectedRoute authCheck={true}><ProductManagement/></ProtectedRoute>}/>
                        <Route path="categories/:productCategory" element={<CategoryMain/>}/>
                        <Route path="regist"
                               element={<ProtectedRoute authCheck={true}><ProductRegist/></ProtectedRoute>}/>
                    </Route>
                    {/* == 상품관리 끝== */}

                    <Route path="addressBook"
                           element={<ProtectedRoute loginCheck={true}><AddressBookLayout/></ProtectedRoute>}>
                        <Route path="main"
                               element={<ProtectedRoute loginCheck={true}> <AddressBookMain/> </ProtectedRoute>}/>
                        <Route path="department/:departmentCode" element={<AddressBookDepartment/>}/>
                        <Route path=":emplyCode" element={<AddressDetail/>}/>
                        <Route
                            path="addressAdmin/:emplyCode"
                            element={<ProtectedRoute authCheck={true}> <AddressAdminItem/> </ProtectedRoute>}/>
                    </Route>

                    <Route path="note" element={<ProtectedRoute loginCheck={true}><NoteLayout/></ProtectedRoute>}>
                        <Route path="recipient"
                               element={<ProtectedRoute loginCheck={true}> <NoteRecipeient/> </ProtectedRoute>}/>
                        <Route path="sender"
                               element={<ProtectedRoute loginCheck={true}> <NoteSender/> </ProtectedRoute>}/>
                        <Route path="storage"
                               element={<ProtectedRoute loginCheck={true}> <NoteStorage/> </ProtectedRoute>}/>
                        <Route path="trash"
                               element={<ProtectedRoute loginCheck={true}> <NoteTrash/> </ProtectedRoute>}/>
                        <Route path="recipient/:noteNo"
                               element={<ProtectedRoute loginCheck={true}> <NoteRecipientDetail/> </ProtectedRoute>}/>
                        <Route path="recipient/storage/:noteNo"
                               element={<ProtectedRoute loginCheck={true}> <NoteStorageDetail/> </ProtectedRoute>}/>
                        <Route path="recipient/trash/:noteNo"
                               element={<ProtectedRoute loginCheck={true}> <NoteTrashDetail/> </ProtectedRoute>}/>
                        <Route path="sender/:noteNo"
                               element={<ProtectedRoute loginCheck={true}> <NoteSenderDetail/> </ProtectedRoute>}/>
                        <Route path="send" element={<ProtectedRoute loginCheck={true}> <NoteWrite/></ProtectedRoute>}/>
                    </Route>
                </Route>

                <Route path="/emp/employee">
                    <Route path="login" element={<ProtectedRoute loginCheck={false}><Login/></ProtectedRoute>}/>
                    <Route path="findpassword"
                           element={<ProtectedRoute loginCheck={false}><FindPassword/></ProtectedRoute>}/>
                </Route>


                <Route path="/*" element={<Error/>}/>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
