import Web3 from "web3";

import SpaceTokenABI from "../abi/SpaceTokenABI.json";

export function getWeb3WithAccount() {
  const web3 = new Web3(process.env.RPC_URL!);
  const account = web3.eth.accounts.privateKeyToAccount(
    `0x${process.env.RINKEBY_PRIVATE_KEY!}`
  );
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;

  return web3;
}

export function getSpaceToken(web3: Web3) {
  return new web3.eth.Contract(
    // @ts-ignore
    SpaceTokenABI,
    process.env.CONTRACT_ADDRESS
  );
}
