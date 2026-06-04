/*
 * ============================================================
 * allergyIntolerance.mapper.ts — Conversor de Alergia para FHIR AllergyIntolerance
 * ============================================================
 *
 * Converte uma Alergia interna para o recurso FHIR AllergyIntolerance (R4).
 *
 * Mapeamento:
 *   - id da alergia → id FHIR
 *   - clinicalStatus: sempre "active" (alergias registadas estão ativas)
 *   - verificationStatus: sempre "confirmed" (alergias confirmadas pelo médico)
 *   - criticality: LEVE → "low"; MODERADA/GRAVE → "high"
 *   - code.text: descrição da alergia
 *   - patient.reference: referência ao utente (Patient/{id})
 *   - note: frequência das crises
 */
import { Alergia } from '../../models/alergia.entity.js';
import { IntensidadeCriseAlergia } from '../../enums/IntensidadeCriseAlergia.enum.js';
import type { FhirAllergyIntoleranceDto, AllergyIntoleranceCriticality } from '../../dtos/fhir/allergyIntolerance/allergyIntolerance-fhir.dto.js';

// Converte a intensidade da crise para a escala de criticidade do FHIR
// LEVE → "low" (baixa criticidade); qualquer outra → "high" (alta criticidade)
function mapCriticality(intensidade: IntensidadeCriseAlergia): AllergyIntoleranceCriticality {
    return intensidade === IntensidadeCriseAlergia.LEVE ? 'low' : 'high';
}

// Converte uma Alergia para o recurso FHIR AllergyIntolerance
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
