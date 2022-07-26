import type { NextApiRequest, NextApiResponse } from "next";
import { newKit, ContractKit } from "@celo/contractkit";

import SpaceTokenABI from "../../abi/SpaceTokenABI.json";

type Error = {
  message: string;
};

type Data = {
  status: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const params = req.query;
  const name = params.name;

  if (!name) {
    res.status(400).json({
      message: "Missing required query parameters: name",
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
    const result = await token.methods
      .getMintStatus(name)
      .call();
    res.status(200).json({ status: result });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
