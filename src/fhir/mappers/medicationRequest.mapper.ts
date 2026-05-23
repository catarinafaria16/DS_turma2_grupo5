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
        dispenseRequest: {
            validityPeriod: { end: toFhirDate(medicacao.validade) },
        },
    };
}
