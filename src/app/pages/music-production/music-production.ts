import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MUSIC_PRODUCTION_CONTENT } from '../../core/site-content';
import { MediaPlaceholder } from '../../shared/media-placeholder/media-placeholder';

@Component({
  selector: 'app-music-production',
  standalone: true,
  imports: [NgFor, RouterLink, MediaPlaceholder],
  templateUrl: './music-production.html',
  styleUrl: '../shared-page.scss',
})
export class MusicProduction {
  protected readonly content = MUSIC_PRODUCTION_CONTENT;
}
