const networks = {
  ropsten: {
      chainId: 3,
      chainName: "Ethereum Testnet Ropsten",
      nativeCurrency: {
        name: "Ropsten Ether",
        symbol: "ROP",
        decimals: 18
      },
      rpcUrls: ["https://ropsten.infura.io/v3/"],
      blockExplorerUrls: ["https://ropsten.etherscan.io"]
  }
}
 
export default networks;
