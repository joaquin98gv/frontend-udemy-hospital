import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  template: `
    <p>
      promesas works!
    </p>
  `,
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.contarTres().then(
      msg => console.log('Termino!', msg)
    ).catch(
      error => console.log('Error en la promesa: ', error)
    );
  }

  ngOnInit(): void {
  }

  contarTres(): Promise<boolean> {
    return new Promise( (resolve, reject) => {

      let contador = 0;

      const intervalo = setInterval( () => {
        contador++;
        console.log(contador);
        if (contador === 3) {
          resolve(true);
          // reject('Simplemente un error');
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}
