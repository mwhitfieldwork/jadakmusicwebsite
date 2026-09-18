import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HARP_CONTENT } from '../../core/site-content';
import { MediaPlaceholder } from '../../shared/media-placeholder/media-placeholder';

@Component({
  selector: 'app-harp',
  standalone: true,
  imports: [NgFor, RouterLink, MediaPlaceholder],
  templateUrl: './harp.html',
  styleUrl: '../shared-page.scss',
})
export class Harp {
  protected readonly content = HARP_CONTENT;
}
