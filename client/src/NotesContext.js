import { createContext, useEffect, useState } from "react";
import axios  from "axios";

export const NotesContext = createContext();

export const NotesProvider = props => {
    const[notes, setNotes] = useState([]);

    useEffect(()=>{
        axios.get("/api").then(data=>{
            setNotes(data.data);
        }).catch(err=>{
            console.log(err);
        })
    },[]);

    return(
        <NotesContext.Provider value={[notes, setNotes]}>
            {props.children}
        </NotesContext.Provider>
    );
}