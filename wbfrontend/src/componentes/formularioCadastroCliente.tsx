import React from "react";
import '../styles/index.scss';
import "bootstrap/dist/css/bootstrap.min.css";

const FormularioCadastroCliente = () => {
    return (
        <div className="container mt-5">
            <h2>Cadastro de Cliente</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-control" placeholder="Digite o nome"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Sobrenome</label>
                    <input type="text" className="form-control" placeholder="Digite o sobrenome"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Telefone</label>
                    <input type="text" className="form-control" placeholder="Digite o telefone"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Digite o email"/>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    );
}
export default FormularioCadastroCliente;