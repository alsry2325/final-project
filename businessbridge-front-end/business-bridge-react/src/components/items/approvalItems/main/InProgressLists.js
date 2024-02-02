import InProgressListItem from "./InProgressListItem";

function InProgressLists({data}) {


    return (
        <>
            {/* 결재해야하는 건 반복, 없다면 없다는 텍스트 */}
            <div className="in-progress-box-list-div">
                {data && data.length > 0 ? (
                    data.slice(0, 4).map((approval) => (
                        <InProgressListItem key={approval.approvalCode} approval={approval} />
                    ))
                ) : (
                    <p className="no-app-main">결재할 문서가 없습니다.</p>
                )}
            </div>
        </>
    );
}

export default InProgressLists;