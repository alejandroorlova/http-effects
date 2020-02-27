import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as usuarioActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        public usuariosService: UsuarioService
    ) {}

    cargarUsuario$ = createEffect(() => this.actions$.pipe(
        ofType( usuarioActions.CARGAR_USUARIO ),
        switchMap((action) => {
            const id = action['id'];
            return this.usuariosService.getUserById(id).pipe(
                map(((user: Usuario) => {
                    return new usuarioActions.CargarUsuarioSuccess(user);
                })),
                catchError((error: Error) => {
                    return of(new usuarioActions.CargarUsuarioFail(error));
                })
            );
        })
    ));
}