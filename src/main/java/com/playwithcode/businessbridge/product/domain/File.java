package com.playwithcode.businessbridge.product.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity(name="fileInfo")
@Table(name = "tbl_file")
@NoArgsConstructor(access = PROTECTED)
@Getter
public class File {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long attachfileCode;//파일코드

    private String attachfileNm;//파일명

    private String pathName;//경로명

    private String saveName;//저장명

    private String extensionName;//확장자명

    private Long secTion;//구분

    private Long boardNumber;//게시판 번호

    private Long accountCode;//거래처코드

    private Long estimateCode;//견적서 코드

    private Long approvalCode;//전자결재코드


}
