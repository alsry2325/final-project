package com.playwithcode.businessbridge.login.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        /* 로그인 성공 후 저장 된 인증 객체에서 정보를 꺼낸다. */
        Map<String, String> employeeInfo = getEmployeeInfo(authentication);
        log.info("로그인 성공 후 인증 객체에서 꺼낸 정보 : {}", employeeInfo);


    }

    private Map<String, String> getEmployeeInfo(Authentication authentication) {
        //인증 성공한 객체를 꺼냄
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        // 다양한값들 있어서 문자열로 꺼내옴
        String emplyRole = userDetails.getAuthorities()
                //맵안에 있는 값을 문자열로 꺼내서
                .stream().map(auth -> auth.getAuthority().toString())
                //배열 안에있는것을 문자열로 나란히 꺼냄
                .collect(Collectors.joining());
        //유저아이디,유저역할을 맵에 담음
        return Map.of(
                "emplyId", userDetails.getUsername(),
                "emplyRole", emplyRole
        );
    }

}
