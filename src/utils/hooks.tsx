const address = "0x51b31be9C0AE43759992Ac75b0C48f72655b0F57";
import { abi } from "../abis/0x51b31be9C0AE43759992Ac75b0C48f72655b0F57";
import { useContractWrite } from "wagmi";

export function useNFTFunctionwriter(
  functionName: string,
  args?: any[]
): ReturnType<typeof useContractWrite> {
  const contractWrite = useContractWrite({
    address: address,
    abi: abi,
    functionName: functionName,
    args: args,
  });

  return contractWrite;
}
