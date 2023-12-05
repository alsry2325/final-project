package com.playwithcode.businessbridge.note.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.playwithcode.businessbridge.note.domain.Note;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Getter
@RequiredArgsConstructor
public class NoteResponseWithEmplyName {

    private final Long noteCode;
    private final Long recipient;
    private final String emplyName;
    private final String noteTitle;
    private final String noteContent;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private final LocalDateTime sentAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private final LocalDateTime readAt;

    public static NoteResponseWithEmplyName from(Note note) {
        return new NoteResponseWithEmplyName(
                note.getNoteNo(),
                note.getRecipient().getEmplyCode(),
                note.getSender().getEmplyName(),
                note.getNoteTitle(),
                note.getNoteContent(),
                note.getSentAt(),
                note.getReadAt()
        );
    }
}
