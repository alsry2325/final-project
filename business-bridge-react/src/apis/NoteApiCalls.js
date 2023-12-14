import {getNote} from "../modules/NoteModule";
import {authRequest, request} from "./Api";

/* 1. 받은 쪽지함 조회 */
export const callNoteRecipientListAPI = ({ currentPage = 1 }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/notes/recipient?page=${currentPage}`);
        console.log('callNoteRecipientListAPI result :', result);

        if (result.status === 200) {
            dispatch(getNote(result));
        }
    }
};

/* 2. 받은 쪽지함 검색 (발신자명, 제목, 내용) */
export const callNoteRecipientSearchNameAPI = ({emplyName}) => {

    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/notes/search?emplyName=${emplyName}`);
        console.log('callNoteRecipientSearchNameAPI result :', result);

        if(result.status === 200) {
            dispatch(getNote(result));
        }
    }
};

export const callNoteRecipientSearchTitleAPI = ({noteTitle}) => {

    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/notes/search2?noteTitle=${noteTitle}`);

        if(result.status === 200) {
            dispatch(getNote(result));
        }
    }
};

export const callNoteRecipientSearchContentAPI = ({noteContent}) => {

    return async (dsipatch, getState) => {
        const result = await authRequest.get(`/api/v1/notes/search3?noteContent=${noteContent}`);

        if(result.status === 200) {
            dsipatch(getNote(result));
        }
    }
};

/* 3. 보낸 쪽지함 조회 */
export const callNoteSenderListAPI = ({ currentPage = 1 }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/notes/sender?page=${currentPage}`);
        console.log('callNoteSenderListAPI result :', result);

        if (result.status === 200) {
            dispatch(getNote(result));
        }
    }
};

/* 4. 보낸 쪽지함 검색(수신자명, 제목, 내용) */
export const callNoteSenderSearchNameAPI = ({emplyName}) => {

    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/notes/search4?emplyName=${emplyName}`);
        console.log('callNoteSenderSearchNameAPI result :', result);

        if(result.status === 200) {
            dispatch(getNote(result));
        }
    }
};

export const callNoteSenderSearchTitleAPI = ({noteTitle}) => {

    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/notes/search5?noteTitle=${noteTitle}`);
        console.log('callNoteSenderSearchTitleAPI result :', result);

        if(result.status === 200) {
            dispatch(getNote(result));
        }
    }
};

export const callNoteSenderSearchContentAPI = ({noteContent}) => {

    return async (dsipatch, getState) => {
        const result = await authRequest.get(`/api/v1/notes/search6?noteContent=${noteContent}`);

        if(result.status === 200) {
            dsipatch(getNote(result));
        }
    }
};

/* 5. 쪽지 보관함 */
export const callNoteStorageListAPI = ({ currentPage = 1 }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/notes/recipient/storage?=${currentPage}`);
        console.log('callNoteStorageListAPI result :', result);

        if (result.status === 200) {
            dispatch(getNote(result));
        }
    }
};

/* 6. 휴지통(받은 쪽지 삭제) */
export const callNoteTrashListAPI = ({ currentPage = 1 }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/notes/recipient/trash?=${currentPage}`);
        console.log('callNoteTrashListAPI result :', result);

        if (result.status === 200) {
            dispatch(getNote(result));
        }
    }
};