import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'maj-landing',
  imports: [RouterOutlet],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  public readonly appTitle = signal('MajVal');
  public readonly appTagLine = signal('Bridging the Gap Between Question and Mastery.');
}
