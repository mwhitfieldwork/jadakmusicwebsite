import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PIANO_CONTENT } from '../../core/site-content';
import { MediaPlaceholder } from '../../shared/media-placeholder/media-placeholder';

@Component({
  selector: 'app-piano',
  standalone: true,
  imports: [NgFor, RouterLink, MediaPlaceholder],
  templateUrl: './piano.html',
  styleUrl: '../shared-page.scss',
})
export class Piano {
  protected readonly content = PIANO_CONTENT;
}
