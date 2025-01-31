import { License } from './licenses.model';

export class LicenseRepository {
  async create(licenseData: Partial<License>) {
    return License.query().insert(licenseData).returning('*');
  }

  async update(id: string, licenseData: Partial<License>) {
    return License.query().patchAndFetchById(id, licenseData);
  }

  async delete(id: string) {
    return License.query().deleteById(id);
  }
}
