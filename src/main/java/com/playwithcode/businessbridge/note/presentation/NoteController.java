package com.playwithcode.businessbridge.note.presentation;

import com.playwithcode.businessbridge.common.exception.NotFoundException;
import com.playwithcode.businessbridge.note.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.playwithcode.businessbridge.common.exception.type.ExceptionCode.NOT_FOUND_NOTE_NO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class NoteController {

    private final NoteService noteService;

    /* 6. 쪽지 삭제 */
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
