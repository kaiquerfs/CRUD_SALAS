import React from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Salas extends React.Component {
  constructor(props) {
    super(props);
    // _________Inicialização do estado do componente
    this.state = {
      salas: [], // _________Array vazio para armazenar os salas
      NumSala: '', //_________ NumSala do sala sendo adicionado ou editado
      descrição: '', // _________descrição do sala sendo adicionado ou editado
      editando: false, // _________Indica se o formulário está no modo de edição ou adição
      salaEditandoId: null, // _________ID do sala sendo editado
      showModal: false, // _________Controla a exibição do modal
    };
  }

  componentDidMount() {
    
    // Verifica se há dados de salas no localStorage e atualiza o estado
    const salasData = localStorage.getItem('salas');

    if (salasData) {
      this.setState({ salas: JSON.parse(salasData) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Chama sempre que o estado do componente é atualizado
    // Salva os dados no localStorage
    if (prevState.salas !== this.state.salas) {
      localStorage.setItem('salas', JSON.stringify(this.state.salas));
    }
  }

  handleChange = (event) => {
    // _________Manipula o evento de mudança em campos de entrada e atualiza o estado correspondente
    this.setState({ [event.target.name]: event.target.value });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  adicionarsala = () => {
    // _________Função para adicionar ou editar um sala
    const { NumSala, descrição, editando, salaEditandoId } = this.state;

    if (NumSala && descrição) {

      const novosala = {
        id: Date.now(),
        NumSala: NumSala,
        descrição: descrição,
      };

      let salasAtualizados = [...this.state.salas];
      if (editando) {

        const salaEditandoIndex = salasAtualizados.findIndex(sala => sala.id === salaEditandoId);
        salasAtualizados[salaEditandoIndex] = novosala;
      }
      else {
        salasAtualizados.push(novosala);
      }

      this.setState({ salas: salasAtualizados, NumSala: '', descrição: '', editando: false, salaEditandoId: null });

    }
  };

  editarsala = (id) => {
    // _________Função para entrar no modo de edição de um sala
    const salaEditando = this.state.salas.find(sala => sala.id === id);
    if (salaEditando) {
    // _________Se o sala existe, atualiza o estado com o NumSala, descrição e informações de edição
      this.setState({ NumSala: salaEditando.NumSala, descrição: salaEditando.descrição, editando: true, salaEditandoId: id });

    // _________Abre o modal
      this.handleShow();
    }
  };

  excluirsala = (id) => {
    // _________Função para excluir um sala
    const novossalas = this.state.salas.filter(sala => sala.id !== id);

    this.setState({ salas: novossalas });
  };

  render() {
    const { NumSala, descrição, salas, editando, showModal } = this.state;

    return (
      <><br></br>
        <Button variant="primary" onClick={this.handleShow}>
          Adicionar Sala
        </Button>


        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editando ? 'Editar sala' : 'Adicionar sala'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="NumSala">
              <Form.Label>N° da Sala</Form.Label>
              <Form.Control type="text" name="NumSala" value={NumSala} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="descrição">
              <Form.Label>Descrição</Form.Label>
              <Form.Control type="descrição" name="descrição" value={descrição} onChange={this.handleChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={this.adicionarsala}>
              {editando ? 'Editar' : 'Adicionar'}
            </Button>
          </Modal.Footer>
        </Modal>

        <Table striped bordered hover>

          <thead>
            <br></br>
            <tr>
              <th>N° da Sala</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {salas.map(sala => (
              <tr key={sala.id}>
                <td>{sala.NumSala}</td>
                <td>{sala.descrição}</td>
                <td>
                  <Button variant="primary" onClick={() => this.editarsala(sala.id)}>Editar</Button>{' '}
                  <Button variant="danger" onClick={() => this.excluirsala(sala.id)}>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}

export default Salas;
