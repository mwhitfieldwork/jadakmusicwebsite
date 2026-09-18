import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { EVENTS_GALLERY } from '../../core/site-content';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [NgFor],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events {
  protected readonly photos = EVENTS_GALLERY;
}
