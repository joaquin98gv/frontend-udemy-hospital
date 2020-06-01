import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  template: `
    <p>
      rxjs works!
    </p>
  `,
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable().pipe(
      retry(2),
      map( resp => resp.valor ),
      filter( resp => resp % 2 !== 0 )
    )
    .subscribe(
      numero =>  console.log( 'Subs', numero),
      error => console.error( 'Error en el obs', error),
      () => console.log('El observador termino')
    );
  }

  ngOnInit(): void {
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {

      const salida = {
        valor: 0
      };

      const intervalo = setInterval( () => {
        salida.valor++;
        observer.next( salida );
        // if (salida.valor === 10) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }
        // if ( contador === 2 ) {
        //   // clearInterval( intervalo );
        //   observer.error('Auxilio!');
        // }
      }, 1000);

    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();
  }

}
