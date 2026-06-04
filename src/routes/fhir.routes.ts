/*
 * ============================================================
 * fhir.routes.ts — Rotas da API HL7 FHIR
 * ============================================================
 *
 * Este ficheiro define as rotas compatíveis com o padrão HL7 FHIR R4.
 * FHIR (Fast Healthcare Interoperability Resources) é um padrão internacional
 * que permite a troca de dados clínicos entre diferentes sistemas de saúde.
 *
 * Ao expor os dados neste formato, o sistema CARAT pode integrar-se
 * com outros sistemas de saúde (hospitais, laboratórios, apps de saúde).
 *
 * URL base: /fhir (sem o prefixo /api)
 *
 * Rotas disponíveis (apenas para médicos e administradores):
 *   GET /fhir/Patient                           — listar todos os utentes em formato FHIR
 *   GET /fhir/Patient/:id                       — dados de um utente em formato FHIR
 *   GET /fhir/AllergyIntolerance?patient=<id>   — alergias em formato FHIR
 *   GET /fhir/MedicationRequest?patient=<id>    — prescrições em formato FHIR
 *   GET /fhir/Observation?patient=<id>          — observações clínicas (scores CARAT) em formato FHIR
 *   GET /fhir/ObservacaoExterna?code=<c>&patient=<id> — observações externas
 */
import { Router } from 'express';
import { FhirController } from '../controller/fhir.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new FhirController();

// Define o cabeçalho Content-Type correto para respostas FHIR
// O tipo "application/fhir+json" indica que a resposta é JSON no formato FHIR
routes.use((_req, res, next) => {
    res.setHeader('Content-Type', 'application/fhir+json; charset=utf-8');
    next();
});
// Requer autenticação JWT
routes.use(autenticar);
// Apenas médicos e administradores podem aceder às rotas FHIR
routes.use(requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR));

// Patient
routes.get('/Patient', controller.listarPatients.bind(controller));
routes.get('/Patient/:id', controller.obterPatient.bind(controller));

// AllergyIntolerance  — GET /fhir/AllergyIntolerance?patient=<id>
routes.get('/AllergyIntolerance', controller.listarAllergyIntolerances.bind(controller));

// MedicationRequest   — GET /fhir/MedicationRequest?patient=<id>
routes.get('/MedicationRequest', controller.listarMedicationRequests.bind(controller));

// Observation         — GET /fhir/Observation?patient=<id>
routes.get('/Observation', controller.listarObservations.bind(controller));

// ObservacaoExterna   — GET /fhir/ObservacaoExterna?code=<code>&patient=<id>
routes.get('/ObservacaoExterna', controller.listarObservacoesExternas.bind(controller));

export default routes;
