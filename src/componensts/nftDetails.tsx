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
          `https://project-nft-market-1-39k3.vercel.app/nfts/getsinglenft/${params._id}`
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
              className="w-full rounded border border-gray-200 object-cover object-center lg:w-1/2"
              src={`https://ipfs.io/ipfs/${data?.ipfsHash}`}
            />
            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              <h1 className="title-font mb-1 text-3xl font-medium text-sky-400">
                {data?.title}
              </h1>

              <p className="leading-relaxed text-gray-400">
                {data?.description}
              </p>
              <p className="leading-relaxed text-gray-400">
                Owner Address: {data?.ownerAddress}
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
          </div>
        </div>
      </section>
    </>
  );
};

export default NftDetailPage;
