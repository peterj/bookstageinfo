import { KubernetesLogsPage } from './plugin';

describe('kubernetes-logs', () => {
  it('should export plugin', () => {
    expect(KubernetesLogsPage).toBeDefined();
  });
});
