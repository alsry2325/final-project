import ApprovalButton from "../../components/approval/item/ApprovalButton";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callBusinessDraftDetailAPI} from "../../apis/ApprovalAPICalls";
import {useParams} from "react-router-dom";
import BusinessDraftItem from "../../components/approval/item/BusinessDraftItem";

function AppDetail() {

    const dispatch = useDispatch();
    const {approvalCode} = useParams();
    const {businessDraft} = useSelector(state => state.approvalReducer);

    useEffect(() => {
        dispatch(callBusinessDraftDetailAPI({approvalCode}))
    }, []);

    return(
        <>
            {businessDraft &&
                <>
                    <h2 className="approval-title">{businessDraft.title}</h2>
                    <ApprovalButton/>
                    <BusinessDraftItem businessDraft={businessDraft}/>
                </>
            }
        </>
    );
}

export default AppDetail;