import React from "react";
import NoteItem from "./NoteItem";

function NotesList({ notes, onDelete, onArchive, dataTestId = "notes-list", searchKeyword }) {
  // TODO [Basic] validasi notes agar tidak kosong.
  const hasNotes = notes.length > 0; // update dengan nilai yang sesuai

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        {/* TODO [Basic] tampilkan pesan kosong yang informatif ketika tidak ada catatan. */}
        <p className="notes-list__empty-message" data-testid={`${dataTestId}-empty`}>
          Belum ada catatan
        </p>
      </div>
    );
  }

  const groupedNotes = {};

  notes.forEach((note) => {
    const groupKey = new Date(note.createdAt).toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric",
    });

    if (!groupedNotes[groupKey]) {
      groupedNotes[groupKey] = [];
    }
    groupedNotes[groupKey].push(note);
  });

  return (
    <div className="notes-list" data-testid={dataTestId}>
      {/* TODO [Basic] gunakan array.map untuk merender NoteItem untuk setiap catatan. */}
      {Object.entries(groupedNotes).map(([monthYear, notes]) => (
        <section key={monthYear} className="notes-group" data-testid={`${monthYear}-group`}>
          <h3>{monthYear}</h3>
          <span data-testid={`${monthYear}-group-count`}>{notes.length} catatan</span>
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} onDelete={onDelete} onArchive={onArchive} searchKeyword={searchKeyword} />
          ))}
        </section>
      ))}
      {/* TODO [Skilled] ekstrak tombol aksi menjadi komponen reusable agar dipakai NoteItem. */}
      {/* TODO [Advanced] kelompokkan catatan per bulan-tahun dan render tiap grup dalam <section className="notes-group">. */}
    </div>
  );
}

export default NotesList;
