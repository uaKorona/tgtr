import { Meta, moduleMetadata } from '@storybook/angular';
import { TgtrGameComponent } from './tgtr-game.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { createMockGame } from '@shared/util-testing';

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
    game: createMockGame(),
  },
};
