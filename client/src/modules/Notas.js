import { useContext } from 'react';
import { NotesContext } from '../NotesContext';
import Nota from './Nota';
import './Notas.css';

const Notas = () => {
    const [notas,] = useContext(NotesContext);

    return (
        <div>
            <div className="notas">
                {
                    notas.map(
                        nota => (
                            <Nota key={nota.titulo} props={nota} />
                        )
                    )
                }
            </div>
        </div>
    );
}

export default Notas;