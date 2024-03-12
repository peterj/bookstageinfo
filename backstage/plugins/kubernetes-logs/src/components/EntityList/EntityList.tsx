import React from 'react';
import {
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';
import { Entity } from '@backstage/catalog-model';

import { kubernetesApiRef } from '@backstage/plugin-kubernetes';
import { ObjectsByEntityResponse } from '@backstage/plugin-kubernetes-common';

import { useApi } from '@backstage/core-plugin-api';
import useAsync from 'react-use/lib/useAsync';
import { PodList } from '../PodList';

interface EntityListProps {
  entity: Entity;
}

export const EntityList = ({ entity }: EntityListProps) => {
  const k8sApi = useApi(kubernetesApiRef);

  const {
    value: data,
    loading,
    error,
  } = useAsync(async (): Promise<ObjectsByEntityResponse> => {
    return k8sApi.getWorkloadsByEntity({
      auth: {},
      entity,
    });
  });


  if (loading) return <Progress />;
  if (error) return <ResponseErrorPanel error={error} />;

  return (
    <>
      <div>Show the logs from Kubernetes pod with labels:</div>
      <div>
        {data?.items.map(({ cluster, resources }, index) => (
          <div key={index}>
            <h1>Cluster name: {cluster.name}</h1>

            <div>
              {resources
                .filter(r => r.type === 'pods')
                .map(({ resources: pods }, index) => {
                  return <PodList key={index} pods={pods} clusterName={cluster.name} />;
                })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};