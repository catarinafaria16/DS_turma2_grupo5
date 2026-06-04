/*
 * ============================================================
 * fhir-types.dto.ts — Tipos partilhados do padrão HL7 FHIR R4
 * ============================================================
 *
 * Este ficheiro define as interfaces TypeScript para os tipos
 * de dados partilhados pelo padrão HL7 FHIR R4.
 *
 * O FHIR define tipos standard para representar dados clínicos.
 * Estes tipos são usados em todos os recursos FHIR (Patient, AllergyIntolerance, etc.)
 *
 * Tipos principais:
 *   - FhirCoding: um código de uma terminologia médica (ex: código SNOMED)
 *   - FhirCodeableConcept: um conceito médico com código(s) e texto
 *   - FhirIdentifier: um identificador (ex: número de utente SNS)
 *   - FhirReference: referência a outro recurso FHIR (ex: "Patient/123")
 *   - FhirBundle: conjunto de recursos FHIR numa só resposta
 */

// Código de uma terminologia médica standard (SNOMED, LOINC, etc.)
export interface FhirCoding {
  system?: string;   // URL da terminologia (ex: "http://snomed.info/sct")
  code?: string;     // Código específico na terminologia
  display?: string;  // Texto legível do código
}

export interface FhirCodeableConcept {
  coding?: FhirCoding[];
  text?: string;
}

export interface FhirIdentifier {
  system?: string;
  value: string;
}

export interface FhirContactPoint {
  system: 'phone' | 'email' | 'fax' | 'pager' | 'url' | 'sms' | 'other';
  value: string;
  use?: 'home' | 'work' | 'temp' | 'old' | 'mobile';
}

export interface FhirAddress {
  text?: string;
  line?: string[];
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface FhirReference {
  reference: string;
  display?: string;
}

export interface FhirHumanName {
  text?: string;
  family?: string;
  given?: string[];
}

export interface FhirAnnotation {
  text: string;
}

export interface FhirPeriod {
  start?: string;
  end?: string;
}

export interface FhirQuantity {
  value?: number;
  unit?: string;
  system?: string;
  code?: string;
}

export interface FhirBundleEntry<T> {
  resource: T;
}

export interface FhirBundle<T> {
  resourceType: 'Bundle';
  type: 'searchset' | 'collection' | 'transaction' | 'history';
  total: number;
  entry: FhirBundleEntry<T>[];
}
