package com.playwithcode.businessbridge.login.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.util.StreamUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

public class CustomUsernamePasswordAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private static final String HTTP_METHOD = "POST";
    private static final String LOGIN_REQUEST_URL = "/emp/employee/login";

    private static final String CONTENT_TYPE = "application/json";

    private static final String USERNAME = "emplyId";
    private static final String PASSWORD = "emplyPassword";

    private final ObjectMapper objectMapper;
    public CustomUsernamePasswordAuthenticationFilter(ObjectMapper objectMapper) {

        super(new AntPathRequestMatcher(LOGIN_REQUEST_URL, HTTP_METHOD));
        this.objectMapper = objectMapper;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {

        // Request Content Type "application/json" 확인 (타입이 올바른지 확인)
        if(request.getContentType() == null || !request.getContentType().equals(CONTENT_TYPE)) {
            throw new AuthenticationServiceException("Content-Type not supported"); //타입이 아닐시 에러 발생시킴
        }

        // Request Body 문자열로 읽어오기  예를들어 "{"memberId"  : "test01","memberPassword":"1234"}"
        //객체를 꺼내서 UTF_8 문자셋으로 그안에있는 http 문자열에 있는 바디영역을 꺼내서 문자열로 읽어옴
        String body = StreamUtils.copyToString(request.getInputStream(), StandardCharsets.UTF_8);

        // JSON 문자열을 읽어와서  Java Map 타입으로 변환
        // 반환된 bodyMap에는  유저이름과 패스워드가 있음
        Map<String, String> bodyMap = objectMapper.readValue(body, Map.class);

        // key 값을 전달해서 Map에서 id와 pwd 꺼내기
        String memberId = bodyMap.get(USERNAME);
        String memberPassword = bodyMap.get(PASSWORD);

        // 인증 토큰에 memberId, memberPassword 세팅
        UsernamePasswordAuthenticationToken authenticationToken
                = new UsernamePasswordAuthenticationToken(memberId, memberPassword);

        // 인증 매니저에게 인증 토큰 전달
        return this.getAuthenticationManager().authenticate(authenticationToken);
    }
}
