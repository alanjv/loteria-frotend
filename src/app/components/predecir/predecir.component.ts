import { Component, OnInit } from '@angular/core';
import { PredecirService } from '../../services/predecir.service';
import { Prediccion } from '../../models/prediccion';
import  Swal  from 'sweetalert2';
import { stringify } from '@angular/compiler/src/util';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";






@Component({
  selector: 'app-predecir',
  templateUrl: './predecir.component.html',
  styles: [
  ]
})
export class PredecirComponent implements OnInit {

  ultimosSorteos: any = [];
  Prediccion: any = [];
  seleccion = false;
  jornada: '';
  sorteos: any = {
    numero: 0
  };
  probabilidad: any =[];
  total = 0;
  mensaje = '';

  i09: any [] = [];
  i1019: any [] = [];
  i2029: any [] = [];
  i3039: any [] = [];
  i4049: any [] = [];
  i5059: any [] = [];
  i6069: any [] = [];
  i7079: any [] = [];
  i8089: any [] = [];
  i9099: any [] = [];

  prediccion: Prediccion ={
    idPredicciones: 0,
    fecha_prediccion: '',
    jornada_prediccion: '',
    numeros: {
        1: {
            numero: 0,
            probabilidad: ''
        },
        2: {
            numero: 0,
            probabilidad: ' '
        },
        3: {
            numero: 0,
            probabilidad: ' '
        },
        4: {
            numero: 0,
            probabilidad: ' '
        },
        5: {
            numero: 0,
            probabilidad: ' '
        },
        6: {
            numero: 0,
            probabilidad: ' '
        },
        7: {
            numero: 0,
            probabilidad: ' '
        },
        8: {
            numero: 0,
            probabilidad: ' '
        },
        9: {
            numero: 0,
            probabilidad: ' '
        },
        10: {
            numero: 0,
            probabilidad: ' '
          }
    },
  }
  modal: boolean;

  constructor(private predecirService: PredecirService, private datePipe: DatePipe, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.obtenerSorteos();
    this.obtenerPrediccion();
  }

  obtenerSorteos(){
    this.predecirService.getSorteos().subscribe(
      res => this.ultimosSorteos = res
    );

  }

  obtenerPrediccion(){
    this.predecirService.getPrediccion().subscribe(
      res => {
        this.Prediccion = res;
        this.jornada = this.Prediccion.jornada;
      }
    );
  }

  pronosticar(valor: string){
    if(valor === 'todos'){
      this.seleccion = false;
      this.prediccion.jornada_prediccion = valor;
      this.spinner();
      this.mensaje = 'Obteniendo Sorteos';
      this.predecirService.getSorteosTodos().subscribe(
        res => {
          this.sorteos = res;
          this.ordenarSorteos(this.sorteos);
        }
      );

    } else {
      this.seleccion = false;
      this.spinner();
      this.mensaje = 'Obteniendo Sorteos';
      this.prediccion.jornada_prediccion = valor;
      this.predecirService.getSorteosJornada(valor).subscribe(
        res => {
          
          this.sorteos = res;
          
          this.ordenarSorteos(this.sorteos);
        }
      );

    }
  }

  spinner(){
    this.spinnerService.show();

    setTimeout(()=>{

      this.spinnerService.hide();
      this.modal = true;

    }, 5000)
  }
  ordenarSorteos(sorteos: any){
    
    
    this.mensaje = 'Ordenando Sorteos';
    for (var i = 0; i < sorteos.length ; i++) {
      
      if(sorteos[i].numero >= 0 && sorteos[i].numero <= 9){
        const numero = sorteos[i].numero;
        this.i09.push(numero);
        this.contarintervalos(i);
      } else if(sorteos[i].numero >= 10 && sorteos[i].numero <= 19){
        const numero = sorteos[i].numero;
        this.i1019.push(numero);
        this.contarintervalos(i);
      }  else if(sorteos[i].numero>=20 && sorteos[i].numero<=29){
        const numero = sorteos[i].numero;
        this.i2029.push(numero);
        this.contarintervalos(i);
      } else if(sorteos[i].numero>=30 && sorteos[i].numero<=39){
        const numero = sorteos[i].numero;
        this.i3039.push(numero);
      }else if(sorteos[i].numero>=40 && sorteos[i].numero<=49){
        const numero = sorteos[i].numero;
        this.i4049.push(numero);
        this.contarintervalos(i);
      } else if(sorteos[i].numero>=50 && sorteos[i].numero<=59){
        const numero = sorteos[i].numero;
        this.i5059.push(numero);
      } else if(sorteos[i].numero>=60 && sorteos[i].numero<=69){
        const numero = sorteos[i].numero;
        this.i6069.push(numero);
        this.contarintervalos(i);
      }else if(sorteos[i].numero>=70 && sorteos[i].numero<=79){
        const numero = sorteos[i].numero;
        this.i7079.push(numero);
        this.contarintervalos(i);
      }else if(sorteos[i].numero>=80 && sorteos[i].numero<=89){
        const numero = sorteos[i].numero;
        this.i8089.push(numero);
        this.contarintervalos(i);
      } else if (sorteos[i].numero >= 90 && sorteos[i].numero <= 99){
        const numero = sorteos[i].numero;
        this.i9099.push(numero);
        this.contarintervalos(i);
      }
    }
  }

  contarintervalos(i){
    console.log(i);
    if(i !== this.sorteos.length+1){
      this.mensaje ='Calculando Probabilidades';
      delete this.prediccion.idPredicciones;
      this.total = this.i09.length+this.i1019.length+this.i2029.length+this.i3039.length+this.i4049.length+this.i5059.length+this.i6069.length+this.i7079.length+this.i8089.length+this.i9099.length;
      this.prediccion.numeros[1].probabilidad = stringify((this.i09.length/this.total)*100);
      this.prediccion.numeros[2].probabilidad = stringify((this.i1019.length/this.total)*100);
      this.prediccion.numeros[3].probabilidad = stringify((this.i2029.length/this.total)*100);
      this.prediccion.numeros[4].probabilidad = stringify((this.i3039.length/this.total)*100);
      this.prediccion.numeros[5].probabilidad = stringify((this.i4049.length/this.total)*100);
      this.prediccion.numeros[6].probabilidad = stringify((this.i5059.length/this.total)*100);
      this.prediccion.numeros[7].probabilidad = stringify((this.i6069.length/this.total)*100);
      this.prediccion.numeros[8].probabilidad = stringify((this.i7079.length/this.total)*100);
      this.prediccion.numeros[9].probabilidad = stringify((this.i8089.length/this.total)*100);
      this.prediccion.numeros[10].probabilidad = stringify( (this.i9099.length/this.total)*100);

      var date = new Date();
     
      this.prediccion.fecha_prediccion = this.datePipe.transform(date,"yyyy-MM-dd");
      
      this.obtenerProbabilidad(this.i09, 1);
      this.obtenerProbabilidad(this.i1019, 2);
      this.obtenerProbabilidad(this.i2029, 3);
      this.obtenerProbabilidad(this.i3039, 4);
      this.obtenerProbabilidad(this.i4049, 5);
      this.obtenerProbabilidad(this.i5059, 6);
      this.obtenerProbabilidad(this.i6069, 7);
      this.obtenerProbabilidad(this.i7079, 8);
      this.obtenerProbabilidad(this.i8089, 9);
      this.obtenerProbabilidad(this.i9099, 10);

    }

  }
  obtenerProbabilidad(numeros, i){
          
    this.mensaje ='Obteniendo Predicciones';
    for (let j = 0; j < numeros.length; j++) {
        for (let k = 0; k +1 < numeros.length; k++) {
          if (numeros[j] == numeros[k]) {
            this.prediccion.numeros[i].numero = numeros[k];
          }
        } 
      }
  }

  guardarPrediccion(prediccion){
    this.modal = false;
    this.predecirService.addPrediccion(prediccion).subscribe(
      res =>{
        Swal.queue([{
          title: 'Prediciión guardada',
          confirmButtonText: 'OK',
          showLoaderOnConfirm: true,
          preConfirm: () => {
            this.cerrar();
            this.modal = false;
          }
        }])
      }
    );
  }
  cerrar(){
    location.reload();
  }

  opciones(){
    if(this.seleccion){
      this.seleccion = false;
    } else{
      this.seleccion = true;
    }
  }

}
