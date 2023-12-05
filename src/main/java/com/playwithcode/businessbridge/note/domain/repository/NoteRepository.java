package com.playwithcode.businessbridge.note.domain.repository;

import com.playwithcode.businessbridge.note.domain.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    /* TODO : 로그인 한 사용자 기준으로 받은 쪽지함, 보낸 쪽지함 조회
    *   comprehensive의 order/OrderController 확인 */

    /* 1. 쪽지 발송(등록) */

    /* 2. 받은 쪽지함 조회(로그인 = 수신자) */
    Page<Note> findByRecipientEmplyCode(Pageable pageable, Long emplyCode);

    /* 쪽지 삭제(DB 삭제) */

}
