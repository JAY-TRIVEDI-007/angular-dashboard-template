import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridActionDialogComponent } from './grid-action-dialog.component';

describe('GridActionDialogComponent', () => {
  let component: GridActionDialogComponent;
  let fixture: ComponentFixture<GridActionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridActionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
