import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TgtrGameComponent } from './tgtr-game.component';

describe('TgtrGameComponent', () => {
  let component: TgtrGameComponent;
  let fixture: ComponentFixture<TgtrGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TgtrGameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TgtrGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
