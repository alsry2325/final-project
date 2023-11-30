package com.playwithcode.businessbridge.note.domain.repository;

import com.playwithcode.businessbridge.note.domain.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {
}
