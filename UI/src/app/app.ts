import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimengComponentsModule } from './shared/primeng-components-module';
import { LoaderService } from './service/loader.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,PrimengComponentsModule,AsyncPipe,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  loading$ = this.loader.loading$;
  protected readonly title = signal('UI');
  constructor(public loader: LoaderService) {}
}
