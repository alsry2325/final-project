package com.playwithcode.businessbridge.common.exception;



import com.playwithcode.businessbridge.common.exception.type.ExceptionCode;
import lombok.Getter;

@Getter
public class CustomException  extends RuntimeException{  //모든 Exception들이 상속 받을수 있게

//    private final int code;
//    private final String message;
//
//    public CustomException(final ExceptionCode exceptionCode) {
//        this.code = exceptionCode.getCode();
//        this.message = exceptionCode.getMessage();
//    }
}
