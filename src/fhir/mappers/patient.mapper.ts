/*
 * ============================================================
 * patient.mapper.ts — Conversor de Utente para FHIR Patient
 * ============================================================
 *
 * Este mapper converte um Utente do sistema interno para o formato
 * FHIR Patient (R4), seguindo o standard HL7.
 *
 * Mapeamento:
 *   - id interno do utente → id FHIR
 *   - nr_utente SNS → identifier (sistema SNS)
 *   - nr_faturacao → identifier (sistema de faturação)
 *   - nome → name[].text
 *   - data_nascimento → birthDate (formato AAAA-MM-DD)
 *   - contacto telefónico → telecom[].phone
 *   - morada → address[].text
 */
import { Utente } from '../../models/utente.entity.js';
import type { FhirPatientDto } from '../../dtos/fhir/patient/patient-fhir.dto.js';

// Converte uma data para o formato FHIR (AAAA-MM-DD, apenas a parte da data, sem hora)
function toFhirDate(date: Date | string): string {
    return new Date(date).toISOString().split('T')[0] ?? '';
}

/*
 * mapToPatient — Converte um Utente para um recurso FHIR Patient
 *
 * Parâmetros:
 *   - utente: o utente a converter
 *   - nome: o nome do utilizador associado (vem da tabela Utilizador)
 */
export function mapToPatient(utente: Utente, nome: string): FhirPatientDto {
    return {
        resourceType: 'Patient',       // Tipo do recurso FHIR
        id: String(utente.id),          // ID interno do utente convertido para string
        identifier: [
            // Número de utente do SNS — identificador oficial português
            { system: 'https://www.sns.gov.pt/nr-utente', value: String(utente.nr_utente) },
            // Número de faturação para efeitos administrativos
            { system: 'https://www.sns.gov.pt/nr-faturacao', value: String(utente.nr_faturacao) },
        ],
        name: [{ text: nome }],         // Nome completo do utente
        birthDate: toFhirDate(utente.data_nascimento), // Data de nascimento no formato FHIR
        telecom: [{ system: 'phone', value: utente.contacto }], // Contacto telefónico
        address: [{ text: utente.morada }], // Morada em texto livre
    };
}
