import { Alergia } from '../../models/alergia.entity.js';
import { IntensidadeCriseAlergia } from '../../enums/IntensidadeCriseAlergia.enum.js';
import type { FhirAllergyIntoleranceDto, AllergyIntoleranceCriticality } from '../../dtos/fhir/allergyIntolerance/allergyIntolerance-fhir.dto.js';

function mapCriticality(intensidade: IntensidadeCriseAlergia): AllergyIntoleranceCriticality {
    return intensidade === IntensidadeCriseAlergia.LEVE ? 'low' : 'high';
}

export function mapToAllergyIntolerance(alergia: Alergia, utenteId: number): FhirAllergyIntoleranceDto {
    return {
        resourceType: 'AllergyIntolerance',
        id: String(alergia.id),
        clinicalStatus: {
            coding: [{
                system: 'http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical',
                code: 'active',
                display: 'Active',
            }],
        },
        verificationStatus: {
            coding: [{
                system: 'http://terminology.hl7.org/CodeSystem/allergyintolerance-verification',
                code: 'confirmed',
                display: 'Confirmed',
            }],
        },
        criticality: mapCriticality(alergia.intensidade_crise),
        code: { text: alergia.descricao },
        patient: { reference: `Patient/${utenteId}` },
        note: [{ text: `Frequência de crise: ${alergia.frequencia_crise}` }],
    };
}
