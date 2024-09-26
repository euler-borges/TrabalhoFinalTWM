import { Route, Routes as RoutesDom } from "react-router-dom"

import Home from "./Home"
import CadastroCliente from "./pages/CadastroCliente.jsx"
import CadastroFuncionario from "./pages/CadastroFuncionario.jsx"
import CadastroProdutos from "./pages/CadastroProdutos.jsx"
import CadastroOrdem from "./pages/CadastroOrdem.jsx"


const Routes = () => {
  return (
      <RoutesDom>
        <Route path="" index element={<Home />} />
        <Route path="cadastroCliente" element={<CadastroCliente />} />
        <Route path="cadastroFuncionario" element={<CadastroFuncionario />} />
        <Route path="cadastroProdutos" element={<CadastroProdutos />} />
        <Route path="cadastroOrdem" element={<CadastroOrdem />} />

      </RoutesDom>
  )
}

export default Routes
