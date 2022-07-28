import type { NextApiRequest, NextApiResponse } from "next";

import { getWeb3WithAccount, getSpaceToken } from "../../utils/web3Utils";

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

  const web3 = getWeb3WithAccount();
  const token = getSpaceToken(web3);

  try {
    const result = await token.methods.safeMint(address, name).send(
      {
        gas: 2200000,
        gasPrice: 650000000,
        from: web3.eth.defaultAccount,
      },
      (err: Error, tx: string) => {
        console.log(tx);
      }
    );
    console.log(result);
    res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error });
    return;
  }
}
