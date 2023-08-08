import { Meta, moduleMetadata } from '@storybook/angular';
import { TgtrGameComponent } from './tgtr-game.component';
import { IGame } from '@shared/domain';
import { randFirstName, randUuid } from '@ngneat/falso';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const randGame = (): IGame => {
  return {
    id: randUuid(),
    roads: {},
    battlefields: {},
    playerDarkName: randFirstName(),
    playerLightName: randFirstName(),
  };
};

export default {
  title: 'TgtrGameComponent',
  component: TgtrGameComponent,
  decorators: [
    moduleMetadata({
      imports: [FontAwesomeModule],
    }),
  ],
  argTypes: {
    cancelGame: {
      action: 'cancel game',
    },
    startGame: {
      action: 'start game',
    },
  },
} as Meta<TgtrGameComponent>;

export const Primary = {
  render: (args: TgtrGameComponent) => ({
    props: args,
  }),
  args: {
    game: randGame(),
  },
};
