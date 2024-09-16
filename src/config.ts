import {ChainId} from '@layerzerolabs/lz-sdk';
import {AppConfig, createAppConfig} from '@layerzerolabs/ui-app-config';
// import {WrappedTokenBridgeConfig} from '@layerzerolabs/ui-bridge-wrapped-token';
import {Coin, Token} from '@layerzerolabs/ui-core';

// import {OnftBridgeConfig, OnftStandard} from '@layerzerolabs/ui-bridge-onft';

const XPOLAR = {
  version: 2,
  tokens: [
    new Token(ChainId.AURORA, '0xeAf7665969f1DaA3726CEADa7c40Ab27B3245993', 18, 'XPOLAR'),
    new Token(ChainId.TELOS, '0x1073E53ac92F711761475Cd30fab157620AFdAb0', 18, 'XPOLAR'),
    new Token(ChainId.TAIKO, '0x5fc798A5072CD551b8bB5C51416078bc95499d2B', 18, 'XPOLAR'),
  ],
  proxy: [
    {
      chainId: ChainId.AURORA,
      address: '0x7CcE936ad89eba1EC637659094B74C3b45938dae',
    },
    {chainId: ChainId.TELOS, address: '0x1073E53ac92F711761475Cd30fab157620AFdAb0'},
    {chainId: ChainId.TAIKO, address: '0x6472137F1718Ec7F316830Fb43615565772C255B'},
  ],
  fee: true,
  sharedDecimals: 8,
};

const TLOS = {
  version: 2,
  tokens: [
    new Token(ChainId.AURORA, '0x3b73F4336a33eE36106Bb5C6d697192391db740F', 18, 'TLOS'),
    new Token(ChainId.TELOS, '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E', 18, 'TLOS'),
  ],
  proxy: [
    {
      chainId: ChainId.AURORA,
      address: '0x3b73F4336a33eE36106Bb5C6d697192391db740F',
    },
    {chainId: ChainId.TELOS, address: '0x3EaD0FBB27362eC7145BE26D0cD4cf3B75d7B82f'},
  ],
  fee: true,
  sharedDecimals: 8,
};

const oftTokenList = ['XPOLAR', 'TLOS'];

export const isOFT = (tokenSymbol: string) => oftTokenList.includes(tokenSymbol);

export const appConfig: AppConfig = createAppConfig({
  bridge: {
    aptos: [],
    oft: [XPOLAR, TLOS],
    wrappedToken: [
      //wrapped_mainnet,
      // wrapped_testnet,
    ],
    onft: [
      // erc721_testnet,
      // erc1155_testnet,
    ],
  },
});
