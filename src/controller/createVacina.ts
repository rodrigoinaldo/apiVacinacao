import database from "../database/database";
import vacina from "../database/model/createVacina";
import { Op, where } from 'sequelize';
import { Request, Response } from 'express';

database.authenticate()
.then(() => {
    console.log("conexão feita com sucesso vacina")
}).catch((msgErr) => {
    console.log(msgErr)
})

export class createObject{

    // pegar todas as vacinas 
    async AllVaccine(req:Request, res:Response){
        if(!req.userId){
            res.status(401).send("voce n]ao esta logado")
        }

        try{
            const vacinas = await vacina.findAll({where:{ Andamento: 'ativo'}})
            res.status(201).json(vacinas)
        }catch{
            console.error("erro ao coletar as vacinas ");
        }
        
    }

    // criar as vacinas 
    async vacina(req:Request, res:Response): Promise<void>{
        const {nome, dataInicio, dataTermino, publicoAlvo, dose, Andamento,} = req.body

        try{
            const vacinaExiste = await vacina.findOne({
                where: {
                  [Op.or]: [{ nome }]
                }
              })

            if(vacinaExiste){
                res.status(400).json({error: "vacina ja tem no sistema"})
                return
            }

            await vacina.create({
                nome,
                dataInicio,
                dataTermino,
                publicoAlvo,
                dose,
                Andamento: 'Ativo'
            })

            res.status(201).json("vacina Crada com sucesso ")

        }catch(error){
            console.error("erro ao criar uma vacina: " + error);
            
        }
    }
}

