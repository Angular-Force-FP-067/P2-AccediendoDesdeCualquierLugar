import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-media',
    imports: [],
    templateUrl: './media.html',
    styleUrls: ['./media.css']
})
export class MediaComponent {
  @Input() videoUrl: string = '';
  @Input() titulo: string = '';
}