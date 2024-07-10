import database from "../database/database";
import agentesaude from "../database/model/createAgente";
import { Op } from 'sequelize';
import { Request, Response } from 'express';
import bcrypt from "bcrypt"


database.authenticate()
.then(() => {
    console.log("conexão feita com sucesso agente")
}).catch((msgErr) => {
    console.log(msgErr)
})

export class createAgente{
    async agentesaude(req:Request, res:Response): Promise<void>{
        const {agente, email, senha} = req.body

        try{
            const agenteExiste = await agentesaude.findOne({
                where: {
                  [Op.or]: [{ agente }]
                }
              })

            if(agenteExiste){
                res.status(400).json({error: "vacina ja tem no sistema"})
                return
            }

            //Pictografando  
            const hastPassword = await bcrypt.hash(senha, 10)

            await agentesaude.create({
                agente,
                email,
                senha: hastPassword
            })

            res.status(201).json("vacina Crada com sucesso ")

        }catch(error){
            console.error("erro ao criar uma agente: " + error);
            
        }
    }
}
