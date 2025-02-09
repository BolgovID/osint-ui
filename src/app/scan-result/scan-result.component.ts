import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { LogsContentDialogComponent } from '../logs-content-dialog/logs-content-dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { HttpService } from '../../services/http.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { IScanDto } from '../../models/models';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    CdkDropList,
    CdkDrag,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    RouterModule,
    MatChipsModule,
    MatBadgeModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  templateUrl: './scan-result.component.html',
  styleUrl: './scan-result.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ScanResultComponent {
  readonly snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  readonly router = inject(Router);
  readonly httpService = inject(HttpService);

  public scanValue: string = '';
  public isLoading: boolean;

  interval: any;

  public items: IScanDto[] = [];

  ngOnInit() {
    this.getScanResults(false);
    this.interval = setInterval(() => this.getScanResults(false), 5000);
  }

  getScanResults(withLoading: boolean) {
    if (withLoading) this.isLoading = true;

    this.httpService.getScanResults().subscribe({
      next: response => this.items = response,
      complete: () => this.isLoading = false,
    });
  }

  stopContainer(id: string) {
    this.isLoading = true;

    this.httpService.stopScanById(id).subscribe({
      next: response => {
        const item = this.items.filter(i => i.id === response.id).at(0);
        if (item) {
          item.status = response.status;
          item.end_time = response.end_time;
        }
      },
      complete: () => this.isLoading = false,
    });
  }

  drop(event: any) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  openDialog(id: string) {
    this.dialog.open(LogsContentDialogComponent, {
      data: { id }
    });
  }

  scan() {
    const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    const isValid = domainPattern.test(this.scanValue);
    if (!isValid) return;

    this.isLoading = true;

    this.httpService.scan(this.scanValue).subscribe({
      next: response => {
        this.items = [response, ...this.items];
      },
      error: response => this.snackBar.open(response.error.details, 'Nice', {
        verticalPosition: 'top',
        duration: 8000,
      }),
      complete: () => this.isLoading = false,
    })
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
