import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callEmployeeAPI} from "../../../apis/EmployeeAPICalls";
import MyPageItem from "../../../components/items/MyPageItem";
function MyPage() {

    const dispatch = useDispatch();
    const { myPageInfo } = useSelector(state => state.memberReducer);
    useEffect(() => {
        dispatch(callEmployeeAPI());
    }, []);
    // console.log(myPageInfo);
    return (
        <>

            <div className="myPage-background-div">
                <div className="myPage-div-h1">
                    <h1>마이페이지</h1>
                </div>
                <div className="myPage-div-line">
                </div>
                {
                    myPageInfo &&
                    <MyPageItem myPageInfo={ myPageInfo }/>
                }
                <div className="myPage-password-btn">
                    비밀번호 수정
                </div>
                <div className="myPage-div-h3">
                    <h3>변경이력 5</h3>
                </div>
                <div className="myPage-div-line">
                </div>
                <>
                    추후 업데이트
                </>
            </div>
        </>
    );
}

export default MyPage;