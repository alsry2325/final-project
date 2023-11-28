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
    /* 로그인파트 예외처리 */
    FAIL_LOGIN(4000, "로그인에 실패하였습니다."),

    /* 주소록 파트 예외처리 */
    NOT_FOUND_EMPLY_CODE(4001, "사원 코드에 해당하는 사원이 존재하지 않습니다.");
    private final int code;
    private final String message;


}
