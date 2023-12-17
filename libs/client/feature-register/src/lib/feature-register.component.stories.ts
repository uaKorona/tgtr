import {
  Meta,
  applicationConfig,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { FeatureRegisterComponent } from './feature-register.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export default {
  title: 'FeatureRegisterComponent',
  component: FeatureRegisterComponent,
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
} as Meta<FeatureRegisterComponent>;

export const Primary = {
  render: (args: FeatureRegisterComponent) => ({
    props: args,
  }),
  args: {},
};
