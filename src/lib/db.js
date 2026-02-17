import { Sequelize } from 'sequelize';

// Conecta ao banco usando a variável de ambiente
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: require('pg'), // Necessário para Next.js
  logging: false,
});

export default sequelize;