package com.playwithcode.businessbridge.note.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.playwithcode.businessbridge.note.domain.Note;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Getter
@RequiredArgsConstructor
public class NoteResponse {

    private final Long noteCode;
    private final Long recipient;
    private final Long sender;
    private final String noteTitle;
    private final String noteContent;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private final LocalDateTime sentAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private final LocalDateTime readAt;

    public static NoteResponse from(Note note) {
        return new NoteResponse(
                note.getNoteNo(),
                note.getRecipient().getEmplyCode(),
                note.getSender().getEmplyCode(),
                note.getNoteTitle(),
                note.getNoteContent(),
                note.getSentAt(),
                note.getReadAt()
        );
    }
}
