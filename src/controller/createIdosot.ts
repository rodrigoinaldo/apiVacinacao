import database from "../database/database";
import { Op } from 'sequelize';
import { Request, Response } from 'express';
import bcrypt from "bcrypt"

import Idoso from "../database/model/createUser";


database.authenticate()
.then(() => {
    console.log("conexão feita com sucesso idoso")
}).catch((msgErr) => {
    console.log(msgErr)
})

export class CreateAcount{
    async idoso(req: Request, res:Response): Promise<void>{

        const { nomeCompleto, cpf, cartaoSus, Cep, logradouro, dataNacimento, nomeResponsavel, cpfResponsavel, emailResponsavel, celular1, celular2, celular3, senha } = req.body
        
        try{
            const usuarioExistente = await Idoso.findOne({
                where: {cartaoSus ,  cpf }
              })

              if(usuarioExistente){
                res.status(400).json({error: "ja existe um usuario no sistema"})
                return
              }

              const hastPassword = await bcrypt.hash(senha, 8)

              const novoUsuario = await Idoso.create({
                nomeCompleto,
                cpf,
                cartaoSus,
                Cep,
                logradouro,
                dataNacimento,
                nomeResponsavel,
                cpfResponsavel,
                emailResponsavel,
                celular1,
                celular2,
                celular3,
                senha: hastPassword
              });

              res.status(201).json({message:"paciente criado " + novoUsuario})
        }catch(error){
            console.error("Erro ao criar usuário:", error);
            res.status(500).json({ error: "Erro interno ao processar a requisição." });
        }
    }

}

