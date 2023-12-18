import {useNavigate} from "react-router-dom";

function AddressListItem({
                             addressList: {
                                 emplyCode, emplyPhoto, emplyName, emplyPhoneNumber, emplyEmail, emplyInternalNumber,
                                 departmentName, positionName, createdAt
                             }
                         }) {

    const navigate = useNavigate();

    /* 라우팅 : 화면에서 보여지는 url
    * 이동할 페이지는 AddressDetail로 새로 생성함
    * navigate 주소는 App 주소와 일치해야함 */
    const onClickAddressHandler = () => {
        navigate(`/addressBook/${emplyCode}`)
    }

    return (
        <div
            className = "addressInfoBox"
            onClick = { onClickAddressHandler }
        >
            <div className="addressInfolist">
                <div className="addressInfolistItem">{emplyName}</div>
                <div className="addressInfolistItem">{departmentName}</div>
                <div className="addressInfolistItem">{emplyPhoneNumber}</div>
                <div className="addressInfolistItem">{emplyEmail}</div>
                <div className="addressInfolistItem">{emplyInternalNumber}</div>
                <div className="addressInfolistItem">{positionName}</div>
                <div className="addressInfolistItem">{createdAt}</div>
            </div>
            <hr/>
        </div>
    );
}

export default AddressListItem;