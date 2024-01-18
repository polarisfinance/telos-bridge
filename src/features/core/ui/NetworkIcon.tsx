import {ChainId} from '@layerzerolabs/lz-sdk';
import {getNetworkIcon} from '@layerzerolabs/ui-core';

import {styled, SxProps, Theme} from '@/core/ui/system';
import {overrideImageSrcOnError} from '@/core/utils/overrideImageSrcOnError';

import {Icon} from './Icon';

type NetworkIconProps = {
  chainId?: ChainId;
  size?: number;
  sx?: SxProps<Theme>;
};

const Image = styled('img')(({theme}) => ({
  borderRadius: theme.shape.borderRadius,
}));

const getNetworkIcon_ = (chainId: number | string): string => {
  switch (chainId) {
    case 211:
      return 'https://raw.githubusercontent.com/aurora-is-near/doc.aurora.dev/857d5a0e86a3fa4e5f8f90c3ba219f3cacfa4906/static/img/favicon.svg';
    default:
      return getNetworkIcon(chainId);
  }
};

export const NetworkIcon: React.FC<NetworkIconProps> = (props) => {
  const {size, chainId, ...otherProps} = props;
  const defaultUrl = getNetworkIcon('default');
  if (!chainId) {
    return <Icon type='emptyNetwork' size={size} {...otherProps} />;
  }
  return (
    <Image
      src={getNetworkIcon_(chainId)}
      width={size}
      height={size}
      alt={String(chainId)}
      onError={overrideImageSrcOnError(defaultUrl)}
      {...otherProps}
    />
  );
};
