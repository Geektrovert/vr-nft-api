import type { NextApiRequest, NextApiResponse } from "next";
import { newKit } from "@celo/contractkit";

import SpaceTokenABI from "../../abi/SpaceTokenABI.json";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const params = req.query;
  const address = params.address;
  const name = params.name;

  if (!address || !name) {
    res.status(400).json({
      message: "Missing required query parameters: address and name",
    });
    return;
  }

  const kit = newKit(process.env.RPC_URL!);
  kit.defaultAccount = process.env.WALLET_ADDRESS;
  kit.connection.addAccount(process.env.RINKEBY_PRIVATE_KEY!);
  const token = new kit.web3.eth.Contract(
    // @ts-ignore
    SpaceTokenABI,
    process.env.CONTRACT_ADDRESS
  );

  try {
    const result = await token.methods.safeMint(address, name).call();
    console.log({ result })
    res.status(200).json({ message: "Successfully minted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
