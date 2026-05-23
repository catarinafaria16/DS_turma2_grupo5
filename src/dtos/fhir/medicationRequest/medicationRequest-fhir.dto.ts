import type { FhirCodeableConcept, FhirReference, FhirPeriod } from '../shared/fhir-types.dto.js';

export type MedicationRequestStatus =
  | 'active'
  | 'on-hold'
  | 'cancelled'
  | 'completed'
  | 'entered-in-error'
  | 'stopped'
  | 'draft'
  | 'unknown';

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
