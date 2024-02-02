package com.playwithcode.businessbridge.sales.dto.response;

import com.playwithcode.businessbridge.sales.domain.Progress;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import static lombok.AccessLevel.PRIVATE;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class ProgressResponse {

    private final Long progressCode;
    private final Long salesCode;
    private final String state;
    private final String status;
    private final String specialNote;
    private final String latestDateConsultation;
    private final String nextDayConsultation;
    
    public static ProgressResponse from(Progress progress) {
        return new ProgressResponse(
        	progress.getProgressCode(),
    		progress.getSales().getSalesCode(),
    		progress.getState(),
    		progress.getStatus(),
    		progress.getSpecialNote(),
    		progress.getLatestDateConsultation(),
    		progress.getNextDayConsultation()
		);
    }
}
