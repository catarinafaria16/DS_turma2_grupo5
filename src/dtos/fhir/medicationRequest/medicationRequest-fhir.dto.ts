/*
 * FhirMedicationRequestDto — Formato FHIR do recurso MedicationRequest (pedido de medicamento)
 *
 * Representa uma prescrição de medicamento no padrão HL7 FHIR R4.
 * Gerado pelo medicationRequest.mapper.ts a partir de uma Prescricao + Medicacao.
 *
 * Mapeamento de estados:
 *   ATIVA → "active"
 *   DISPENSADA → "completed"
 *   CANCELADA → "cancelled"
 *
 * O intent é sempre "order" (pedido/prescrição médica).
 * A dosageInstruction combina dose, periodicidade e duração num texto.
 */
import type { FhirCodeableConcept, FhirReference, FhirPeriod } from '../shared/fhir-types.dto.js';

// Estado do pedido de medicamento no padrão FHIR
export type MedicationRequestStatus =
  | 'active'           // Prescrição ativa (ATIVA)
  | 'on-hold'          // Em pausa
  | 'cancelled'        // Cancelada (CANCELADA)
  | 'completed'        // Dispensada/concluída (DISPENSADA)
  | 'entered-in-error' // Erro de entrada
  | 'stopped'          // Parada
  | 'draft'            // Rascunho
  | 'unknown';         // Estado desconhecido

export interface FhirDosageInstruction {
  text: string;
}

export interface FhirMedicationRequestDto {
  resourceType: 'MedicationRequest';
  id: string;
  status: MedicationRequestStatus;
  intent: 'order';
  medicationCodeableConcept: FhirCodeableConcept;
  subject: FhirReference;
  requester?: FhirReference;
  authoredOn?: string;
  dosageInstruction?: FhirDosageInstruction[];
  dispenseRequest?: {
    validityPeriod?: FhirPeriod;
  };
}
