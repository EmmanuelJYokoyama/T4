import React from "react";
import "../styles/index.scss";


const CadastroProduto = () => {
    return (
        <div className="container mt-5">
            <h2>Cadastro de Produto</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Nome do Produto</label>
                    <input type="text" className="form-control" placeholder="Digite o nome" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Valor</label>
                    <input type="number" className="form-control" placeholder="Digite o valor" />
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
        </div>
    );
};
export default CadastroProduto;