import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureGameComponent } from './feature-game.component';
import { UserService } from '@client/data-access';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FeatureGameComponent', () => {
  let component: FeatureGameComponent;
  let fixture: ComponentFixture<FeatureGameComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureGameComponent, HttpClientTestingModule],
      providers: [UserService],
    }).compileComponents();

    userService = TestBed.inject(UserService);
    fixture = TestBed.createComponent(FeatureGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
