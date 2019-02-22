import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatBottomSheetModule, MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule,
    MatIconModule, MatInputModule, MatListModule, MatOptionModule, MatPaginatorModule,
    MatProgressBarModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSnackBarModule,
    MatTooltipModule
} from '@angular/material';

import {
    BottomSheetOverviewComponent
} from './bottom-sheet-overview/bottom-sheet-overview.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheets.component';
import { ButtonComponent } from './button/button.component';
import { MaterialComponentsRoutingModule } from './material-components-routing.module';
import { MaterialComponentsComponent } from './material-components.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { PizzaPartyComponent, SnackBarComponent } from './snack-bar/snack-bar.component';
import { ToolTipComponent } from './tool-tip/tool-tip.component';
import {DialogComponent} from './dialog/dialog.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialComponentsRoutingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatListModule,
        MatBottomSheetModule,
        MatSnackBarModule,
        MatCardModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatSelectModule,
        MatTooltipModule,
        MatRadioModule,
        MatSliderModule,
        MatProgressBarModule,
        MatPaginatorModule,
        MatIconModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    declarations: [
        MaterialComponentsComponent,
        DialogComponent,
        BottomSheetComponent,
        BottomSheetOverviewComponent,
        SnackBarComponent,
        PizzaPartyComponent,
        ToolTipComponent,
        PaginatorComponent,
        ProgressBarComponent,
        ButtonComponent
    ],
    entryComponents: [
        BottomSheetOverviewComponent,
        PizzaPartyComponent
    ]
})
export class MaterialComponentsModule {}
