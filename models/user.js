import { DataTypes } from 'sequelize';
import sequelize from '../lib/db';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Sincroniza o modelo com o banco (cria a tabela se não existir)
// Em produção real, usamos Migrations, mas para estudo isso funciona.
User.sync();

export default User;