import {Contract, providers, utils} from "ethers";
import { useRef, useState, useEffect } from "react";
import Web3Modal from "web3modal";
import {TOKEN_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, FAUCET_CONTRACT_ADDRESS, FAUCET_CONTRACT_ABI} from "./constants";
import './App.css';

function App() {


  const [walletConnected, setWalletConnected] = useState(false);
  const [ZCDUserBalance, setZCDUserBalance] = useState(0);
  const web3modal = useRef();
  const [warning, setWarning] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const getZCDBalance = async (provider , address) => {
    try {
      const tokenContract = new Contract(
        TOKEN_CONTRACT_ADDRESS,
        TOKEN_CONTRACT_ABI,
        provider
      );
      const addressBalance = await tokenContract.balanceOf(address);
      return addressBalance;
    } catch (err) {
      console.log(err);
    }
  }
  
  const getZCDamount = async () => {
    try {
      const provider = await getProviderOrSigner(false);
      const signer = await getProviderOrSigner(true);
      const address = await signer.getAddress();
      
      const _zcdBlanace = await getZCDBalance(provider, address);
      setZCDUserBalance(_zcdBlanace);
    } catch (err) {
      console.log(err);
    }
  }


  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3modal.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Goerli network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3modal.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
      getZCDamount();
    }
  }, [walletConnected]);

  const withdrawToken = async (signer) => {
    try {
      const faucetContract = new Contract(
        FAUCET_CONTRACT_ADDRESS,
        FAUCET_CONTRACT_ABI,
        signer
      );
      let tx = faucetContract.withdraw({gasLimit: 100000});
      await tx.wait();
    } catch (err) {
      console.log(err);
    }
  }

  const withdraw = async () => {
    try {
    if (utils.formatEther(ZCDUserBalance) > 24) {
      setWarning("dont greed, you have enough tokens");
      setDisableButton(true);
    } else {
      const signer = await getProviderOrSigner(true);
      
      await withdrawToken(signer);
      
      await getZCDamount();
    }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="App">
      
      <h1>
        Welcome to ZCD-Faucet!
      </h1>

    <div className="buttons">
      {walletConnected ? <button onClick={withdraw} className="withdraw-button" disabled={disableButton}>withdraw</button> :  
         <button onClick={connectWallet} className="connect-button" > Connect Wallet </button>}
    </div>

    <div className="warning">
      <p className="warning-message">
      {warning == "" ? "" : warning}
      </p>
    </div>
    <div className="balance">
     You have {utils.formatEther(ZCDUserBalance)} ZCD
     </div>

    <div className="faucet-div">
      <img src="https://t3.ftcdn.net/jpg/03/88/93/22/360_F_388932211_RuO271Qr1diwiSptd2Ncnd7TC3N3O5cg.jpg" id="faucet" />
    </div>
    </div>
  );
}

export default App;
