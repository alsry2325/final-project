import NoteItem from "../items/note/NoteItem";

function NoteList({ data }) {

    return (
        <div className="note-div">
            {
                data &&
                data.map(note => <NoteItem key={note.noteNo} note={note}/>)
            }
        </div>
    );
}

export default NoteList;