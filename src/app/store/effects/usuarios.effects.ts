import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {

    constructor(
        private actions$: Actions,
        public usuariosService: UsuarioService
    ) {}

    cargarUsuarios$ = createEffect(() => this.actions$.pipe(
        ofType( usuariosActions.CARGAR_USUARIOS ),
        switchMap(() => {
            return this.usuariosService.getUsers().pipe(
                map(((users: Usuario[]) => {
                    return new usuariosActions.CargarUsuariosSuccess(users);
                })),
                catchError((error: Error) => {
                    return of(new usuariosActions.CargarUsuariosFail(error));
                })
            );
        })
    ));
    // @Effect({ dispatch: false})
    // cargarUsuarios$ = this.actions$.ofType(usuariosActions.CARGAR_USUARIOS).pipe(
    //     map( action => {
    //         console.log(action);
    //         return action;
    //     })
    // )

}