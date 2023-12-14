function EmployeeRegistItem() {


    return(
        <table className="employeeRegist-employee-information">
            <thead>
            <tr>
                <th>
                    <img src="" alt="employeephoto"/>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td style={{backgroundColor: '#F1F0F6'}}>이름</td>
                <td style={{backgroundColor: '#F1F0F6'}}>소속</td>
                <td colSpan="2">(주)비즈니스브릿지</td>
                <td style={{backgroundColor: '#F1F0F6'}}>사내번호</td>
                <td>전화번호 입력창</td>
            </tr>
            <tr>
                <td rowSpan='5'>사원이름입력창</td>
                <td style={{backgroundColor: '#F1F0F6'}}>사번</td>
                <td colSpan="2">사원아이디입력창</td>
                <td style={{backgroundColor: '#F1F0F6'}}>개인번호</td>
                <td>사원전화번호입력창
                </td>
            </tr>
            <tr>
                <td style={{backgroundColor: '#F1F0F6'}}>이메일</td>
                <td colSpan="2">사원이메일입력창</td>
                <td style={{backgroundColor: '#F1F0F6'}}>입사일</td>
                <td>입사일입력창</td>
            </tr>
            <tr>

                <td style={{backgroundColor: '#F1F0F6'}}>직위</td>
                <td colSpan="2">직위입력창</td>
                <td style={{backgroundColor: '#F1F0F6'}}>부서</td>
                <td>부서입력창</td>
            </tr>
            </tbody>
        </table>
    );
}
export default EmployeeRegistItem;