import { DataSource } from 'typeorm';
import { Administrador } from '../models/administrador.entity';
import { Alergia } from '../models/alergia.entity';
import { Alerta } from '../models/alerta.entity';
import { Anamnese } from '../models/anamnese.entity';
import { Auditoria } from '../models/auditoria.entity';
import { AvaliacaoCarat } from '../models/avaliacaoCarat.entity';
import { Comorbidade } from '../models/comorbidade.entity';
import { Exame } from '../models/exame.entity';
import { Medicacao } from '../models/medicacao.entity';
import { MedicacaoHabitual } from '../models/medicacaoHabitual.entity';
import { Medico } from '../models/medico.entity';
import { PlanoAcompanhamento } from '../models/planoAcompanhamento.entity';
import { Prescricao } from '../models/prescricao.entity';
import { RegraAlerta } from '../models/regraAlerta.entity';
import { RespostaCarat } from '../models/respostaCarat.entity';
import { Sintoma } from '../models/sintoma.entity';
import { Utente } from '../models/utente.entity';
import { Utilizador } from '../models/utilizador.entity';

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