import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

type Data = {
  _id: string;
  title: string;
  ipfsHash: string | null;
  description: string | null;
  tokenId: string | null;
  ownerAddress: string | null;
  attributes: Array<object> | undefined;
  txHash: string | null;
  price: number;
};
interface Attribute {
  trait_type: string;
  value: string;
}

const NftDetailPage = () => {
  const [data, setData] = useState<Data | null>();
  // const [ownerAddress, setOwnerAddress] = useState();
  // const [tokenId, setTokenId] = useState();
  const params = useParams();

  // const { isConnected, address } = useAccount();
  async function fetchData() {
    try {
      await axios
        .get(
          `https://nftproject-backend.vercel.app/nfts/getsinglenft/${params._id}`
        )
        .then((res) => {
          console.log("Res", res.data);
          setData(res.data);
          // setTokenId(res.data.tokenId);
        });
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    console.log("check", data);

    fetchData();
  }, []);

  return (
    <>
      <section className="body-font card explore-card overflow-hidden bg-white text-gray-700">
        <div className="container mx-auto px-5 py-24">
          <div className="mx-auto flex flex-wrap lg:w-4/5">
            <img
              alt="ecommerce"
              className="rounded border border-gray-200 w-[100%] mx-h-[100%] lg:w-1/2"
              src={`https://ipfs.io/ipfs/${data?.ipfsHash}`}
            />
            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              <h1 className="title-font mb-1 text-3xl font-medium text-sky-400">
                Title: {data?.title}
              </h1>

              <p className="leading-relaxed text-gray-400">
                Description : {data?.description}
              </p>
              <p className="leading-relaxed text-gray-400 flex flex-row">
                <a>Owner:</a>
                <a className="px-2">{data?.ownerAddress}</a>
              </p>
              <p className="leading-relaxed text-gray-400 flex flex-row">
                Tx Hash:{" "}
                <a
                  className="px-2 text-blue-500"
                  target="_blank"
                  href={`https://sepolia.etherscan.io/tx/` + data?.txHash}
                >
                  View onChain
                </a>
              </p>

              <p className="leading-relaxed text-gray-400">
                Token Id : {data?.tokenId}
              </p>
              <p className="leading-relaxed text-gray-400">
                <div className="leading-relaxed text-gray-400">
                  <h1 className="title-font mb-1 text-3xl font-medium text-sky-400">
                    Attributes
                  </h1>
                  {data?.attributes ? (
                    <div className="bg-transparent rounded-lg overflow-hidden">
                      <table className="min-w-full table-auto bg-opacity-0">
                        <thead className="bg-transparent text-white border-2 border-gray-400">
                          <tr>
                            <th className="py-2 px-4 text-gray-400 border-2 border-gray-400">
                              Trait Type
                            </th>
                            <th className="py-2 px-4 text-gray-400">Value</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {(data.attributes as Attribute[]).map(
                            (attribute, index) => (
                              <tr
                                key={index}
                                className={`${
                                  index % 2 === 0
                                    ? "bg-transparent"
                                    : "bg-transparent"
                                }`}
                              >
                                <td className="py-2 px-4 border-2 border-gray-400">
                                  {attribute.trait_type}
                                </td>
                                <td className="py-2 px-4 border-2 border-gray-400">
                                  {attribute.value}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p>No attributes available</p>
                  )}
                </div>
              </p>
            </div>
            {data?.price === 0 && (
              <button className="flex mt-4 ml-auto text-white bg-sky-400 border-0 py-2 px-6 focus:outline-none hover:bg-sky-600 rounded">
                Buy Nft
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default NftDetailPage;
