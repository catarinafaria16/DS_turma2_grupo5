/*
 * FhirAllergyIntoleranceDto — Formato FHIR do recurso AllergyIntolerance (alergia)
 *
 * Representa uma alergia ou intolerância no padrão HL7 FHIR R4.
 * Gerado pelo allergyIntolerance.mapper.ts a partir de uma Alergia interna.
 *
 * Campos:
 *   - clinicalStatus: estado clínico da alergia ("active" = ativa)
 *   - verificationStatus: nível de confirmação ("confirmed" = confirmada)
 *   - criticality: gravidade ("low" = LEVE; "high" = MODERADA/GRAVE)
 *   - code: descrição da alergia
 *   - patient: referência ao utente (ex: "Patient/5")
 *   - note: notas adicionais (inclui a frequência das crises)
 */
import type { FhirCodeableConcept, FhirReference, FhirAnnotation } from '../shared/fhir-types.dto.js';

// Nível de criticidade/gravidade da alergia no padrão FHIR
export type AllergyIntoleranceCriticality = 'low' | 'high' | 'unable-to-assess';

export interface FhirAllergyIntoleranceDto {
  resourceType: 'AllergyIntolerance';         // Tipo FHIR (fixo)
  id: string;                                  // ID da alergia
  clinicalStatus: FhirCodeableConcept;         // "active" — alergia ativa
  verificationStatus: FhirCodeableConcept;    // "confirmed" — alergia confirmada
  criticality: AllergyIntoleranceCriticality; // "low" = LEVE; "high" = MODERADA/GRAVE
  code: FhirCodeableConcept;                  // Descrição da alergia (texto livre)
  patient: FhirReference;                     // Referência ao utente (ex: "Patient/5")
  note?: FhirAnnotation[];                    // Notas adicionais (frequência de crises)
}
