/*
 * CreateAnamneseDto — Dados necessários para criar a anamnese (história clínica) de um utente
 *
 * A anamnese é o registo de fundo da história clínica do utente.
 * Deve ser criada uma vez para cada utente (no início do acompanhamento).
 * Depois pode ser atualizada se o estado clínico do utente mudar.
 */
import { Tabagismo } from '../../enums/Tabagismo.enum.js';
import { SexoAnamnese } from '../../enums/SexoAnamnese.enum.js';

export interface CreateAnamneseDto {
    utente_id: number;          // ID do utente a quem pertence esta anamnese
    historico_familiar: string; // Doenças relevantes na família (texto livre, ex: "Pai asmático")
    tabagismo: Tabagismo;       // Situação tabágica (ver enum Tabagismo)
    sexo: SexoAnamnese;         // Sexo biológico (MASCULINO ou FEMININO)
}