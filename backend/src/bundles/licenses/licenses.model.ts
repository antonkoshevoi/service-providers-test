import { Model } from 'objection';
import { Inspector } from '../inspectors/inpectors.model';

export class License extends Model {
  static get tableName() {
    return 'licenses';
  }

  id!: string;
  inspector_id!: string;
  license_type!: string;
  license_number!: string;
  expiration_date!: Date;
  created_at!: Date;
  updated_at!: Date;

  static get relationMappings() {
    return {
      inspector: {
        relation: Model.BelongsToOneRelation,
        modelClass: Inspector,
        join: {
          from: 'licenses.inspector_id',
          to: 'inspectors.id',
        },
      },
    };
  }
}
