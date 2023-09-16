import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureGameComponent } from './feature-game.component';
import { ApiService } from '@client/data-access';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FeatureGameComponent', () => {
  let component: FeatureGameComponent;
  let fixture: ComponentFixture<FeatureGameComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureGameComponent, HttpClientTestingModule],
      providers: [ApiService],
    }).compileComponents();

    apiService = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(FeatureGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
