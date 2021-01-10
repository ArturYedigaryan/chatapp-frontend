import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class GestGuard implements CanActivate {
  constructor(private tokenService: TokenService, private  router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.tokenService.GetToken()) {
      return true;
    } else {
      this.router.navigate(['/streams']);
    }
  }
}
