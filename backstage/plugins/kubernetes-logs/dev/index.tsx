import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { myKubernetesLogsPlugin, KubernetesLogsPage } from '../src/plugin';

createDevApp()
  .registerPlugin(myKubernetesLogsPlugin)
  .addPage({
    element: <KubernetesLogsPage />,
    title: 'Root Page',
    path: '/kubernetes-logs'
  })
  .render();
