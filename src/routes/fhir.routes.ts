import { Router } from 'express';
import { FhirController } from '../controller/fhir.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new FhirController();

routes.use((_req, res, next) => {
    res.setHeader('Content-Type', 'application/fhir+json; charset=utf-8');
    next();
});
routes.use(autenticar);
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

export default routes;
