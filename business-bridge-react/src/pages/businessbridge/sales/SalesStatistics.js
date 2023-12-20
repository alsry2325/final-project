import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callsalesStatisticsAPI} from "../../../apis/SalesAPICalls";
import {useNavigate} from "react-router-dom";
import SalesChart from "./SalesChart";

function SalesStatistics() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { salesStatistics } = useSelector(state => state.salesReducer);
    //목록 api 호출
    useEffect(() => {
        dispatch(callsalesStatisticsAPI());
    }, []);

    return (
        <>
            {
                salesStatistics &&
                <>
                    <div className="sales-div">
                                <h1>실적 통계</h1>
                                <table className="sales-table">
                                    <colgroup>
                                        <col width="15%" />
                                        <col width="15%" />
                                        <col width="15%" />
                                        <col width="15%" />
                                        <col width="15%" />
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>실적순위</th>
                                        <th>직급명</th>
                                        <th>사원명</th>
                                        <th>누적 완결수</th>
                                        <th>부서명</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { salesStatistics.map(item => (
                                        <tr>
                                            <td>{item.sales_rank}</td>
                                            <td>{item.position_name}</td>
                                            <td>{item.emply_name}</td>
                                            <td>{item.count}</td>
                                            <td>{item.department_name}</td>
                                        </tr>
                                    ))
                                    }
                                    </tbody>
                                </table>
                        <SalesChart data={salesStatistics} /> {/* 차트 컴포넌트 추가 */}
                    </div>
                </>
            }
        </>
    );
}

export default SalesStatistics;