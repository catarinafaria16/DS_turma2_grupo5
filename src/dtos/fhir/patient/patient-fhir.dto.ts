/*
 * FhirPatientDto — Formato FHIR do recurso Patient (doente)
 *
 * Este DTO define a estrutura de um recurso FHIR Patient R4.
 * É gerado pelo patient.mapper.ts a partir de um Utente interno.
 *
 * Campos principais:
 *   - resourceType: sempre "Patient" (obrigatório em todos os recursos FHIR)
 *   - id: identificador do recurso (ID interno do utente)
 *   - identifier: lista de identificadores (nr_utente SNS, nr_faturacao)
 *   - name: nome do utente
 *   - birthDate: data de nascimento (formato AAAA-MM-DD)
 *   - telecom: contacto telefónico
 *   - address: morada
 */
import type { FhirIdentifier, FhirContactPoint, FhirAddress, FhirHumanName } from '../shared/fhir-types.dto.js';

export interface FhirPatientDto {
  resourceType: 'Patient';          // Tipo do recurso FHIR (fixo)
  id: string;                       // ID do utente convertido para string
  identifier: FhirIdentifier[];     // Identificadores (nr SNS, nr faturação)
  name?: FhirHumanName[];           // Nome completo do utente
  birthDate: string;                // Data de nascimento (ex: "1980-05-15")
  telecom?: FhirContactPoint[];     // Contacto telefónico
  address?: FhirAddress[];          // Morada
}
