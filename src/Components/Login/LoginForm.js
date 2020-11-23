import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { TOKEN_POST, USER_GET } from '../../api'

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const getUser = async (token) => {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json(json);
    console.log(json)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.validade() && password.validade()) {
      const { url, options } = TOKEN_POST({ username: username.value, password: password.value })

      const response = await fetch(url, options);
      const json = await response.json();
      window.localStorage.setItem('token', json.token)
      getUser(json.token);
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuario" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Entrar</Button>
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  )
}

export default LoginForm
