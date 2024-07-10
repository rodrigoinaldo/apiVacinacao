import express, { Express } from 'express';
import routes from './routes';
import database from './database/database';

class App {
    public app: Express;

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes()
        this.database()
    }

    private middlewares(): void {
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.use(routes);
    }
    private database():void{
        database.sync().then(() => {
            console.log('Database & tables created!');
        }).catch((error) => {
                console.error('Unable to connect to the database:', error);
        });
        
    }
}

export default new App().app;
