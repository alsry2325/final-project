package com.playwithcode.businessbridge.member.presentation;


import com.playwithcode.businessbridge.member.dto.response.MypageResponse;
import com.playwithcode.businessbridge.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping({"/emp/employee"})
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;


    /* 마이페이지 조회*/
    @GetMapping("/mypage")
    public  ResponseEntity<MypageResponse> mypage(@AuthenticationPrincipal User user){

        MypageResponse mypageResponse = memberService.getMyPage(user.getUsername());

        return ResponseEntity.ok(mypageResponse);
    }

}
