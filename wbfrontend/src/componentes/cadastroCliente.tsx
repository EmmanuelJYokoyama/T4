import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Logger } from 'sass';

const API_BASE_URL = "http://localhost:32832";

const FormClientes = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [clienteData, setClienteData] = useState<any>({
    nome: '',
    sobrenome: '',
    email: '',
    idade: 0,
    cpf: '',
    endereco: {
      estado: '',
      cidade: '',
      bairro: '',
      rua: '',
      numero: '',
      codigoPostal: '',
      informacoesAdicionais: ''
    },
    telefones: [{ ddd: '', numero: '' }]
  });

  useEffect(() => {
    if (id) {
      const fetchClient = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/cliente/${id}`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json"
            }
          });


          const data = await response.json();
          console.log(data);

          const clienteNormalizado = {
            ...data,
            sobrenome: data.sobreNome ?? '',
            email: data.email ?? '',
            idade: data.idade ?? 0,
            cpf: data.cpf ?? '',
            endereco: data.endereco ?? {
              estado: '',
              cidade: '',
              bairro: '',
              rua: '',
              numero: '',
              codigoPostal: '',
              informacoesAdicionais: ''
            },
            telefones: (data.telefones && data.telefones.length > 0) 
              ? data.telefones.map((t: any) => ({ ddd: t.ddd, numero: t.numero })) 
              : [{ ddd: '', numero: '' }]
          };

          setClienteData(clienteNormalizado);
        } catch (error) {
          console.error(error);
        }
      };
      fetchClient();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClienteData({ ...clienteData, [name]: value });
  };

  const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClienteData({ ...clienteData, endereco: { ...clienteData.endereco, [name]: value } });
  };

  const handleTelefoneChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const telefonesAtualizados = [...clienteData.telefones];
    telefonesAtualizados[index] = { ...telefonesAtualizados[index], [name]: value };
    setClienteData({ ...clienteData, telefones: telefonesAtualizados });
  };

  const handleAddTelefone = () => {
    setClienteData({ ...clienteData, telefones: [...clienteData.telefones, { ddd: '', numero: '' }] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = id ? "PUT" : "POST";
      const endpoint = id ? "cliente/atualizar" : "cliente/cadastrar";

      // Faz o mapeamento inverso para o backend (sobrenome -> sobreNome)
      const payload = {
        ...clienteData,
        sobreNome: clienteData.sobrenome,
      };
      delete payload.sobrenome;

      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erro ao enviar dados");

      alert(id ? 'Cliente atualizado com sucesso!' : 'Cliente cadastrado com sucesso!');
      navigate('/clientes');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>{id ? 'Atualizar Cliente' : 'Cadastro de Cliente'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Dados Pessoais */}
        <label>Nome:</label>
        <input type="text" name="nome" value={clienteData.nome} onChange={handleChange} required />

        <label>Sobrenome:</label>
        <input type="text" name="sobrenome" value={clienteData.sobreNome} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={clienteData.email} onChange={handleChange} />

        <label>Idade:</label>
        <input type="number" name="idade" value={clienteData.idade} onChange={handleChange} required />

        <label>CPF:</label>
        <input type="text" name="cpf" value={clienteData.cpf} onChange={handleChange} required maxLength={11} />

        {/* Endereço */}
        <h3>Endereço</h3>
        <label>Rua:</label>
        <input type="text" name="rua" value={clienteData.endereco.rua} onChange={handleEnderecoChange} required />

        <label>Bairro:</label>
        <input type="text" name="bairro" value={clienteData.endereco.bairro} onChange={handleEnderecoChange} required />

        <label>Cidade:</label>
        <input type="text" name="cidade" value={clienteData.endereco.cidade} onChange={handleEnderecoChange} required />

        <label>Estado:</label>
        <input type="text" name="estado" value={clienteData.endereco.estado} onChange={handleEnderecoChange} required />

        <label>Número:</label> 
        <input type="text" name="numero" value={clienteData.endereco.numero} onChange={handleEnderecoChange} required />

        <label>Código Postal:</label>
        <input type="text" name="codigoPostal" value={clienteData.endereco.codigoPostal} onChange={handleEnderecoChange} required />

        <label>Complemento:</label>
        <input type="text" name="informacoesAdicionais" value={clienteData.endereco.informacoesAdicionais} onChange={handleEnderecoChange} />

        {/* Telefones */}
        <h3>Telefones</h3>
        {clienteData.telefones.map((telefone: any, index: number) => (
          <div key={index}>
            <label>DDD:</label>
            <input type="text" name="ddd" value={telefone.ddd} onChange={(e) => handleTelefoneChange(index, e)} required maxLength={2} />

            <label>Número:</label>
            <input type="text" name="numero" value={telefone.numero} onChange={(e) => handleTelefoneChange(index, e)} required maxLength={9} />
          </div>
        ))}
        <button type="button" onClick={handleAddTelefone}>Adicionar Telefone</button>

        <button type="submit">{id ? 'Salvar Alterações' : 'Cadastrar'}</button>
      </form>
    </div>
  );
};

export default FormClientes;
