import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/user.js'

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // 1. Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Criar usuário no banco
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'Usuário criado!', user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}