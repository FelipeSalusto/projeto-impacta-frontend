import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");

      // 👀 Veja no console a estrutura que o backend devolve
      console.log("API response:", res.data);

      // Garante que sempre vamos trabalhar com um array
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.data || res.data.users || [];

      setUsers(data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error.message || "Erro ao carregar alunos");
    }
  };

  useEffect(() => {
    getUsers();
    // ⚠️ dependências ajustadas:
    // não precisa passar setUsers, apenas função pura
  }, []);

  return (
    <>
      <Container>
        <Title>Alunos</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
      </Container>

      <ToastContainer position="top-right" autoClose={3000} />

      <GlobalStyle />
    </>
  );
}

export default App;
