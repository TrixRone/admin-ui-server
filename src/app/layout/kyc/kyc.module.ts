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
import { KycRoutingModule } from './kyc-routing.module';
import { KycComponent } from './kyc.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogKycComponent} from './dialog-kyc/dialog-kyc.component';


@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatInputModule,
        KycRoutingModule,
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
       KycComponent,
       DialogKycComponent
    ],
    entryComponents: [
      DialogKycComponent
    ]
})
export class KycModule {}
