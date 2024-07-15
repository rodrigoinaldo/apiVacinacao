import database from "../database/database";
import agendarVacina from "../database/model/createAgendarVacina";
import { Request, Response } from 'express';
import { mailOptions, transporter } from "../utilities/sendEmail";
import Idoso from "../database/model/createUser";


database.authenticate()
.then(() => {
    console.log("conexão feita com sucesso agendamentos")
}).catch((msgErr) => {
    console.log(msgErr)
})

export class agendamentos{
    async agendarVacinaPaciente(req: Request, res: Response): Promise<void> {
        try {
            if (!req.userId) {
                res.status(401).send("Você não está logado");
                return;
            }
    
            const { id_vacina, id_agente, data } = req.body;
    
            await agendarVacina.create({
                id_idoso: req.userId,
                id_vacina,
                id_agente,
                data
            });
    
            const user: any = await Idoso.findOne({ where: { id: req.userId } });
            transporter.sendMail({ ...mailOptions, to: user.emailResponsavel }, (error, info) => {
                if (error) {
                    console.error('Erro ao enviar o email:', error);
                } else {
                    console.log('Email enviado:', info.response);
                }
            });
    
            res.status(201).json("Vacina agendada com sucesso.");
        } catch (error) {
            console.error("Houve um problema ao agendar a vacina:", error);
            res.status(500).json("Erro ao agendar a vacina. Verifique o console para mais detalhes.");
        }
    }
}
