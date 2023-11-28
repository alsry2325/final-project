package com.playwithcode.businessbridge.approval.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "tbl_file")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attachFileCode;                        // 파일 코드

    private String attachFileNm;                        // 파일명

    private String pathName;                            // 경로명

    private String saveName;                            // 저장명

    private String extensionName;                       // 확장자명
}
