import { Model } from 'objection';
import { License } from '../licenses/licenses.model';

export class Inspector extends Model {
  static get tableName() {
    return 'inspectors';
  }

  id!: string;
  name!: string;
  email!: string;
  phone_number!: string;
  address!: string;
  created_at!: Date;
  updated_at!: Date;

  static get relationMappings() {
    return {
      licenses: {
        relation: Model.HasManyRelation,
        modelClass: License,
        join: {
          from: 'inspectors.id',
          to: 'licenses.inspector_id',
        },
      },
    };
  }
}
