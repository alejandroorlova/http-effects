import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import * as usuariosActions from '../../store/actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: []
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];
  loading: boolean;
  error: any;

  constructor(
    public usuarioService: UsuarioService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new usuariosActions.CargarUsuarios());
    this.store.select('usuarios').subscribe( usuarios => {
      this.usuarios = usuarios.users;
      this.loading = usuarios.loading;
      this.error = usuarios.error;
    });
    // this.usuarioService.getUsers().subscribe( users => {
    //   console.log(users);
    //   this.usuarios = users;
    // });
  }

}
