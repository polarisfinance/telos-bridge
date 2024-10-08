import {observer} from 'mobx-react';

import {Bridge} from '@/bridge/ui/Bridge';
import {BridgeTracker} from '@/bridge/ui/BridgeTracker';
import {GasPrice} from '@/bridge/ui/GasPrice';
import {CustomHtmlHead} from '@/core/ui/CustomHtmlHead';
import {AppFooter, AppHeader} from '@/core/ui/Layout';
import {PageLayout} from '@/core/ui/PageLayout';
import {Panel} from '@/core/ui/Panel';

import {NextPageWithLayout} from '../../types/next';

const BridgePage: NextPageWithLayout = () => {
  return (
    <>
      <Panel>
        <BridgeTracker sx={{mb: 4}} />
      </Panel>
      <Panel title='Transfer' endAdornment={<GasPrice />} sx={{bgcolor:'frame.light',p: 0}}>
        <Bridge />
      </Panel>
    </>
  );
};

BridgePage.getLayout = (page) => (
  <PageLayout centered header={<AppHeader />} footer={<AppFooter />}>
    <CustomHtmlHead />
    {page}
  </PageLayout>
);

export default observer(BridgePage);
