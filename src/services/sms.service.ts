import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {SmsDataSource} from '../datasources';

export interface Sms {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
}

export class SmsProvider implements Provider<Sms> {
  constructor(
    // sms must match the name property in the datasource json file
    @inject('datasources.sms')
    protected dataSource: SmsDataSource = new SmsDataSource(),
  ) {}

  value(): Promise<Sms> {
    return getService(this.dataSource);
  }
}
