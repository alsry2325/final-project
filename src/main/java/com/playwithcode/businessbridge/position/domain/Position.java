package com.playwithcode.businessbridge.position.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED) //기본생성자
@Getter
@Table(name = "tbl_position")
public class Position {

        @Id
        @GeneratedValue(strategy = IDENTITY) //MYSQL을 쓸때 PK하나씩 자동으로 생성
        private Long positionCode;
        @Column(nullable = false)
        private String positionName;
}
