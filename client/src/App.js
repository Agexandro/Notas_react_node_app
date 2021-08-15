import './App.css';
import Form from './modules/Form';
import Notas from "./modules/Notas";
import { NotesProvider } from './NotesContext';

function App() {
  return (
    <div className="App">
      <NotesProvider>
        <Form />
        <Notas />
      </NotesProvider>
    </div>
  );
}

export default App;
