package com.playwithcode.businessbridge.common.exception;


import com.playwithcode.businessbridge.common.exception.type.ExceptionCode;
import lombok.Getter;

@Getter
public class BadRequestException extends CustomException {

    public BadRequestException(final ExceptionCode exceptionCode) {
        super(exceptionCode);
    }
}
