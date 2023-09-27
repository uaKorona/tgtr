import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TgtrGameComponent } from './tgtr-game.component';
import { createMockGame } from '@shared/util-testing';

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

  // in the outer function, a 'done' callback function is added as a parameter, so we can manually tell Jest when we've completed the test
  it('should successfully start a game', (done) => {
    const game = createMockGame();

    // `startGame` is the EventEmitter that parent components will
    // bind to in a template. Our goal is to monitor the output
    // of this EventEmitter and examine what happens when a user clicks
    // the button that triggers it
    //
    // this subscription may be initiated here, but `startGame` has not
    // emitted any data yet. this subscription lies "dormant" until
    // _something_ is emitted later in the test
    component.startGame.subscribe((data) => {
      expect(data).toStrictEqual(game.id);
      // when the subscription does receive data, after we've
      // validated the output, call the test's callback to
      // finalize the test and move on
      done();
    });

    // FormGroup
    component.game = game;

    // run our component's initialization logic to set up the
    // component.onInit() lifecycle hook


    // call the same method tied to a button press in the template
    // this will trigger the EventEmitter which is detected and
    // processed a few lines above
    component.startGameClick();
  });
});
