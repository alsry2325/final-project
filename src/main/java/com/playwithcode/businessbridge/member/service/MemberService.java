package com.playwithcode.businessbridge.member.service;

import com.playwithcode.businessbridge.approval.dto.response.AllEmployeeResponse;
import com.playwithcode.businessbridge.common.exception.BadRequestException;
import com.playwithcode.businessbridge.common.util.FileUploadUtils;
import com.playwithcode.businessbridge.department.domain.Department;
import com.playwithcode.businessbridge.department.domain.repository.EmployeeDepartmentRepository;
import com.playwithcode.businessbridge.member.domain.Employee;
import com.playwithcode.businessbridge.member.domain.repository.EmployeeRepository;
import com.playwithcode.businessbridge.member.dto.request.EmployeeRegistrationRequest;
import com.playwithcode.businessbridge.member.dto.response.MypageResponse;
import com.playwithcode.businessbridge.position.domain.Position;
import com.playwithcode.businessbridge.position.domain.repository.EmployeePositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

import static com.playwithcode.businessbridge.common.exception.type.ExceptionCode.NOT_FOUND_MEMBER_ID;
import static com.playwithcode.businessbridge.member.domain.type.EmplyStatus.JOIN;
import java.util.UUID;

import static com.playwithcode.businessbridge.common.exception.type.ExceptionCode.*;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeRepository employeeRepositroy;
    private final EmployeeDepartmentRepository employeeDepartmentRepository;
    private final EmployeePositionRepository employeePositionRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

    @Value("http://localhost/emplyimgs/")
    private String IMAGE_URL;
    @Value("src/main/resources/static/emplyimgs")
    private String IMAGE_DIR;



   @Transactional(readOnly = true)
    public MypageResponse getMyPage(String emplyId) {

            final Employee employee = employeeRepository.findByEmplyId(emplyId)
                    .orElseThrow(()->new BadRequestException(NOT_FOUND_MEMBER_ID));

            return  MypageResponse.from(employee);
    }

    /* 전자결재 모달 창 직원 조회 */
    @Transactional(readOnly = true)
    public List<AllEmployeeResponse> getAllEmployeeList() {

        List<Employee> employees = employeeRepository.findByEmplyStatus(JOIN);

        return employees.stream().map(AllEmployeeResponse::from).collect(Collectors.toList());
    }

    private String getRandomName() {
        return UUID.randomUUID().toString().replace("-", "");
    }
    public void save(final EmployeeRegistrationRequest employeeRegistrationRequest, MultipartFile emplyImg, String tempPassword) {

        /* 전달 된 파일을 서버의 지정 경로에 저장 */
        String replaceFileName = FileUploadUtils.saveFile(IMAGE_DIR, getRandomName(), emplyImg);

        Department department = employeeDepartmentRepository.getReferenceById(employeeRegistrationRequest.getDepartmentCode());
        Position position = employeePositionRepository.getReferenceById(employeeRegistrationRequest.getPositionCode());

        final Employee newEmployee = Employee.of(
                employeeRegistrationRequest.getEmplyId(),
                passwordEncoder.encode(tempPassword),
                employeeRegistrationRequest.getEmplyName(),
                employeeRegistrationRequest.getEmplyPhoneNumber(),
                employeeRegistrationRequest.getEmplyEmail(),
                employeeRegistrationRequest.getEmplyInternalNumber(),
                department,
                position,
                IMAGE_URL + replaceFileName
        );

        Employee employee = employeeRepositroy.save(newEmployee);

   }



    //랜덤함수로 임시비밀번호 구문 만들기
    public String getTempPassword(){
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        // 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 구문을 작성함
        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }

    public void mailSend(final EmployeeRegistrationRequest employeeRegistrationRequest, final String tempPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(employeeRegistrationRequest.getEmplyEmail());
        message.setSubject(employeeRegistrationRequest.getEmplyName()+"님의 비즈니스브릿지 계정 및 임시비밀번호 안내 이메일 입니다.");
        message.setText("안녕하세요. 비즈니스브릿지 계정 안내 관련 이메일 입니다." + "[" + employeeRegistrationRequest.getEmplyName() + "]"
                +"님의 사원번호는 "+ employeeRegistrationRequest.getEmplyId()
                +"임시 비밀번호는"  + tempPassword + " 입니다.");
        message.setFrom("alsry0@naver.com");
        message.setReplyTo("alsry0@naver.com");
        System.out.println("message :"+message);
        mailSender.send(message);
        System.out.println("전송 완료!");
    }
}
