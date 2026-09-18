import { Component, Input } from '@angular/core';

/**
 * Stands in for a performance video/audio clip until Mike exports the
 * original media files from Squarespace and drops them into
 * src/assets/video (or /audio). Once a file exists at `src`, the
 * <video>/<audio> tag renders it normally; until then this shows a
 * clean placeholder instead of a broken player.
 */
@Component({
  selector: 'app-media-placeholder',
  standalone: true,
  template: `
    <div class="media-placeholder">
      <div class="media-placeholder__icon" aria-hidden="true">&#9835;</div>
      <p class="media-placeholder__title">{{ title }}</p>
      <p class="media-placeholder__hint">Media file coming soon</p>
    </div>
  `,
  styles: [`
    .media-placeholder {
      aspect-ratio: 16 / 9;
      background: var(--color-cream-deep);
      border: 1px dashed var(--color-gold);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: 0.35rem;
      padding: 1rem;
    }
    .media-placeholder__icon {
      font-size: 2rem;
      color: var(--color-gold);
    }
    .media-placeholder__title {
      font-family: var(--font-display);
      margin: 0;
      font-size: 1.1rem;
    }
    .media-placeholder__hint {
      font-family: var(--font-label);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: 0.72rem;
      color: var(--color-charcoal-soft);
      margin: 0;
    }
  `],
})
export class MediaPlaceholder {
  @Input() title = 'Video';
}
