import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {SessionService} from '../services';

export interface Credentials {
  username: string;
  password: string;
}

export class UserAuthenticationStrategy implements AuthenticationStrategy {
  name: string = 'jwt';

  constructor(
    @service(SessionService)
    public sessionService: SessionService
  ) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let isValid = this.sessionService.validate(token);
      if (isValid) {
        let userProfile: UserProfile = Object.assign({
          admin: "OK"
        });
        return userProfile;
      } else {
        throw new HttpErrors[401]("Unauthorized");
      }

    } else {
      throw new HttpErrors[401]("Not is a valid JWT token");
    }

    return undefined;
  }

}
