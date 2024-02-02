package com.playwithcode.businessbridge.note.presentation;

import com.playwithcode.businessbridge.common.exception.NotFoundException;
import com.playwithcode.businessbridge.common.paging.Pagenation;
import com.playwithcode.businessbridge.common.paging.PagingButtonInfo;
import com.playwithcode.businessbridge.common.paging.PagingResponse;
import com.playwithcode.businessbridge.jwt.CustomUser;
import com.playwithcode.businessbridge.note.domain.Note;
import com.playwithcode.businessbridge.note.dto.request.NoteRecipientStatusRequest;
import com.playwithcode.businessbridge.note.dto.request.NoteSendRequest;
import com.playwithcode.businessbridge.note.dto.response.NoteResponse;
import com.playwithcode.businessbridge.note.dto.response.NoteResponseWithEmplyName;
import com.playwithcode.businessbridge.note.service.NoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.net.URI;

import static com.playwithcode.businessbridge.common.exception.type.ExceptionCode.NOT_FOUND_NOTE_NO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@Slf4j
public class NoteController {

    private final NoteService noteService;

    /* 1. 쪽지 발송(등록) */
    @PostMapping("notes/send")
    public ResponseEntity<String> sendNote(@RequestBody NoteSendRequest noteSendRequest,
                                           @AuthenticationPrincipal CustomUser customUser) {
        // 사용자가 입력한 정보가 noteSendRequest에 담겨서 넘어온다.
        noteService.sendNote(noteSendRequest, customUser);
        return ResponseEntity.ok("쪽지 발송에 성공하였습니다.");
    }

    /* 2. 받은 쪽지함 조회(로그인 = 수신자) */
    @GetMapping("notes/recipient")
    public ResponseEntity<PagingResponse> getRecipientNote(
            @RequestParam(defaultValue = "1") final Integer page,
            @AuthenticationPrincipal CustomUser customUser
    ) {
        final Page<NoteResponse> notes = noteService.getRecipientNote(page, customUser);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(notes);
        final PagingResponse pagingResponse = PagingResponse.of(notes.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 3. 보낸 쪽지함 조회(로그인 = 발신자) */
    @GetMapping("notes/sender")
    public ResponseEntity<PagingResponse> getSenderNote(
            @RequestParam(defaultValue = "1") final Integer page,
            @AuthenticationPrincipal CustomUser customUser
    ) {
        final Page<NoteResponse> notes = noteService.getSenderNote(page, customUser);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(notes);
        final PagingResponse pagingResponse = PagingResponse.of(notes.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 4. 보관 쪽지함 조회(수신자) */
    @GetMapping("notes/recipient/storage")
    public ResponseEntity<PagingResponse> getRecipientStorage(
            @RequestParam(defaultValue = "1") final Integer page,
            @AuthenticationPrincipal CustomUser customUser
    ) {
        final Page<NoteResponse> notes = noteService.getRecipientStorage(page, customUser);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(notes);
        final PagingResponse pagingResponse = PagingResponse.of(notes.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 5. 휴지통 조회(수신자) */
    @GetMapping("notes/recipient/trash")
    public ResponseEntity<PagingResponse> getRecipientTrash(
            @RequestParam(defaultValue = "1") final Integer page,
            @AuthenticationPrincipal CustomUser customUser
    ) {
        final Page<NoteResponse> notes = noteService.getRecipientTrash(page, customUser);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(notes);
        final PagingResponse pagingResponse = PagingResponse.of(notes.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 6. 휴지통 조회(수신자) */
    @GetMapping("notes/sender/trash")
    public ResponseEntity<PagingResponse> getSenderTrash(
            @RequestParam(defaultValue = "1") final Integer page,
            @AuthenticationPrincipal CustomUser customUser
    ) {
        final Page<NoteResponse> notes = noteService.getSenderTrash(page, customUser);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(notes);
        final PagingResponse pagingResponse = PagingResponse.of(notes.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 7. 발신자명 기준 검색(수신자 = 로그인 한 사람) */
    @GetMapping("/notes/search")
    public ResponseEntity<PagingResponse> getSenderName(
            @RequestParam(defaultValue = "1") final Integer page,
            @RequestParam final String emplyName,
            @AuthenticationPrincipal CustomUser customUser) {

        final Page<NoteResponseWithEmplyName> notes = noteService.getSenderName(page, emplyName, customUser);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(notes);
        final PagingResponse pagingResponse = PagingResponse.of(notes.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 8. 쪽지 제목 기준 검색 */
    @GetMapping("/notes/search2")
    public ResponseEntity<PagingResponse> getNoteTitle(
            @RequestParam(defaultValue = "1") final Integer page,
            @RequestParam final String noteTitle,
            @AuthenticationPrincipal CustomUser customUser) {

        final Page<NoteResponseWithEmplyName> notes = noteService.getNoteTitle(page, noteTitle, customUser);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(notes);
        final PagingResponse pagingResponse = PagingResponse.of(notes.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 9. 쪽지 내용 기준 검색 */
    @GetMapping("/notes/search3")
    public ResponseEntity<PagingResponse> getNoteContent(
            @RequestParam(defaultValue = "1") final Integer page,
            @RequestParam final String noteContent,
            @AuthenticationPrincipal CustomUser customUser) {

        final Page<NoteResponseWithEmplyName> notes = noteService.getNoteContent(page, noteContent, customUser);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(notes);
        final PagingResponse pagingResponse = PagingResponse.of(notes.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 10. 수신자명 기준 검색 */
    @GetMapping("/notes/search4")
    public ResponseEntity<PagingResponse> getRecipientName(
            @RequestParam(defaultValue = "1") final Integer page,
            @RequestParam final String emplyName,
            @AuthenticationPrincipal CustomUser customUser) {

        final Page<NoteResponseWithEmplyName> notes = noteService.getRecipientName(page, emplyName, customUser);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(notes);
        final PagingResponse pagingResponse = PagingResponse.of(notes.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 11. 쪽지 제목 기준 검색 */
    @GetMapping("/notes/search5")
    public ResponseEntity<PagingResponse> getSenderNoteTitle(
            @RequestParam(defaultValue = "1") final Integer page,
            @RequestParam final String noteTitle,
            @AuthenticationPrincipal CustomUser customUser) {

        final Page<NoteResponseWithEmplyName> notes = noteService.getSenderNoteTitle(page, noteTitle, customUser);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(notes);
        final PagingResponse pagingResponse = PagingResponse.of(notes.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 12. 쪽지 내용 기준 검색 */
    @GetMapping("/notes/search6")
    public ResponseEntity<PagingResponse> getSenderNoteContent(
            @RequestParam(defaultValue = "1") final Integer page,
            @RequestParam final String noteContent,
            @AuthenticationPrincipal CustomUser customUser) {

        final Page<NoteResponseWithEmplyName> notes = noteService.getSenderNoteContent(page, noteContent, customUser);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(notes);
        final PagingResponse pagingResponse = PagingResponse.of(notes.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 13. 수신자 쪽지 상세 조회(일반) */
    @GetMapping("/notes/recipient/{noteNo}")
    public ResponseEntity<NoteResponse> getRecipientNoteinfo(
            @PathVariable final Long noteNo,
            @AuthenticationPrincipal CustomUser customUser) {

        final NoteResponse noteResponse = noteService.getRecipientNoteinfo(customUser, noteNo);

        return ResponseEntity.ok(noteResponse);
    }

    /* 14. 수신자 쪽지 상세 조회(보관) */
    @GetMapping("/notes/recipient/storage/{noteNo}")
    public ResponseEntity<NoteResponse> getRecipientStorageinfo(
            @PathVariable final Long noteNo,
            @AuthenticationPrincipal CustomUser customUser) {

        final NoteResponse noteResponse = noteService.getRecipientStorageNoteinfo(customUser, noteNo);

        return ResponseEntity.ok(noteResponse);
    }

    /* 15. 수신자 쪽지 상세 조회(휴지통)*/
    @GetMapping("/notes/recipient/trash/{noteNo}")
    public ResponseEntity<NoteResponse> getRecipientTrashinfo(
            @PathVariable final Long noteNo,
            @AuthenticationPrincipal CustomUser customUser) {

        final NoteResponse noteResponse = noteService.getRecipientTrashNoteinfo(customUser, noteNo);

        return ResponseEntity.ok(noteResponse);
    }

    /* 16. 발신자 쪽지 상세 조회 */
    @GetMapping("/notes/sender/{noteNo}")
    public ResponseEntity<NoteResponse> getSenderNoteinfo(
            @PathVariable final Long noteNo,
            @AuthenticationPrincipal CustomUser customUser) {

        final NoteResponse noteResponse = noteService.getSenderNoteinfo(customUser, noteNo);

        return ResponseEntity.ok(noteResponse);
    }

    /* 17. 수신자 쪽지 상태 변경(보관) */
    @PutMapping("/notes/recipient/statusStorage/{noteNo}")
    public ResponseEntity<Void> updateRecipientStorage(@PathVariable final Long noteNo) {

        noteService.updateRecipientStorage(noteNo);

        return  ResponseEntity.ok().build();
    }

    /* 18. 수신자 쪽지 상태 변경(휴지통) */
    @PutMapping("/notes/recipient/statusTrash/{noteNo}")
    public ResponseEntity<Void> updateRecipientTrash(@PathVariable final Long noteNo) {

        noteService.updateRecipientTrash(noteNo);

        return  ResponseEntity.ok().build();
    }

    /* 19. 수신자 쪽지 상태 변경(일반) */
    @PutMapping("/notes/recipient/statusNormal/{noteNo}")
    public ResponseEntity<Void> updateRecipientNormal(@PathVariable final Long noteNo) {

        noteService.updateRecipientNormal(noteNo);

        return  ResponseEntity.ok().build();
    }

    /* 20. 수신자 쪽지 상태 변경(삭제) */
    @PutMapping("/notes/recipient/statusDelete/{noteNo}")
    public ResponseEntity<Void> updateRecipientDelete(@PathVariable final Long noteNo) {

        noteService.updateRecipientDelete(noteNo);

        return  ResponseEntity.ok().build();
    }

    /* 21. 발신자 쪽지 상태 변경(삭제) */
    @PutMapping("/notes/sender/statusDelete/{noteNo}")
    public ResponseEntity<Void> updateSenderDelete(@PathVariable final Long noteNo) {

        noteService.updateSenderDelete(noteNo);

        return  ResponseEntity.ok().build();
    }

    /* 22. 쪽지 읽은 날짜 업데이트(상세보기를 눌렀을 때) */
    @PutMapping("/notes/readAt/{noteNo}")
    public ResponseEntity<Void> updateReadAt(@PathVariable final Long noteNo) {

        noteService.updateReadAt(noteNo);

        return ResponseEntity.ok().build();
    }



    /* 쪽지 삭제 */
    /* TODO : 휴지통에서도 삭제를 눌렀을 때
    *  1. 내 화면에서는 쪽지가 삭제된다.
    *  2. 수신자 상태와 발신자 상태를 모두 비교한다.
    *  3. 비교된 상태가 전부 DELETE라면 DB에서 삭제한다. */



    @DeleteMapping("/notes/{noteNo}")
    public ResponseEntity<Void> deleteNoteBySenderAndRecipient(@PathVariable Long noteNo) {
        boolean isDeleted = noteService.deleteNoteBySenderAndRecipient(noteNo);

        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            throw new NotFoundException(NOT_FOUND_NOTE_NO);
        }
    }
}
