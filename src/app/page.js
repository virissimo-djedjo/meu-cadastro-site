'use client';
import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [isLogin, setIsLogin] = useState(false); // Alternar entre Login e Cadastro
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>{isLogin ? 'Login' : 'Cadastro'}</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={{ padding: '10px' }}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={{ padding: '10px' }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          style={{ padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer', background: 'blue', color: 'white', border: 'none' }}>
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>

      <p>{message}</p>

      <button 
        onClick={() => setIsLogin(!isLogin)} 
        style={{ marginTop: '20px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
        {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça Login'}
      </button>
    </div>
  );
}