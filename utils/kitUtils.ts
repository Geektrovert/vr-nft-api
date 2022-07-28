import { newKit, ContractKit } from "@celo/contractkit";

import SpaceTokenABI from "../abi/SpaceTokenABI.json";

export function getKitWithAccount() {
  const kit = newKit(process.env.RPC_URL!);
  const account = kit.web3.eth.accounts.privateKeyToAccount(`0x${process.env.RINKEBY_PRIVATE_KEY!}`);
  kit.web3.eth.accounts.wallet.add(account);
  kit.web3.eth.defaultAccount = account.address;

  return kit;
}

export function getSpaceToken(kit: ContractKit) {
  return new kit.web3.eth.Contract(
    // @ts-ignore
    SpaceTokenABI,
    process.env.CONTRACT_ADDRESS
  );
}
