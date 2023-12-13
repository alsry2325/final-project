function AddressItem({address}) {

    return (
        <>
            <table className="address-information">
                <thead>
                <tr>
                    <th>
                        <img src={address.emplyPhoto} alt="Employee" />
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style={{backgroundColor: '#F1F0F6'}}>이름</td>
                    <td style={{backgroundColor: '#F1F0F6'}}>소속</td>
                    <td colSpan="2">{ address.emplyOffice}</td>
                    <td style={{backgroundColor: '#F1F0F6'}}>사내번호</td>
                    <td>{address.emplyInternalNumber &&
                        `${address.emplyInternalNumber.slice(0, 2)} -
                        ${address.emplyInternalNumber.slice(2, 6)} -
                        ${address.emplyInternalNumber.slice(6)}` }</td>
                </tr>
                <tr>
                    <td rowSpan='5'>{ address.emplyName }</td>
                    <td style={{backgroundColor: '#F1F0F6'}}>사번</td>
                    <td colSpan="2">{address.emplyCode}</td>
                    <td style={{backgroundColor: '#F1F0F6'}}>개인번호</td>
                    <td>{address.emplyPhoneNumber &&
                        `${address.emplyPhoneNumber.slice(0, 3)} -
                        ${address.emplyPhoneNumber.slice(3, 7)} -
                        ${address.emplyPhoneNumber.slice(7)}`}
                    </td>
                </tr>
                <tr>
                    <td style={{backgroundColor: '#F1F0F6'}}>이메일</td>
                    <td colSpan="2">{address.emplyEmail}</td>
                    <td style={{backgroundColor: '#F1F0F6'}}>입사일</td>
                    <td>{address.createdAt}</td>
                </tr>
                <tr>

                    <td style={{backgroundColor: '#F1F0F6'}}>직위/부서</td>
                    <td colSpan="2">{address.position}/{address.department}</td>
                    <td style={{backgroundColor: '#F1F0F6'}}>퇴사일</td>
                    <td>{address.retirementDate}</td>
                </tr>
                </tbody>
            </table>
        </>
    );

}

export default AddressItem;