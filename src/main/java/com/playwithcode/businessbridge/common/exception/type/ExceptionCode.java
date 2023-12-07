package com.playwithcode.businessbridge.common.exception.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ExceptionCode {

    /**
     * 예외처리 예시
     * 규칙 :       // **파트 예외처리
     *
     */

    /* 파일 업로드 예외처리 */
    FAIL_TO_UPLOAD_FILE(1001, "파일 저장에 실패하였습니다."),
    FAIL_TO_DELETE_FILE(1002, "파일 삭제에 실패하였습니다."),

    /* 로그인파트 예외처리 */
    FAIL_LOGIN(4000, "로그인에 실패하였습니다."),
    NOT_FOUND_MEMBER_ID(4002, "아이디에 해당하는 유저가 없습니다."),
    UNAUTHORIZED(4001, "인증 되지 않은 요청입니다."),
    ACCESS_DENIED(4003, "허가 되지 않은 요청입니다."),
    /* 사원등록파트 예외처리 */
    NOT_FOUND_MEMBER_EMAIL(4004,"이메일을 찾을수없습니다"),

    /* 주소록 예외처리 */
    NOT_FOUND_EMPLY_CODE(5001, "사원 코드에 해당하는 사원이 존재하지 않습니다."),
    NOT_FOUND_DEPARTMENT_CODE(5002, "부서 코드에 해당하는 부서가 존재하지 않습니다."),
    NOT_FOUND_POSITION_CODE(5003, "직급 코드에 해당하는 직급이 존재하지 않습니다."),

    /* 쪽지 예외처리 */
    NOT_FOUND_NOTE_NO(6001, "쪽지를 찾을 수 없습니다."),

    /* 전자결재 파트 예외처리 */
    NOT_FOUND_APPROVAL_CODE(7001, "전자결재 코드에 해당하는 결재가 존재하지 않습니다."),
    NOT_FOUND_MY_APPROVAL(7002, "기안한 문서가 존재하지 않습니다."),
    NOT_FOUND_COLLECT_DOCUMENT(7003, "회수할 문서가 존재하지 않습니다."),
    ALREADY_CONFIRM_DOC(7004, "이미 결재한 문서입니다.");

    private final int code;
    private final String message;

}
