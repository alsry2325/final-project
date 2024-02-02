import SalesChart from "../../pages/businessbridge/sales/SalesChart";
import salesStatistics from "../../pages/businessbridge/sales/SalesStatistics";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callsalesStatisticsAPI} from "../../apis/SalesAPICalls";

function Salesstatistics() {
    const dispatch = useDispatch();
    const salesStatistics = useSelector(state => state.salesReducer.salesStatistics);

    useEffect(() => {
        dispatch(callsalesStatisticsAPI());
    }, [dispatch]);


    return(
        <div className="main-sales-div">
            <div className="main-note-wrapper-title">
                <h3>영업통계</h3>
            </div>
            <div className="main-statistics-div">
                {salesStatistics && <SalesChart data={salesStatistics} />}
            </div>
        </div>
    );
}

export default Salesstatistics;