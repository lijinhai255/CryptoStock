# CryptoStock - 分散化股票代币交易系统# CryptoStock - 去中心化股票代币化智能合约



[![Solidity](https://img.shields.io/badge/Solidity-0.8.22-blue)](https://soliditylang.org/)CryptoStock 是一个创新的去中心化股票代币化智能合约系统，通过区块链技术将传统股票代币化，让用户能够使用加密货币投资股票市场。

[![Hardhat](https://img.shields.io/badge/Hardhat-2.22.15-yellow)](https://hardhat.org/)

[![OpenZeppelin](https://img.shields.io/badge/OpenZeppelin-5.1.0-green)](https://openzeppelin.com/)## 项目概述

[![Ethers.js](https://img.shields.io/badge/Ethers.js-v6-purple)](https://ethers.org/)

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT)CryptoStock 智能合约系统集成了 Pyth Network 预言机，提供实时股票价格数据，支持股票代币的创建、交易和价格查询。用户可以通过工厂合约创建对应真实股票的 ERC20 代币，实现传统金融与 DeFi 的桥接。



## 🎯 项目概述## 功能特性



CryptoStock 是一个基于以太坊的分散化股票代币交易系统，允许用户通过区块链技术交易代表真实股票的代币。系统集成了 Pyth Network 价格预言机，提供实时、准确的股票价格数据，支持无缝的买卖交易。- 🏭 **代币工厂**: 支持创建对应真实股票的 ERC20 代币

- � **实时价格**: 集成 Pyth Network 获取实时股票价格数据

### ✨ 核心特性- 🔮 **预言机聚合**: 统一管理多个股票的价格源 Feed ID

- 💱 **精度转换**: 自动处理不同精度的价格数据转换为 18 位小数

- 🏪 **代币工厂系统**: 动态创建和管理股票代币- 🚀 **批量操作**: 支持批量价格更新和查询操作

- 📊 **实时价格预言机**: 集成Pyth Network获取实时股票价格- �🔒 **可升级代理**: 使用 OpenZeppelin 透明代理模式支持合约升级

- 💱 **无缝交易体验**: 支持USDT与股票代币的买卖交易- ⚡ **Gas 优化**: 优化的合约设计减少 Gas 消耗

- 🔄 **UUPS可升级架构**: 支持合约安全升级- 🛡️ **安全防护**: 内置价格数据有效性检查和异常处理

- 🛡️ **安全机制**: 包含暂停、重入保护、滑点保护等安全功能

- 🧪 **完整测试覆盖**: 5套完整的测试用例，支持本地和Sepolia网络## 支持的股票



## 🏗️ 架构设计- **AAPL** (Apple Inc.) - 苹果公司

- **TSLA** (Tesla Inc.) - 特斯拉公司  

### 合约架构- **GOOGL** (Alphabet Inc.) - 谷歌母公司

- **MSFT** (Microsoft Corp.) - 微软公司

```- **AMZN** (Amazon.com Inc.) - 亚马逊公司

┌─────────────────────────────────────────────────────────────┐- **NVDA** (NVIDIA Corp.) - 英伟达公司

│                    CryptoStock 系统架构                      │

├─────────────────────────────────────────────────────────────┤## 技术栈

│                                                             │

│  ┌─────────────────┐    ┌─────────────────┐                │- **Solidity**: ^0.8.22

│  │  TokenFactory   │    │ OracleAggregator│                │- **Hardhat**: 开发框架和测试环境

│  │   (UUPS Proxy)  │────│   (UUPS Proxy)  │                │- **OpenZeppelin**: 安全合约库和可升级代理

│  │                 │    │                 │                │- **Pyth Network**: 去中心化预言机网络

│  │ • 创建股票代币    │    │ • Pyth集成      │                │- **Ethers.js**: 以太坊交互库

│  │ • 管理代币列表    │    │ • 价格聚合      │                │- **Hardhat Deploy**: 自动化部署管理

│  │ • 升级支持       │    │ • 多资产支持    │                │- **Chai**: 测试框架

│  └─────────────────┘    └─────────────────┘                │- **Axios**: HTTP 客户端 (用于 Pyth API 集成)

│           │                        │                       │

│           │                        │                       │## 快速开始

│           ▼                        │                       │

│  ┌─────────────────┐               │                       │### 1. 安装依赖

│  │   StockToken    │◄──────────────┘                       │

│  │   (UUPS Proxy)  │                                       │```bash

│  │                 │                                       │npm install

│  │ • ERC20代币      │                                       │```

│  │ • 买卖交易       │                                       │

│  │ • 价格计算       │                                       │### 2. 配置环境变量

│  │ • 安全机制       │                                       │

│  │ • 升级支持       │                                       │创建 `.env` 文件并配置必要参数：

│  └─────────────────┘                                       │

│                                                             │```bash

└─────────────────────────────────────────────────────────────┘cp .env.example .env

``````



### 核心合约配置内容：



| 合约名称 | 类型 | 功能描述 |```env

|---------|------|---------|# Sepolia 测试网配置

| `TokenFactory` | UUPS代理 | 股票代币工厂，负责创建和管理所有股票代币 |SEPOLIA_URL=https://rpc.sepolia.org

| `StockToken` | UUPS代理 | 股票代币实现，支持买卖交易和价格查询 |PRIVATE_KEY_1=your_private_key_1

| `OracleAggregator` | UUPS代理 | 价格预言机聚合器，集成Pyth Network |PRIVATE_KEY_2=your_private_key_2

| `MockERC20` | 标准合约 | 模拟USDT代币，用于测试环境 |PRIVATE_KEY_3=your_private_key_3

| `MockPyth` | 标准合约 | 模拟Pyth预言机，用于本地测试 |PRIVATE_KEY_4=your_private_key_4



## 🚀 快速开始# Etherscan API (用于合约验证)

ETHERSCAN_API_KEY=your_etherscan_api_key

### 环境要求

# Gas 报告

- Node.js >= 16.0.0REPORT_GAS=true

- npm >= 8.0.0```

- Git

### 3. 编译合约

### 安装依赖

```bash

```bashnpm run compile

# 克隆仓库```

git clone <repository-url>

cd CryptoStockContract### 4. 运行测试



# 安装依赖```bash

npm install# 运行所有测试

```npm test



### 环境配置# 运行特定测试文件

npm test test/01-token-factory.test.js

复制环境配置文件并填入相应参数：npm test test/02-stock-token.test.js



```bash# 运行测试覆盖率

cp .env.example .envnpm run coverage

``````



编辑 `.env` 文件：### 5. 部署合约



```bash#### 本地部署

# RPC URLs

SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY```bash

# 启动本地节点

# Etherscan API Key for contract verificationnpm run node

ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY

# 在另一个终端部署

# Gas reporting (optional)npm run deploy:localhost

REPORT_GAS=true```



# 账户私钥 (测试用途)#### 测试网部署

PRIVATE_KEY_1=your_private_key_here

PRIVATE_KEY_2=your_private_key_here```bash

PRIVATE_KEY_3=your_private_key_herenpm run deploy:sepolia

PRIVATE_KEY_4=your_private_key_here```

```

## 项目结构

## 🛠️ 开发指南

```

### 编译合约CryptoStockContract/

├── contracts/              # 智能合约

```bash│   ├── OracleAggregator.sol    # 预言机聚合器

npm run compile│   ├── TokenFactory.sol        # 代币工厂

```│   ├── StockToken.sol          # 股票代币实现

│   ├── MockERC20.sol          # 模拟 USDT 代币

### 运行测试│   └── MockPyth.sol           # 模拟预言机 (测试用)

├── deploy/                 # 自动化部署脚本

```bash│   └── 01-deploy-crypto-stock-system.js

# 本地网络测试├── test/                   # 测试套件

npm test│   ├── 01-token-factory.test.js

│   └── 02-stock-token.test.js

# Sepolia网络测试├── utils/                  # 工具函数

npm run test -- --network sepolia│   └── getPythUpdateData.js    # Pyth API 集成

├── scripts/                # 交互脚本

# 特定测试文件│   └── interact.js

npx hardhat test test/01-token-factory.test.js├── artifacts/              # 编译产物

npx hardhat test test/02-stock-token.test.js  ├── deployments/            # 部署记录

npx hardhat test test/03-exchange.test.js├── hardhat.config.js       # Hardhat 配置

npx hardhat test test/04-stock-token-upgrade.test.js└── package.json           # 项目依赖

npx hardhat test test/05-oracle-upgrade.test.js```

```

## 合约架构

### 部署合约

### 核心合约

```bash

# 部署到Sepolia测试网#### TokenFactory.sol

npm run deploy:full:sepolia- **功能**: 股票代币工厂合约，负责创建和管理股票代币

- **特性**: 

# 本地部署  - 使用可升级代理模式

npm run deploy:localhost  - 统一管理所有创建的股票代币

```  - 集成预言机获取实时价格

  - 支持 USDT 作为基础交易货币

### 验证合约

#### StockToken.sol  

```bash- **功能**: ERC20 股票代币实现

# 验证已部署的合约- **特性**:

npm run verify:sepolia  - 标准 ERC20 功能

```  - 实时股票价格查询

  - 与预言机聚合器深度集成

## 📊 已部署合约 (Sepolia)  - 支持铸造和销毁操作



| 合约 | 地址 | 类型 |#### OracleAggregator.sol

|------|------|------|- **功能**: 预言机聚合器，管理多个股票的价格源

| TokenFactory | `0xf5E1a44A68815fa627c1588e071fd089478aEB9C` | UUPS代理 |- **特性**:

| OracleAggregator | `0x071304F5010BDdC9665c2666b6B930d7a60cf5bB` | UUPS代理 |  - 集成 Pyth Network 获取实时价格

| USDT (Mock) | `0xAd728799474E8606571EBaCa43A9A595d760f613` | 标准ERC20 |  - 支持批量价格更新和查询

  - 自动价格精度转换 (转换为 18 位小数)

### 股票代币地址  - 价格数据有效性验证



| 股票符号 | 代币地址 | 股票名称 |#### MockERC20.sol

|---------|----------|----------|- **功能**: 模拟 USDT 代币 (测试和交易用)

| AAPL | `0x794f86DD0958be85E99841A78e0f50F2C55C6ede` | Apple Inc Stock Token |- **特性**:

| TSLA | `0xD2cFbcebc4ee17c721DFf7746E3dEAd85c83DD40` | Tesla Inc Stock Token |  - 标准 ERC20 实现

| GOOGL | `0xe15f9419B7Cf542CBF77626F231606dF48a034F5` | Google Stock Token |  - 支持铸造功能 (测试环境)

| MSFT | `0x38eEbAE9ef4dE3cB3BC5d8B85F6df2C2dEeec6F9` | Microsoft Stock Token |  - 6 位小数精度 (符合 USDT 标准)

| AMZN | `0x4FB1B9ABBa0c7a2ff3A892C2eC89F5e4EA95Ed9B` | Amazon Stock Token |

| NVDA | `0xF9f5FB3c67BE4fcE1C4027b5Ba1Ac23Fa0BADF59` | NVIDIA Stock Token |### 预言机集成



## 🧪 测试架构#### Pyth Network 集成

- **Sepolia 网络**: 使用真实 Pyth 预言机数据

项目包含5套完整的测试用例，总计30+个测试场景：- **本地网络**: 使用 MockPyth 模拟数据

- **支持功能**:

### 测试文件结构  - 实时价格更新

  - 批量价格查询

```  - 价格数据有效性检查

test/  - 自动过滤无效数据 (价格为0或时间戳为0)

├── 01-token-factory.test.js     # 代币工厂功能测试

├── 02-stock-token.test.js       # 股票代币基础功能测试  ### 安全特性

├── 03-exchange.test.js          # 交易系统完整测试 (22个测试用例)

├── 04-stock-token-upgrade.test.js # 股票代币升级测试- **可升级代理**: 使用 OpenZeppelin 透明代理模式

└── 05-oracle-upgrade.test.js    # 预言机升级测试- **权限控制**: 基于 Ownable 的访问控制

```- **价格验证**: 多重检查确保价格数据有效性

- **重入保护**: 防止重入攻击

### 关键测试场景- **Gas 优化**: 优化的合约设计和存储布局



- ✅ **代币创建**: 工厂合约创建各种股票代币## 测试覆盖

- ✅ **价格查询**: 实时获取Pyth Network价格数据

- ✅ **买入交易**: USDT购买股票代币的完整流程项目包含完整的测试套件，支持本地和 Sepolia 网络测试：

- ✅ **卖出交易**: 股票代币兑换USDT的完整流程

- ✅ **滑点保护**: 价格波动时的交易保护机制### 测试文件

- ✅ **权限控制**: 管理员权限和用户权限测试

- ✅ **升级测试**: UUPS代理合约升级功能验证#### 01-token-factory.test.js

- ✅ **错误处理**: 各种边界条件和错误情况处理- 代币工厂合约功能测试

- 代币创建和管理

## 💼 使用示例- 权限控制验证

- 初始化参数检查

### 基础交易流程

#### 02-stock-token.test.js  

```javascript- 股票代币功能测试

// 1. 连接到已部署的合约- 价格查询和验证

const tokenFactory = await ethers.getContractAt("TokenFactory", FACTORY_ADDRESS);- 批量价格操作测试

const aaplToken = await ethers.getContractAt("StockToken", AAPL_ADDRESS);- 精度转换验证

const usdtToken = await ethers.getContractAt("MockERC20", USDT_ADDRESS);- 网络兼容性测试 (本地 vs Sepolia)



// 2. 授权USDT使用### 网络适配测试

await usdtToken.approve(AAPL_ADDRESS, ethers.parseUnits("1000", 6));

- **本地网络**: 使用 MockPyth 进行快速测试

// 3. 获取实时价格和手续费- **Sepolia 网络**: 使用真实 Pyth 数据进行集成测试

const [price, fee] = await aaplToken.getBuyPriceAndFee(ethers.parseEther("10"));- **自动网络检测**: 根据网络环境自动选择测试策略



// 4. 购买股票代币### 价格数据测试

const overrides = { 

  value: fee,- 实时价格获取验证

  gasLimit: 500000,- 批量价格更新测试  

  gasPrice: ethers.parseUnits("2", "gwei")- 价格数据有效性检查

};- 异常情况处理 (价格为0、网络错误等)

await aaplToken.buy(ethers.parseEther("10"), overrides);

运行测试覆盖率检查：

// 5. 卖出股票代币  

await aaplToken.sell(ethers.parseEther("5"), overrides);```bash

```npm run coverage

```

### 合约升级示例

## 部署指南

```javascript

// 1. 使用forceImport导入现有代理## 部署指南

const StockToken = await ethers.getContractFactory("StockToken");

const importedProxy = await upgrades.forceImport(PROXY_ADDRESS, StockToken, { kind: 'uups' });### 支持的网络



// 2. 升级到V2版本- **hardhat/localhost**: 本地开发网络 (使用 MockPyth)

const StockTokenV2 = await ethers.getContractFactory("StockTokenV2");- **sepolia**: Sepolia 测试网 (使用真实 Pyth 预言机)

const upgradedProxy = await upgrades.upgradeProxy(importedProxy, StockTokenV2);- **mainnet**: 以太坊主网 (生产环境)



// 3. 使用V2新功能### 部署合约顺序

await upgradedProxy.setUpgradeNote("Successfully upgraded to V2");

const note = await upgradedProxy.getUpgradeNote();1. **MockERC20_USDT**: 基础稳定币代币

```2. **OracleAggregator**: 预言机聚合器 (连接 Pyth Network)

3. **StockToken_Implementation**: 股票代币实现合约

## 🔧 技术栈4. **TokenFactory**: 代币工厂 (可升级透明代理)



### 区块链技术### 自动化部署



- **Solidity 0.8.22**: 智能合约开发语言使用 hardhat-deploy 进行自动化部署：

- **Hardhat**: 开发框架和测试环境

- **OpenZeppelin**: 安全的合约库和升级框架```bash

- **Ethers.js v6**: 区块链交互库# 本地部署

npm run deploy:localhost

### 外部集成

# Sepolia 测试网部署  

- **Pyth Network**: 去中心化价格预言机npm run deploy:sepolia

- **Etherscan API**: 合约验证和监控```



### 开发工具### 部署后配置



- **Chai**: 测试断言库部署脚本会自动完成以下配置：

- **Mocha**: 测试框架

- **dotenv**: 环境变量管理1. 设置价格源 Feed IDs (6 个主流股票)

- **TypeChain**: TypeScript类型生成2. 创建初始股票代币 (AAPL, TSLA, GOOGL 等)

3. 分配测试 USDT 代币给测试账户

## 📋 脚本命令4. 验证所有合约配置和功能



| 命令 | 功能描述 |### Pyth Network 配置

|------|----------|

| `npm run compile` | 编译所有智能合约 |#### Feed IDs 配置

| `npm test` | 运行所有测试用例 |```javascript

| `npm run deploy:full:sepolia` | 部署完整系统到Sepolia |const FEED_IDS = {

| `npm run verify:sepolia` | 验证Sepolia上的合约 |  "AAPL": "0x49f6b65cb1de6b10eaf75e7c03ca029c306d0357e91b5311b175084a5ad55688",

| `npm run node` | 启动本地Hardhat节点 |  "TSLA": "0x82c4d954fce9132f936100aa0b51628d7ac01888e4b46728d5d3f5778eb4c1d2", 

| `npm run clean` | 清理编译缓存 |  "GOOGL": "0x5a48c03e9b9cb337801073ed9d166817473697efff0d138874e0f6a33d6d5aa6",

| `npm run coverage` | 生成测试覆盖率报告 |  "MSFT": "0xd0ca23c1cc005e004ccf1db5bf76aeb6a49218f43dac3d4b275e92de12ded4d1",

  "AMZN": "0xb5d0e0fa58a1f8b81498ae670ce93c872d14434b72c364885d4fa1b257cbb07a",

## 🔐 安全特性  "NVDA": "0xb1073854ed24cbc755dc527418f52b7d271f6cc967bbf8d8129112b18860a593"

};

### 合约安全机制```



- **重入保护**: 使用OpenZeppelin的ReentrancyGuard#### 网络特定配置

- **暂停机制**: 紧急情况下可暂停合约操作- **Sepolia**: 使用官方 Pyth 合约地址 `0xDd24F84d36BF92C65F92307595335bdFab5Bbd21`

- **权限控制**: 基于角色的访问控制- **本地**: 部署 MockPyth 合约进行测试

- **滑点保护**: 交易价格波动保护机制

- **溢出保护**: Solidity 0.8.x内置溢出检查## 使用示例

- **升级安全**: UUPS代理模式，只有管理员可升级

### 创建股票代币

### 最佳实践

```javascript

- ✅ 使用最新版本的OpenZeppelin库const tokenFactory = await ethers.getContractAt("TokenFactory", factoryAddress);

- ✅ 遵循CEI (Checks-Effects-Interactions) 模式

- ✅ 完整的事件日志记录// 创建 Apple 股票代币

- ✅ 详细的错误消息const tx = await tokenFactory.createToken(

- ✅ Gas优化考虑  "Apple Stock Token",                    // 代币名称

- ✅ 全面的测试覆盖  "AAPL",                                // 代币符号  

  ethers.utils.parseEther("1000000")     // 初始供应量 (100万代币)

## 🤝 贡献指南);

await tx.wait();

1. Fork 本仓库

2. 创建功能分支 (`git checkout -b feature/amazing-feature`)// 获取创建的代币地址

3. 提交更改 (`git commit -m 'Add amazing feature'`)const aaplTokenAddress = await tokenFactory.getTokenAddress("AAPL");

4. 推送分支 (`git push origin feature/amazing-feature`)console.log("AAPL 代币地址:", aaplTokenAddress);

5. 创建Pull Request```



### 开发规范### 查询股票价格



- 遵循Solidity风格指南```javascript

- 添加完整的注释和文档const stockToken = await ethers.getContractAt("StockToken", aaplTokenAddress);

- 确保所有测试通过

- 更新相关文档// 获取实时股票价格

const price = await stockToken.getStockPrice();

## 📄 许可证console.log(`AAPL 当前价格: $${ethers.utils.formatEther(price)}`);



本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件获取详细信息。// 获取详细价格信息

const priceInfo = await oracleAggregator.getPrice("AAPL");

## 🔗 相关链接console.log(`价格: $${ethers.utils.formatEther(priceInfo.price)}`);

console.log(`发布时间: ${new Date(priceInfo.publishTime * 1000).toISOString()}`);

- [Hardhat 文档](https://hardhat.org/docs)```

- [OpenZeppelin 文档](https://docs.openzeppelin.com/)

- [Pyth Network](https://pyth.network/)### 批量价格更新

- [Ethers.js 文档](https://docs.ethers.org/v6/)

- [Solidity 文档](https://docs.soliditylang.org/)```javascript

const { fetchUpdateData } = require('./utils/getPythUpdateData');

## ⚠️ 免责声明

// 获取多个股票的价格更新数据

本项目仅用于教育和研究目的。在生产环境中使用前，请进行充分的安全审计。数字资产投资存在风险，请谨慎投资。const symbols = ["AAPL", "GOOGL", "MSFT"];

const updateData = await fetchUpdateData(symbols);

---

// 计算更新费用

**联系方式**: 如有问题或建议，请通过GitHub Issues联系我们。const fee = await oracleAggregator.getUpdateFee(updateData);

// 批量更新和查询价格
const result = await oracleAggregator.updateAndGetPrices(
  symbols,
  updateData,
  { value: fee }
);

const [prices, publishTimes] = result;
for (let i = 0; i < symbols.length; i++) {
  console.log(`${symbols[i]}: $${ethers.utils.formatEther(prices[i])}`);
}
```

### Pyth API 集成

```javascript
// 直接使用 Pyth HTTP API
const { fetchUpdateData, getPriceInfo } = require('./utils/getPythUpdateData');

// 获取单个股票的价格信息 (仅显示用)
const priceInfo = await getPriceInfo("AAPL");
console.log("AAPL 价格信息:", priceInfo);

// 获取批量更新数据 (用于链上调用)
const updateData = await fetchUpdateData(["AAPL", "TSLA"]);
console.log("更新数据:", updateData);
```

## 故障排除

### 常见问题

#### 价格相关问题

1. **价格显示为 0**
   - 检查网络连接到 Pyth API
   - 确认 Feed ID 配置正确
   - 验证股票市场是否开市 (非交易时间价格可能为0)

2. **批量价格更新失败**
   - 检查是否有足够的 ETH 支付更新费用
   - 确认 updateData 格式正确
   - 过滤掉价格为0的无效数据

#### 部署问题

3. **合约部署失败**
   - 检查 Gas limit 设置
   - 确认私钥配置正确
   - 验证网络 RPC 连接

4. **Pyth 集成问题**
   - Sepolia: 确认使用官方 Pyth 合约地址
   - 本地: 确认 MockPyth 正确部署和配置

#### 测试问题

5. **测试超时或失败**
   - 增加测试超时时间 (Sepolia 网络较慢)
   - 检查网络连接稳定性
   - 确认测试账户有足够余额

### 调试工具

```bash
# 查看合约交互详情
npx hardhat console --network sepolia

# 生成 Gas 使用报告
REPORT_GAS=true npm test

# 查看测试覆盖率
npm run coverage

# 验证合约代码
npm run verify --network sepolia
```

### 环境检查

```javascript
// 检查网络配置
console.log("网络:", hre.network.name);
console.log("Chain ID:", await ethers.provider.getNetwork());

// 检查账户余额
const accounts = await ethers.getSigners();
const balance = await accounts[0].getBalance();
console.log("部署者余额:", ethers.utils.formatEther(balance), "ETH");

// 检查合约部署状态
const deployments = await hre.deployments.all();
console.log("已部署合约:", Object.keys(deployments));
```

## 贡献指南

### 开发流程

1. Fork 项目仓库
2. 创建功能分支: `git checkout -b feature/your-feature`
3. 编写代码和测试用例
4. 运行测试确保通过: `npm test`
5. 提交更改: `git commit -m "Add your feature"`
6. 推送分支: `git push origin feature/your-feature`
7. 创建 Pull Request

### 代码规范

- **Solidity**: 遵循 OpenZeppelin 和 Hardhat 推荐的编码标准
- **JavaScript**: 使用 ES6+ 语法，保持代码简洁明了
- **测试**: 为新功能编写完整的测试用例
- **文档**: 更新相关文档和注释

### 测试要求

- 新增功能必须包含单元测试
- 测试覆盖率不低于现有水平
- 确保本地和 Sepolia 网络测试都通过

## 安全建议

### 主网部署前检查

- **代码审计**: 建议进行专业的智能合约安全审计
- **测试网验证**: 在 Sepolia 测试网充分测试所有功能
- **Price Feed 验证**: 确认所有价格源 Feed ID 正确无误
- **Gas 优化**: 优化合约调用减少用户成本
- **监控系统**: 部署价格异常监控和报警系统

### 运行时安全

- **价格数据验证**: 内置多重检查防止异常价格数据
- **访问控制**: 严格的权限管理和多签钱包
- **紧急暂停**: 预留紧急暂停和升级机制
- **资金安全**: 合约不持有用户资金，降低风险

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 相关链接

- **Pyth Network**: https://pyth.network/ - 去中心化预言机网络
- **OpenZeppelin**: https://openzeppelin.com/ - 安全智能合约库
- **Hardhat**: https://hardhat.org/ - 以太坊开发框架
- **Sepolia 测试网**: https://sepolia.etherscan.io/ - 测试网区块浏览器

## 联系方式

- **GitHub Issues**: 提交 Bug 报告和功能请求
- **技术文档**: 查看项目 Wiki 获取详细技术文档
- **社区讨论**: 加入我们的技术交流群

## 版本历史

- **v1.0.0**: 初始版本
  - TokenFactory 代币工厂实现
  - StockToken ERC20 股票代币
  - OracleAggregator 预言机集成
  - Pyth Network 实时价格数据
  - 完整测试套件和部署脚本

---

⚠️ **免责声明**: 本项目仅供学习和研究使用。智能合约涉及金融风险，请在充分理解代码逻辑和风险的前提下使用。投资有风险，请谨慎决策。
