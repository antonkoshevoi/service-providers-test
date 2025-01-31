import {License} from "../license/license.type.ts";

type Inspector = {
  name: string;
  email: string;
  phone_number: string;
  address: string;
  id?: string;
  licenses: License[];
}

export { type Inspector };