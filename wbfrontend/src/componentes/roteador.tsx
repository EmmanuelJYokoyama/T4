import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BarraNavegacao from "./barraNavegacao";
// import CadastroProduto from "./cadastroProduto";
// import CadastroServico from "./cadastroServico";
// import ListagemProdutos from "./listagemProdutos";
// import ListagemServicos from "./listagemServicos";
import FormClientes from "./cadastroCliente";
import ListaCliente from "./listaCliente";
import "../styles/index.scss";

const Roteador = () => {
    return (
        <Router>
            <BarraNavegacao />
            <Routes>
                <Route path="/" element={<h1 className="text-center mt-5">Bem-vindo ao sistema de gerenciamento de clientes!</h1>} />
                <Route path="/clientes" element={<ListaCliente />} />
                <Route path="/cadastro-clientes" element={<FormClientes />} />
                <Route path="/cadastro-clientes/:id" element={<FormClientes />} />

            </Routes>
        </Router>
    );
};

export default Roteador;
