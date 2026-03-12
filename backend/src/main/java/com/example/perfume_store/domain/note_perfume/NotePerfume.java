package com.example.perfume_store.domain.note_perfume;

import com.example.perfume_store.domain.note.Note;
import com.example.perfume_store.domain.perfume.Perfume;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
public class NotePerfume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @ToString.Exclude
    private Perfume perfume;

    @ManyToOne
    private Note note;

    @Enumerated(EnumType.STRING)
    private NoteType type;
}
