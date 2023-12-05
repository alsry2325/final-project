package com.playwithcode.businessbridge.note.dto.request;

import com.playwithcode.businessbridge.note.domain.Note;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class NoteSendRequest {

    @NotNull
    private final String noteTitle;
    @NotNull
    private final Long sender;
    @NotNull
    private final Long recipient;
    @NotNull
    private final LocalDateTime sentAt;
    @NotNull
    private final String noteContent;

}
