import { DataTypes } from 'sequelize';
import database from '../database';

const vacina = database.define('vacina', {
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dataInicio:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dataTermino:{
        type: DataTypes.STRING,
        allowNull: false
    },
    publicoAlvo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dose:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Andamento: {
        type: DataTypes.ENUM('ativo', 'inativo'),
        allowNull: false
    }
})


export default vacina