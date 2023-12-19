import SideCalendar from "./SideCalendar";

function EmployeeInformation(){

    return(

            <div className="main-employee-area">
                <div className="main-employeeInformation-cover">
                    <div className="main-Image-area">
                        <img src="/images/employee-image.png" alt="employeephoto"/>
                    </div>
                    <div>
                        <h2>정민교</h2>
                        <span>영업팀/사원</span>
                    </div>
                </div>
                <div className="main-mailImage-cover">
                        <SideCalendar/>
                </div>
            </div>

    );
}

export default EmployeeInformation;