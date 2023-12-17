import InProgressListItem from "../../../components/items/approvalItems/main/InProgressListItem";
import InProgressLists from "../../../components/items/approvalItems/main/InProgressLists";

function AppMain(){

    return (
        <>
            <h2 className="approval-title">전자결재 홈</h2>
            <InProgressLists/>
        </>
    );
}

export default AppMain;