import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/user';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // 1. Buscar usuário
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    // 2. Comparar senhas
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 });
    }

    // Login simples (sem JWT para facilitar o tutorial)
    return NextResponse.json({ message: 'Login realizado com sucesso!', userId: user.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}