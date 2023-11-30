package com.playwithcode.businessbridge.note.domain.repository;

import com.playwithcode.businessbridge.note.domain.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {

    /* TODO : 로그인 한 사용자 기준으로 받은 쪽지함, 보낸 쪽지함 조회
    *   comprehensive의 order/OrderController 확인 */

    /* 1. 쪽지 발송(등록) */

    /* 2. 받은 편지함 */

    /* 3. 보낸 편지함 */

    /* 4. 중요 편지함 */

    /* 5. 휴지통 */

    /* 6. 쪽지 삭제(DB 삭제) */


}
