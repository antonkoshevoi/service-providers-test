import { FastifyRequest, FastifyReply } from 'fastify';
import { InspectorService } from './inspectors.service';
import { Inspector } from './inpectors.model';
import { License } from '../licenses/licenses.model';

export class InspectorController {
  private inspectorService: InspectorService;

  constructor() {
    this.inspectorService = new InspectorService();
  }

  async getAllInspectors(request: FastifyRequest, reply: FastifyReply) {
    const inspectors = await this.inspectorService.getAllInspectors();
    reply.send(inspectors);
  }

  async getInspectorById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params;
    const inspector = await this.inspectorService.getInspectorById(id);
    reply.send(inspector);
  }

  async createInspector(
      request: FastifyRequest<{ Body: { name: string; email: string; phone_number: string; address: string; licenses: Partial<License>[] } }>,
      reply: FastifyReply
  ) {
    const { name, email, phone_number, address , licenses } = request.body;
    const inspector = { name, email, phone_number, address };
    const newInspector = await this.inspectorService.createInspector(inspector, licenses);
    reply.send(newInspector);
  }

  async updateInspector(
      request: FastifyRequest<{ Params: { id: string }; Body: Partial<Inspector> }>,
      reply: FastifyReply
  ) {
    const { id } = request.params;
    const inspectorData = request.body;
    const updatedInspector = await this.inspectorService.updateInspector(id, inspectorData);
    reply.send(updatedInspector);
  }

  async deleteInspector(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params;
    await this.inspectorService.deleteInspector(id);
    reply.send({ message: 'Inspector deleted successfully' });
  }
}