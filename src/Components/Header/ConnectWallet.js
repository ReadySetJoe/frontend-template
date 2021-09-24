import { Button } from "@mui/material";
import { useEffect, useState } from "react";

function ConnectWallet() {
  const [walletAddress, setWallet] = useState("");

  useEffect(() => {
    const getWalletAndAddListener = async () => {
      await getWallet();
      addWalletListener();
    };
    getWalletAndAddListener();
  }, []);

  const getWallet = async (args = {}) => {
    const method = args.request ? "eth_requestAccounts" : "eth_accounts";
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method,
        });
        setWallet(addressArray[0] || "");
      } catch (err) {
        setWallet("");
      }
    } else {
      setWallet("");
    }
  };

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
        }
      });
    }
  };
  console.log("walletAddress", walletAddress);

  return (
    <div className="m-3">
      <Button variant="outlined" onClick={() => getWallet({ request: true })}>
        {
          <>
            {walletAddress.length > 0 ? (
              String(walletAddress).substring(0, 6) +
              "..." +
              String(walletAddress).substring(38)
            ) : (
              <span>Connect Wallet</span>
            )}
          </>
        }
      </Button>
    </div>
  );
}

export default ConnectWallet;
