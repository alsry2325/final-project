package com.playwithcode.businessbridge.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeMailRequest {
    private String address;
    private String title;
    private String message;
}