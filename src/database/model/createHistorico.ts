import { DataTypes, Model } from 'sequelize';
import database from '../database'; 
import Idoso from './createUser';
import AgendarVacina from './createAgendarVacina';
import vacina from './createVacina';

const historico = database.define('historico', {
  id_idoso: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Idoso, 
      key: 'id',
    },
  },
  id_agendamentos: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: AgendarVacina, 
      key: 'id',
    },
  },
  id_vacina:{
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: vacina, 
      key: 'id',
    },
  }
});

historico.belongsTo(Idoso, { foreignKey: 'id_idoso', as: 'idoso' });
historico.belongsTo(AgendarVacina, { foreignKey: 'id_agendamentos', as: 'agendarvacina' });
historico.belongsTo(vacina, { foreignKey: 'id_vacina', as: 'vacina' });


export default historico;
