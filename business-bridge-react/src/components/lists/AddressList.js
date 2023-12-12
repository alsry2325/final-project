import AddressListItem from "../items/AddressListItem";

function AddressList({ data }) {

    return (
        <div className="address-div">
            {
                data &&
                data.map(address => <AddressListItem key={address.emplyCode} address={address}/>)
            }
        </div>
    );
}

export default AddressList;