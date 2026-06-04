/*
 * ============================================================
 * medicationRequest.mapper.ts — Conversor de Prescrição/Medicação para FHIR MedicationRequest
 * ============================================================
 *
 * Converte uma Prescricao + Medicacao para o recurso FHIR MedicationRequest (R4).
 * São necessários ambos porque o FHIR MedicationRequest representa um medicamento específico
 * dentro de uma prescrição.
 *
 * Mapeamento de estados:
 *   ATIVA → "active" (prescrição em vigor)
 *   DISPENSADA → "completed" (medicamento levantado)
 *   CANCELADA → "cancelled"
 *
 * A instrução de dosagem (dosageInstruction) combina dose, periodicidade e duração
 * num único texto descritivo.
 */
import { Prescricao } from '../../models/prescricao.entity.js';
import { Medicacao } from '../../models/medicacao.entity.js';
import { EstadoPrescricao } from '../../enums/EstadoPrescricao.enum.js';
import type { FhirMedicationRequestDto, MedicationRequestStatus } from '../../dtos/fhir/medicationRequest/medicationRequest-fhir.dto.js';

function toFhirDate(date: Date | string): string {
    return new Date(date).toISOString().split('T')[0] ?? '';
}

function mapMedicationStatus(estado: EstadoPrescricao): MedicationRequestStatus {
    const map: Record<EstadoPrescricao, MedicationRequestStatus> = {
        [EstadoPrescricao.ATIVA]: 'active',
        [EstadoPrescricao.DISPENSADA]: 'completed',
        [EstadoPrescricao.CANCELADA]: 'cancelled',
    };
    return map[estado] ?? 'unknown';
}

export function mapToMedicationRequest(
    prescricao: Prescricao,
    medicacao: Medicacao,
    utenteId: number
): FhirMedicationRequestDto {
    return {
        resourceType: 'MedicationRequest',
        id: String(medicacao.id),
        status: mapMedicationStatus(prescricao.estado),
        intent: 'order',
        medicationCodeableConcept: { text: medicacao.nome },
        subject: { reference: `Patient/${utenteId}` },
        requester: { reference: `Practitioner/${prescricao.medico_id}` },
        authoredOn: toFhirDate(prescricao.data_emissao),
        dosageInstruction: [{ text: `${medicacao.dose} — ${medicacao.periodicidade} — ${medicacao.duracao}` }],
    };
}
