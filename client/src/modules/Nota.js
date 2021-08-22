import "./Nota.css";
import axios from "axios";
import { useContext } from "react";
import { NotesContext } from "../NotesContext";

const Nota = ({ props }) => {
    const [notes, setNotes] = useContext(NotesContext);

    const deleteItem = (e) => {
        e.preventDefault();
        axios.delete('/delete?title=' + e.target.placeholder).then(res => {
            console.log(res);
        }).catch(
            err => {
                throw err;
            })

        axios.get("/api").then(data => {
            setNotes(data.data);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="nota">
            <h4>{props.titulo}</h4>
            <br />
            <p>{props.contenido}</p>
            <input value="x" type="button" placeholder={props.titulo} onClick={deleteItem}></input>
        </div>
    );
}

export default Nota;