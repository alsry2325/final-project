import NoteTrashItem from "../items/note/NoteTrashItem";


function NoteTrashList({ data }) {

    return (
        <div className="note-div">
            {
                data &&
                data.map(note => <NoteTrashItem key={note.noteNo} note={note}/>)
            }
        </div>
    );
}

export default NoteTrashList;