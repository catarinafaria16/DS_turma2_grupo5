import type { Request, Response } from 'express';
import { FhirService } from '../services/fhir.service.js';

const operationOutcomeError = (diagnostics: string) => ({
    resourceType: 'OperationOutcome',
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
