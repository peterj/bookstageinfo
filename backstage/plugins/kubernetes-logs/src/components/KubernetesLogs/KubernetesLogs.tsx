import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { useEntity } from '@backstage/plugin-catalog-react';
import { EntityList } from '../EntityList/EntityList';


export const KubernetesLogs = () => {
  const { entity } = useEntity();
  return (
    <Page themeId="tool">
      <Header
        title={`Logs for '${entity.metadata.name}'`}
        subtitle={entity.metadata.description}
      >
        <HeaderLabel
          label="Owner"
          value={entity.spec?.owner?.toLocaleString()}
        />
        <HeaderLabel
          label="Lifecycle"
          value={entity.spec?.lifecycle?.toLocaleString()}
        />
      </Header>
      <Content>
        <ContentHeader title="Pod details">
          <SupportButton>
            Plugin that shows the logs from the Kubernetes pod.
          </SupportButton>
        </ContentHeader>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <EntityList entity={entity} />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
