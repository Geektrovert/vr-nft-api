import type { NextApiRequest, NextApiResponse } from "next";

import { getWeb3WithAccount, getSpaceToken } from "../../utils/web3Utils";

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

  const web3 = getWeb3WithAccount();
  const token = getSpaceToken(web3);

  try {
    const result = await token.methods
      .getMintStatus(name)
      .call();
    res.status(200).json({ status: result });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
