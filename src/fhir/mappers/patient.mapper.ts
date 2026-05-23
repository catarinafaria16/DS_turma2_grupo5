import { Utente } from '../../models/utente.entity.js';
import type { FhirPatientDto } from '../../dtos/fhir/patient/patient-fhir.dto.js';

function toFhirDate(date: Date | string): string {
    return new Date(date).toISOString().split('T')[0] ?? '';
}

export function mapToPatient(utente: Utente, nome: string): FhirPatientDto {
    return {
        resourceType: 'Patient',
        id: String(utente.id),
        identifier: [
            { system: 'https://www.sns.gov.pt/nr-utente', value: String(utente.nr_utente) },
            { system: 'https://www.sns.gov.pt/nr-faturacao', value: String(utente.nr_faturacao) },
        ],
        name: [{ text: nome }],
        birthDate: toFhirDate(utente.data_nascimento),
        telecom: [{ system: 'phone', value: utente.contacto }],
        address: [{ text: utente.morada }],
    };
}
