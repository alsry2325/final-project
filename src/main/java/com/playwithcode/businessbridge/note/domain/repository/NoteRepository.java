package com.playwithcode.businessbridge.note.domain.repository;

import com.playwithcode.businessbridge.note.domain.Note;
import com.playwithcode.businessbridge.note.domain.type.RecipientStatus;
import com.playwithcode.businessbridge.note.domain.type.SenderStatus;
import com.playwithcode.businessbridge.note.dto.response.NoteResponseWithEmplyName;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {

    /* 1. 쪽지 발송(등록) */

    /* 2. 받은 쪽지함 조회(로그인 = 수신자) */
    Page<Note> findByRecipientEmplyCodeAndRecipientStatus(Pageable pageable, Long emplyCode, RecipientStatus recipientStatus);

    /* 3. 보낸 쪽지함 조회(로그인 = 발신자) */
    Page<Note> findBySenderEmplyCodeAndSenderStatus(Pageable pageable, Long emplyCode, SenderStatus senderStatus);

    /* 4. 보관 쪽지함 조회(수신자) */
    /* 5. 휴지통 조회(수신자) */
    /* 6. 휴지통 조회(발신자) */

    /*받은 쪽지함 검색 -----------------------------------------------------------------------*/

    /* 7. 발신자명 기준 검색 */
   Page<Note> findBySenderEmplyName(Pageable pageable, String emplyName);
    /*보낸 쪽지함 검색 -----------------------------------------------------------------------*/

    /* 쪽지 삭제(DB 삭제, 수신자 삭제 = 발신자 삭제 ) */

}


