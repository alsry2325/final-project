import NoteSenderItem from "../items/NoteSenderItem";

function NoteSenderList({ data }) {

    return (
        <div className="note-div">
            {
                data &&
                data.map(note => <NoteSenderItem key={note.noteNo} note={note}/>)
            }
        </div>
    );
}

export default NoteSenderList;