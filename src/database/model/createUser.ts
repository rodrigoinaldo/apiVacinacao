import { DataTypes } from 'sequelize';
import database from '../database';

const Idoso = database.define('Idoso' ,{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    nomeCompleto:{
        type: DataTypes.STRING,
        allowNull: false // não pode ser nulo 
    }, 
    cpf:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cartaoSus:{
        type: DataTypes.STRING,
        allowNull: true // pode ser vazio 
    },
    Cep:{
        type: DataTypes.STRING,
        allowNull: true // pode ser vazio 
    },
    logradouro:{
        type:DataTypes.STRING,
        allowNull:false
    },
    dataNacimento:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nomeResponsavel:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpfResponsavel:{
        type: DataTypes.STRING,
        allowNull: false
    },
    emailResponsavel:{
        type: DataTypes.STRING,
        allowNull: false
    },
    celular1:{
        type: DataTypes.STRING,
        allowNull: false
    },
    celular2:{
        type: DataTypes.STRING,
        allowNull: true
    },
    celular3:{
        type: DataTypes.STRING,
        allowNull: true
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    },
})


export default Idoso