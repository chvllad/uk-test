import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import './SidebarMenu.ts';
import './SidebarGroup.ts';
import './SidebarItem.ts';

export default {
  title: 'UkSidebar',
  component: 'uk-sidebar',
  argTypes: {
    alignment: {
      name: 'Выравнивание',
      control: { type: 'radio' },
      options: ['left', 'right'],
      default: 'left',
    },
  },
  render: ({ alignment }) => {
    return html`
      <uk-sidebar-menu .alignment=${alignment}>
        <uk-sidebar-group header="Заявки" open>
          <uk-sidebar-item
            color="#27AE60"
            @click=${() => alert('Кнопка нажата!')}
            >Отклонена управляющим</uk-sidebar-item
          >
          <uk-sidebar-item color="#27AE60" count="2"
            >Отклонена управляющим тест длинного заголовка</uk-sidebar-item
          >
          <uk-sidebar-item color="#27AE60" count="0" active
            >Не отправлено</uk-sidebar-item
          >
          <uk-sidebar-item color="#27AE60" active
            >Отклонена управляющим</uk-sidebar-item
          >
          <uk-sidebar-item color="#FFAC34" count="2"
            >Не завершено</uk-sidebar-item
          >
          <uk-sidebar-item color="#FFAC34" count="0"
            >Не отправлено</uk-sidebar-item
          >
          <uk-sidebar-item color="#FFAC34" active
            >Отклонена управляющим
          </uk-sidebar-item>
          <uk-sidebar-item color="#FFAC34" count="2"
            >Не завершено</uk-sidebar-item
          >
          <uk-sidebar-item color="#2D9CDB" count="0"
            >Не отправлено</uk-sidebar-item
          >
          <uk-sidebar-item color="#2D9CDB"
            >Отклонена управляющим</uk-sidebar-item
          >
          <uk-sidebar-item color="#2D9CDB" count="2"
            >Не завершено</uk-sidebar-item
          >
          <uk-sidebar-item color="#2D9CDB" count="0"
            >Не отправлено</uk-sidebar-item
          >
          <uk-sidebar-item color="#2D9CDB">Блабалбала</uk-sidebar-item>
        </uk-sidebar-group>
        <uk-sidebar-group header="Отключения">
          <uk-sidebar-item color="#27AE60">Первый пункт</uk-sidebar-item>
          <uk-sidebar-item>Второй пункт</uk-sidebar-item>
          <uk-sidebar-item color="#27AE60">Первый пункт</uk-sidebar-item>
          <uk-sidebar-item>Второй пункт</uk-sidebar-item>
          <uk-sidebar-item color="#27AE60">Первый пункт</uk-sidebar-item>
          <uk-sidebar-item>Второй пункт</uk-sidebar-item>
          <uk-sidebar-item color="#27AE60">Первый пункт</uk-sidebar-item>
          <uk-sidebar-item>Второй пункт</uk-sidebar-item>
          <uk-sidebar-item color="#27AE60">Первый пункт</uk-sidebar-item>
          <uk-sidebar-item>Второй пункт</uk-sidebar-item>
          <uk-sidebar-item color="#27AE60">Первый пункт</uk-sidebar-item>
          <uk-sidebar-item>Второй пункт</uk-sidebar-item>
          <uk-sidebar-item color="#27AE60">Первый пункт</uk-sidebar-item>
          <uk-sidebar-item>Второй пункт</uk-sidebar-item>
          <uk-sidebar-item color="#27AE60">Первый пункт</uk-sidebar-item>
          <uk-sidebar-item>Второй пункт</uk-sidebar-item>
        </uk-sidebar-group>
      </uk-sidebar-menu>
    `;
  },
} as Meta;

export const Default: StoryObj = {
  name: 'Общий',
  args: {},
};
