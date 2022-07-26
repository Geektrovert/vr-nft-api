import { newKit, ContractKit } from "@celo/contractkit";

import SpaceTokenABI from "../abi/SpaceTokenABI.json";

export function getKitWithAccount() {
  const kit = newKit(process.env.RPC_URL!);
  kit.defaultAccount = process.env.WALLET_ADDRESS;
  kit.connection.addAccount(process.env.RINKEBY_PRIVATE_KEY!);

  return kit;
}

export function getSpaceToken(kit: ContractKit) {
  return new kit.web3.eth.Contract(
    // @ts-ignore
    SpaceTokenABI,
    process.env.CONTRACT_ADDRESS
  );
}
