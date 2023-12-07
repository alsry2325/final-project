import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callSalesAPI} from "../../apis/SalesAPICalls";

function SalesDetail() {

    console.log("영업 상세페이지 진입")

    const { salesCode } = useParams();
    //디스패쳐에서 가져온 영업상세정보 값
    const { sales } = useSelector(state => state.salesReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callSalesAPI({ salesCode }));
    }, []);

    return (
        <>
        {   sales &&
            <div className="review-detail-table-div">
                <table className="review-detail-table">
                    <tbody>
                            <tr>
                                <th>영업제목</th>
                                <td>{sales.salesName}</td>
                            </tr>
                            <tr>
                                <th>영업담당자</th>
                                <td>{sales.memberName}</td>
                            </tr>
                            <tr>
                                <th>작성일</th>
                                <td>{sales.createdAt}</td>
                            </tr>
                    </tbody>
                </table>
                <div className="product-button-div">
                    <button
                        className="back-btn"
                        onClick={() => navigate(-1)}
                    >
                        돌아가기
                    </button>
                </div>
            </div>
            }
        </>
    );
}

export default SalesDetail;
