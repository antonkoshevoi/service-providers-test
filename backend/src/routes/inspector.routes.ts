import { FastifyInstance } from 'fastify';
import { InspectorController } from '../bundles/inspectors/inspectors.controller';

const inspectorController = new InspectorController();

export async function inspectorRoutes(fastify: FastifyInstance) {
  fastify.get('/inspectors', inspectorController.getAllInspectors.bind(inspectorController));
  fastify.get('/inspectors/:id', inspectorController.getInspectorById.bind(inspectorController));
  fastify.post('/inspectors', inspectorController.createInspector.bind(inspectorController));
  fastify.put('/inspectors/:id', inspectorController.updateInspector.bind(inspectorController));
  fastify.delete('/inspectors/:id', inspectorController.deleteInspector.bind(inspectorController));
}