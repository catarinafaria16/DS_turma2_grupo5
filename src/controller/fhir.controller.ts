/*
 * ============================================================
 * fhir.controller.ts — Controller HL7 FHIR
 * ============================================================
 *
 * Este controller expõe os dados do sistema no formato padrão HL7 FHIR R4,
 * permitindo interoperabilidade com outros sistemas de saúde.
 *
 * O que é o FHIR?
 * HL7 FHIR (Fast Healthcare Interoperability Resources) é um padrão
 * internacional que define como os dados de saúde devem ser estruturados
 * e partilhados entre sistemas. É como uma "língua comum" para sistemas médicos.
 *
 * Recursos FHIR disponíveis:
 *   - Patient: dados do utente
 *   - AllergyIntolerance: alergias do utente
 *   - MedicationRequest: prescrições de medicamentos
 *   - Observation: observações clínicas (scores CARAT)
 *
 * As respostas de erro seguem o formato OperationOutcome do FHIR.
 */
import type { Request, Response } from 'express';
import { FhirService } from '../services/fhir.service.js';

// Função auxiliar para criar respostas de erro no formato FHIR OperationOutcome
// Em vez de { erro: "..." }, o FHIR usa este formato estruturado para erros
const operationOutcomeError = (diagnostics: string) => ({
    resourceType: 'OperationOutcome', // Tipo FHIR para respostas de erro
    issue: [{ severity: 'error', code: 'exception', diagnostics }],
});

export class FhirController {
    private service = new FhirService();

    async obterPatient(req: Request, res: Response) {
        try {
            const patient = await this.service.obterPatient(Number(req.params['id']));
            if (!patient) {
                return res.status(404).json({
                    resourceType: 'OperationOutcome',
                    issue: [{ severity: 'error', code: 'not-found', diagnostics: `Patient/${req.params['id']} não encontrado` }],
                });
            }
            return res.status(200).json(patient);
        } catch (error: any) {
            return res.status(500).json(operationOutcomeError(error.message));
        }
    }

    async listarPatients(_req: Request, res: Response) {
        try {
            const bundle = await this.service.listarPatients();
            return res.status(200).json(bundle);
        } catch (error: any) {
            return res.status(500).json(operationOutcomeError(error.message));
        }
    }

    async listarAllergyIntolerances(req: Request, res: Response) {
        try {
            const utenteId = Number(req.query['patient']);
            if (!utenteId) {
                return res.status(400).json({
                    resourceType: 'OperationOutcome',
                    issue: [{ severity: 'error', code: 'required', diagnostics: 'Parâmetro "patient" é obrigatório' }],
                });
            }
            const bundle = await this.service.listarAllergyIntolerances(utenteId);
            return res.status(200).json(bundle);
        } catch (error: any) {
            return res.status(500).json(operationOutcomeError(error.message));
        }
    }

    async listarMedicationRequests(req: Request, res: Response) {
        try {
            const utenteId = Number(req.query['patient']);
            if (!utenteId) {
                return res.status(400).json({
                    resourceType: 'OperationOutcome',
                    issue: [{ severity: 'error', code: 'required', diagnostics: 'Parâmetro "patient" é obrigatório' }],
                });
            }
            const bundle = await this.service.listarMedicationRequests(utenteId);
            return res.status(200).json(bundle);
        } catch (error: any) {
            return res.status(500).json(operationOutcomeError(error.message));
        }
    }

    async listarObservacoesExternas(req: Request, res: Response) {
        try {
            const code = typeof req.query['code'] === 'string' ? req.query['code'] : undefined;
            const patient = typeof req.query['patient'] === 'string' ? req.query['patient'] : undefined;
            const bundle = await this.service.listarObservacoesExternas(code, patient);
            return res.status(200).json(bundle);
        } catch (error: any) {
            return res.status(500).json(operationOutcomeError(error.message));
        }
    }

    async listarObservations(req: Request, res: Response) {
        try {
            const utenteId = Number(req.query['patient']);
            if (!utenteId) {
                return res.status(400).json({
                    resourceType: 'OperationOutcome',
                    issue: [{ severity: 'error', code: 'required', diagnostics: 'Parâmetro "patient" é obrigatório' }],
                });
            }
            const bundle = await this.service.listarObservations(utenteId);
            return res.status(200).json(bundle);
        } catch (error: any) {
            return res.status(500).json(operationOutcomeError(error.message));
        }
    }
}
