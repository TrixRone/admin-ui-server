import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogKycComponent } from './dialog-kyc.component';

describe('DialogOverviewComponent', () => {
    let component: DialogKycComponent;
    let fixture: ComponentFixture<DialogKycComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogKycComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogKycComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
