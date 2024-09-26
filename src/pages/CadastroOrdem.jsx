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



export default function CadastroOrdem(){
    // const [nome, setNome] = useState(null);
    // const [id, setID] = useState(null);
    const [fclientes, setFclientes] = useState(true);
    const [ftecnicos, setFtecnicos] = useState(true);
    const [lclientes, setLclientes] = useState([]);
    const [ltecnicos, setLtecnicos] = useState([]);
    const [cliente, setCliente] = useState(null);
    const [tecnico, setTecnico] = useState(null);
    const [descricao, setDescricao] = useState(null);

    const [dados, setDados] = useState([]);
    const [imagem, setImagem] = useState(null);

    const [insereOrdem, setInsereOrdem] = useState(false);
    const [deletaOrdem, setDeletaOrdem] = useState(false);
    const [editaOrdem, setEditaOrdem] = useState(false);

    const handleInsereOrdem = () => {
        setInsereOrdem(true);
    }

    const handleDeletaOrdem = () => {
        setDeletaOrdem(true);
    }

    const handleEditaOrdem = () => {
        setEditaOrdem(true);
    }
    // const handleChangeNome = (event) => {
    //     setNome(event.target.value);
    // } 

    // const handleChangeID = (event) => {
    //     setID(event.target.value);
    // }

    const handleChangeDescricao = (event) => {
        setDescricao(event.target.value);
    }
    

    

    const handleChangeImagem = (event) => {
        setImagem(event.target.value);
    } 

    const handleChangeCliente = (event) => {
        setCliente(event.target.value);
    } 

    const handleChangeTecnico = (event)=> {
        setTecnico(event.target.value);
    } 
    //chamando para encontrar os clientes existentes, mas com o if para q n fique chamando sempre
    if(fclientes){
        setFclientes(false);
        fetch("http://localhost:5000/allclientes", {
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
                            dadosDoBackend.push({id: data[i].cid, nome : data[i].nome, cpf : data[i].cpf,})
                        }
                        setLclientes(dadosDoBackend);
                    }  
                    )   
                    .catch((error) => console.log(error)); 
    }

    if(ftecnicos){
        setFtecnicos(false);
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
                            dadosDoBackend.push({id: data[i].tid,nome : data[i].nome, cpf : data[i].cpf,})
                        }
                        setLtecnicos(dadosDoBackend);
                    }  
                    )   
                    .catch((error) => console.log(error)); 
    }

    //useEffects com fetchs para as diferentes ações necessárias
    useEffect(() => {
        if(insereOrdem){
            console.log("Insere ordem");
            let ordem = {};
            setInsereOrdem(false);
            ordem = {
                "cliente": cliente,
                "tecnico": tecnico, 
                "descricao" : descricao,
                "imagem": imagem,
                
                
            };
            console.log(ordem);
            fetch("http://localhost:5000/ordens", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "POST",
                body: JSON.stringify(ordem)
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("DATA");
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [insereOrdem]);

    useEffect(() => {
        if(deletaOrdem){
            console.log("Deleta ordem");
            let cliTecOrdem = {
                "cliente": cliente,
                "tecnico":tecnico
            };
            setDeletaOrdem(false);

            fetch("http://localhost:5000/ordens", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "DELETE",
                body: JSON.stringify(cliTecOrdem)
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("DATA");
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [deletaOrdem]);

    useEffect(() => {
        if(editaOrdem){
            console.log("Edita ordem");
            let ordem = {};
            setEditaOrdem(false);
            ordem = {
                "cliente": cliente,
                "tecnico": tecnico, 
                "descricao" : descricao,
                "imagem": imagem,
                
                
            };
            console.log(ordem);
            fetch("http://localhost:5000/ordens", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "PUT",
                body: JSON.stringify(ordem)
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("DATA");
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [editaOrdem]);



    function ListaClientes(){
        return(
            <>
            <Form.Select aria-label="Default select example" values = {cliente} onChange={handleChangeCliente}>
                    <option key = "0">Escolha um cliente</option>
                {lclientes.map((item) => (
                    <>
                        <option value = {item.cpf}  key = {item.id}>{item.nome} : {item.cpf}</option>
                    </>
                    ))}
            </Form.Select>
            </>            
        )
    }

    useEffect(() => {
            console.log('Carrega ordem');
            fetch("http://localhost:5000/allordens", {
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
                        dadosDoBackend.push({id : data[i].oid, cliente : data[i].cliente, tecnico: data[i].tecnico,
                        descricao: data[i].descricao, imagem: data[i].imagem})
                      }
                      console.log(dadosDoBackend);      
                      setDados(dadosDoBackend);
                  }  
                )   
                .catch((error) => console.log(error));            
        
      
    }, [insereOrdem, editaOrdem, deletaOrdem]); 

    function ListaTecnicos(){
        return(
            <>
            <Form.Select aria-label="Default select example" values = {tecnico} onChange={handleChangeTecnico}>
                    <option>Escolha um tecnico</option>
                {ltecnicos.map((item) => (
                    <>
                        <option value={item.cpf} key = {item.id}>{item.nome} : {item.cpf}</option>
                    </>
                    ))}
            </Form.Select>
            </>            
        )
    }


    function LinhaOrdem() {
        
        return (
            <>
                {dados.map((item) => (
                    <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.cliente}</td>
                    <td>{item.tecnico}</td>
                    <td>{item.descricao}</td>
                    <td>{item.imagem}</td>
                    </tr>))}
                </>
              
        );
    }


    return(
        <>
            <br></br>
            <br/>
            <h1>Cadastro de Ordem de Serviço</h1>
            <div id = "Cadastro">

                <h3>Cliente</h3>
                    <ListaClientes></ListaClientes>
                <br/>

                <h3>Tecnico</h3>
                    <ListaTecnicos></ListaTecnicos>
                <br/>

                <h3>Descrição</h3>
                <Form.Control size = "lg" type = 'text' placeholder = "Preencha  a descrição do problema"
                values = {descricao} onChange={handleChangeDescricao}/>
                <br/>

                
                
                
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Adicione uma imagem</Form.Label>
                    <Form.Control type="file" values = {imagem} onChange={handleChangeImagem}/>
                </Form.Group>


                
                <button onClick={handleInsereOrdem}>Cadastrar</button>
                <br/>
                <br/>
                <button onClick={handleDeletaOrdem}>Deletar</button>
                <br/>
                <br/>
                <button onClick={handleEditaOrdem}>Editar</button>
                <br></br>
                <Table striped border hover>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Tecnico</th>
                    <th>Descrição</th>
                    <th>Imagem</th>
                    </tr>
                </thead>
                <tbody>
                    <LinhaOrdem></LinhaOrdem>
                </tbody>
                </Table>
            </div>
        </>
    )
}