import "./Form.css"
import { useContext, useState } from "react";
import axios from "axios";
import { NotesContext } from "../NotesContext";

const Form = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [, setNotes] = useContext(NotesContext);

    const titleUpdate = (e) => {
        setTitle(e.target.value);
    }

    const contentUpdate = (e) => {
        setContent(e.target.value);
    }

    const submit = (e) => {
        setTitle("");
        setContent("");

        e.preventDefault();
        axios.post("/send", {
            title: title,
            content: content
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            if (err) throw err;
        });
     
        axios.get("/api").then(data=>{
            setNotes(data.data);
        }).catch(err=>{
            console.log(err);
        });
    }



    return (
        <form onSubmit={submit}>
            <input value={title} onChange={titleUpdate} type="text" name="title" required></input>
            <input value={content} onChange={contentUpdate} type="text" name="content" required></input>
            <input type="submit"></input>
        </form>
    );
}

export default Form;