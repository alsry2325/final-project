import {getNote, getRecipientNoteDetail, postSuccess, putSuccess} from "../modules/NoteModule";
import {authRequest, request} from "./Api";

/* 1. 받은 쪽지함 조회 */
export const callNoteRecipientListAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/notes/recipient?page=${currentPage}`);
        console.log('callNoteRecipientListAPI result :', result);

        if (result.status === 200) {
            dispatch(getNote(result));
        }
    }
};

/* 2. 받은 쪽지함 검색 (발신자명, 제목, 내용) */
export const callNoteRecipientSearchNameAPI = ({emplyName, currentPage = 1}) => {

    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/notes/search?emplyName=${emplyName}&${currentPage}`);
        console.log('callNoteRecipientSearchNameAPI result :', result);

        if (result.status === 200) {
            dispatch(getNote(result));
        }
    }
};

export const callNoteRecipientSearchTitleAPI = ({noteTitle, currentPage = 1}) => {

    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/notes/search2?noteTitle=${noteTitle}&${currentPage}`);

        if (result.status === 200) {
            dispatch(getNote(result));
        }
    }
};

export const callNoteRecipientSearchContentAPI = ({noteContent, currentPage = 1}) => {

    return async (dsipatch, getState) => {
        const result = await authRequest.get(`/api/v1/notes/search3?noteContent=${noteContent}&${currentPage}`);

        if (result.status === 200) {
            dsipatch(getNote(result));
        }
    }
};

/* 3. 보낸 쪽지함 조회 */
export const callNoteSenderListAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/notes/sender?page=${currentPage}`);
        console.log('callNoteSenderListAPI result :', result);

        if (result.status === 200) {
            dispatch(getNote(result));
        }
    }
};

/* 4. 보낸 쪽지함 검색(수신자명, 제목, 내용) */
export const callNoteSenderSearchNameAPI = ({emplyName, currentPage = 1}) => {

    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/notes/search4?emplyName=${emplyName}&${currentPage}`);
        console.log('callNoteSenderSearchNameAPI result :', result);

        if (result.status === 200) {
            dispatch(getNote(result));
        }
    }
};

export const callNoteSenderSearchTitleAPI = ({noteTitle, currentPage = 1}) => {

    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/notes/search5?noteTitle=${noteTitle}&${currentPage}`);
        console.log('callNoteSenderSearchTitleAPI result :', result);

        if (result.status === 200) {
            dispatch(getNote(result));
        }
    }
};

export const callNoteSenderSearchContentAPI = ({noteContent, currentPage = 1}) => {

    return async (dsipatch, getState) => {
        const result = await authRequest.get(`/api/v1/notes/search6?noteContent=${noteContent}&${currentPage}`);

        if (result.status === 200) {
            dsipatch(getNote(result));
        }
    }
};

/* 5. 쪽지 보관함 */
export const callNoteStorageListAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/notes/recipient/storage?=${currentPage}`);
        console.log('callNoteStorageListAPI result :', result);

        if (result.status === 200) {
            dispatch(getNote(result));
        }
    }
};

/* 6. 휴지통(받은 쪽지 삭제) */
export const callNoteTrashListAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/notes/recipient/trash?=${currentPage}`);
        console.log('callNoteTrashListAPI result :', result);

        if (result.status === 200) {
            dispatch(getNote(result));
        }
    }
};

/* 7. 수신자 쪽지 상세 조회(일반) */
export const callNoteDetailAPI = ({noteNo}) => {
    console.log(noteNo);
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/notes/recipient/${noteNo}`);
        console.log('callNoteDetailAPI result : ', result);

        if (result.status === 200) {
            dispatch(getRecipientNoteDetail(result));
        }
    }
};

/* 8. 중요 쪽지 상세 조회(수신자) */
export const callNoteStorageDetailAPI = ({noteNo}) => {
    console.log(noteNo);
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/notes/recipient/storage/${noteNo}`);
        console.log('callNoteStorageDetailAPI result : ', result);

        if (result.status === 200) {
            dispatch(getRecipientNoteDetail(result));
        }
    }
};

/* 9. 휴지통 쪽지 상세 조회(수신자) */
export const callNoteTrashDetailAPI = ({noteNo}) => {
    console.log(noteNo);
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/notes/recipient/trash/${noteNo}`);
        console.log('callNoteTrashDetailAPI result : ', result);

        if (result.status === 200) {
            dispatch(getRecipientNoteDetail(result));
        }
    }
};

/* 10. 발신 쪽지 상세 조회(발신자) */
export const callNoteSenderDetailAPI = ({noteNo}) => {
    console.log(noteNo);
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/notes/sender/${noteNo}`);
        console.log('callNoteSenderDetailAPI result : ', result);

        if (result.status === 200) {
            dispatch(getRecipientNoteDetail(result));
        }
    }
};

/* 11. 수신자 쪽지 상태 변경(STORAGE) */
export const callModifyStatusStorageAPI = ({noteNo}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`/api/v1/notes/recipient/statusStorage/${noteNo}`);
            console.log('callModifyStatusStorageAPI :', result);

            if (result.status === 201) {
                dispatch(putSuccess());
            }
        } catch (error) {
            console.error("쪽지 보관에 실패하였습니다", error);
            throw error;
        }
    }
};

/* 12. 수신자 쪽지 상태 변경(TRASH) */
export const callModifyStatusTrashAPI = ({noteNo}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`/api/v1/notes/recipient/statusTrash/${noteNo}`);
            console.log('callModifyStatusTrashAPI :', result);

            if (result.status === 201) {
                dispatch(putSuccess());
            }
        } catch (error) {
            console.error("쪽지를 휴지통으로 옮기지 못했습니다.", error);
            throw error;
        }
    }
};

/* 13. 수신자 쪽지 상태 변경(NORMAL) */
export const callModifyStatusNormalAPI = ({noteNo}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`/api/v1/notes/recipient/statusNormal/${noteNo}`);
            console.log('callModifyStatusNormalAPI :', result);

            if (result.status === 201) {
                dispatch(putSuccess());
            }
        } catch (error) {
            console.error("쪽지를 일반 쪽지함으로 옮기지 못했습니다.", error);
            throw error;
        }
    }
};

/* 14. 수신자 쪽지 상태 변경(DELETE) */
export const callModifyStatusDeleteAPI = ({noteNo}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`/api/v1/notes/recipient/statusDelete/${noteNo}`);
            console.log('callModifyStatusDeleteAPI :', result);

            if (result.status === 201) {
                dispatch(putSuccess());
            }
        } catch (error) {
            console.error("쪽지를 삭제하지 못했습니다.", error);
            throw error;
        }
    }
};

/* 15. 발신자 쪽지 상태 변경(DELETE) */
export const callModifySenderStatusDeleteAPI = ({noteNo}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`/api/v1/notes/sender/statusDelete/${noteNo}`);
            console.log('callModifySenderStatusDeleteAPI :', result);

            if (result.status === 201) {
                dispatch(putSuccess());
            }
        } catch (error) {
            console.error("쪽지를 삭제하지 못했습니다.", error);
            throw error;
        }
    }
};

/* 16. readAt 업데이트 */
export const callUpdateReadAtAPI = ({noteNo}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`/api/v1/notes/readAt/${noteNo}`);
            console.log('callUpdateReadAtAPI :', result);

            if (result.status === 201) {
                dispatch(putSuccess());
            }
        } catch (error) {
            console.error("날짜를 업데이트하지 못했습니다.", error);
            throw error;
        }
    }
};

/* 17. 쪽지 발송 */
export const callNoteRegistAPI = ({registRequest}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.post(`/api/v1/notes/send`, registRequest);

            console.log('callNoteRegistAPI :', result.status);
            if (result.status === 201) {
                dispatch(postSuccess());
            }
        } catch (error) {
            console.log("쪽지를 발송하지 못했습니다.", error);
            throw error;
        }
    }
}


