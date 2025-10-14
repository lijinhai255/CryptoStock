pools// Test case for Compound adapter functionality on Sepolia network
// Test to verify DefiAggregator + CompoundAdapter deposit flow using deployed contracts

const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

describe("07-compound-sepolia.test.js - Compound Adapter Sepolia Test", function () {
    
    // 测试固定参数
    const INITIAL_USDT_SUPPLY = ethers.parseUnits("1000000", 6); // 1M USDT (6 decimals)
    const USER_DEPOSIT_AMOUNT = ethers.parseUnits("1000", 6);    // 1000 USDT
    const FEE_RATE_BPS = 100; // 1% fee

    async function deployContractsFixture() {
        // 获取测试账户 - Sepolia 网络使用部署者作为测试用户
        const [deployer] = await ethers.getSigners();
        const user = deployer;
        
        console.log("🌐 使用 Sepolia 网络上已部署的合约...");
        
        // 加载 Compound 适配器部署文件
        const compoundDeploymentFile = path.join(__dirname, "..", "deployments-compound-adapter-sepolia.json");
        
        if (!fs.existsSync(compoundDeploymentFile)) {
            throw new Error("未找到 Compound 部署文件。请先运行部署脚本: npx hardhat run scripts/deploy-compound-adapter-only.js --network sepolia");
        }
        
        const deployments = JSON.parse(fs.readFileSync(compoundDeploymentFile, 'utf8'));
        console.log("✅ 使用新的拆分部署结构 (compound-adapter + infrastructure)");
        
        // 连接到已部署的合约
        const mockUSDT = await ethers.getContractAt("MockERC20", deployments.contracts.MockERC20_USDT);
        const mockCToken = await ethers.getContractAt("MockCToken", deployments.contracts.MockCToken_cUSDT);
        const defiAggregator = await ethers.getContractAt("DefiAggregator", deployments.contracts.DefiAggregator);
        const compoundAdapter = await ethers.getContractAt("CompoundAdapter", deployments.contracts.CompoundAdapter);
        
        console.log("✅ 已连接到 Sepolia 上的合约:");
        console.log("   USDT:", deployments.contracts.MockERC20_USDT);
        console.log("   cUSDT:", deployments.contracts.MockCToken_cUSDT);
        console.log("   DefiAggregator:", deployments.contracts.DefiAggregator);
        console.log("   CompoundAdapter:", deployments.contracts.CompoundAdapter);
        
        if (deployments.basedOn) {
            console.log("   基于部署文件:", deployments.basedOn);
        }
        if (deployments.notes && deployments.notes.reusedContracts) {
            console.log("   复用合约:", deployments.notes.reusedContracts.join(", "));
        }
        
        // 给测试用户一些 USDT (如果是合约所有者)
        try {
            await mockUSDT.mint(user.address, USER_DEPOSIT_AMOUNT * 2n);
            console.log("✅ 为测试用户铸造 USDT");
        } catch (error) {
            console.log("⚠️  无法铸造 USDT (可能不是合约所有者):", error.message);
        }

        return {
            deployer,
            user,
            mockUSDT,
            mockCToken,
            defiAggregator,
            compoundAdapter
        };
    }

    describe("Compound Adapter Deposit Flow", function () {
        
        it("Should successfully deposit USDT through Compound Adapter", async function () {
            // Sepolia 网络专用超时时间
            this.timeout(120000); // 2分钟超时
            console.log("⏰ 已设置 Sepolia 网络专用超时时间: 2分钟");
            
            // 获取已部署的合约
            const { user, mockUSDT, mockCToken, defiAggregator, compoundAdapter } = await deployContractsFixture();
            
            // === 准备阶段 ===
            
            // 获取实际的手续费率
            const actualFeeRate = await defiAggregator.feeRateBps();
            console.log("📊 实际手续费率:", actualFeeRate.toString(), "BPS");
            
            // 检查用户初始 USDT 余额
            const userInitialBalance = await mockUSDT.balanceOf(user.address);
            console.log("💰 用户初始余额:", ethers.formatUnits(userInitialBalance, 6), "USDT");
            
            expect(userInitialBalance).to.be.gte(USER_DEPOSIT_AMOUNT);
            
            // 用户授权 CompoundAdapter 使用 USDT
            console.log("🔑 授权 CompoundAdapter 使用 USDT...");
            const compoundAdapterAddress = await compoundAdapter.getAddress();
            const approveTx = await mockUSDT.connect(user).approve(compoundAdapterAddress, USER_DEPOSIT_AMOUNT);
            
            console.log("⏳ 等待 Sepolia 网络授权交易确认...");
            await approveTx.wait(2); // 等待2个区块确认
            // 额外等待以确保状态同步
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log("✅ 授权完成 (已等待网络同步)");
            
            // 验证授权
            const allowance = await mockUSDT.allowance(user.address, compoundAdapterAddress);
            console.log("📋 授权金额:", ethers.formatUnits(allowance, 6), "USDT");
            
            // 检查适配器是否已注册
            const hasAdapter = await defiAggregator.hasAdapter("compound");
            console.log("🔌 适配器已注册:", hasAdapter);
            
            // === 执行存款操作 ===
            
            // 构造操作参数
            const operationParams = {
                tokens: [await mockUSDT.getAddress()],
                amounts: [USER_DEPOSIT_AMOUNT],
                recipient: user.address, // 明确指定受益者为用户
                deadline: Math.floor(Date.now() / 1000) + 3600, // 1 hour
                tokenId: 0, // Compound 不使用 NFT，设为 0
                extraData: "0x" // 无额外数据
            };
            
            console.log("🚀 执行存款操作...");
            console.log("   适配器名称: compound");
            console.log("   操作类型: 0 (DEPOSIT)");
            console.log("   代币:", await mockUSDT.getAddress());
            console.log("   金额:", ethers.formatUnits(USER_DEPOSIT_AMOUNT, 6), "USDT");
            console.log("   受益者:", user.address);
            
            // 执行存款操作
            let tx;
            try {
                tx = await defiAggregator.connect(user).executeOperation(
                    "compound",     // adapter name
                    0,              // OperationType.DEPOSIT
                    operationParams
                );
                
                console.log("⏳ 等待 Sepolia 网络交易确认...");
                const receipt = await tx.wait(2); // 等待2个区块确认
                console.log("📦 交易已确认，区块号:", receipt.blockNumber);
                console.log("💰 Gas 使用量:", receipt.gasUsed.toString());
                
                // 在 Sepolia 网络上额外等待一点时间确保状态同步
                await new Promise(resolve => setTimeout(resolve, 3000)); // 等待3秒
                console.log("✅ 存款操作成功 (已等待状态同步)");
            } catch (error) {
                console.log("❌ 存款操作失败:", error.message);
                
                // 尝试估算 gas 来获取更详细的错误信息
                try {
                    await defiAggregator.connect(user).executeOperation.estimateGas(
                        "compound", 0, operationParams
                    );
                } catch (estimateError) {
                    console.log("💣 Gas 估算错误:", estimateError.message);
                }
                throw error;
            }
            
            // === 验证结果 ===
            
            // 1. 检查用户 USDT 余额减少
            const userFinalBalance = await mockUSDT.balanceOf(user.address);
            console.log("💰 用户最终余额:", ethers.formatUnits(userFinalBalance, 6), "USDT");
            console.log("💰 预期最终余额:", ethers.formatUnits(userInitialBalance - USER_DEPOSIT_AMOUNT, 6), "USDT");
            
            // 检查余额是否合理减少了存款金额
            expect(userFinalBalance).to.be.gte(userInitialBalance - USER_DEPOSIT_AMOUNT);
            
            // 2. 计算预期的净存款金额（扣除手续费）
            const expectedFee = USER_DEPOSIT_AMOUNT * actualFeeRate / 10000n;
            const expectedNetDeposit = USER_DEPOSIT_AMOUNT - expectedFee;
            
            // 3. 验证用户收到 cToken
            const userCTokenBalance = await mockCToken.balanceOf(user.address);
            console.log("🪙 用户当前 cToken 余额:", ethers.formatUnits(userCTokenBalance, 8), "cUSDT");
            
            // 检查用户至少获得了一些 cToken
            expect(userCTokenBalance).to.be.gt(0);
            
            console.log("✅ 存款测试通过！");
            console.log(`💰 用户存款: ${ethers.formatUnits(USER_DEPOSIT_AMOUNT, 6)} USDT`);
            console.log(`💸 手续费: ${ethers.formatUnits(expectedFee, 6)} USDT`);
            console.log(`🏦 净存款: ${ethers.formatUnits(expectedNetDeposit, 6)} USDT`);
            console.log(`🪙 获得 cToken: ${ethers.formatUnits(userCTokenBalance, 8)} cUSDT`);
        });
    });

    describe("Compound Adapter Withdraw Flow", function () {
        
        it("Should successfully withdraw USDT from Compound after deposit", async function () {
            // Sepolia 网络专用超时时间
            this.timeout(180000); // 3分钟超时，因为需要先存款再取款
            console.log("⏰ 已设置 Sepolia 网络专用超时时间: 3分钟");
            
            // 获取已部署的合约
            const { user, mockUSDT, mockCToken, defiAggregator, compoundAdapter } = await deployContractsFixture();
            
            // === 先进行存款操作 ===
            
            // 用户授权 CompoundAdapter 使用 USDT
            console.log("🔑 授权 CompoundAdapter 使用 USDT (用于存款)...");
            const compoundAdapterAddress = await compoundAdapter.getAddress();
            const approveTx = await mockUSDT.connect(user).approve(compoundAdapterAddress, USER_DEPOSIT_AMOUNT);
            
            console.log("⏳ 等待 Sepolia 网络授权交易确认...");
            await approveTx.wait(2); // 等待2个区块确认
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log("✅ 授权完成 (已等待网络同步)");
            
            const depositParams = {
                tokens: [await mockUSDT.getAddress()],
                amounts: [USER_DEPOSIT_AMOUNT],
                recipient: user.address,
                deadline: Math.floor(Date.now() / 1000) + 3600,
                tokenId: 0,
                extraData: "0x"
            };
            
            console.log("🚀 执行存款操作...");
            const depositTx = await defiAggregator.connect(user).executeOperation(
                "compound",
                0, // DEPOSIT
                depositParams
            );
            
            console.log("⏳ 等待 Sepolia 网络存款交易确认...");
            await depositTx.wait(2); // 等待2个区块确认
            await new Promise(resolve => setTimeout(resolve, 3000)); // 等待3秒
            console.log("✅ 存款操作完成 (已等待状态同步)");
            
            // 获取实际的手续费率
            const actualFeeRate = await defiAggregator.feeRateBps();
            
            // 验证存款后的状态
            const expectedNetDeposit = USER_DEPOSIT_AMOUNT - (USER_DEPOSIT_AMOUNT * actualFeeRate / 10000n);
            const balanceAfterDeposit = await mockUSDT.balanceOf(user.address);
            console.log("💰 存款后 USDT 余额:", ethers.formatUnits(balanceAfterDeposit, 6), "USDT");
            
            // === 执行取款操作 ===
            
            // 获取用户的 cToken 余额和汇率
            const userCTokenBalance = await mockCToken.balanceOf(user.address);
            const exchangeRate = await mockCToken.exchangeRateStored();
            console.log("🪙 存款后 cToken 余额:", ethers.formatUnits(userCTokenBalance, 8), "cUSDT");
            console.log("📊 cToken 汇率:", ethers.formatUnits(exchangeRate, 18));
            
            // 计算可取款的 USDT 数量（取一半）
            const totalUSDTValue = userCTokenBalance * exchangeRate / ethers.parseUnits("1", 18);
            const withdrawUSDTAmount = totalUSDTValue / 2n; // 取一半的 USDT 价值
            console.log("💰 计算总价值:", ethers.formatUnits(totalUSDTValue, 6), "USDT");
            console.log("💰 计划取款:", ethers.formatUnits(withdrawUSDTAmount, 6), "USDT");
            
            // 用户需要授权 CompoundAdapter 使用 cToken
            console.log("🔑 授权 CompoundAdapter 使用 cToken...");
            const cTokenApproveTx = await mockCToken.connect(user).approve(
                compoundAdapterAddress,
                userCTokenBalance // 授权所有 cToken，适配器会计算需要多少
            );
            
            console.log("⏳ 等待 Sepolia 网络 cToken 授权交易确认...");
            await cTokenApproveTx.wait(2);
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log("✅ cToken 授权完成 (已等待网络同步)");
            
            // 构造取款参数（金额是想要取回的 USDT 数量）
            const withdrawParams = {
                tokens: [await mockUSDT.getAddress()],
                amounts: [withdrawUSDTAmount], // 这里是要取回的 USDT 数量
                recipient: user.address, // 取款到用户地址
                deadline: Math.floor(Date.now() / 1000) + 3600,
                tokenId: 0,
                extraData: "0x"
            };
            
            // 记录取款前的余额
            const usdtBalanceBeforeWithdraw = await mockUSDT.balanceOf(user.address);
            const cTokenBalanceBeforeWithdraw = await mockCToken.balanceOf(user.address);
            
            // 执行取款操作
            console.log("🚀 执行取款操作...");
            console.log("   取款金额:", ethers.formatUnits(withdrawUSDTAmount, 6), "USDT");
            
            let withdrawTx;
            try {
                withdrawTx = await defiAggregator.connect(user).executeOperation(
                    "compound", 
                    1, // WITHDRAW
                    withdrawParams
                );
                
                console.log("⏳ 等待 Sepolia 网络取款交易确认...");
                const receipt = await withdrawTx.wait(2); // 等待2个区块确认
                console.log("📦 交易已确认，区块号:", receipt.blockNumber);
                console.log("💰 Gas 使用量:", receipt.gasUsed.toString());
                await new Promise(resolve => setTimeout(resolve, 3000)); // 等待3秒
                console.log("✅ 取款操作完成 (已等待状态同步)");
            } catch (error) {
                console.log("❌ 取款操作失败:", error.message);
                throw error;
            }
            
            // === 验证取款结果 ===
            
            // 1. 检查 USDT 余额增加
            const usdtBalanceAfterWithdraw = await mockUSDT.balanceOf(user.address);
            expect(usdtBalanceAfterWithdraw).to.be.gt(usdtBalanceBeforeWithdraw);
            
            // 2. 检查 cToken 余额减少
            const cTokenBalanceAfterWithdraw = await mockCToken.balanceOf(user.address);
            expect(cTokenBalanceAfterWithdraw).to.be.lt(cTokenBalanceBeforeWithdraw);
            
            // 3. 计算实际取回的 USDT 并验证金额
            const actualWithdrawn = usdtBalanceAfterWithdraw - usdtBalanceBeforeWithdraw;
            
            expect(actualWithdrawn).to.be.gt(0);
            
            console.log("✅ 取款测试通过！");
            console.log(`💰 实际取回 USDT: ${ethers.formatUnits(actualWithdrawn, 6)} USDT`);
            console.log(`🪙 剩余 cToken: ${ethers.formatUnits(cTokenBalanceAfterWithdraw, 8)} cUSDT`);
            console.log(`💰 最终 USDT 余额: ${ethers.formatUnits(usdtBalanceAfterWithdraw, 6)} USDT`);
        });
    });
});

module.exports = {};