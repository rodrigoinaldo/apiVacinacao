import { DataTypes } from 'sequelize';
import database from '../database';

const agentesaude = database.define('agentesaude' ,{
    agente:{
        type: DataTypes.STRING,
        allowNull: false // não pode ser nulo 
    }, 
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    },
})


export default agentesaude