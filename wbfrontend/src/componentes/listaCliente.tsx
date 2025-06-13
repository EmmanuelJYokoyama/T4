import React, { useEffect, useState } from "react";
import '../styles/index.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import { listarClientes, Cliente } from "../services/clientServices";

const ListaCliente = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        async function fetchClientes() {
            const data = await listarClientes();
            setClientes(data);
        }
        fetchClientes();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Lista de Clientes</h2>
            <ul className="list-group">
                {clientes.map((cliente, index) => (
                    <li key={index} className="list-group-item">
                        <h5>{cliente.nome} {cliente.sobrenome}</h5>

                        <p><strong>Endereço:</strong> {cliente.endereco?.rua}, {cliente.endereco?.numero}, {cliente.endereco?.bairro}, {cliente.endereco?.cidade} - {cliente.endereco?.estado} - CEP: {cliente.endereco?.codigoPostal}</p>

                        <p><strong>Informações adicionais:</strong> {cliente.endereco?.informacoesAdicionais}</p>

                        <p><strong>Telefones:</strong> {cliente.telefones.map(tel => `(${tel.ddd}) ${tel.numero}`).join(", ")}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaCliente;
