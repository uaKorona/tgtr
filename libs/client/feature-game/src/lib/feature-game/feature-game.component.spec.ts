import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureGameComponent } from './feature-game.component';

describe('FeatureGameComponent', () => {
  let component: FeatureGameComponent;
  let fixture: ComponentFixture<FeatureGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureGameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
