import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;
  @Input() leyenda = 'leyenda';
  @Input() progreso = 50;

  @Output() cambioValor = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }


  cambiarValor( valor: number ) {
    if (this.progreso === 100 && valor === 5) { return; }
    if (this.progreso === 0 && valor === -5) { return; }
    this.progreso += valor;
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.focus();
  }

  onChange( newValue: number ) {
    if (this.progreso >= 100 ) { this.progreso = 100; }
    else if (this.progreso <= 0 ) { this.progreso = 0; }
    else { this.progreso = newValue; }
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit( newValue );
  }

}
