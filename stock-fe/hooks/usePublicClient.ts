// hooks/usePublicClient.ts
import { createPublicClient, createWalletClient, http,
custom ,Address} from 'viem'; // 修正导入
import { sepolia, mainnet, goerli } from 'viem/chains';
import { useWallet } from 'yc-sdk-ui';
import { useMemo } from 'react';

// 自定义本地网络配置 (Chain ID: 31337 - Hardhat 默认)
const hardhatLocalhost = {
  id: 31337,
  name: 'Hardhat Localhost',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    public: { http: ['http://127.0.0.1:8545'] },
    default: { http: ['http://127.0.0.1:8545'] },
  },
  blockExplorers: {
    default: { name: 'Hardhat', url: 'http://127.0.0.1:8545' },
  },
  testnet: true,
};

// 根据chainID获取对应的链配置
const getChainConfig = (chainID: number|string) => {
  switch (+chainID) {
    case 31337:
      return hardhatLocalhost;
    case 1:
      return mainnet;
    case 5:
      return goerli;
    case 11155111:
      return sepolia;
    default:
      console.warn(`⚠️ 未知的链ID: ${chainID}, 默认使用Sepolia测试网`);
      return sepolia;
  }
};

// 创建并返回与当前chainID匹配的publicClient和chain
export const usePublicClient = () => {
  const { chainId } = useWallet();
  const chain = useMemo(() => chainId ? getChainConfig(chainId) : null, [chainId]);
  const publicClient = useMemo(
    () =>
      chain ? createPublicClient({
        chain,
        transport: http(),
      }) : null,
    [chain]
  );

  return { publicClient, chain };
};

// 封装 useWalletClient
export const useWalletClient = () => {
  const { address, provider, chainId } = useWallet();
  console.log("🔍 useWalletClient 初始化:", { address, provider, chainId });

  const chain = useMemo(() => chainId ? getChainConfig(chainId) : null, [chainId]);
  
  // 使用 useMemo 缓存 walletClient
  const walletClient = useMemo(() => {
    if (!provider || !address || !chain) {
      return null;
    }

    return createWalletClient({
      chain,
      transport: custom(provider),
      account: address as Address
    });
  }, [provider, address, chain]);
  
  // 提供一个获取 walletClient 的函数，如果钱包未连接则抛出错误
  const getWalletClient = () => {
    if (!walletClient) {
      throw new Error('钱包未连接');
    }
    return walletClient;
  };
  
  return { walletClient, getWalletClient };
};