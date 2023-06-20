import React from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Salas extends React.Component {
  constructor(props) {
    super(props);
    // Inicialização do estado do componente
    this.state = {
      salas: [], // Array vazio para armazenar os salas
      NumSala: '', // NumSala do sala sendo adicionado ou editado
      descrição: '', // descrição do sala sendo adicionado ou editado
      editando: false, // Indica se o formulário está no modo de edição ou adição
      salaEditandoId: null, // ID do sala sendo editado
      showModal: false, // Controla a exibição do modal
    };
  } 

  componentDidMount() {
    // Chamado após o componente ser montado no DOM
    // Verifica se há dados de salas no localStorage e atualiza o estado
    const salasData = localStorage.getItem('salas');

    if (salasData) {
      this.setState({ salas: JSON.parse(salasData) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Chamado sempre que o estado do componente é atualizado
    // Salva os dados de salas no localStorage
    if (prevState.salas !== this.state.salas) {
      localStorage.setItem('salas', JSON.stringify(this.state.salas));
    }
  }

  handleChange = (event) => {
    // Manipula o evento de mudança em campos de entrada e atualiza o estado correspondente
    this.setState({ [event.target.name]: event.target.value });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  adicionarsala = () => {
    // Função para adicionar ou editar um sala
    const { NumSala, descrição, editando, salaEditandoId } = this.state;

    if (NumSala && descrição) {
      
        // Verifica se o descrição é válido
        const novosala = {
          id: Date.now(), // Gera um ID único baseado no timestamp
          NumSala: NumSala,
          descrição: descrição,
        };

        let salasAtualizados = [...this.state.salas];
        if (editando) {
          // Se estiver no modo de edição, substitui o sala existente com o novo sala
          const salaEditandoIndex = salasAtualizados.findIndex(sala => sala.id === salaEditandoId);
          salasAtualizados[salaEditandoIndex] = novosala;
        } else {
          // Caso contrário, adiciona o novo sala ao array de salas
          salasAtualizados.push(novosala);
        }

        // Atualiza o estado, limpando os campos e o modo de edição
        this.setState({ salas: salasAtualizados, NumSala: '', descrição: '', editando: false, salaEditandoId: null });
       
    }
  };

  editarsala = (id) => {
    // Função para entrar no modo de edição de um sala
    const salaEditando = this.state.salas.find(sala => sala.id === id);
    if (salaEditando) {
      // Se o sala existe, atualiza o estado com o NumSala, descrição e informações de edição
      this.setState({ NumSala: salaEditando.NumSala, descrição: salaEditando.descrição, editando: true, salaEditandoId: id });

      // Abre o modal
      this.handleShow();
    }
  };

  excluirsala = (id) => {
    // Função para excluir um sala
    const novossalas = this.state.salas.filter(sala => sala.id !== id);

    // Atualiza o estado
    this.setState({ salas: novossalas });
  };

  validardescrição = (descrição) => {
    // Função para validar o formato de um descrição usando expressão regular
    const descriçãoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return descriçãoRegex.test(descrição);
  };

  render() {
    const { NumSala, descrição, salas, editando, showModal } = this.state;

    return (
      <><br></br>
        <Button variant="primary" onClick={this.handleShow}>
          Adicionar sala
        </Button>


        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editando ? 'Editar sala' : 'Adicionar sala'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="NumSala">
              <Form.Label>NumSala</Form.Label>
              <Form.Control type="text" name="NumSala" value={NumSala} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="descrição">
              <Form.Label>descrição</Form.Label>
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
