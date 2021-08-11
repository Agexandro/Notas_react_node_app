import { useEffect, useState } from 'react';
import Nota from './Nota';
import './Notas.css';

const Notas = () => {
    const [notas, setNotas] = useState([]);

    async function getData() {
        const response = await fetch("/api");
        const data = await response.json();
        setNotas(data);
    }

    useEffect(
        () => {
            getData();
        }, []
    );

    return (
        <div className="notas">
            {
                notas.map(
                    nota => (
                        <Nota props ={nota} />
                    )
                )
            }
        </div>
    );
}

export default Notas;