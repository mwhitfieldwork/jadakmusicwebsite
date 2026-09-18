import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND, SOCIAL_ICONS, SOCIAL_LINKS } from '../../core/site-content';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly brand = BRAND;
  protected readonly socialLinks = SOCIAL_LINKS;
  protected readonly socialIcons = SOCIAL_ICONS;
  protected readonly year = new Date().getFullYear();
}
