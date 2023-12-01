package com.playwithcode.businessbridge.note.presentation;

import com.playwithcode.businessbridge.common.exception.NotFoundException;
import com.playwithcode.businessbridge.jwt.CustomUser;
import com.playwithcode.businessbridge.note.dto.NoteSendRequest;
import com.playwithcode.businessbridge.note.service.NoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.message.AuthException;

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
                                           @AuthenticationPrincipal CustomUser customUser){
        /* 사용자가 입력한 정보가 noteSendRequest에 담겨서 넘어온다. */
        noteService.sendNote(noteSendRequest, customUser);
        return ResponseEntity.ok("쪽지 발송에 성공하였습니다.");
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
