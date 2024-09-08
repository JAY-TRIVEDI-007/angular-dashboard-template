import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPasswordDialogComponent } from './enter-password-dialog.component';

describe('EnterPasswordDialogComponent', () => {
  let component: EnterPasswordDialogComponent;
  let fixture: ComponentFixture<EnterPasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterPasswordDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnterPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
