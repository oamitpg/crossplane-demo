import { createFrontendModule } from '@backstage/frontend-plugin-api';
import { darkThemeExtension, lightThemeExtension } from './themes';

export const themeModule = createFrontendModule({
  pluginId: 'app',
  extensions: [lightThemeExtension, darkThemeExtension],
});
