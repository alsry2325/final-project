package com.playwithcode.businessbridge.note.service;

import com.playwithcode.businessbridge.common.exception.NotFoundException;
import com.playwithcode.businessbridge.common.exception.type.ExceptionCode;
import com.playwithcode.businessbridge.jwt.CustomUser;
import com.playwithcode.businessbridge.member.domain.Employee;
import com.playwithcode.businessbridge.member.domain.repository.EmployeeRepository;
import com.playwithcode.businessbridge.note.domain.Note;
import com.playwithcode.businessbridge.note.domain.repository.NoteRepository;
import com.playwithcode.businessbridge.note.domain.type.SenderStatus;
import com.playwithcode.businessbridge.note.dto.request.NoteRecipientStatusRequest;
import com.playwithcode.businessbridge.note.dto.request.NoteSendRequest;
import com.playwithcode.businessbridge.note.dto.response.NoteResponse;
import com.playwithcode.businessbridge.note.dto.response.NoteResponseWithEmplyName;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.playwithcode.businessbridge.note.domain.type.RecipientStatus.*;
import static com.playwithcode.businessbridge.note.domain.type.SenderStatus.*;

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

        Employee sender = employeeRepository.getReferenceById(customUser.getEmplyCode());
        note.setSender(sender);

        Employee recipient = employeeRepository.getReferenceById(noteSendRequest.getRecipient());
        note.setRecipient(recipient);

        note.setSentAt(noteSendRequest.getSentAt());

        /* 부서 정보, 이름 등 필요한 정보는 엔티티에 삽입 하는 게 아닌 조회할 때 필요한 정보이므로 이곳에 작성하지 않는다. */

        return note;
    }

    /* 2. 받은 쪽지함 조회(로그인 = 수신자, 일반 상태) */
    @Transactional(readOnly = true)
    public Page<NoteResponse> getRecipientNote(Integer page, CustomUser customUser) {

        Page<Note> notes = noteRepository.findByRecipientEmplyCodeAndRecipientStatus(getPageable(page), customUser.getEmplyCode(), RCVR_NORMAL);

        return notes.map(note -> NoteResponse.from(note));
    }

    /* 3. 보낸 쪽지함 조회(로그인 = 발신자, 일반 상태) */
    @Transactional(readOnly = true)
    public Page<NoteResponse> getSenderNote(Integer page, CustomUser customUser) {

        Page<Note> notes = noteRepository.findBySenderEmplyCodeAndSenderStatus(getPageable(page), customUser.getEmplyCode(), SNDR_NORMAL);

        return notes.map(note -> NoteResponse.from(note));
    }

    /* 4. 보관 쪽지함 조회(수신자) */
    @Transactional(readOnly = true)
    public Page<NoteResponse> getRecipientStorage(Integer page, CustomUser customUser) {

        Page<Note> notes = noteRepository.findByRecipientEmplyCodeAndRecipientStatus(getPageable(page), customUser.getEmplyCode(), RCVR_STORAGE);

        return notes.map(note -> NoteResponse.from(note));
    }

    /* 5. 휴지통 조회(수신자) */
    @Transactional(readOnly = true)
    public Page<NoteResponse> getRecipientTrash(Integer page, CustomUser customUser) {

        Page<Note> notes = noteRepository.findByRecipientEmplyCodeAndRecipientStatus(getPageable(page), customUser.getEmplyCode(), RCVR_TRASH);

        return notes.map(note -> NoteResponse.from(note));
    }

    /* 6. 휴지통 조회(발신자) */
    @Transactional(readOnly = true)
    public Page<NoteResponse> getSenderTrash(Integer page, CustomUser customUser) {

        Page<Note> notes = noteRepository.findBySenderEmplyCodeAndSenderStatus(getPageable(page), customUser.getEmplyCode(), SNDR_TRASH);

        return notes.map(note -> NoteResponse.from(note));
    }


    /*받은 쪽지함 검색 -----------------------------------------------------------------------*/

    /* 7. 발신자명 기준 검색 */
    @Transactional(readOnly = true)
    public Page<NoteResponseWithEmplyName> getSenderName(final Integer page, final String emplyName, CustomUser customUser) {

        Page<Note> notes = noteRepository.findBySenderEmplyNameContains(getPageable(page), emplyName, customUser.getEmplyCode());

        return notes.map(note -> NoteResponseWithEmplyName.from(note));
    }


    /* 8. 쪽지 제목 기준 검색 */
    @Transactional(readOnly = true)
    public Page<NoteResponseWithEmplyName> getNoteTitle(final Integer page, final String noteTitle, CustomUser customUser) {

        Page<Note> notes = noteRepository.findByNoteTitleContains(getPageable(page), noteTitle, customUser.getEmplyCode());

        return notes.map(note -> NoteResponseWithEmplyName.from(note));
    }

    /* 9. 쪽지 내용 기준 검색 */
    @Transactional(readOnly = true)
    public Page<NoteResponseWithEmplyName> getNoteContent(final Integer page, final String noteContent, CustomUser customUser) {

        Page<Note> notes = noteRepository.findByNoteContentContains(getPageable(page), noteContent, customUser.getEmplyCode());

        return notes.map(note -> NoteResponseWithEmplyName.from(note));
    }

    /* 10. 수신자명 기준 검색 */
    @Transactional(readOnly = true)
    public Page<NoteResponseWithEmplyName> getRecipientName(final Integer page, final String emplyName, CustomUser customUser) {

        Page<Note> notes = noteRepository.findByRecipientEmplyNameContains(getPageable(page), emplyName, customUser.getEmplyCode());

        return notes.map(note -> NoteResponseWithEmplyName.from(note));
    }

    /* 11. 쪽지 제목 기준 검색 */
    @Transactional(readOnly = true)
    public Page<NoteResponseWithEmplyName> getSenderNoteTitle(final Integer page, final String noteTitle, CustomUser customUser) {

        Page<Note> notes = noteRepository.findBySenderNoteTitleContains(getPageable(page), noteTitle, customUser.getEmplyCode());

        return notes.map(note -> NoteResponseWithEmplyName.from(note));
    }

    /* 12. 쪽지 내용 기준 검색 */
    @Transactional(readOnly = true)
    public Page<NoteResponseWithEmplyName> getSenderNoteContent(final Integer page, final String noteContent, CustomUser customUser) {

        Page<Note> notes = noteRepository.findBySenderNoteContentContains(getPageable(page), noteContent, customUser.getEmplyCode());

        return notes.map(note -> NoteResponseWithEmplyName.from(note));
    }

    /* 13. 수신자 쪽지 상세 조회(일반) */
    @Transactional(readOnly = true)
    public NoteResponse getRecipientNoteinfo(CustomUser customUser, final Long noteNo) {

        Note note = noteRepository.findByRecipientEmplyCodeAndNoteNoAndRecipientStatus(customUser.getEmplyCode(), noteNo, RCVR_NORMAL)
                .orElseThrow(() -> new NotFoundException(ExceptionCode.NOT_FOUND_NOTE_NO));

        return NoteResponse.from(note);
    }

    /* 14. 수신자 쪽지 상세 조회(보관) */
    public NoteResponse getRecipientStorageNoteinfo(CustomUser customUser, Long noteNo) {

        Note note = noteRepository.findByRecipientEmplyCodeAndNoteNoAndRecipientStatus(customUser.getEmplyCode(), noteNo, RCVR_STORAGE)
                .orElseThrow(() -> new NotFoundException(ExceptionCode.NOT_FOUND_NOTE_NO));

        return NoteResponse.from(note);
    }

    /* 15. 수신자 쪽지 상세 조회(휴지통) */
    public NoteResponse getRecipientTrashNoteinfo(CustomUser customUser, Long noteNo) {
        Note note = noteRepository.findByRecipientEmplyCodeAndNoteNoAndRecipientStatus(customUser.getEmplyCode(), noteNo, RCVR_TRASH)
                .orElseThrow(() -> new NotFoundException(ExceptionCode.NOT_FOUND_NOTE_NO));

        return NoteResponse.from(note);
    }

    /* 16. 발신자 쪽지 상세 조회 */
    @Transactional(readOnly = true)
    public NoteResponse getSenderNoteinfo(CustomUser customUser, final Long noteNo) {

        Note note = noteRepository.findBySenderEmplyCodeAndNoteNo(customUser.getEmplyCode(), noteNo)
                .orElseThrow(() -> new NotFoundException(ExceptionCode.NOT_FOUND_NOTE_NO));

        return NoteResponse.from(note);
    }

    /* 17. 수신자 쪽지 상태 변경(보관) */
    public void updateRecipientStorage(final Long noteNo) {

        Note note = noteRepository.findByNoteNo(noteNo)
                .orElseThrow(() -> new NotFoundException(ExceptionCode.NOT_FOUND_NOTE_NO));

        note.updateRecipientStorage();
    }

    /* 18. 수신자 쪽지 상태 변경(휴지통) */
    public void updateRecipientTrash(Long noteNo) {
        Note note = noteRepository.findByNoteNo(noteNo)
                .orElseThrow(() -> new NotFoundException(ExceptionCode.NOT_FOUND_NOTE_NO));

        note.updateRecipientTrash();
    }

    /* 19. 수신자 쪽지 상태 변경(일반) */
    public void updateRecipientNormal(Long noteNo) {
        Note note = noteRepository.findByNoteNo(noteNo)
                .orElseThrow(() -> new NotFoundException(ExceptionCode.NOT_FOUND_NOTE_NO));

        note.updateRecipientNormal();
    }

    /* 20. 수신자 쪽지 상태 변경(삭제) */
    public void updateRecipientDelete(Long noteNo) {
        Note note = noteRepository.findByNoteNo(noteNo)
                .orElseThrow(() -> new NotFoundException(ExceptionCode.NOT_FOUND_NOTE_NO));

        note.updateRecipientDelete();

        /* 발신자 상태 체크 후, SNDR_DELETE라면 쪽지를 DB에서 삭제한다. */
        if (note.getSenderStatus() == SNDR_DELETE) {
            noteRepository.delete(note);
        }
    }

    /* 21. 발신자 쪽지 상태 변경(삭제) */
    public void updateSenderDelete(Long noteNo) {
        Note note = noteRepository.findByNoteNo(noteNo)
                .orElseThrow(() -> new NotFoundException(ExceptionCode.NOT_FOUND_NOTE_NO));

        note.updateSenderDelete();

        /* 발신자 상태 체크 후, SNDR_DELETE라면 쪽지를 DB에서 삭제한다. */
        if (note.getRecipientStatus() == RCVR_DELETE) {
            noteRepository.delete(note);
        }
    }

    /* 22. 쪽지 읽은 날짜 업데이트(상세보기를 눌렀을 때) */
    public void updateReadAt(Long noteNo) {
        Note note = noteRepository.findByNoteNo(noteNo)
                .orElseThrow(() -> new NotFoundException(ExceptionCode.NOT_FOUND_NOTE_NO));

        note.updateReadAt();
    }

    /* 쪽지 삭제(DB 삭제) */
    public boolean deleteNoteBySenderAndRecipient(Long noteNo) {
        Note note = noteRepository.findById(noteNo).orElse(null);

        if (note != null && note.getSenderStatus() == SNDR_DELETE &&
                note.getRecipientStatus() == RCVR_DELETE) {
            deleteNoteFromDB(note);
            return true;
        }
        return false;
    }

    private void deleteNoteFromDB(Note note) {
        noteRepository.delete(note);
    }



}
