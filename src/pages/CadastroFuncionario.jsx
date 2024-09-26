import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Form,
    Col,
    Row,
    Button,
    InputGroup,
    FormControl,
    Container,
    Table,
  } from "react-bootstrap";



export default function CadastroFuncionario(){
    const [nome, setNome] = useState(null);
    const [cpf, setCpf] = useState(null);

    const [telefone, setTelefone] = useState(null);
    const [email, setEmail] = useState(null);
    const [endereco, setEndereco] = useState(null);
    const [cidade, setCidade] = useState(null);
    const [cep, setCEP] = useState(null);


    const [dados, setDados] = useState([]);

    const [carregaTecnico, setCarregaTecnico] = useState(false);
    const [insereTecnico, setInsereTecnico] = useState(false);
    const [deletaTecnico, setDeletaTecnico] = useState(false);
    const [editaTecnico, setEditaTecnico] = useState(false);


    useEffect(() => {
        if (carregaTecnico) {
            console.log('Carrega tecnico');
            setCarregaTecnico(false);
            fetch("http://localhost:5000/alltecnicos", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "GET",
              })
                .then((response) => response.json())
                .then((data) => {
                    const dadosDoBackend = [];
                      for(let i = 0; i < data.length; i++){
                        dadosDoBackend.push({id : data[i].tid, nome : data[i].nome, cpf : data[i].cpf,
                            telefone : data[i].telefone, email : data[i].email, endereco : data[i].endereco,
                            cidade : data[i].cidade, cep : data[i].cep})
                      }
                      console.log(dadosDoBackend);      
                      setDados(dadosDoBackend);
                  }  
                )   
                .catch((error) => console.log(error));            
        }
      
    }, [carregaTecnico]); 


    function LinhaTecnico() {
        
        return (
            <>
                {dados.map((item) => (
                    <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nome}</td>
                    <td>{item.cpf}</td>
                    <td>{item.telefone}</td>
                    <td>{item.email}</td>
                    <td>{item.endereco}</td>
                    <td>{item.cidade}</td>
                    <td>{item.cep}</td>
                    </tr>))}
                </>
              
        );
    }


    useEffect(() => {
        if(insereTecnico){
            console.log("Insere tecnico");
            let tecnico = {};
            setInsereTecnico(false);
            tecnico = {
                "nome": nome,
                "cpf": cpf, 
                "telefone" : telefone,
                "email": email,
                "endereco": endereco,
                "cidade" : cidade,
                "cep": cep,
                
            };
            console.log(tecnico);
            fetch("http://localhost:5000/tecnicos", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "POST",
                body: JSON.stringify(tecnico)
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("DATA");
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [insereTecnico]);


    useEffect(() => {
        if (deletaTecnico) {
            let cpfTecnico = {
                "cpf":cpf
            };

            console.log('Deleta tecnico');
            setDeletaTecnico(false);
            fetch("http://localhost:5000/tecnicos", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "DELETE",
                body : JSON.stringify(cpfTecnico)
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                  }  
                )   
                .catch((error) => console.log(error));            
        }
      
    }, [deletaTecnico]); 

    useEffect(() => {
        if (editaTecnico) {
            let tecnico = {
                "nome": nome,
                "cpf": cpf,
                "telefone" : telefone,
                "email": email,
                "endereco": endereco,
                "cidade" : cidade,
                "cep": cep,
            };

            console.log('Edita tecnico');
            setEditaTecnico(false);
            fetch("http://localhost:5000/tecnicos", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "PUT",
                body : JSON.stringify(tecnico)
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                  }  
                )   
                .catch((error) => console.log(error));            
        }
      
    }, [editaTecnico]); 


    const handleCarregaTecnico = () => {        
        setCarregaTecnico(true);
    }

    const handleInsereTecnico = () => {
        setInsereTecnico(true);
        
    }

    const handleDeletaTecnico = () => {
        setDeletaTecnico(true);   
    }

    const handleEditaTecnico = () => {
        setEditaTecnico(true);   
    }


    const handleChangeNome = (event) => {
        setNome(event.target.value);
    } 

    const handleChangeTelefone = (event) => {
        setTelefone(event.target.value);
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    
    const handleChangeEndereco = (event) => {
        setEndereco(event.target.value);
    } 
    
    const handleChangeCidade = (event) => {
        setCidade(event.target.value);
    } 

    const handleChangeCEP = (event) => {
        setCEP(event.target.value);
    } 

    const handleChangeCpf = (event) => {
        setCpf(event.target.value);
    } 

    return(
        <>
            <br></br>
            <br></br>
            <h1>Cadastro de Técnicos</h1>
            <div id = "Cadastro">
            <Form style={({ margin: "5px" }, { marginLeft: "80px" })}>
                    <Row>
                        <Col sm={4}>
                            <div className="txtNome">
                            <Form.Label className="text-left" style={{ width: "100%" }}>
                                Nome
                            </Form.Label>
                            <Form.Control
                                value={nome}
                                onChange={handleChangeNome}
                            />
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div className="txtEmail">
                            <Form.Label className="text-left" style={{ width: "100%" }}>
                                E-mail
                            </Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={handleChangeEmail}
                            />
                            </div>
                        </Col>
                        <Col sm={2}>
                            <div className="txtCPF">
                            <Form.Label className="text-left" style={{ width: "100%" }}>
                                CPF
                            </Form.Label>
                            <Form.Control
                                value={cpf}
                                onChange={handleChangeCpf}
                            />
                            </div>
                        </Col>
                        <Col sm={2}>
                            <div className="telefone">
                            <Form.Label className="text-left" style={{ width: "100%" }}>
                                Telefone
                            </Form.Label>
                            <Form.Control
                                value={telefone}
                                onChange={handleChangeTelefone}
                            />
                            </div>
                        </Col>
                        </Row>
                    <Row>
                        <Col sm={6}>
                            <div className="txtEndereco">
                            <Form.Label className="text-left" style={{ width: "100%" }}>
                                Endereço
                            </Form.Label>
                            <Form.Control
                                value={endereco}
                                onChange={handleChangeEndereco}
                            />
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div className="txtCidade">
                            <Form.Label className="text-left" style={{ width: "100%" }}>
                                Cidade
                            </Form.Label>
                            <Form.Control
                                value={cidade}
                                onChange={handleChangeCidade}
                            />
                            </div>
                        </Col>
                        
                        <Col sm={2}>
                            <div className="txtCep">
                            <Form.Label className="text-left" style={{ width: "100%" }}>
                                CEP
                            </Form.Label>
                            <Form.Control
                                value={cep}
                                onChange={handleChangeCEP}
                            />
                            </div>
                        </Col>
                    
                    
                    </Row>
                    </Form>

                <br/>
                <button style={({ margin: "5px" }, { marginLeft: "80px" })} onClick={handleInsereTecnico}>Cadastrar</button>
                <br/>
                <br/>
                <button style={({ margin: "5px" }, { marginLeft: "80px" })} onClick={handleCarregaTecnico}>Carregar</button>
                <br/>
                <br/>
                <button style={({ margin: "5px" }, { marginLeft: "80px" })} onClick={handleDeletaTecnico}>Deletar</button>
                <br/>
                <br/>
                <button style={({ margin: "5px" }, { marginLeft: "80px" })} onClick={handleEditaTecnico}>Editar</button>
                <h5></h5>
                <Table striped border hover>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Endereço</th>
                    <th>Cidade</th>
                    <th>CEP</th>
                    </tr>
                </thead>
                <tbody>
                    <LinhaTecnico></LinhaTecnico>
                </tbody>
                </Table>
                <footer>*Obs.: Os botões deletar e editar se guiam pelo parâmetro CPF.</footer>
            </div>
        </>
    )
}