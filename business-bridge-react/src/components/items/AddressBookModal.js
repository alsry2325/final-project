import React from "react";
import Modal from "react-modal";

function AddressBookModal({
                              isOpen,
                              onRequestClose,
                              searchType,
                              setSearchType,
                              searchQuery,
                              setSearchQuery,
                              handleSearch,
                              addressData,
                              handleSelectRecipient
                          }) {
    return (
        <Modal isOpen={isOpen}
               onRequestClose={onRequestClose}
               className="customModal"
               overlayClassName="customOverlay"
        >
            <div className="note-modal-wrapper">
                <h2 className="note-modal-h1">주소록 검색</h2>
                <div className="note-modal-search">
                    <select
                        value={searchType} onChange={(e) => setSearchType(e.target.value)}
                        className="note-modal-select">
                        <option value="name">이름</option>
                        <option value="email">이메일</option>
                        <option value="phone">핸드폰</option>
                    </select>
                    <input
                        type="text"
                        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        className="note-modal-input"
                    />
                    <button
                        onClick={handleSearch}
                        className="note-modal-searchBtn"
                    >검색
                    </button>
                </div>
                <div>
                    <div className="note-modal-list">
                        {addressData && addressData.data && addressData.data.map((item, index) => (
                            <div className="note-modal-address-info" key={index}
                                 onClick={() => handleSelectRecipient(item.emplyCode, item.emplyName)}>
                                <div className="note-modal-detail">
                                    {item.emplyName} {item.departmentName} {item.positionName} {item.emplyEmail}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default AddressBookModal;
