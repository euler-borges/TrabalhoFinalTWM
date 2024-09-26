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



export default function CadastroProdutos(){
    const [nome, setNome] = useState(null);
    const [descricao, setDescricao] = useState(null);
    const [preco, setPreco] = useState(null);
    
    const [dados, setDados] = useState([]);

    const [carregaProduto, setCarregaProduto] = useState(false);
    const [insereProduto, setInsereProduto] = useState(false);
    const [deletaProduto, setDeletaProduto] = useState(false);
    const [editaProduto, setEditaProduto] = useState(false);

    useEffect(() => {
        if (carregaProduto) {
            console.log('Carrega produto');
            setCarregaProduto(false);
            fetch("http://localhost:5000/allprodutos", {
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
                      dadosDoBackend.push({id : data[i].pid, nome : data[i].nome, preco : data[i].preco,
                          descricao : data[i].descricao})
                    }
                    console.log(dadosDoBackend);      
                    setDados(dadosDoBackend);                })
                .catch((error) => console.log(error));            
        }
    }, [carregaProduto]);

    function LinhaProduto() {
        
        return (
            <>
                {dados.map((item) => (
                    <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nome}</td>
                    <td>{item.preco}</td>
                    <td>{item.descricao}</td>
                    </tr>))}
                </>
              
        );
    }

    useEffect(() => {
        if(insereProduto){
            console.log("Insere produto");
            let produto = {};
            setInsereProduto(false);
            produto = {
                "nome": nome,
                "descricao": descricao,
                "preco" : preco,
                
            };
            console.log(produto);
            fetch("http://localhost:5000/produtos", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "POST",
                body: JSON.stringify(produto)
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("DATA");
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [insereProduto]);

    useEffect(() => {
        if (deletaProduto) {
            let nomeProduto = {
                "nome":nome
            };

            console.log('Deleta produto');
            setDeletaProduto(false);
            fetch("http://localhost:5000/produtos", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "DELETE",
                body : JSON.stringify(nomeProduto)
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                  }  
                )   
                .catch((error) => console.log(error));            
        }
      
    }, [deletaProduto]); 

    useEffect(() => {
        if (editaProduto) {
            let produto = {
                "nome": nome,
                "preco":preco,
                "descricao":descricao
            };

            console.log('Edita produto');
            setEditaProduto(false);
            fetch("http://localhost:5000/produtos", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "PUT",
                body : JSON.stringify(produto)
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                  }  
                )   
                .catch((error) => console.log(error));            
        }
      
    }, [editaProduto]); 



    const handleCarregaProduto = () => {        
        setCarregaProduto(true);
    }

    const handleInsereProduto = () => {
        setInsereProduto(true);
        
    }

    const handleEditaProduto = () => {        
        setEditaProduto(true);
    }

    const handleDeletaProduto = () => {
        setDeletaProduto(true);
        
    }


    const handleChangeNome = (event) => {
        setNome(event.target.value);
    } 



    const handleChangeDescricao = (event) => {
        setDescricao(event.target.value);
    }
    
    const handleChangePreco = (event) => {
        setPreco(event.target.value);
    } 
    


    return(
        <>
            <h1>Cadastro de Produtos</h1>
            <div id = "Cadastro">
                <Form style={({ margin: "5px" }, { marginLeft: "80px" })}>
                    <Row>
                        <Col sm={8}>
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
                            <div className="txtPreco">
                            <Form.Label className="text-left" style={{ width: "100%" }}>
                                Preço
                            </Form.Label>
                            <Form.Control
                                value={preco}
                                onChange={handleChangePreco}
                            />
                            </div>
                        </Col>
                    </Row>
                </Form>
                <Form.Label style={({ margin: "5px" }, { marginLeft: "80px" })}>Descrição</Form.Label>
                <Form.Control as = "textarea" rows={4} style={({ margin: "5px" }, { marginLeft: "80px" })} 
                    size = "lg" type = 'text' placeholder = "Preencha  a descricao do produto"
                    values = {preco} onChange={handleChangeDescricao}/>
                <br/><br/>
                <button onClick={handleInsereProduto} style={({ margin: "5px" }, { marginLeft: "80px" })}>Cadastrar</button>
                <br/>
                <br/>
                <button onClick={handleCarregaProduto} style={({ margin: "5px" }, { marginLeft: "80px" })}>Carregar</button>                       
                <br/>
                <br/>
                <button style={({ margin: "5px" }, { marginLeft: "80px" })} onClick={handleDeletaProduto}>Deletar</button>
                <br/>
                <br/>
                <button style={({ margin: "5px" }, { marginLeft: "80px" })} onClick={handleEditaProduto}>Editar</button>
                <br></br>
                <Table striped border hover>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Descrição</th>
                    
                    </tr>
                </thead>
                <tbody>
                    <LinhaProduto></LinhaProduto>
                </tbody>
                </Table>
            
                <footer>*Obs.: Os botões deletar e editar se guiam pelo parâmetro nome.</footer>

            </div>
        </>
    )
}