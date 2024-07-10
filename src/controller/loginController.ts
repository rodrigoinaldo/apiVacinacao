import idoso from "../database/model/createUser";
import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../config/auth";

export class Login {
    async loginIdoso(req: Request, res: Response): Promise<void> {
        const { cartaoSus, senha } = req.body;

        try {
            const user: any  = await idoso.findOne({ where: { cartaoSus }});

            if (!user) {
                res.status(400).json({ error: "Cartão SUS ou senha inválidos" });
                return;
            }

            // esta pegarndo a senha pctografada e comparando com a senha que o usuario colocou  
            const verificarSenha = await bcrypt.compare(senha, user.senha);

            if (!verificarSenha) {
                res.status(400).json({ error: "Cartão SUS ou senha inválidos" });
                return;
            }

            // //criando o token de acesso 
            const token = jwt.sign({ id: user.id }, auth.jwt.secret, { expiresIn: auth.jwt.expiresIn })

            console.log(token)

            // Removendo a senha do objeto user antes de retornar
            const { senha: _, ...passwordN} = user.toJSON();

            res.status(200).json({
                user: passwordN,
                token });

            //res.status(201).json(user)
        } catch (error) {
            console.error("erro ao fazer o login: " + error);

        }
    }
}