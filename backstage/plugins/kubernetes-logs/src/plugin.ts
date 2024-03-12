import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const myKubernetesLogsPlugin = createPlugin({
  id: 'kubernetes-logs',
  routes: {
    root: rootRouteRef,
  },
});

export const KubernetesLogsPage = myKubernetesLogsPlugin.provide(
  createRoutableExtension({
    name: 'KubernetesLogs',
    component: () =>
      import('./components/KubernetesLogs').then(m => m.KubernetesLogs),
    mountPoint: rootRouteRef,
  }),
);
