import {useNavigate} from "react-router-dom";

function EmployeeRegistrationListItem({data}) {

    const navigate = useNavigate();
    function onClickEmployeeTr(emplyCode) {
        navigate(`/emp/employee/employee-modify/${emplyCode}`)
    }

    return(
            <tbody>
            {
                data.map(employee =>(
                    <tr key={employee.emplyCode}
                        onClick={ () => onClickEmployeeTr(employee.emplyCode) }
                    >
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

export default EmployeeRegistrationListItem;