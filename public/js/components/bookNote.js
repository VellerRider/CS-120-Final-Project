export function renderNote(note) {
        let psSpans = '';
        if (Array.isArray(note.ps) && note.ps.length > 0) {
            psSpans = note.ps.map(ps => `<div class="note-ps">${ps}</div>`).join('');
        }
    
        return `
            <div class="note-card" data-note-id="${note.note_id}" data-note-content="${encodeURIComponent(note.note_text)}" data-note-ps='${JSON.stringify(note.ps)}'>
                <div class="note-content">${note.note_text}</div>
                ${psSpans ? `<div class="note-ps-container">${psSpans}</div>` : ''}
            </div>
        `;
}