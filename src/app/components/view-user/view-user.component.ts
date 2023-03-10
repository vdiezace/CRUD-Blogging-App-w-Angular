import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  myUser!: User | any;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      //console.log(params)
      let id: string = params.userId;
      //console.log(id)
      try {
        let response = await this.usersService.getUserById(id);
        //console.log(response)
        this.myUser = response;
        //console.log(this.myUser)
      } catch (error) {
        console.log(error);
      }
    });
  }

  deleteUsr(pId: string | undefined): void {
    if (pId !== undefined) {
      Swal.fire({
        icon: 'question',
        title: `¿Está seguro de que desea eliminar al usuario ${this.myUser.first_name} ${this.myUser.last_name}?`,
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await this.usersService.deleteUser(pId);
          Swal.fire({
            icon: 'success',
            title: `El usuario ${this.myUser.first_name} ${this.myUser.last_name} se ha eliminado correctamente`
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ops! Parece que ha habido un error',
            text: "La operación ha sido cancelada"
          });
        }
      });
    }
  }
}
