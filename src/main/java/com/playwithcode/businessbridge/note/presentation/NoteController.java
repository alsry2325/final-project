package com.playwithcode.businessbridge.note.presentation;

import com.playwithcode.businessbridge.common.exception.NotFoundException;
import com.playwithcode.businessbridge.common.paging.Pagenation;
import com.playwithcode.businessbridge.common.paging.PagingButtonInfo;
import com.playwithcode.businessbridge.common.paging.PagingResponse;
import com.playwithcode.businessbridge.jwt.CustomUser;
import com.playwithcode.businessbridge.note.dto.request.NoteSendRequest;
import com.playwithcode.businessbridge.note.dto.response.NoteResponse;
import com.playwithcode.businessbridge.note.service.NoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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


    /* 쪽지 삭제 */
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
