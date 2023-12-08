package com.playwithcode.businessbridge.member.presentation;


import com.playwithcode.businessbridge.member.domain.Employee;
import com.playwithcode.businessbridge.member.dto.request.EmployeeRegistrationRequest;
import com.playwithcode.businessbridge.member.dto.response.MypageResponse;
import com.playwithcode.businessbridge.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.Optional;


@RestController
@RequestMapping({"/emp/employee"})
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;


    /* 마이페이지 조회*/
    @GetMapping("/mypage")
    public  ResponseEntity<MypageResponse> myPage(@AuthenticationPrincipal User user){

        MypageResponse mypageResponse = memberService.getMyPage(user.getUsername());

        return ResponseEntity.ok(mypageResponse);
    }

    /* 사원 등록(관리자) */
    @PostMapping("/register-and-send-email")
    public ResponseEntity<Void> save(@RequestPart @Valid final EmployeeRegistrationRequest employeeRegistrationRequest,
                                     @RequestPart final MultipartFile emplyImg){

            String tempPassword = memberService.getTempPassword();
            memberService.save(employeeRegistrationRequest,emplyImg, tempPassword);
            memberService.mailSend(employeeRegistrationRequest, tempPassword);

            return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    


}
