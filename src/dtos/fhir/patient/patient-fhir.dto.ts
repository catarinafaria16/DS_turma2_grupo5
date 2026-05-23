import type { FhirIdentifier, FhirContactPoint, FhirAddress, FhirHumanName } from '../shared/fhir-types.dto.js';

export interface FhirPatientDto {
  resourceType: 'Patient';
  id: string;
  identifier: FhirIdentifier[];
  name?: FhirHumanName[];
  birthDate: string;
  telecom?: FhirContactPoint[];
  address?: FhirAddress[];
}
