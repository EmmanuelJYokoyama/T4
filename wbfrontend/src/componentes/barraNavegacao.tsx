import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import "../styles/index.scss";

const BarraNavegacao = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand text-white" to="/">WB</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/clientes">Clientes</Link>
              <Link className="nav-link text-white" to="/cadastro-clientes">Cadastro de Clientes</Link>
              
            </li>

            {/* <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="cadastroDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Cadastro
              </a>
              <ul className="dropdown-menu" aria-labelledby="cadastroDropdown">
                <li><Link className="dropdown-item" to="/cadastro-produto">Produto</Link></li>
                <li><Link className="dropdown-item" to="/cadastro-servico">Serviço</Link></li>
                <li><Link className="dropdown-item" to="/cadastro-clientes">Clientes</Link></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="listagemDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Listagem
              </a>
              <ul className="dropdown-menu" aria-labelledby="listagemDropdown">
                <li><Link className="dropdown-item" to="/listagem-produto">Produtos</Link></li>
                <li><Link className="dropdown-item" to="/listagem-servico">Serviços</Link></li>
              </ul>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default BarraNavegacao;
