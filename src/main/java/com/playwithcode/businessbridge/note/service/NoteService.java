package com.playwithcode.businessbridge.note.service;

import com.playwithcode.businessbridge.note.domain.Note;
import com.playwithcode.businessbridge.note.domain.repository.NoteRepository;
import com.playwithcode.businessbridge.note.domain.type.RecipientStatus;
import com.playwithcode.businessbridge.note.domain.type.SenderStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class NoteService {

    private final NoteRepository noteRepository;

    private Pageable getPageable(final Integer page) {
        return PageRequest.of(page - 1, 10, Sort.by("sentAt").descending());
    }


    /* 6. 쪽지 삭제(DB 삭제) */
    public boolean deleteNoteBySenderAndRecipient(Long noteNo) {
        Note note = noteRepository.findById(noteNo).orElse(null);

        if (note != null && note.getSenderStatus() == SenderStatus.SNDR_DELETE &&
                note.getRecipientStatus() == RecipientStatus.RCVR_DELETE) {
            deleteNoteFromDB(note);
            return true;
        }
        return false;
    }

    private void deleteNoteFromDB(Note note) {
        noteRepository.delete(note);
    }
}
