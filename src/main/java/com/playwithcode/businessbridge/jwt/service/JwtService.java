package com.playwithcode.businessbridge.jwt.service;

import com.playwithcode.businessbridge.common.exception.NotFoundException;
import com.playwithcode.businessbridge.jwt.CustomUser;
import com.playwithcode.businessbridge.member.domain.Employee;
import com.playwithcode.businessbridge.member.domain.repository.EmployeeRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

import static com.playwithcode.businessbridge.common.exception.type.ExceptionCode.NOT_FOUND_MEMBER_ID;

@Service
@Slf4j
public class JwtService {

    @Value("${jwt.access.expiration}")
    private Long accessTokenExpirationPeriod;
    @Value("${jwt.refresh.expiration}")
    private Long refreshTokenExpirationPeriod;
    private final Key key;
    private final EmployeeRepository employeeRepositroy;

    private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
    private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";
    //토큰 구별을 하기위해
    private static final String BEARER = "Bearer ";

    public JwtService(@Value("${jwt.secret}") String secretKey, EmployeeRepository employeeRepositroy) {
         //.yml쪽 비밀키를 읽어와  BASE64로 인코딩 된 문자열
        byte[] keyBytes = Decoders.BASE64.decode(secretKey); //바이트 배열로 만듬
        this.key = Keys.hmacShaKeyFor(keyBytes);       //인증키를 만들어줌
        this.employeeRepositroy = employeeRepositroy;
    }


    public String createAccessToken(Map<String, String> employeeInfo) {
        /* Claims : 페이로드같은 몸체가 담겼음 */
        Claims claims = Jwts.claims().setSubject(ACCESS_TOKEN_SUBJECT);
        //토큰 몸체에 memberInfo까지 담음
        claims.putAll(employeeInfo);

        return Jwts.builder()
                .setClaims(claims)
                //현재 시간부터,주고싶은 유효 시간
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpirationPeriod))
                //서명 시크릿 키 필요함, 알고리즘
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String createRefreshToken() {

        return Jwts.builder()
                .setSubject(REFRESH_TOKEN_SUBJECT)
                //현재 시간부터,주고싶은 유효 시간
                .setExpiration(new Date(System.currentTimeMillis() + refreshTokenExpirationPeriod))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    @Transactional //디비에 업데이트 되려면 선언
    public void updateRefreshToken(String emplyId, String refreshToken) {
        employeeRepositroy.findByEmplyId(emplyId)
                //만약 있으면?
                .ifPresentOrElse(
                        member -> member.updateRefreshToken(refreshToken),
                        //없으면? 없다는 에러 메세지
                        () -> new NotFoundException(NOT_FOUND_MEMBER_ID)
                );

    }

    public Optional<String> getRefreshToken(HttpServletRequest request) {

        return Optional.ofNullable(request.getHeader("Refresh-Token")) //있을수도 있고 없을수도 있다
                // BEARER로 시작하는지 필터링하고
                .filter(refreshToken -> refreshToken.startsWith(BEARER))
                //그렇게 시작한다면 앞에있는 BEARER를 때어냄
                .map(refreshToken -> refreshToken.replace(BEARER, ""));
    }
    public Optional<String> getAccessToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader("Access-Token"))
                .filter(accessToken -> accessToken.startsWith(BEARER))
                .map(accessToken -> accessToken.replace(BEARER, ""));
    }

    /* 토큰유효성 검사*/
    public boolean isValidToken(String token) { 

        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token); //정확한 유효한 토큰인지 확인
            return true;
        } catch (Exception e) {
            log.error("유효하지 않은 토큰입니다. {}", e.getMessage());
            return false;
        }
    }
    //DB에서 Refresh Token 일치 여부 확인 후 일치하면 AccessToken 재발급
    public void checkRefreshTokenAndReIssueAccessToken(HttpServletResponse response, String refreshToken) {
            employeeRepositroy.findByRefreshToken(refreshToken)
                 .ifPresent(employee -> { //일치하면
                    String reIssuedRefreshToken = reIssuedRefreshToken(employee); //재발급해서 디비에 업데이트
                    String accessToken = createAccessToken(  //새로운 토큰
                    Map.of("emplyId", employee.getEmplyId(), "emplyRole", employee.getEmplyRole().name())
            );
            response.setHeader("Access-Token", accessToken); //사용자 응답으로 넘어감
            response.setHeader("Refresh-Token", reIssuedRefreshToken);
        });
    }

    //AccessToken 재발급
    private String reIssuedRefreshToken(Employee employee) {

        String reIssuedRefreshToken = createRefreshToken();
        employee.updateRefreshToken(reIssuedRefreshToken); //member필드수정 토큰 업데이트
        employeeRepositroy.saveAndFlush(employee); //바로 업데이트 구문 발생
        return reIssuedRefreshToken;
    }

    public void checkAccessTokenAndAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        getAccessToken(request)
                .filter(this::isValidToken)
                .ifPresent(accessToken -> getEmployeeInfo(accessToken)
                        .ifPresent(emplyId -> employeeRepositroy.findByEmplyId(emplyId)
                                .ifPresent(this::saveAuthentication)));  //인증개체저장

        filterChain.doFilter(request, response);
    }

    private void saveAuthentication(Employee employee) {

        UserDetails userDetails = User.builder()
                .username(employee.getEmplyId())
                .password(employee.getEmplyPassword())
                .roles(employee.getEmplyRole().name())
                .build();
        
        //인가처리
        CustomUser customUser = CustomUser.of(employee.getEmplyCode(), userDetails);  //멤버코드도 필요하기 때문에

        Authentication authentication
                = new UsernamePasswordAuthenticationToken(customUser, null, customUser.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authentication);

    }

    //accessToken에서 저장되었던 멤버아이디를 꺼냄
    private Optional<String> getEmployeeInfo(String accessToken) {
        try {
            return Optional.ofNullable(
                    Jwts.parserBuilder()
                            .setSigningKey(key)
                            .build()
                            .parseClaimsJws(accessToken) //파싱함
                            .getBody()
                            .get("emplyId").toString()
            );
        } catch (Exception e) {
            log.error("Access Token이 유효하지 않습니다.");
            return Optional.empty();
        }

    }
}
