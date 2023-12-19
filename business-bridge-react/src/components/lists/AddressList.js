import AddressListItem from "../items/AddressListItem";

function AddressList({ data }) {
    if (!Array.isArray(data)) {
        console.error('address 데이터를 받아올 수 없습니다.', data);
        return null;
    }

    return (
        <div className="address-div">
            {
                data &&
                data.map(addressList => <AddressListItem key={addressList.emplyCode} addressList={addressList}/>)
            }
        </div>
    );
}

export default AddressList;