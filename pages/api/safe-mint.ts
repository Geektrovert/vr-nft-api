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
      .send({ gas: 2100000, gasPrice: 200000000, from: kit.web3.eth.defaultAccount }, async (_error: any, _txHash: string) => {
        if (_error) {
          res.status(500).json({ message: _error });   
          return; 
        }
        let transactionReceipt = null
        while (transactionReceipt == null) {
            transactionReceipt = await kit.web3.eth.getTransactionReceipt(_txHash); 
        }
        res.status(200).json({ message: "Successfully minted\n"+JSON.stringify(transactionReceipt)});
        return;
        
      });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error });
    return;
  }
}
