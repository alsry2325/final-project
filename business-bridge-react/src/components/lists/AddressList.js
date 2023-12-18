import AddressListItem from "../items/AddressListItem";

function AddressList({ data }) {
    if (!Array.isArray(data)) {
        console.error('data is not an array', data);
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