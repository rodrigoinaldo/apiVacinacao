import { DataTypes, Model } from 'sequelize';
import database from '../database'; 
import agentesaude from './createAgente';
import vacinas from './createVacina';
import Idoso from './createUser';

const AgendarVacina = database.define('agendarVacina', {
  id_idoso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Idoso, 
      key: 'id',
    },
  },
  id_vacina: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: vacinas, 
      key: 'id',
    },
  },
  id_agente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: agentesaude, 
      key: 'id',
    },
  },
  data: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

AgendarVacina.belongsTo(agentesaude, { foreignKey: 'id_agente', as: 'agentesaudes' });

export default AgendarVacina;
