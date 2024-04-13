import { useState } from "react";
import { useNFTFunctionwriterERC } from "../utils/hooks";
import { useAccount, useWaitForTransaction } from "wagmi";
import { parseEther } from "viem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MintTokens = () => {
  const [amount, setAmount] = useState("");
  const { address: ownerAddress, isConnected } = useAccount();

  let { writeAsync, data, isError } = useNFTFunctionwriterERC(
    "mint",
    [ownerAddress, amount],
    parseEther(String(Number(amount) * 0.001))
  );
  let { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });
  const mintTokens = async () => {
    console.log("Minting " + amount + " tokens...");
    try {
      const tx = await writeAsync?.();
      console.log("Transaction", tx?.hash);
      setAmount("");
      toast("Mint Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error: any) {
      console.log("Error>>", error.message);
      setAmount("");
      toast.error("Error Minting!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleMinting = () => {
    // Check if amount is valid
    if (amount === "" || parseFloat(amount) <= 0) {
      console.log("Invalid amount");
      toast.error("Error Minting!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    mintTokens();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-purple-500 p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-black">
          Token Minting
        </h2>
        <input
          type="number"
          className="w-full p-3 mb-4 border rounded-md bg-white"
          placeholder="Enter amount"
          value={amount}
          min="0"
          onChange={(e) => setAmount(e.target.value)}
        />
        {isConnected ? (
          <button
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
            onClick={handleMinting}
          >
            {isLoading ? "Minting ...." : "Mint Tokens"}
          </button>
        ) : (
          <p className="w-full bg-blue-500  text-white py-3 rounded-md flex justify-center items-center hover:bg-blue-600">
            Connect First
          </p>
        )}
        {isError ? (
          <p className="text-2xl text-red-500">Error in minting</p>
        ) : (
          ""
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default MintTokens;
