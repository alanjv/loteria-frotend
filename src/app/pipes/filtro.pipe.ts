import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const sorteos = [];
    for(const sorteo of value){
      if(sorteo.jornada.toLowerCase().indexOf(arg.toLowerCase())> -1){
        sorteos.push(sorteo);
      } else if(sorteo.fecha.indexOf(arg)>-1){
        sorteos.push(sorteo);
      };
      
    };
    return sorteos;
  }

}
