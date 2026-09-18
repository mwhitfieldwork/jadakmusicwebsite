import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SOCIAL_LINKS, VIDEOS, VideoEntry } from '../../core/site-content';

interface VideoGroup {
  category: string;
  items: VideoEntry[];
}

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './videos.html',
  styleUrl: './videos.scss',
})
export class Videos {
  protected readonly youtubeChannel = SOCIAL_LINKS.youtube;

  protected readonly groups: VideoGroup[] = Array.from(
    VIDEOS.reduce((map, video) => {
      const list = map.get(video.category) ?? [];
      list.push(video);
      map.set(video.category, list);
      return map;
    }, new Map<string, VideoEntry[]>())
  ).map(([category, items]) => ({ category, items }));
}
