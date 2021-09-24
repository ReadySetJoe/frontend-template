import axios from "axios";
import { useEffect, useState } from "react";
import NftDetail from "../NftDetail";

const {
  REACT_APP_NFT_CONTRACT_ADDRESS: address,
  REACT_APP_NFT_CONTRACT_ABI: abi,
  REACT_APP_REM_ENDPOINT: url,
} = process.env;

export default function Gallery() {
  const [nfts, setNfts] = useState([]);

  const getCollection = async () => {
    const res = await axios.post(url, {
      query: `
                query getNft($address: String!, $abi: String!) {
                    nfts(contractAddress: $address, contractAbi: $abi) {
                        nfts {
                            tokenUri
                            tokenId
                            owner
                        }
                    }
                }
              `,
      variables: {
        address,
        abi: abi.replace(/\\/g, ""),
      },
    });
    console.log("res", res);

    setNfts(res.data.data.nfts.nfts);
  };

  useEffect(() => {
    getCollection();
  }, []);

  const pinJSON = async () => {
    const JSONBody = {
      name: "Owned by Joe Powers",
      description: "Senior Software Engineer",
      image:
        "https://edge.cil.bandwagonfanclub.com/collections/idealseat/images/bw-logo-transform-2-md-6TBnSBHcEkQ.gif",
    };
    const res = await axios.post(
      `https://api.pinata.cloud/pinning/pinJSONToIPFS`,
      JSONBody,
      {
        headers: {
          pinata_api_key: "4e737529f23c5e47ffdc",
          pinata_secret_api_key:
            "1ce67250e4a9cc84754f7308559256affb6584365b0bf27a058176ce77a9308f",
        },
      }
    );
    console.log("res", res);
  };

  // const
  return (
    <div id="gallery" className="my-10">
      <button type="button" onClick={pinJSON}>
        CLICK HERE TO PIN TO JSON
      </button>
      <h1 className="heading text-3xl md:text-5xl">GALLERY</h1>
      <div className="flex flex-wrap justify-center my-5">
        {nfts.map((nft, i) => (
          <NftDetail nft={nft} totalSupply={nfts.length} key={i} />
        ))}
      </div>
    </div>
  );
}
