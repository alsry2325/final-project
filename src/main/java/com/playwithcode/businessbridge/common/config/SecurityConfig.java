//package com.playwithcode.businessbridge.common.config;
//
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import java.util.Arrays;
//
//@EnableWebSecurity
//@RequiredArgsConstructor
//public class SecurityConfig {
//
//
//    /* CORS(Cross Origin Resource Sharing) : 교차 출처 자원 공유
//    * 보안상 웹 브라우저는 다른 도메인에서 서버의 자원을 요청하는 경우 막아 놓았음.
//    * 기본적으로 서버에서 클라이언트를 대상으로 리소스 허용 여부를 결정함. */
//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration corsConfiguration = new CorsConfiguration();
//        // 로컬 React에서 오는 요청은 허용한다.
//        corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
//        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "PUT", "POST", "DELETE"));
//        corsConfiguration.setAllowedHeaders(Arrays.asList(
//                "Access-Control-Allow-Origin", "Access-Control-Allow-Headers",
//                "Content-Type", "Authorization", "X-Requested-With", "Access-Token", "Refresh-Token"));
//        corsConfiguration.setExposedHeaders(Arrays.asList("Access-Token", "Refresh-Token"));
//        // 모든 요청 url 패턴에 대해 위의 설정을 적용한다.
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", corsConfiguration);
//        return source;
//    }
//
//
//
//}
