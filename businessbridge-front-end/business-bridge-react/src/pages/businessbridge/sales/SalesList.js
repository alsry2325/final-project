import {ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {callSalesListAPI} from "../../../apis/SalesAPICalls";
import PagingBar from "../../../components/common/PagingBar";
import SalesRegistModal from "../../../components/modal/SalesRegistModal";


function SalesList() {

    const dispatch = useDispatch();
    const { salesStatus } = useParams();
    const { salesList, postSuccess } = useSelector(state => state.salesReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const [schType, setSchType] = useState("");
    const [schText, setSchText] = useState("");
    const navigate = useNavigate();
    const [isRegistModalOpen, setIsRegistModalOpen] = useState(false);
    const openRegistModal = () => setIsRegistModalOpen(true);
    const closeRegistModal = () => setIsRegistModalOpen(false);

    //목록 api 호출
    useEffect(() => {
        dispatch(callSalesListAPI( {schType, schText, salesStatus, currentPage}) );
    }, [postSuccess , salesStatus, currentPage]);

    const onClickTableTr = (salesCode) => {
        navigate(`/sales/${salesCode}`);
    };

    const getSchType = () => {
        return schType;
      };
    
    const getSchText = () => {
        return schText;
    };

    const onClickSalesInsert = () => {
        console.log("영업등록 페이지 이동")
        navigate('/sales/sales-regist');
    }


    /* 진행도에 따른 버튼색 추가*/
    const getButtonClass = (status) => {
        switch(status) {
            case '접수':
                return 'sales-list-button-received'; // '접수' 상태에 대한 클래스
            case '진행':
                return 'sales-list-button-progress'; // '진행' 상태에 대한 클래스
            case '완결':
                return 'sales-list-button-complete'; // '완료' 상태에 대한 클래스
        }
    }

    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            {
                salesList &&
                <>
                    <div className="sales-div">
                        <div className="sales-h1">
                            <h1>영업 목록</h1>
                        </div>
                        <div className="search-div"  style={{ float: "right" }}>
                        <select name="schType" id="schType" onChange={(e) => {
                            const value = e.target.value;
                            if(value === ""){
                                document.getElementById('schText').value = "";
                            }
                            setSchType(value);
                        }}>
                            <option value="">전체</option>
                            <option value="salesName">영업이름</option>
                            <option value="accountName">거래처명</option>
                        </select>
                        <input type="text" name="schText" id="schText" placeholder="검색어" onChange={(e) => {
                            setSchText(e.target.value);
                        }} />
                        <button type="button" onClick={() => {
                            dispatch(callSalesListAPI({
                                salesStatus,
                                currentPage,
                                schType: getSchType(),
                                schText: getSchText(),
                            }));
                        }}>검색</button>
                        </div>
                        <button
                            className="sales-button"
                            onClick={ openRegistModal }>영업등록
                        </button>
                        <table className="sales-table">
                            <colgroup>
                                <col width="10%" />
                                <col width="10%" />
                                <col width="15%" />
                                <col width="15%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="10%" />
                            </colgroup>
                            <thead>
                            <tr>
                                <th>영업등급</th>
                                <th>영업담당</th>
                                <th>회사명</th>
                                <th>영업내용</th>
                                <th>유형</th>
                                <th>영업형태</th>
                                <th>영업품목</th>
                                <th>영업진행도</th>
                            </tr>
                            </thead>
                            <tbody>
                            { salesList.data.map(sales => (
                                <tr key={sales.salesCode}
                                    onClick={() => onClickTableTr(sales.salesCode)}
                                >
                                    <td>{sales.customerRating}</td>
                                    <td>{sales.salesMember}</td>
                                    <td>{sales.accountName}</td>
                                    <td>{sales.salesName}</td>
                                    <td>{sales.salesType}</td>
                                    <td>{sales.salesWay}</td>
                                    <td>{sales.productName}</td>
                                    <td>
                                        <button className={`${getButtonClass(sales.salesStatus)}`}>
                                            {sales.salesStatus}
                                        </button>
                                    </td>
                                </tr>
                            ))
                            }
                            </tbody>
                        </table>
                    </div>

                    <PagingBar pageInfo={salesList.pageInfo} setCurrentPage={setCurrentPage}/>
                </>
            }
            {isRegistModalOpen &&
                <SalesRegistModal setIsOpen={setIsRegistModalOpen} />}
        </>
    );
}

export default SalesList;