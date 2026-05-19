import { DataSource } from 'typeorm';
import { Administrador } from '../models/administrador.entity.js';
import { Alergia } from '../models/alergia.entity.js';
import { Alerta } from '../models/alerta.entity.js';
import { Anamnese } from '../models/anamnese.entity.js';
import { Auditoria } from '../models/auditoria.entity.js';
import { AvaliacaoCarat } from '../models/avaliacaoCarat.entity.js';
import { Comorbidade } from '../models/comorbidade.entity.js';
import { Exame } from '../models/exame.entity.js';
import { Medicacao } from '../models/medicacao.entity.js';
import { MedicacaoHabitual } from '../models/medicacaoHabitual.entity.js';
import { Medico } from '../models/medico.entity.js';
import { PlanoAcompanhamento } from '../models/planoAcompanhamento.entity.js';
import { Prescricao } from '../models/prescricao.entity.js';
import { RegraAlerta } from '../models/regraAlerta.entity.js';
import { RespostaCarat } from '../models/respostaCarat.entity.js';
import { Sintoma } from '../models/sintoma.entity.js';
import { Utente } from '../models/utente.entity.js';
import { Utilizador } from '../models/utilizador.entity.js';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    logging: false,
    entities: [
        Administrador,
        Alergia,
        Alerta,
        Anamnese,
        Auditoria,
        AvaliacaoCarat,
        Comorbidade,
        Exame,
        Medicacao,
        MedicacaoHabitual,
        Medico,
        PlanoAcompanhamento,
        Prescricao,
        RegraAlerta,
        RespostaCarat,
        Sintoma,
        Utente,
        Utilizador
    ],
    subscribers: [],
    migrations: [],
});