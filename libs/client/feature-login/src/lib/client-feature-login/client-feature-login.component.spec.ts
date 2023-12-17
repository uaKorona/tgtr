import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientFeatureLoginComponent } from './client-feature-login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClientFeatureLoginComponent', () => {
  let component: ClientFeatureLoginComponent;
  let fixture: ComponentFixture<ClientFeatureLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientFeatureLoginComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientFeatureLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
