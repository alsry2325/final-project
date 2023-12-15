import EmployeeRegistItem from "../../../components/items/EmployeeRegistItem";

function EmployeeRegist() {


    return(
        <>
            <div>
                <div className="employeeRegistration-title">
                    <h2> 사원등록 </h2>
                </div>
                <div className="employeeRegist-area">
                    <EmployeeRegistItem/>
                </div>
            </div>
        </>
    );
}

export default EmployeeRegist;