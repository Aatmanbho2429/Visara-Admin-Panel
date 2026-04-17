import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimengComponentsModule } from './shared/primeng-components-module';
import { LoaderService } from './service/loader.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NgHttpLoaderComponent, Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,PrimengComponentsModule,AsyncPipe,CommonModule,NgHttpLoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  public spinkit = Spinkit;
  protected readonly title = signal('UI');
  constructor(public loader: LoaderService) {}
}
