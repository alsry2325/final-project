package com.playwithcode.businessbridge.note.domain.repository;

import com.playwithcode.businessbridge.note.domain.Note;
import com.playwithcode.businessbridge.note.domain.type.RecipientStatus;
import com.playwithcode.businessbridge.note.domain.type.SenderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {

    /* 1. 쪽지 발송(등록) */

    /* 2. 받은 쪽지함 조회(로그인 = 수신자) */
    Page<Note> findByRecipientEmplyCodeAndRecipientStatus(Pageable pageable, Long emplyCode, RecipientStatus recipientStatus);

    /* 3. 보낸 쪽지함 조회(로그인 = 발신자) */
    Page<Note> findBySenderEmplyCodeAndSenderStatus(Pageable pageable, Long emplyCode, SenderStatus senderStatus);

    /* 4. 보관 쪽지함 조회(수신자) */
    /* 5. 휴지통 조회(수신자) */
    /* 6. 휴지통 조회(발신자) */


    /*받은 쪽지함 검색(수신자 = 로그인된 사람) -----------------------------------------------------------------------*/

    /* 7. 발신자명 기준 검색 */
    @Query("SELECT n FROM Note n " +
            "WHERE n.recipient.emplyCode = :emplyCode " +
            "AND LOWER(n.sender.emplyName) LIKE LOWER(CONCAT('%', :emplyName, '%'))")
    Page<Note> findBySenderEmplyNameContains(Pageable pageable, String emplyName, @Param("emplyCode") Long emplyCode);

    /* 8. 쪽지 제목 기준 검색 */
    @Query("SELECT n FROM Note n " +
            "WHERE n.recipient.emplyCode = :emplyCode " +
            "AND LOWER(n.noteTitle) LIKE LOWER(CONCAT('%', :noteTitle, '%'))")
    Page<Note> findByNoteTitleContains(Pageable pageable, String noteTitle, @Param("emplyCode") Long emplyCode);

    /* 9. 쪽지 내용 기준 검색 */
    @Query("SELECT n FROM Note n " +
            "WHERE n.recipient.emplyCode = :emplyCode " +
            "AND LOWER(n.noteContent) LIKE LOWER(CONCAT('%', :noteContent, '%'))")
    Page<Note> findByNoteContentContains(Pageable pageable, String noteContent, @Param("emplyCode") Long emplyCode);


    /* 보낸 쪽지함 검색(발신자 = 로그인된 사람)  -----------------------------------------------------------------------*/

    /* 10. 수신자명 기준 검색 */
    @Query("SELECT n FROM Note n " +
            "WHERE n.sender.emplyCode = :emplyCode " +
            "AND LOWER(n.recipient.emplyName) LIKE LOWER(CONCAT('%', :emplyName, '%'))")
    Page<Note> findByRecipientEmplyNameContains(Pageable pageable, String emplyName, @Param("emplyCode") Long emplyCode);

    /* 11. 쪽지 제목 기준 검색 */
    @Query("SELECT n FROM Note n " +
            "WHERE n.sender.emplyCode = :emplyCode " +
            "AND LOWER(n.noteTitle) LIKE LOWER(CONCAT('%', :noteTitle, '%'))")
    Page<Note> findBySenderNoteTitleContains(Pageable pageable, String noteTitle, @Param("emplyCode") Long emplyCode);

    /* 12. 쪽지 내용 기준 검색 */
    @Query("SELECT n FROM Note n " +
            "WHERE n.sender.emplyCode = :emplyCode " +
            "AND LOWER(n.noteContent) LIKE LOWER(CONCAT('%', :noteContent, '%'))")
    Page<Note> findBySenderNoteContentContains(Pageable pageable, String noteContent, @Param("emplyCode") Long emplyCode);


    /* 쪽지 상세 조회  -----------------------------------------------------------------------------------------------*/

    /* 13. 수신자 쪽지 상세 조회 */
    Optional<Note> findByRecipientEmplyCodeAndNoteNoAndRecipientStatusNot(Long emplyCode, Long noteNo, RecipientStatus recipientStatus);

    /* 14. 발신자 쪽지 상세 조회 */
    Optional<Note> findBySenderEmplyCodeAndNoteNoAndRecipientStatusNot(Long emplyCode, Long noteNo, RecipientStatus recipientStatus);


    /* 쪽지 삭제(DB 삭제, 수신자 삭제 = 발신자 삭제 ) -------------------------------------------------------------------*/

    /* 쪽지 삭제(TRASH -> DELETE) */

    /* TODO
    *   1. (수/발신자) 상태 중 지금 선택된 걸 DELETE로 바꾸는 로직,
    *   2. if 수신자 상태 DELETE && 발신자 상태 DELETE면 DB 삭제, 아니면 DB에 남겨둠
    */

    /* 15. 쪽지 삭제(수신자 상태 변경 TRASH -> DELETE) */


}


