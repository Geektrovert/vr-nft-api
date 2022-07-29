import type { NextApiRequest, NextApiResponse } from "next";

import { getKitWithAccount, getSpaceToken } from "../../utils/kitUtils";

type Error = {
  message: string;
};

type Data = {
  ownerAddress: string;
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

  const kit = getKitWithAccount();
  const token = getSpaceToken(kit);

  try {
    const result = await token.methods
      .getOwner(name)
      .call();
    res.status(200).json({ ownerAddress: result });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
