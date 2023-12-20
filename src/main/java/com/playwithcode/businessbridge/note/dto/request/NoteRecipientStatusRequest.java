package com.playwithcode.businessbridge.note.dto.request;

import com.playwithcode.businessbridge.note.domain.type.RecipientStatus;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@RequiredArgsConstructor
@Getter
public class NoteRecipientStatusRequest {

    @NotNull
    private final RecipientStatus RecipientStatus;
}
