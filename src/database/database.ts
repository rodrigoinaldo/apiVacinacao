import { Sequelize } from 'sequelize-typescript';

const database = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'inaldo123',
    database: 'vacina',
    
});

export default database