import NoteStorageDetailItem from "../items/note/NoteStorageDetailItem";
import NoteStorageItem from "../items/note/NoteStroageItem";

function NoteStorageList({ data }) {

    return (
        <div className="note-div">
            {
                data &&
                data.map(note => <NoteStorageItem key={note.noteNo} note={note}/>)
            }
        </div>
    );
}

export default NoteStorageList;