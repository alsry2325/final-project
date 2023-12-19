import {ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {callAccountListAPI} from "../../../apis/AccountAPICalls";
import PagingBar from "../../../components/common/PagingBar";
import AccountRegistModal from "../../../components/modal/AccountRegistModal";



function AccountList() {

    const dispatch = useDispatch();
    const { departmentCode } = useParams();
    const { accountList, postSuccess } = useSelector(state => state.accountReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const [schType, setSchType] = useState("");
    const [schText, setSchText] = useState("");
    const navigate = useNavigate();
    const [isRegistModalOpen, setIsRegistModalOpen] = useState(false);
    const openRegistModal = () => setIsRegistModalOpen(true);
    const closeRegistModal = () => setIsRegistModalOpen(false);
    //목록 api 호출
    useEffect(() => {
        dispatch(callAccountListAPI( {departmentCode, schType, schText, currentPage}) );
    }, [postSuccess, departmentCode, currentPage]);

    const onClickTableTr = (accountCode) => {
        navigate(`/account/${accountCode}`);
    };

    const getSchType = () => {
        return schType;
      };
    
    const getSchText = () => {
        return schText;
    };

    const onClickAccountInsert = () => {
        console.log("거래처등록 페이지 이동")
        navigate('/account/account-regist');
    }

    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            {
                accountList &&
                <>
                    <div className="sales-div">
                        <h1>거래처 목록</h1>
                        <div className="search-div"  style={{ float: "right" }}>
                        <select name="schType" id="schType" onChange={(e) => {
                            const value = e.target.value;
                            if(value === ""){
                                document.getElementById('schText').value = "";
                            }
                            setSchType(value);
                        }}>
                            <option value="">전체</option>
                            <option value="accountName">거래처명</option>
                            <option value="customerRepresentative">대표자명</option>
                        </select>
                        <input type="text" name="schText" id="schText" placeholder="검색어" onChange={(e) => {
                            setSchText(e.target.value);
                        }} />
                        <button type="button" onClick={() => {
                            dispatch(callAccountListAPI({
                                departmentCode,
                                currentPage,
                                schType: getSchType(),
                                schText: getSchText(),
                            }));
                        }}>검색</button>
                        </div>
                        <button
                            className="sales-button"
                            onClick={ openRegistModal }>거래처등록</button>
                        <table className="sales-table">
                            <colgroup>
                                <col width="10%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="20%" />
                                <col width="10%" />
                                <col width="10%" />
                            </colgroup>
                            <thead>
                            <tr>
                                <th>거래처 코드</th>
                                <th>거래처 명</th>
                                <th>대표자</th>
                                <th>대표전화</th>
                                <th>세금계산서 메일</th>
                                <th>영업부서</th>
                                <th>거래처 담당자</th>
                            </tr>
                            </thead>
                            <tbody>
                            {accountList.data.length === 0 && (
                                <tr>
                                    < td colSpan="7">데이터가 없습니다.</td>
                                </tr>
                            )}
                            { accountList.data.map(account => (
                                <tr key={account.accountCode}
                                    onClick={() => onClickTableTr(account.accountCode)}
                                >
                                    <td>{account.accountCode}</td>
                                    <td>{account.accountName}</td>
                                    <td>{account.customerRepresentative}</td>
                                    <td>{account.accountNumber}</td>
                                    <td>{account.taxInvoiceMail}</td>
                                    <td>{account.departmentName}</td>
                                    <td>{account.accountManager}</td>
                                </tr>
                            ))
                            }
                            </tbody>
                        </table>
                    </div>
                    <PagingBar pageInfo={accountList.pageInfo} setCurrentPage={setCurrentPage}/>
                </>
            }
            {isRegistModalOpen &&
                <AccountRegistModal setIsOpen={setIsRegistModalOpen} />}
        </>
    );
}

export default AccountList;