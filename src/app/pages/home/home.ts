import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BRAND, HOME_CONTENT } from '../../core/site-content';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly brand = BRAND;
  protected readonly content = HOME_CONTENT;
}
