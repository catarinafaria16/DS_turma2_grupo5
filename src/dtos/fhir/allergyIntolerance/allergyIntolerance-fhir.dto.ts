import type { FhirCodeableConcept, FhirReference, FhirAnnotation } from '../shared/fhir-types.dto.js';

export type AllergyIntoleranceCriticality = 'low' | 'high' | 'unable-to-assess';

export interface FhirAllergyIntoleranceDto {
  resourceType: 'AllergyIntolerance';
  id: string;
  clinicalStatus: FhirCodeableConcept;
  verificationStatus: FhirCodeableConcept;
  criticality: AllergyIntoleranceCriticality;
  code: FhirCodeableConcept;
  patient: FhirReference;
  note?: FhirAnnotation[];
}
