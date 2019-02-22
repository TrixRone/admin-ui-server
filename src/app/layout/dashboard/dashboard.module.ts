import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';

import { StatModule } from '../../shared/modules/stat/stat.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {DialogOverviewComponent} from '../material-components/dialog-overview/dialog-overview.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatInputModule,
        DashboardRoutingModule,
        MatGridListModule,
        StatModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        FormsModule,
        MatListModule,
        MatBottomSheetModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatSelectModule,
        MatTooltipModule,
        MatRadioModule,
        MatSliderModule,
        MatProgressBarModule,
        MatPaginatorModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    declarations: [
       DashboardComponent,
       DialogOverviewComponent
    ],
    entryComponents: [
       DialogOverviewComponent
    ]
})
export class DashboardModule {}
