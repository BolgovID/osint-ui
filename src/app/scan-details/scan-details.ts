import { Component, inject, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { IScanWithDetailsDto } from '../../models/models';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatCardModule,
  ],
  styleUrl: './scan-details.scss',
  templateUrl: './scan-details.html',
})
export class ScanDetailsComponent {
  readonly router = inject(Router);
  readonly httpService = inject(HttpService);

  @Input() id: string;

  model?: IScanWithDetailsDto;

  isLoading: boolean;
  isStopped: boolean;

  interval: any;

  ngOnInit() {
    this.getContainerById(true);
    this.interval = setInterval(() => this.getContainerById(false), 2000);
  }

  getContainerById(withLoading: boolean) {
    if (withLoading) this.isLoading = true;

    this.httpService.getScanById(this.id).subscribe({
      next: response => {
        this.model = response;
      },
      complete: () => this.isLoading = false,
    });
  }

  stopContainer(id: string) {
    this.isLoading = true;
    this.isStopped = true;

    this.httpService.stopScanById(id).subscribe({
      next: response => {
        if (!this.model) return;

        this.model.end_time = response.end_time;
        this.model.status = response.status;
      },
      error: () => this.isStopped = false,
      complete: () => this.isLoading = false,
    });
  }

  navigateToHomePage() {
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
