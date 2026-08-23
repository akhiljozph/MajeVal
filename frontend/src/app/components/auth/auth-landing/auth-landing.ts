import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'maj-landing',
  imports: [RouterOutlet],
  templateUrl: './auth-landing.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './auth-landing.scss',
})
export class Landing {
  public readonly appTitle = signal('Maj.eVal');
  public readonly appTagLine = signal('Bridging the Gap Between Knowledge and Mastery.');
}
