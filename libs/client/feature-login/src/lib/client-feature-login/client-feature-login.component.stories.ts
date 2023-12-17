import {
  Meta,
  componentWrapperDecorator,
  moduleMetadata,
  applicationConfig,
} from '@storybook/angular';
import { ClientFeatureLoginComponent } from './client-feature-login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export default {
  title: 'ClientFeatureLoginComponent',
  component: ClientFeatureLoginComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(HttpClientTestingModule)],
    }),
    moduleMetadata({
      imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    }),
    componentWrapperDecorator(
      (s) => `
      <div style="width: 50vw; height: 100vh">${s}</div>
    `
    ),
  ],
  argTypes: {
    submitForm: {
      action: 'submitForm',
    },
  },
} as Meta<ClientFeatureLoginComponent>;

export const Primary = {
  render: (args: ClientFeatureLoginComponent) => ({
    props: args,
  }),
  args: {},
};
