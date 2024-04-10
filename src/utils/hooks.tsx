const address = "0x5281cFc34aF3b26C392281ee4537A734E467dD15";
import { abi } from "../abis/0x5281cFc34aF3b26C392281ee4537A734E467dD15";
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
