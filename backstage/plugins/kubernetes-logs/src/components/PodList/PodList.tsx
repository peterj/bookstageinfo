import React, { useState } from 'react';
import {
    Progress

} from '@backstage/core-components';

import { kubernetesApiRef } from '@backstage/plugin-kubernetes';
import { useApi } from '@backstage/core-plugin-api';


interface PodListProps {
    pods: any[];
    clusterName: string;
  }

export function PodList({ pods, clusterName }: PodListProps) {
    const k8sApi = useApi(kubernetesApiRef);
    const [logs, setLogs] = useState('');
    const [loading, setLoading ] = useState(false);
  
    async function getPodLogs(
      namespace: string,
      podName: string,
      containerName: string,
    ) {
      setLoading(true)
      await k8sApi
        .proxy({
          clusterName,
          path: `/api/v1/namespaces/${namespace}/pods/${podName}/log?container=${containerName}`,
        })
        .then(response => response.text())
        .then(logText => {
          setLogs(logText);
          setLoading(false);
        });
    }
  
    return (
      <div>
        {pods.map((p, index) => {
          const podName = p.metadata.name;
          const namespace = p.metadata.namespace;
          return (
            <div key={index}>
              <div>Pod name: {podName}</div>
              <div>
                {p.spec.containers.map((c: any, index: any) => {
                  return (
                    <div key={index}>
                      <div
                        style={{
                          textDecoration: 'underline',
                          cursor: 'pointer',
                        }}
                        onClick={() => getPodLogs(namespace, podName, c.name)}
                      >
                        {c.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {loading && <Progress />}
        {logs && <div style={{
          whiteSpace: 'pre-wrap',
          overflow: 'auto',
          maxHeight: '300px',
          border: '1px solid #e5e5e5',
          padding: '10px',
          backgroundColor: '#000000',
        
          fontFamily: 'monospace',
        }}>{logs}</div>}
      </div>
    );
  }