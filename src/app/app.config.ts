import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

const MyCustomTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f0f4f8',
      100: '#d9e2ec',
      200: '#bcccdc',
      300: '#9fb3c8',
      400: '#829ab1',
      500: '#1e3a5f',  // Navy blue
      600: '#1a3352',
      700: '#152a45',
      800: '#0f1f33',
      900: '#0a1628',
      950: '#050b14'
    },
    secondary: {
      50: '#fdf8f3',
      100: '#faeee0',
      200: '#f5ddc0',
      300: '#efc896',
      400: '#e6ad66',
      500: '#b8860b',  // Dark goldenrod (old money gold)
      600: '#9a7109',
      700: '#7a5907',
      800: '#5c4305',
      900: '#3d2d04',
      950: '#1f1602'
    },
    // Optional: Add a tertiary burgundy accent
    tertiary: {
      50: '#faf5f5',
      100: '#f5e6e8',
      200: '#e8c5ca',
      300: '#d99fa7',
      400: '#c67680',
      500: '#6b2737',  // Deep burgundy
      600: '#5a1f2d',
      700: '#481824',
      800: '#36111b',
      900: '#240b12',
      950: '#120509'
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.500}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.600}',
          activeColor: '{primary.700}'
        },
        surface: {
          0: '#ffffff',
          50: '#faf8f5',
          100: '#f5f1e8',
          200: '#ebe4d4',
          300: '#ddd3bf',
          400: '#c9b99a',
          500: '#9b8b7a',
          600: '#7a6b5a',
          700: '#5a4d3f',
          800: '#3f362c',
          900: '#2a231c',
          950: '#1a130e'
        }
      }
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: MyCustomTheme,
        options: {
          darkModeSelector: '' // disable dark mode
        }
      }
    }),
    MessageService,
    DatePipe,
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: "./assets/i18n/" }),
      fallbackLang: 'en',
      lang: 'en'
    })
  ]
};
