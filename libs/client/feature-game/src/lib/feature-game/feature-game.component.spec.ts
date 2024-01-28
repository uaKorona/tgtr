import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureGameComponent } from './feature-game.component';
import { GameFacade } from '@client/data-access';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { gameReducers } from '@client/state/ngrx';
import { StoreModule } from '@ngrx/store';

describe('FeatureGameComponent', () => {
  let component: FeatureGameComponent;
  let fixture: ComponentFixture<FeatureGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FeatureGameComponent,
        HttpClientTestingModule,
        StoreModule.forRoot({
          [gameReducers.GAMES_FEATURE_KEY]: gameReducers.gamesReducer,
        }),
      ],
      providers: [GameFacade],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
