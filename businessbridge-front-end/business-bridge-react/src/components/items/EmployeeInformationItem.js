function EmployeeInformationItem({ myPageInfo }) {


    return(
        <>
            <div className="main-employeeInformation-cover">
                <div className="main-Image-area">
                    <img src={myPageInfo.emplyPhoto} alt="employeephoto"/>
                </div>
                <div>
                    <h2>{myPageInfo.emplyName}</h2>
                    <span>{myPageInfo.department}/{myPageInfo.position}</span>
                </div>
            </div>
        </>
    );
}

export default EmployeeInformationItem;