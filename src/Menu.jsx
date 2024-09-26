import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap/dist/css/bootstrap.min.css";

function Menu() {
  return (
    <Navbar variant="dark" bg="dark" expand="lg" fixed ="top">
      <Container fluid>
        <Navbar.Brand href="/">Erlim-Corp</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Cadastros" 
              menuVariant="dark"
            >
              <NavDropdown.Item href="/CadastroCliente">Cadastro de Clientes</NavDropdown.Item>
              <NavDropdown.Item href="/CadastroFuncionario">
                Cadastro de Técnicos
              </NavDropdown.Item>
              <NavDropdown.Item href="/CadastroProdutos">Cadastro de Produtos</NavDropdown.Item>
              <NavDropdown.Item href="/CadastroOrdem">
                Registro de ordem de serviço
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;