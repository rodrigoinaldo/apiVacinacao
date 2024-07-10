import { Router } from "express";

import {CreateAcount} from './controller/createIdosot'
import {createObject} from "./controller/createVacina";
import {createAgente} from "./controller/createAgente";
import { Login } from "./controller/loginController";
import { agendamentos } from "./controller/agendarVacina";
import { HistoricoUser } from "./controller/historicoUser";

import { authMiddleware } from "./middlewares/authMiddleware";


const routes = Router()

routes.post('/idoso', new CreateAcount().idoso)
routes.post('/inserirVacina',new createObject().vacina)
routes.post('/criarAgente', new createAgente().agentesaude)
routes.post('/loginIdoso', new Login().loginIdoso)

routes.get('/pegarVacinas',authMiddleware, new createObject().AllVaccine)
routes.post('/agendarVacina', authMiddleware, new agendamentos().agendarVacinaPaciente)
routes.get('/historico', authMiddleware, new HistoricoUser().historicoPaciente)

export default routes