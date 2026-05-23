import { AppDataSource } from '../database/data-source.js';
import { Utente } from '../models/utente.entity.js';
import { Utilizador } from '../models/utilizador.entity.js';
import { Alergia } from '../models/alergia.entity.js';
import { Anamnese } from '../models/anamnese.entity.js';
import { Prescricao } from '../models/prescricao.entity.js';
import { Medicacao } from '../models/medicacao.entity.js';
import { Sintoma } from '../models/sintoma.entity.js';
import { mapToPatient } from '../fhir/mappers/patient.mapper.js';
import { mapToAllergyIntolerance } from '../fhir/mappers/allergyIntolerance.mapper.js';
import { mapToMedicationRequest } from '../fhir/mappers/medicationRequest.mapper.js';
import { mapToObservation } from '../fhir/mappers/observation.mapper.js';
import type { FhirPatientDto } from '../dtos/fhir/patient/patient-fhir.dto.js';
import type { FhirAllergyIntoleranceDto } from '../dtos/fhir/allergyIntolerance/allergyIntolerance-fhir.dto.js';
import type { FhirMedicationRequestDto } from '../dtos/fhir/medicationRequest/medicationRequest-fhir.dto.js';
import type { FhirObservationDto } from '../dtos/fhir/observation/observationDTO.js';
import type { FhirBundle } from '../dtos/fhir/shared/fhir-types.dto.js';

function toBundle<T>(resources: T[]): FhirBundle<T> {
    return {
        resourceType: 'Bundle',
        type: 'searchset',
        total: resources.length,
        entry: resources.map(r => ({ resource: r })),
    };
}

export class FhirService {
    private get utenteRepo() { return AppDataSource.getRepository(Utente); }
    private get utilizadorRepo() { return AppDataSource.getRepository(Utilizador); }
    private get alergiaRepo() { return AppDataSource.getRepository(Alergia); }
    private get anamneseRepo() { return AppDataSource.getRepository(Anamnese); }
    private get prescricaoRepo() { return AppDataSource.getRepository(Prescricao); }
    private get medicacaoRepo() { return AppDataSource.getRepository(Medicacao); }
    private get sintomaRepo() { return AppDataSource.getRepository(Sintoma); }

    async obterPatient(id: number): Promise<FhirPatientDto | null> {
        const utente = await this.utenteRepo.findOne({ where: { id } });
        if (!utente) return null;
        const utilizador = await this.utilizadorRepo.findOne({ where: { id: utente.utilizador_id } });
        return mapToPatient(utente, utilizador?.nome ?? '');
    }

    async listarPatients(): Promise<FhirBundle<FhirPatientDto>> {
        const utentes = await this.utenteRepo.find();
        const resources = await Promise.all(utentes.map(async u => {
            const utilizador = await this.utilizadorRepo.findOne({ where: { id: u.utilizador_id } });
            return mapToPatient(u, utilizador?.nome ?? '');
        }));
        return toBundle(resources);
    }

    async listarAllergyIntolerances(utenteId: number): Promise<FhirBundle<FhirAllergyIntoleranceDto>> {
        const anamnese = await this.anamneseRepo.findOne({ where: { utente_id: utenteId } });
        if (!anamnese) return toBundle([]);

        const alergias = await this.alergiaRepo.find({ where: { anamnese_id: anamnese.id } });
        return toBundle(alergias.map(a => mapToAllergyIntolerance(a, utenteId)));
    }

    async listarMedicationRequests(utenteId: number): Promise<FhirBundle<FhirMedicationRequestDto>> {
        const prescricoes = await this.prescricaoRepo.find({ where: { utente_id: utenteId } });
        const resources: FhirMedicationRequestDto[] = [];

        for (const prescricao of prescricoes) {
            const medicacoes = await this.medicacaoRepo.find({ where: { prescricao_id: prescricao.id } });
            for (const med of medicacoes) {
                resources.push(mapToMedicationRequest(prescricao, med, utenteId));
            }
        }

        return toBundle(resources);
    }

    async listarObservations(utenteId: number): Promise<FhirBundle<FhirObservationDto>> {
        const sintomas = await this.sintomaRepo.find({ where: { utente_id: utenteId } });
        return toBundle(sintomas.map(mapToObservation));
    }
}
