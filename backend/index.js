const express = require("express");
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors());

id_cliente_global = 2;
id_tecnico_global = 1;
id_produto_global = 1;
id_ordem_global = 0;

let clientes = [
    {
        "nome" : "Miguel",
        "cpf" : "1238901290",
        "telefone" : "999999999",
        "email" : "miguel@teste.com",
        "endereco" : "Av. Victor Alves Pereira 90",
        "cidade" : "Uberlândia",
        "cep" : "38409-085",
        "cid": 1,
    },
    {
        "nome" : "LALA",
        "cpf" : "123213123",
        "telefone" : "999999999",
        "email" : "miguel@teste.com",
        "endereco" : "Av. Victor Alves Pereira 90",
        "cidade" : "Uberlândia",
        "cep" : "38409-085",
        "cid": 2,
    }
]

let tecnicos = [
    {
        "nome" : "Miguel",
        "cpf" :"1212121212",
        "telefone" : "999999999",
        "email" : "miguel@teste.com",
        "endereco" : "Av. Victor Alves Pereira 90",
        "cidade" : "Uberlândia",
        "cep" : "38409-085",
        "tid": 1,
    }
]

let produtos = [
    {
        "pid": 1,
        "nome":"minishark",
        "preco":"35000",
        "descricao":"Meio tubarão, meio arma, completamente incrível"
    }
]


let ordens =  [
    {
        
    }
]
app.get("/", (req, res) => {
    res.send("Maravilha!");
})



app.get("/clientes", (req, res) => {
    cliente = req.body;
    cliente_retorno = {}
    for (let i = 0; i < clientes.length; i++) {
        if (cliente.nome == clientes[i].nome){
            console.log("Achei!!");
            res.json(clientes);
            cliente_retorno = clientes[i]
            break;
        }        
    }
    res.json(cliente_retorno);
})

app.get("/clientes", (req, res) => { //req.query.id
    cliente =  req.query.nome;
    cliente_retorno = {}
    for (let i = 0; i < clientes.length; i++) {
        if (cliente == clientes[i].nome){
            console.log("Achei!!");
            cliente_retorno = clientes[i]
            break;
        }        
    }      
    res.json(cliente_retorno);
})

app.get("/allclientes", (req, res) => { //req.query.id 
    res.json(clientes);
})


app.post("/clientes", (req, res) => {
    cliente = req.body;
    console.log("#### POST ####");
    console.log(cliente);
    console.log("#### cliente ####");
    id_cliente_global++;
    cliente.cid = id_cliente_global;
    //console.log(cliente); 
    console.log("#### ADD CLIENTE ####");
    console.log(cliente);
    console.log("#### DEPOIS CLIENTE ####");
    clientes.push(cliente); 
    console.log(clientes);    
    res.json(clientes);
})

app.put("/clientes", (req, res) => {
    cliente = req.body;
    cliente_retorno = {}
    for (let i = 0; i < clientes.length; i++) {
        if (cliente.cpf == clientes[i].cpf){
            console.log("Achei!!");
            res.json(clientes);
            idc = clientes[i].cid;
            clientes[i] = cliente;
            clientes[i].cid = idc;
            cliente_retorno = clientes[i];
            break;
        }        
    }
    res.json(cliente_retorno);  
})

app.delete("/clientes", (req, res) => {
    cpfCliente = req.body;
    for (let i = 0; i < clientes.length; i++) {
        if (cpfCliente.cpf == clientes[i].cpf){
            console.log("Deletando");
            clientes.splice(i, 1);
            res.json(clientes);
            break;
        }        
    }
})

//----------------------------------------------------------------------------
app.get("/tecnicos", (req, res) => {
    tecnico = req.body;
    tecnico_retorno = {}
    for (let i = 0; i < tecnicos.length; i++) {
        if (tecnico.nome == tecnicos[i].nome){
            console.log("Achei!!");
            res.json(tecnicos);
            tecnico_retorno = tecnico[i]
            break;
        }        
    }
    res.json(tecnico_retorno);
})

app.get("/tecnicos", (req, res) => { //req.query.id
    tecnico =  req.query.nome;
    tecnico_retorno = {}
    for (let i = 0; i < tecnicos.length; i++) {
        if (tecnico == tecnicos[i].nome){
            console.log("Achei!!");
            tecnico_retorno = tecnicos[i]
            break;
        }        
    }      
    res.json(tecnico_retorno);
})

app.get("/alltecnicos", (req, res) => { //req.query.id 
    res.json(tecnicos);
})


app.post("/tecnicos", (req, res) => {
    tecnico = req.body;
    console.log("#### POST ####");
    console.log(tecnico);
    console.log("#### tecnico ####");
    id_tecnico_global++;
    tecnico.tid = id_tecnico_global;
    //console.log(cliente); 
    console.log("#### ADD TECNICO ####");
    console.log(tecnico);
    console.log("#### DEPOIS TECNICO ####");
    tecnicos.push(tecnico); 
    console.log(tecnicos);    
    res.json(tecnicos);
})

app.put("/tecnicos", (req, res) => {
    tecnico = req.body;
    tecnico_retorno = {}
    for (let i = 0; i < tecnicos.length; i++) {
        if (tecnico.cpf == tecnicos[i].cpf){
            console.log("Achei!!");
            res.json(tecnicos);
            idt = tecnicos[i].tid;
            tecnicos[i] = tecnico;
            tecnicos[i].tid = idt;
            tecnico_retorno = tecnicos[i];
            break;
        }        
    }
    res.json(tecnico_retorno);  
})

app.delete("/tecnicos", (req, res) => {
    cpfTecnico = req.body;
    for (let i = 0; i < tecnicos.length; i++) {
        if (cpfTecnico.cpf == tecnicos[i].cpf){
            console.log("Deletando");
            tecnicos.splice(i, 1);
            res.json(tecnicos);
            break;
        }        
    }
})


//------------------------------------------------------------------------------------
app.get("/produtos", (req, res) => {
    produto = req.body;
    produto_retorno = {}
    for (let i = 0; i < produtos.length; i++) {
        if (produto.nome == produtos[i].nome){
            console.log("Achei!!");
            res.json(produtos);
            produto_retorno = produto[i]
            break;
        }        
    }
    res.json(produto_retorno);
})

app.get("/produtos", (req, res) => { //req.query.id
    produto =  req.query.nome;
    produto_retorno = {}
    for (let i = 0; i < produtos.length; i++) {
        if (produto == produtos[i].nome){
            console.log("Achei!!");
            produto_retorno = produtos[i]
            break;
        }        
    }      
    res.json(produto_retorno);
})

app.get("/allprodutos", (req, res) => { //req.query.id 
    res.json(produtos);
})


app.post("/produtos", (req, res) => {
    produto = req.body;
    console.log("#### POST ####");
    console.log(produto);
    console.log("#### tecnico ####");
    id_produto_global++;
    produto.pid = id_produto_global;
    //console.log(cliente); 
    console.log("#### ADD TECNICO ####");
    console.log(produto);
    console.log("#### DEPOIS TECNICO ####");
    produtos.push(produto); 
    console.log(produtos);    
    res.json(produtos);
})

app.put("/produtos", (req, res) => {
    produto = req.body;
    produto_retorno = {}
    for (let i = 0; i < produtos.length; i++) {
        if (produto.nome == produtos[i].nome){
            console.log("Achei!!");
            res.json(produtos);
            idp = produtos[i].pid;
            produtos[i] = produto;
            produtos[i].pid = idp;
            produto_retorno = produtos[i]
            break;
        }        
    }
    res.json(produto_retorno);  
})

app.delete("/produtos", (req, res) => {
    nomeProduto = req.body;
    for (let i = 0; i < produtos.length; i++) {
        if (nomeProduto.nome == produtos[i].nome){
            console.log("Deletando");
            produtos.splice(i, 1);
            res.json(produtos);
            break;
        }        
    }
})

//---------------------------------------------------------------------------------------
app.get("/ordens", (req, res) => {
    ordem = req.body;
    ordem_retorno = {}
    for (let i = 0; i < ordens.length; i++) {
        if (ordem.nome == ordens[i].nome){
            console.log("Achei!!");
            res.json(ordens);
            ordem_retorno = ordem[i]
            break;
        }        
    }
    res.json(ordem_retorno);
})

app.get("/ordens", (req, res) => { //req.query.id
    ordem =  req.query.nome;
    ordem_retorno = {}
    for (let i = 0; i < ordens.length; i++) {
        if (ordem == ordens[i].nome){
            console.log("Achei!!");
            ordem_retorno = ordens[i]
            break;
        }        
    }      
    res.json(ordem_retorno);
})

app.get("/allordens", (req, res) => { //req.query.id 
    res.json(ordens);
})


app.post("/ordens", (req, res) => {
    ordem = req.body;
    console.log("#### POST ####");
    console.log(ordem);
    console.log("#### ordem ####");
    id_ordem_global++;
    ordem.oid = id_ordem_global;
    //console.log(cliente); 
    console.log("#### ADD ORDEM ####");
    console.log(ordem);
    console.log("#### DEPOIS ORDEM ####");
    ordens.push(ordem); 
    console.log(ordens);    
    res.json(ordens);
})

app.put("/ordens", (req, res) => {
    ordem = req.body;
    ordem_retorno = {}
    for (let i = 0; i < ordens.length; i++) {
        if (ordem.cliente == ordens[i].cliente && ordem.tecnico == ordens[i].tecnico){
            console.log("Achei!!");
            res.json(ordens);
            ido = ordens[i].oid;
            ordens[i] = ordem;
            ordens[i].oid = ido;
            ordem_retorno = ordens[i]
            break;
        }        
    }
    res.json(ordem_retorno);  
})
app.listen(5000, ()=> console.log("SERVER IS RUNNING!!!"));


app.delete("/ordens", (req, res) => {
    cliTecOrdem = req.body;
    for (let i = 0; i < ordens.length; i++) {
        if (cliTecOrdem.cliente == ordens[i].cliente && cliTecOrdem.tecnico == ordens[i].tecnico){
            console.log("Deletando");
            ordens.splice(i, 1);
            res.json(ordens);
            break;
        }        
    }
})
