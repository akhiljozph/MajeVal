import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'maj-landing',
  imports: [RouterOutlet],
  templateUrl: './landing.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './landing.scss',
})
export class Landing {
  public readonly appTitle = signal('MajeVal');
  public readonly appTagLine = signal('Bridging the Gap Between Question and Mastery.');
}
