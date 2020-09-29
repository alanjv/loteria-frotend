import { Component, OnInit } from '@angular/core';
import { SorteosService } from '../../services/sorteos.service';
import { Sorteo } from '../../models/sorteo';
import  Swal from 'sweetalert2';


@Component({
  selector: 'app-sorteos',
  templateUrl: './sorteos.component.html',
  styles: [
  ]
})
export class SorteosComponent implements OnInit {
  sorteos: any =[];
  paginaActual: number =1;
  filtroNumero = '';
  id = '';
  editar = false;
  boton = false;

  sorteo: Sorteo ={
    idRegistros:0,
    numero:0,
    jornada:'',
    fecha: ''
  };

  constructor(private sorteoService: SorteosService) { }

  ngOnInit(): void {
    this.obtenerSorteos();
  }

  obtenerSorteos(){
    this.sorteoService.getSorteos().subscribe(
      res=>{
        this.sorteos = res;
      }, err => console.error(err)
    );
  }

  agregarSorteo(sorteo:any){
    if(this.validarCampos(sorteo)){
      delete this.sorteo.idRegistros;
      this.sorteoService.addSorteo(sorteo).subscribe(
        res =>{
            Swal.fire(
              'Agregado!',
              'Sorteo agregado',
              'success'
            );
            this.obtenerSorteos();
        }, err => console.error(err)
      );
      
    }
  }

  validarCampos(sorteo){
    if(sorteo.jornada == ''){
      Swal.fire(
        'Jornada vacia',
        'Tiene que seleccionar la jornada del sorteo',
        'warning'
      );
    } else if (sorteo.fecha == ''){
      Swal.fire(
        'Fecha vacía',
        'Ingresar la fecha del sorteo ej: 2020-08-21',
        'warning'
      );
      return false;
    } else{
      return true;
    }
  }

  editarRegistro(sorteo){
    this.editar = true;
    this.sorteo = sorteo;
    this.id = sorteo.idRegistros;
    delete this.sorteo.idRegistros;
    this.sorteo.fecha = sorteo.fecha.slice(0, 10);
  }

  actualizarSorteo(sorteo){
    this.sorteoService.editSorteo(this.id, this.sorteo).subscribe(
      res=>{
        Swal.fire(
          'Actualizado!',
          'SorteoActualizado',
          'success'
        )
        this.limpiar();
      },
      err => console.error(err)
    )
  }

  cancelar(){
    this.editar = false;
    delete this.sorteo.idRegistros;
    this.limpiar();
  }

  limpiar(){
    this.sorteo.numero = 0;
    this.sorteo.jornada = 'Seleccione';
    this.sorteo.fecha = '';
    this.obtenerSorteos();
    this.editar = false;
  }

  borrarRegistro(sorteo:any){
    Swal.fire({
      title: 'Seguro que quiere borrar el registro?',
      text:`Está borrando el sorteo del ${sorteo.fecha.split("T")[0]}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'success',
      cancelButtonColor: 'danger',
      confirmButtonText: 'Borrar'
    }).then((result)=>{
      if(result.value){
        this.sorteoService.delSorteo(sorteo.idRegistros).subscribe(
          res =>{
            Swal.fire(
              'Eliminado',
              'Sorteo borrado',
              'success'
            );
            this.obtenerSorteos();
          }, err => console.error(err)
        );
      }
    });
  }

}
