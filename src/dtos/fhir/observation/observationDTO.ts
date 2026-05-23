import type { FhirCodeableConcept, FhirReference } from '../shared/fhir-types.dto.js';

export type ObservationStatus =
  | 'registered'
  | 'preliminary'
  | 'final'
  | 'amended'
  | 'corrected'
  | 'cancelled'
  | 'entered-in-error'
  | 'unknown';

export interface FhirObservationDto {
  resourceType: 'Observation';
  id: string;
  status: ObservationStatus;
  code: FhirCodeableConcept;
  subject: FhirReference;
  effectiveDateTime?: string;
  valueString?: string;
  valueCodeableConcept?: FhirCodeableConcept;
}
