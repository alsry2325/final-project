function MyPageItem( { myPageInfo } ) {

    function formatDate(dateString) {
        const isoDate = new Date(dateString);
        const formattedDate = isoDate.toISOString().split('T')[0];
        return formattedDate;
    }

    return(
            <table className="myPage-employee-information">
                <thead>
                <tr>
                    <th>
                        <img src={myPageInfo.emplyPhoto} alt="employeephoto"/>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style={{backgroundColor: '#F1F0F6'}}>이름</td>
                    <td style={{backgroundColor: '#F1F0F6'}}>소속</td>
                    <td colSpan="2">{ myPageInfo.emplyOffice}</td>
                    <td style={{backgroundColor: '#F1F0F6'}}>사내번호</td>
                    <td>{myPageInfo.emplyInternalNumber &&
                        `${myPageInfo.emplyInternalNumber.slice(0, 2)} -
                        ${myPageInfo.emplyInternalNumber.slice(2, 6)} -
                        ${myPageInfo.emplyInternalNumber.slice(6)}` }</td>
                </tr>
                <tr>
                    <td rowSpan='5'>{ myPageInfo.emplyName }</td>
                    <td style={{backgroundColor: '#F1F0F6'}}>사번</td>
                    <td colSpan="2">{myPageInfo.emplyId}</td>
                    <td style={{backgroundColor: '#F1F0F6'}}>개인번호</td>
                    <td>{myPageInfo.emplyPhoneNumber &&
                        `${myPageInfo.emplyPhoneNumber.slice(0, 3)} -
                        ${myPageInfo.emplyPhoneNumber.slice(3, 7)} -
                        ${myPageInfo.emplyPhoneNumber.slice(7)}`}
                    </td>
                </tr>
                <tr>
                    <td style={{backgroundColor: '#F1F0F6'}}>이메일</td>
                    <td colSpan="2">{myPageInfo.emplyEmail}</td>
                    <td style={{backgroundColor: '#F1F0F6'}}>입사일</td>
                    <td>{formatDate(myPageInfo.createdAt)}</td>
                </tr>
                <tr>

                    <td style={{backgroundColor: '#F1F0F6'}}>직위/부서</td>
                    <td colSpan="2">{myPageInfo.position}/{myPageInfo.department}</td>
                    <td style={{backgroundColor: '#F1F0F6'}}>퇴사일</td>
                    <td>{myPageInfo.retirementDate}</td>
                </tr>
                </tbody>
            </table>
    );
}

export default MyPageItem;