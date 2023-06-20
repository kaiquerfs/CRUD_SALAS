
import Home from './components/Home';
import Salas from './components/Salas.js';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div className="App">
      <h1>Cadastro de Salas</h1>
      <BrowserRouter>
        <Nav variant="tabs">
          <Nav.Link as={Link} to="/">Página Inicial</Nav.Link>
          <Nav.Link as={Link} to="/salas">Cadastro de Salas</Nav.Link>
          
        </Nav>

        <Routes>
          <Route path="/" index element={<Home />}></Route>
          <Route path="/Salas" element={<Salas/>}></Route>
          
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
