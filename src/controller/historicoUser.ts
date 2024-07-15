import database from "../database/database";
import { Request, Response, NextFunction } from 'express';
import AgendarVacina from "../database/model/createAgendarVacina";
import Vacina from "../database/model/createVacina";
import Idoso from "../database/model/createUser";
import Agentesaude from "../database/model/createAgente"; // Importar modelo
import agentesaude from "../database/model/createAgente";

database.authenticate()
    .then(() => {
        console.log("connection make successful");
    })
    .catch((msgErr) => {
        console.log(msgErr);
    });

export class HistoricoUser {
    async historicoPaciente(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = req.params.id;

        try {
            const historicoExistente = await AgendarVacina.findAll({
                where: { id: id }, // Condição para encontrar o registro específico
                include:[ 
                    {
                    model: Agentesaude, // Modelo a ser incluído
                    attributes: ['agente'] // Atributos específicos a serem incluídos, se necessário
                },
                {
                    model: Idoso, 
                    attributes: ['nomeCompleto'] 
                },
                {
                    model:Vacina,
                    attributes:['nome']
                }
            ]
            });

            if (!historicoExistente) {
                res.status(404).send("Histórico não encontrado");
                return;
            }

            res.status(200).json(historicoExistente);
        } catch (error) {
            console.error("Houve um problema ao buscar o histórico: " + error);
            res.status(500).send("Erro ao buscar o histórico");
        }
    }
}
