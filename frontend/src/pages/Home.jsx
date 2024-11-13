import { useEffect, useState } from "react";
import api from "../api";

export default function Home() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            }).catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) { alert("Note Deleted");}
            else { alert("Failed to delete note :(");}
            getNotes();
        }).catch((err) => alert(err));

    };

    const createNote = (e) => {
        e.preventDefault();
        api.post('/api/notes/', {title, content}).then((res) => {
            if (res.status === 201) { alert("Note Created!"); }
            else { alert("Failed to create Note :("); }
            getNotes();
        }).catch((err) => {alert(err);});
    }

    return(
        <div className="notes">
            <div className="notes-list">
                <h1> Notes </h1>
            </div>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title </label>
                <br/>
                <input type="text" name="title" id="title" value={title} required onChange={(e) => setTitle(e.target.value)}/>
                <br/>
                <label htmlFor="content">Description </label>
                <br/>
                <input type="text" name="content" id="content" value={content} required onChange={(e) => setContent(e.target.value)} />
                <br/>
                <button type="submit" value="Submit">Create Note</button>
            </form>
        </div>
    )
}