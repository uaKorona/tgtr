import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { AuthService } from '@client/data-access';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule,
        CommonModule,
        HttpClientTestingModule,
      ],
      providers: [AuthService],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
  });

  /*   it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.user-email')?.textContent).toContain(
      'Hello,'
    );
  }); */

  it(`should have as title 'client'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('client');
  });
});
