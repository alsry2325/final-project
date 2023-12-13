import {authRequest, request} from "./Api";
import {getAddress, getAddressDetail, putSuccess} from "../modules/AddressModule";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* 1. 주소록 전체 조회 */
export const callAddressBookListAPI = ({currentPage = 1}) => {
    /* callAddressBookListAPI 함수를 호출하게 되면 함수가 반환이 된다.
    * 반환 된 함수를 dispatch로 넘겼을 때, redux thunk 안에서 함수임을 체크하고 호출한다. */
    return async (dispatch, getState) => {

        /* currentPage가 뭘 요청 하는지는 callAddressBookListAPI를 호출할 때 전달받는다.
        * 백엔드의 주소와 파라미터명을 잘 체크하고 맞춰준다. */
        const result = await request('GET', `/api/v1/address-book?page=${currentPage}`);
        console.log('callAddressBookListAPI result : ', result);

        /* data와 status를 잘 받아왔다면 store에 저장한다. */
        if (result.status === 200) {
            dispatch(getAddress(result));
        }

    }
};

/* 2. 주소록 카테고리별 조회 */
export const callAddressBookDepartmentAPI = ({departmentCode, currentPage = 1}) => {
    return async (dispatch, getState) => {

        const result = await request('GET', `/api/v1/address-book/department/${departmentCode}?page=${currentPage}`);
        console.log('callAddressBookDepartmentApi result : ', result)

        if (result.status === 200) {
            dispatch(getAddress(result));
        }
    }
};

/* 3. 주소록 검색(이름, 이메일, 핸드폰 ) */
export const callAddressBookSearchNameAPI = ({emplyName}) => {
    return async (dispatch, getState) => {
        const result = await request('GET', `/api/v1/address-book/search?emplyName=${emplyName}`);
        console.log('callAddressBookSearchNameAPI result : ', result);

        if (result.status === 200) {
            dispatch(getAddress(result));
        }
    }
};

export const callAddressBookSearchEmailAPI = ({emplyEmail}) => {
    return async (dispatch, getState) => {
        const result = await request('GET', `/api/v1/address-book/search2?emplyEmail=${emplyEmail}`);

        if (result.status === 200) {
            dispatch(getAddress(result));
        }
    }
};

export const callAddressBookSearchPhoneAPI = ({emplyPhoneNumber}) => {
    return async (dispatch, getState) => {
        const result = await request('GET', `/api/v1/address-book/search3?emplyPhoneNumber=${emplyPhoneNumber}`);

        if (result.status === 200) {
            dispatch(getAddress(result));
        }
    }
};

/* 4. 주소록 상세 조회 */
export const callAddressBookDetailAPI = ({emplyCode}) => {
    return async (dispatch, getState) => {
        const result = await request('GET', `/api/v1/address-book/${emplyCode}`);
        console.log('callAddressBookDetailAPI result : ', result);

        if (result.status === 200) {
            dispatch(getAddressDetail(result));
        }
    }
};

/* 5. 주소록 수정(관리자) */
export const modifyAddressAPI = ({ emplyCode, addressBookUpdateRequest }) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`/api/v1/address-book/${emplyCode}`, addressBookUpdateRequest);
            console.log('modifyAddressAPI : ', result);

            if(result.status === 201) {
                dispatch(putSuccess());
            }

        } catch (error) {
            console.error("주소록 수정에 실패했습니다", error);
            throw error;
        }
    }
};


/* 6. 주소록 삭제(관리자) */
export const deleteAddressAPI = ({emplyCode}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.delete(`/api/v1/address-book/${emplyCode}`);
        console.log('deleteAddressAPI result :', result);

        if(result.status === 204) {
            window.location.replace("/addressBook/main")
        }
    }
};
