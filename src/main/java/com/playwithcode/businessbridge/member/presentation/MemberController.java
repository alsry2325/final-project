package com.playwithcode.businessbridge.member.presentation;


import com.playwithcode.businessbridge.common.paging.Pagenation;
import com.playwithcode.businessbridge.common.paging.PagingButtonInfo;
import com.playwithcode.businessbridge.common.paging.PagingResponse;
import com.playwithcode.businessbridge.jwt.CustomUser;
import com.playwithcode.businessbridge.member.dto.request.EmployeePwUpdateRequest;
import com.playwithcode.businessbridge.member.dto.request.EmployeeRegistrationRequest;
import com.playwithcode.businessbridge.member.dto.request.EmployeeUpdateRequest;
import com.playwithcode.businessbridge.member.dto.response.CustomerEmployeesResponse;
import com.playwithcode.businessbridge.member.dto.response.MypageResponse;
import com.playwithcode.businessbridge.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URI;


@RestController
@RequestMapping({"/emp/employee"})
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;


    /* 마이페이지 조회*/
    @GetMapping("/mypage")
    public  ResponseEntity<MypageResponse> myPage(@AuthenticationPrincipal CustomUser user){

        MypageResponse mypageResponse = memberService.getMyPage(user.getEmplyCode());

        return ResponseEntity.ok(mypageResponse);
    }

    /* 마이페이지 비밀번호 수정*/
    @PutMapping("/modify-password")
    public ResponseEntity<Void> modifyPassword(@AuthenticationPrincipal final CustomUser customUser,
                                               @RequestBody @Valid final EmployeePwUpdateRequest pwUpdateRequest){

        memberService.pwupdate(customUser.getEmplyCode(),pwUpdateRequest);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /*검색 사원목록 조회(관리자)*/
    @GetMapping("/employees/search")
    public ResponseEntity<PagingResponse> getAdminEmployees(@RequestParam(defaultValue = "1") final Integer page,
                                                            @RequestParam(required = false) final String emplyName,
                                                            @RequestParam(required = false) final String departmentName,
                                                            @RequestParam(required = false) final String positionName){

        final Page<CustomerEmployeesResponse> employees = memberService.getEmployeesAndDepartmentNameAndPositionName(page, emplyName,departmentName,positionName);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(employees);
        final PagingResponse pagingResponse = PagingResponse.of(employees.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 사원목록 조회(관리자)*/
    @GetMapping("/employees")
    public ResponseEntity<PagingResponse> getEmployees(@RequestParam(defaultValue = "1") final Integer page){

        final Page<CustomerEmployeesResponse> employees = memberService.getEmployees(page);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(employees);
        final PagingResponse pagingResponse = PagingResponse.of(employees.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    
    /* 사원 조회(관리자)*/
    @GetMapping("/check-employe/{emplyCode}")
    public ResponseEntity<CustomerEmployeesResponse> getEmployee(@PathVariable final Long emplyCode){

        CustomerEmployeesResponse  employeesResponse = memberService.getEmployee(emplyCode);

        return ResponseEntity.ok(employeesResponse);
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
    
    /* 사원 수정(관리자) */
    @PutMapping("/modify-employe/{emplyCode}")
    public ResponseEntity<Void> modifyEmploye(@PathVariable final Long emplyCode,
                                              @RequestBody @Valid final EmployeeUpdateRequest employeeUpdateRequest){

        memberService.DepartmentAndPositionUpdate(emplyCode,employeeUpdateRequest);

        return ResponseEntity.created(URI.create("/check-employe/" + emplyCode)).build();
    }
    


}
