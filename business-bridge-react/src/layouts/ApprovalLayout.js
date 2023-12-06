import {Outlet} from "react-router-dom";
import Header from "../components/common/Header";

function ApprovalLayout() {

    return (
        <div className="approval-layout-div">
            <Header/>
            {/*사이드바*/}
            <main className="approval-main">
                <h3>전자결재 홈</h3>

            </main>
        </div>
    );
}

export default ApprovalLayout;