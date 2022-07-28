import type { NextApiRequest, NextApiResponse } from "next";

import { getKitWithAccount, getSpaceToken } from "../../utils/kitUtils";

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

  const kit = getKitWithAccount();
  const token = getSpaceToken(kit);

  try {
    await token.methods
      .safeMint(address, name)
      .send({ gas: 2100000, gasPrice: 200000000, from: kit.web3.eth.defaultAccount });
    res.status(200).json({ message: "Successfully minted" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
