import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Jada K Music | Harp, Piano & Music Production',
  },
  {
    path: 'harp',
    loadComponent: () => import('./pages/harp/harp').then((m) => m.Harp),
    title: 'Harp | Jada K Music',
  },
  {
    path: 'piano',
    loadComponent: () => import('./pages/piano/piano').then((m) => m.Piano),
    title: 'Piano | Jada K Music',
  },
  {
    path: 'music-production',
    loadComponent: () => import('./pages/music-production/music-production').then((m) => m.MusicProduction),
    title: 'Music Production | Jada K Music',
  },
  {
    path: 'events',
    loadComponent: () => import('./pages/events/events').then((m) => m.Events),
    title: 'Events | Jada K Music',
  },
  {
    path: 'testimonials',
    loadComponent: () => import('./pages/testimonials/testimonials').then((m) => m.Testimonials),
    title: 'Testimonials | Jada K Music',
  },
  {
    path: 'videos',
    loadComponent: () => import('./pages/videos/videos').then((m) => m.Videos),
    title: 'Videos | Jada K Music',
  },
  {
    path: 'booking',
    loadComponent: () => import('./pages/booking/booking').then((m) => m.Booking),
    title: 'Booking | Jada K Music',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    title: 'Contact | Jada K Music',
  },
  { path: '**', redirectTo: '' },
];
