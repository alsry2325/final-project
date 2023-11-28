package com.playwithcode.businessbridge.sales.dto.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Date;

import static lombok.AccessLevel.PRIVATE;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class SalesResponse {

    private final Long salesCode; //영업코드

}
