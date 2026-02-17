import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/user'; // Verifique se o caminho está certo

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // ... validações de email e senha ...

    const hashedPassword = await bcrypt.hash(password, 10);

    // ADICIONE ESTA LINHA AQUI:
    // Ela verifica se a tabela existe. Se não, ela cria.
    await User.sync(); 

    // Agora pode criar o usuário
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'Usuário cadastrado com sucesso!' }, { status: 201 });
  } catch (error) {
    console.error('Erro no cadastro:', error); // Isso ajuda a ver erros no log da Vercel
    return NextResponse.json({ message: 'Erro ao cadastrar usuário' }, { status: 500 });
  }
}