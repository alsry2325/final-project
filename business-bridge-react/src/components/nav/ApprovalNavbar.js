import {NavLink} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import ApprovalFormModal from "../approval/modal/ApprovalFormModal";


function ApprovalNavbar() {

    const[appFormModal, setAppFormModal] = useState(false);

    const onClickRegistApproval = () => {
        setAppFormModal(true);
    }

    return (
        <>
            {appFormModal &&
                <ApprovalFormModal
                    setAppFormModal={setAppFormModal}
                />
            }
            <div className="employeeRegistration-navbar-div">
                <div className="employeeRegistration-btn"
                     onClick={onClickRegistApproval}>
                    <img
                        className="approval-nav-img"
                        src="https://github.com/Business-Bridge/businessbridge-front-end/assets/138549058/8e4d95de-6131-4737-bd12-5f8dd0d6feed"/>
                    <strong>결재 상신</strong>
                </div>
                <ul className="employeeRegistration-navbar-ul">
                    <h3 className="main-title">결재하기</h3>
                    <li><NavLink to="/approval/receive-approvals/all">받은 결재</NavLink></li>
                    <li ><NavLink to="/approval/upcoming-approvals">받을 결재</NavLink></li>
                </ul>
                <ul className="employeeRegistration-navbar-ul">
                    <h3 className="main-title">문서함</h3>
                    {/*<img className="main-icon" src="/images/edit1.png" alt="My Image" />*/}
                    {/*<img src="/images/settings 1.png" alt="My Image" />*/}
                    <li><NavLink to="/approval/draft-approvals/all">기안한 문서함</NavLink></li>
                    <li ><NavLink to="/approval/draft-collects">기안 회수함</NavLink></li>
                    <li ><NavLink to="/approval/temp-storages">임시 저장함</NavLink></li>
                    <li ><NavLink to="/approval/approve-approvals/all">결재한 문서함</NavLink></li>
                </ul>
            </div>
        </>
    );
}

export default ApprovalNavbar;