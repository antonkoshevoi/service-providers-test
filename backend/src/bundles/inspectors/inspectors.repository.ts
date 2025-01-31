import { Inspector } from './inpectors.model';

export class InspectorRepository {
  async findAll() {
    return Inspector.query().withGraphFetched('licenses');
  }

  async findById(id: string) {
    return Inspector.query().findById(id).withGraphFetched('licenses');
  }

  async create(inspectorData: Partial<Inspector>) {
    return Inspector.query().insert(inspectorData).returning('*');
  }

  async update(id: string, inspectorData: Partial<Inspector>) {
    return Inspector.query().patchAndFetchById(id, inspectorData);
  }

  async delete(id: string) {
    return Inspector.query().deleteById(id);
  }
}
