import "./Nota.css";

const Nota = ({props})=>{
    return(
        <div className="nota">
            <h4>{props.titulo}</h4>
            <br/>
            <p>{props.contenido}</p>
        </div>
    );
}

export default Nota;