import {Entity, model, property} from '@loopback/repository';

@model()
export class Contactinfo extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  fullname: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  comment: string;


  constructor(data?: Partial<Contactinfo>) {
    super(data);
  }
}
