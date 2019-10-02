import { Injectable } from '@angular/core';
import { CanLoad, Router, Route, UrlSegment } from '@angular/router';
import { take, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AntiAuthGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router,
    private firebaseAuth: AngularFireAuth
  ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.firebaseAuth.authState.pipe(
      map(user => {
        if (!user) {
          return false;
        } else {
          return true;
        }
      }),
      take(1),
      tap(autenticado => {
        if (autenticado) {
          this.router.navigateByUrl('/ahora/tabs/pase-lista');
        }
      })
    );
  }
}
