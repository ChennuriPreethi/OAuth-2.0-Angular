import { Component } from '@angular/core';
import { OAuthService,JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import { filter } from 'minimatch';

export const authConfig:AuthConfig = {
  issuer : 'https://dev-29999595.okta.com/oauth2/default',
  redirectUri : window.location.origin,
  clientId : '0oa3tilro5fFOmOez5d7'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task';
  constructor(private oS:OAuthService){
    this.configureSingleSignOn();
}


configureSingleSignOn(){
  this.oS.configure(authConfig);
  this.oS.tokenValidationHandler = new JwksValidationHandler();
  this.oS.loadDiscoveryDocumentAndTryLogin();
}

login(){
  this.oS.initImplicitFlow();
}

logout(){
  this.oS.logOut();
}

get token(){
  let claims:any = this.oS.getIdentityClaims();
  return claims ? claims : null;
}

}