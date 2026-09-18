import { Component, HostListener, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BRAND, NAV_LINKS } from '../../core/site-content';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly brand = BRAND;
  protected readonly navLinks = NAV_LINKS.filter((link) => link.path !== '/contact');
  protected readonly contactLink = NAV_LINKS.find((link) => link.path === '/contact')!;
  protected readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 900) {
      this.menuOpen.set(false);
    }
  }
}
