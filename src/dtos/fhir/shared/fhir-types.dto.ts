export interface FhirCoding {
  system?: string;
  code?: string;
  display?: string;
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
