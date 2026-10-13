import { createApp } from '@backstage/frontend-defaults';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import { argocdTranslationsModule } from '@backstage-community/plugin-argocd';
import { navModule } from './modules/nav';
import { homeModule } from './modules/home';
import { authModule } from './modules/auth';
import { themeModule } from './modules/theme';

export default createApp({
  features: [
    catalogPlugin,
    navModule,
    homeModule,
    authModule,
    themeModule,
    argocdTranslationsModule,
  ],
});
