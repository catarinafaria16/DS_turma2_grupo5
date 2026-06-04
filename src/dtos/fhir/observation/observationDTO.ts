/*
 * FhirObservationDto — Formato FHIR do recurso Observation (observação clínica)
 *
 * Representa uma observação clínica no padrão HL7 FHIR R4.
 * No contexto do sistema CARAT, é usado para representar sintomas.
 *
 * O valor da observação pode ser:
 *   - valueQuantity: valor numérico com unidade (ex: "98.6 °F")
 *   - valueString: texto livre
 *   - valueCodeableConcept: conceito codificado (ex: intensidade + duração do sintoma)
 *
 * O status "final" indica que a observação está confirmada e não vai mudar.
 */
import type { FhirCodeableConcept, FhirQuantity, FhirReference } from '../shared/fhir-types.dto.js';

// Estado da observação no padrão FHIR
export type ObservationStatus =
  | 'registered'       // Registada mas ainda não verificada
  | 'preliminary'      // Preliminar — pode mudar
  | 'final'            // Final — confirmada (usado para sintomas registados)
  | 'amended'          // Corrigida
  | 'corrected'        // Corrigida (com erro anterior identificado)
  | 'cancelled'        // Cancelada
  | 'entered-in-error' // Entrada por erro
  | 'unknown';         // Estado desconhecido

export interface FhirObservationDto {
  resourceType: 'Observation';
  id: string;
  status: ObservationStatus;
  code: FhirCodeableConcept;
  subject: FhirReference;
  effectiveDateTime?: string;
  valueQuantity?: FhirQuantity;
  valueString?: string;
  valueCodeableConcept?: FhirCodeableConcept;
}
