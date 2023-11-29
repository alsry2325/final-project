package com.playwithcode.businessbridge.jwt;

import lombok.Getter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
public class CustomUser extends User { //멤버코드도 필요하기 때문에

    private final Long memberCode;

    public CustomUser(Long memberCode, UserDetails userDetails) {
        super(userDetails.getUsername(), userDetails.getPassword(), userDetails.getAuthorities());
        this.memberCode = memberCode;
    }

    public static CustomUser of(Long memberCode, UserDetails userDetails) {
        return new CustomUser(
                memberCode,
                userDetails
        );
    }
}
