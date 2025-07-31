import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import './Button.ts';
import { ButtonType } from './Button.ts';

export default {
  title: 'UkButton',
  component: 'uk-button',
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'ternary'],
    },
    backgroundColor: {
      control: 'select',
      options: ['accent', 'orange', 'blue', 'green', 'black', 'red'],
    },
    small: { control: 'boolean' },
    dashed: { control: 'boolean' },
    disabled: { control: 'boolean' },
    touchMargin: { control: 'number' },
  },
  render: ({
    type,
    backgroundColor,
    dashed,
    small,
    disabled,
    label,
    touchMargin,
  }) => {
    let t = undefined;
    switch (type) {
      case 'primary':
        t = ButtonType.Primary;
        break;
      case 'secondary':
        t = ButtonType.Secondary;
        break;
      case 'ternary':
        t = ButtonType.Ternary;
        break;
    }
    return html`
      <uk-button
        .type=${t}
        .backgroundColor=${backgroundColor}
        .dashed=${dashed}
        .small=${small}
        .disabled=${disabled}
        .touchMargin=${touchMargin}
        @press=${() => alert('clicked')}
        >${label}</uk-button
      >
    `;
  },
} as Meta;

export const Default: StoryObj = {
  name: 'Normal',
  args: { label: 'Button' },
};

export const Small: StoryObj = {
  name: 'Small',
  args: { small: true, label: 'Button' },
};
