
function EmployeeRegistrationItem({data}) {

    return(
        <table className="employee-table">
            <thead>
            <tr>
                <th><input type="checkbox"/></th>
                <th>이름</th>
                <th>부서</th>
                <th>직위</th>
                <th>휴대폰</th>
                <th>이메일</th>
                <th>사내번호</th>
                <th>소속</th>
            </tr>
            </thead>
            <tbody>
            {
                data.map(employee =>(
                    <tr key={employee.employeeCode}>
                        <td><input type="checkbox"/></td>
                        <td className="employeeRegistration-name-Image">
                            <img src={employee.emplyPhoto} alt="employeephoto" style={{ width: 40 ,display: "inline-block",borderRadius:20}} />
                            <span id="special-span">{employee.emplyName}</span>
                        </td>
                        <td>{employee.positionName}</td>
                        <td>{employee.departmentName}</td>
                        <td>{employee.emplyPhoneNumber}</td>
                        <td>{employee.emplyEmail}</td>
                        <td>{employee.emplyInternalNumber}</td>
                        <td>{employee.emplyOffice}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}

export default EmployeeRegistrationItem;