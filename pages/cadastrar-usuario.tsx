import { useState } from 'react'
import { executeRequest } from '../services/api';
import Router from 'next/router'

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const createUser = async () => {
    try {
      if (!name || !email || !password) {
        return setError('Favor preencher os campos.');
      }

      setLoading(true);

      const body = {
        name,
        email,
        password
      };

      const result = await executeRequest('user', 'POST', body);
      if (result && result.data) {
        setError('')
        setSuccess('Usuário cadastrado com sucesso. Em breve você será redirecionado para a página de Login.')
        setTimeout(() => {
          Router.push('/')
        }, 5000);
      }
    } catch (e: any) {
      console.log('Ocorreu erro ao cadastrar usuário:', e);
      if (e?.response?.data?.error) {
        setError(e?.response?.data?.error);
      } else {
        setError('Ocorreu erro ao cadastrar usuário, tente novamente.');
      }
    }

    setLoading(false);
  }

  return (
    <div className='container-cadastrar-usuario'>
      <div className="form">
        {error && !success && <p>{error}</p>}
        {!error && success && <p className="message-success">{success}</p>}
        <div>
          <img src='/mail.svg' alt='Nome' />
          <input type="text" placeholder="Nome"
            value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <img src='/mail.svg' alt='E-mail' />
          <input type="text" placeholder="E-mail"
            value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <img src='/lock.svg' alt='Senha' />
          <input type="password" placeholder="Senha"
            value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type='button' onClick={createUser} disabled={loading || !!success}>{loading ? 'Carregando...' : 'Cadastrar usuário'}</button>
      </div>
    </div>
  );
}

export default CreateUser
