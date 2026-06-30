import React from "react";
import { showFormattedDate } from "../utils";
import NoteActionButton from "./NoteActionButton";

function NoteItem({ note, onDelete, onArchive, searchKeyword }) {
  const title = note.title;
  const body = note.body;
  const keyword = searchKeyword || "";

  const startIndex = title.toLowerCase().indexOf(keyword.toLowerCase());
  const before = title.slice(0, startIndex);
  const match = title.slice(startIndex, startIndex + keyword.length);
  const after = title.slice(startIndex + keyword.length);

  const startIndexBody = body.toLowerCase().indexOf(keyword.toLowerCase());
  const beforeBody = body.slice(0, startIndexBody);
  const matchBody = body.slice(startIndexBody, startIndexBody + keyword.length);
  const afterBody = body.slice(startIndexBody + keyword.length);

  const canHighlight = keyword && startIndex !== -1;
  const canHighlightBody = keyword && startIndexBody !== -1;

  return (
    <div className="note-item" data-testid="note-item" data-note-id={note?.id}>
      <div className="note-item__content" data-testid="note-item-content">
        {/* TODO [Basic] tampilkan judul catatan menggunakan note.title */}
        {/* TODO [Advanced] sorot kata kunci pencarian dalam judul menggunakan elemen <mark>. */}
        <h3 className="note-item__title" data-testid="note-item-title">
          {canHighlight ? (
            <>
              {before}
              <mark>{match}</mark>
              {after}
            </>
          ) : (
            title
          )}
        </h3>
        {/* TODO [Basic] gunakan util showFormattedDate untuk menampilkan tanggal dibuat. */}
        <p className="note-item__date" data-testid="note-item-date">
          {showFormattedDate(note.createdAt)}
        </p>
        {/* TODO [Basic] tampilkan isi catatan dari note.body */}
        {/* TODO [Advanced] sorot kata kunci pencarian dalam isi menggunakan elemen <mark>. */}
        <p className="note-item__body" data-testid="note-item-body">
          {canHighlightBody ? (
            <>
              {beforeBody}
              <mark>{matchBody}</mark>
              {afterBody}
            </>
          ) : (
            body
          )}
        </p>
      </div>
      <div className="note-item__action" data-testid="note-item-action">
        {/* TODO [Skilled] pecah tombol aksi menjadi komponen terpisah bernama `NoteActionButton` dengan menerima props `variant` dan `onClick` */}
        <NoteActionButton
          variant="delete"
          dataTestId="note-item-delete-button"
          // TODO [Basic] panggil onDelete dengan id catatan.
          onClick={() => onDelete(note.id)}
        >
          Delete
        </NoteActionButton>

        {/* TODO [Advanced] implementasikan tombol arsip untuk fitur mengarsipkan catatan */}
        <NoteActionButton variant="archive" dataTestId="note-item-archive-button" onClick={() => onArchive(note.id)}>
          {note.archived ? "Unarchive" : "Archive"}
        </NoteActionButton>
      </div>
    </div>
  );
}

export default NoteItem;
