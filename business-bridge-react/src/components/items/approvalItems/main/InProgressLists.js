import InProgressListItem from "./InProgressListItem";

function InProgressLists({ data }){


    return (
        <>
            {/* 결재해야하는 건 반복, 없다면 없다는 텍스트 */}
            <div className="in-progress-box-list-div">
                {
                    data &&
                    data.map(approval => <InProgressListItem key={approval.approvalCode} approval={approval}/>)
                }
            </div>
        </>
    );
}

export default InProgressLists;