import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpService } from '../../services/http.service';
import { IScanWithDetailsDto } from '../../models/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'logs-content-dialog',
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
  styleUrl: './logs-content-dialog.scss',
  templateUrl: './logs-content-dialog.html',
})
export class LogsContentDialogComponent {
  readonly httpService = inject(HttpService);
  readonly data = inject<{ id: string }>(MAT_DIALOG_DATA);

  public model: IScanWithDetailsDto;

  private interval: any;

  ngOnInit() {
    this.refresh();
    this.interval = setInterval(() => this.refresh(), 3000);
  }

  refresh() {
    this.httpService.getScanById(this.data.id).subscribe({
      next: response => {
        this.model = response;
      },
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
