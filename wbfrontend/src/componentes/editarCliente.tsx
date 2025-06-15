import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obterCliente, atualizarCliente, Cliente } from "../services/clientServices";
import "../styles/index.scss";

const EditarCliente = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [cliente, setCliente] = useState<Cliente>({
        nome: "",
        sobrenome: "",
        cidade: "",
        idade: 0,
        cpf: "",
        endereco: {
            cidade: "",
            estado: "",
            bairro: "",
            rua: "",
            numero: "",
            codigoPostal: "",
            informacoesAdicionais: ""
        },
        telefones: [{ ddd: "", numero: "" }]
    });

    useEffect(() => {
        const carregarCliente = async () => {
            const dados = await obterCliente(Number(id));
            setCliente(dados);
        };
        carregarCliente();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name.startsWith("endereco.")) {
            const field = name.split(".")[1];
            setCliente(prev => ({
                ...prev,
                endereco: { ...prev.endereco, [field]: value }
            }));
        } else if (name.startsWith("telefone.")) {
            const field = name.split(".")[1];
            setCliente(prev => ({
                ...prev,
                telefones: [{ ...prev.telefones[0], [field]: value }]
            }));
        } else {
            setCliente(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await atualizarCliente(cliente);
        alert("Cliente atualizado com sucesso!");
        navigate("/clientes"); // redireciona após atualizar
    };

    return (
        <div className="container mt-5">
            <h2>Editar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input name="nome" value={cliente.nome} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Sobrenome</label>
                    <input name="sobrenome" value={cliente.sobrenome} onChange={handleChange} className="form-control" />
                </div>

                {/* Endereço */}
                <div className="mb-3">
                    <label className="form-label">Rua</label>
                    <input name="endereco.rua" value={cliente.endereco.rua} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Número</label>
                    <input name="endereco.numero" value={cliente.endereco.numero} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Bairro</label>
                    <input name="endereco.bairro" value={cliente.endereco.bairro} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Cidade</label>
                    <input name="endereco.cidade" value={cliente.endereco.cidade} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <input name="endereco.estado" value={cliente.endereco.estado} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">CEP</label>
                    <input name="endereco.codigoPostal" value={cliente.endereco.codigoPostal} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Informações adicionais</label>
                    <input name="endereco.informacoesAdicionais" value={cliente.endereco.informacoesAdicionais} onChange={handleChange} className="form-control" />
                </div>

                {/* Telefone */}
                <div className="mb-3">
                    <label className="form-label">DDD</label>
                    <input name="telefone.ddd" value={cliente.telefones[0]?.ddd} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Número de Telefone</label>
                    <input name="telefone.numero" value={cliente.telefones[0]?.numero} onChange={handleChange} className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary">Salvar Alterações</button>
            </form>
        </div>
    );
}

export default EditarCliente;
