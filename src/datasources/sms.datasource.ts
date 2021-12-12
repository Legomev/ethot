import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'sms',
  connector: 'twilio',
  accountSid: 'ACe59278e2adb77e4004658b7a926e4c3b',
  authToken: '08484c4720d9389dc18a5f0a4b90680a'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class SmsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'sms';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.sms', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
