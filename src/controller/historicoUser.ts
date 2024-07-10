import database from "../database/database";
import Historico from "../database/model/createHistorico";
import { Request, Response, NextFunction } from 'express';
import AgendarVacina from "../database/model/createAgendarVacina";
import Vacina from "../database/model/createVacina";
import Idoso from "../database/model/createUser";
import Agentesaude from "../database/model/createAgente"; // Importar modelo

database.authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso agendamentos");
    })
    .catch((msgErr) => {
        console.log(msgErr);
    });

export class HistoricoUser {
    async historicoPaciente(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (!req.userId) {
            res.status(401).send("Você não está logado");
            return;
        }

        try {
            const historicoExistente = await Historico.findAll({
                where: { id_idoso: req.userId },
                include: [
                    {
                        model: AgendarVacina,
                        as: 'agendarVacina',
                        include: [
                            {
                                model: Agentesaude,
                                as: 'agentesaudes', // Usando o alias definido na associação
                                attributes: ['nome']
                            }
                        ]
                    },
                    {
                        model: Idoso,
                        as: 'idoso',
                        attributes: ['nomeCompleto']
                    },
                    {
                        model: Vacina,
                        as: 'vacina',
                        attributes: ['nome']
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
