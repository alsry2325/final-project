package com.playwithcode.businessbridge.note.service;

import com.playwithcode.businessbridge.jwt.CustomUser;
import com.playwithcode.businessbridge.member.domain.Employee;
import com.playwithcode.businessbridge.member.domain.repository.EmployeeRepository;
import com.playwithcode.businessbridge.note.domain.Note;
import com.playwithcode.businessbridge.note.domain.repository.NoteRepository;
import com.playwithcode.businessbridge.note.domain.type.RecipientStatus;
import com.playwithcode.businessbridge.note.domain.type.SenderStatus;
import com.playwithcode.businessbridge.note.dto.request.NoteSendRequest;
import com.playwithcode.businessbridge.note.dto.response.NoteRecipientResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
    private final EmployeeRepository employeeRepository;

    private Pageable getPageable(final Integer page) {
        return PageRequest.of(page - 1, 10, Sort.by("sentAt").descending());
    }

    /* 1. 쪽지 발송(DB 저장) */
    /* NoteSendRequest를 Note 엔티티로 변환하여 save 메소드를 통해 DB에 저장한다. */
    public void sendNote(NoteSendRequest noteSendRequest, CustomUser customUser) {
        Note note = convertToNoteEntity(noteSendRequest, customUser);
        noteRepository.save(note);
    }

    private Note convertToNoteEntity(NoteSendRequest noteSendRequest, CustomUser customUser) {
        Note note = new Note();
        note.setNoteTitle(noteSendRequest.getNoteTitle());
        note.setNoteContent(noteSendRequest.getNoteContent());

        Long sender = customUser.getEmplyCode();
        note.setSender(sender);

        Employee recipient = employeeRepository.findById(noteSendRequest.getRecipient()).orElse(null);
        note.setRecipient(recipient);

        note.setSentAt(noteSendRequest.getSentAt());

        /* 부서 정보, 이름 등 필요한 정보는 엔티티에 삽입 하는 게 아닌 조회할 때 필요한 정보이므로 이곳에 작성하지 않는다. */

        return note;
    }

    /* 2. 받은 쪽지함 조회(로그인 = 수신자) */
    @Transactional(readOnly = true)
    public Page<NoteRecipientResponse> getRecipientNote(Integer page, CustomUser customUser) {

        Page<Note> notes = noteRepository.findByRecipientEmplyCode(getPageable(page), customUser.getEmplyCode());

        return notes.map(note -> NoteRecipientResponse.from(note));
    }


    /* 쪽지 삭제(DB 삭제) */
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
