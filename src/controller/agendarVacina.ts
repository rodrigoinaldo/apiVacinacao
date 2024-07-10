import database from "../database/database";
import agendarVacina from "../database/model/createAgendarVacina";
import { Request, Response } from 'express';

database.authenticate()
.then(() => {
    console.log("conexão feita com sucesso agendamentos")
}).catch((msgErr) => {
    console.log(msgErr)
})

export class agendamentos{
    async agendarVacinaPaciente(req:Request, res:Response): Promise<void>{

        if(!req.userId){
            res.status(401).send("voce n]ao esta logado")
        }

        const { id_vacina, id_agente, data} = req.body

        try{
            await agendarVacina.create({
                id_idoso: req.userId,
                id_vacina,
                id_agente,
                data
            })
            res.status(201).json("vacina agendada com sucesso ")

        }catch(error){
            console.error("auve um problema a agendar a vacina: " + error);
            
        }
    }
}
