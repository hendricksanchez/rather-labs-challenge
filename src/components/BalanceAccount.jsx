import { useEffect } from "react";
import useWallet from "../hooks/useWallet";

const BalanceAccount = () => {
  
  const {
    isWalletConnected,
    tokenBalance,
    tokenName,
    tokenSymbol,
    walletAddress,
  } = useWallet();

  if (!isWalletConnected && !walletAddress) return '';

  return (
    <>
      {isWalletConnected && walletAddress && (
        <div>
          <div className="p-3 bg-blue-200 items-center text-blue-600 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
            {tokenName && tokenSymbol && tokenBalance && (
              <span className="flex rounded-full bg-blue-500 px-2 py-1 text-base font-bold text-white mr-3">{`${tokenName} ($${tokenSymbol}): ${tokenBalance}`}</span>
            )}
            <span className="font-semibold text-left flex-auto">{`Account ${walletAddress.substring(0, 5)}...${walletAddress.substring(walletAddress.length-4)}`}</span>
          </div>
        </div>
      )}
    </>
  );
}
 
export default BalanceAccount;