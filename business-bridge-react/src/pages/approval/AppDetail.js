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
    }, [approvalCode]);

    console.log("businessDraft : {}", businessDraft)

    return(
        <>
            <h1>문서 조회 화면</h1>
            <h5>제목</h5>
            <ApprovalButton/>
            {businessDraft.docForm === '업무기안서' &&
                <BusinessDraftItem/>
            }
        </>
    );
}

export default AppDetail;