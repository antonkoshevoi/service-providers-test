import { InspectorRepository } from './inspectors.repository';
import { LicenseRepository } from '../licenses/licenses.repository';
import { Inspector } from './inpectors.model';
import { License } from '../licenses/licenses.model';

export class InspectorService {
  private inspectorRepository: InspectorRepository;
  private licenseRepository: LicenseRepository;

  constructor() {
    this.inspectorRepository = new InspectorRepository();
    this.licenseRepository = new LicenseRepository();
  }

  async getAllInspectors() {
    return this.inspectorRepository.findAll();
  }

  async getInspectorById(id: string) {
    return this.inspectorRepository.findById(id);
  }

  async createInspector(inspectorData: Partial<Inspector>, licenses: Partial<License>[]) {
    const inspector = await this.inspectorRepository.create(inspectorData);

    for (const license of licenses) {
      await this.licenseRepository.create({ ...license, inspector_id: inspector.id });
    }

    return this.inspectorRepository.findById(inspector.id);
  }

  async updateInspector(id: string, inspectorData: Partial<Inspector>) {
    return this.inspectorRepository.update(id, inspectorData);
  }

  async deleteInspector(id: string) {
    return this.inspectorRepository.delete(id);
  }
}
