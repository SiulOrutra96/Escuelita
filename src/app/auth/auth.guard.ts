import { Injectable } from '@angular/core';
import { CanLoad, Router, Route, UrlSegment } from '@angular/router';
import { take, tap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.usuarioAutenticado) {
      this.router.navigateByUrl('/auth');
    }

    return true;
  }
}
