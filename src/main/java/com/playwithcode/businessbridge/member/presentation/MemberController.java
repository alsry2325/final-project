package com.playwithcode.businessbridge.member.presentation;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping({"/emp/employee"})
@RequiredArgsConstructor
public class MemberController {


    @GetMapping("/test")
    public ResponseEntity<Void> test() {

        return ResponseEntity.status(HttpStatus.CREATED).build();  //상태코드 201 응답
    }

//    /* 마이페이지 조회*/
//    @GetMapping("/mypage")
//    public  ResponseEntity<> mypage(){
//
//    }

}
