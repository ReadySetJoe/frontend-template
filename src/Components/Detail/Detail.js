import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
var Scroll = require("react-scroll");
var scroll = Scroll.animateScroll;

const {
  REACT_APP_NFT_CONTRACT_ADDRESS: address,
  REACT_APP_NFT_CONTRACT_ABI: abi,
  REACT_APP_REM_ENDPOINT: url,
} = process.env;

export default function Detail() {
  scroll.scrollToTop();
  const [nft, setNft] = useState({});
  const [metadata, setMetadata] = useState({});

  const params = useParams();
  console.log("params", params);

  const getNft = async () => {
    const res = await axios.post(url, {
      query: `
                query getNft($address: String!, $abi: String!, $tokenId: Int) {
                    nft(contractAddress: $address, contractAbi: $abi, tokenId: $tokenId) {
                        nft {
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
        tokenId: parseInt(params.tokenId),
      },
    });

    setNft(res.data.data.nft.nft);
    const getMetadataRes = await axios.get(res.data.data.nft.nft.tokenUri);
    setMetadata(getMetadataRes.data);
  };

  useEffect(() => {
    getNft();
  }, []);
  return (
    <div className="h-screen">
      <p>#{nft.tokenId}</p>
      <img src={metadata.image} alt="bandwagon nft" />
      <Link to={"/"}>
        <Button>BACK TO COLLECTION</Button>
      </Link>
    </div>
  );
}
