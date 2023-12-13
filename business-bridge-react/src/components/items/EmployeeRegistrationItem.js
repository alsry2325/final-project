
function EmployeeRegistrationItem({data}) {

    return(
            <tbody>
            {
                data.map(employee =>(
                    <tr key={employee.emplyCode}>
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
    );
}

export default EmployeeRegistrationItem;