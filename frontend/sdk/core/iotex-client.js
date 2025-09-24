import { Web3 } from 'web3';

export class IoTeXClient {
  constructor(config = {}) {
    this.rpcUrl = config.rpcUrl || 'https://babel-api.mainnet.iotex.io';
    this.web3 = new Web3(this.rpcUrl);
    this.chainId = 4689;
  }

  async connectWallet() {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await this.web3.eth.getAccounts();
        return accounts[0];
      } catch (error) {
        throw new Error('Failed to connect wallet: ' + error.message);
      }
    }
    throw new Error('No Web3 wallet found');
  }

  async getBalance(address) {
    const balance = await this.web3.eth.getBalance(address);
    return this.web3.utils.fromWei(balance, 'ether');
  }

  async createEscrow(betData, amount) {
    const contract = new this.web3.eth.Contract(ESCROW_ABI, ESCROW_CONTRACT_ADDRESS);
    const accounts = await this.web3.eth.getAccounts();
    return contract.methods.createBet(betData).send({
      from: accounts[0],
      value: this.web3.utils.toWei(amount, 'ether')
    });
  }
}