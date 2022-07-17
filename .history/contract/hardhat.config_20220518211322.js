require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: '0.8.2',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/QYVfuSohP9-2lJAfv_xie3g_JM5a3-PS',
      accounts: ['dfaaaf71787e54f3d9927e16eff3fa0ce300d74f7173c901ac6a87a91ac3b2be',],
    }
  }
};

