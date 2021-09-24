import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const contractAddress = process.env.REACT_APP_NFT_CONTRACT_ADDRESS;

export default function NftDetail(props) {
  const [metadata, setMetadata] = useState({});

  const fetchNftMetadata = async () => {
    const res = await axios.get(props.nft.tokenUri);
    setMetadata(res.data);
  };

  useEffect(() => {
    fetchNftMetadata();
  }, []);

  return (
    <div className="m-3 pb-3 border border-gray-400 rounded-2xl flex flex-col max-w-xs">
      <Link to={`/token/${props.nft.tokenId}`}>
        <img
          className=" rounded-t-2xl w-full"
          src={metadata.image || "src/Images/image-not-found.png"}
          alt="NFT cover"
        />
        <p className="mx-3 mt-3 italic">
          #{props.nft.tokenId} of {props.totalSupply}
        </p>
        <p className="mx-3">{metadata.name || "Harold Hughes"}</p>
        <p className="mx-3">{metadata.description || "CEO"}</p>
        <a
          className="mx-3 mb-3 text-blue-400 z-10"
          href={`https://explorer.palm-uat.xyz/address/${props.nft.owner}/tokens/${contractAddress}/token-transfers`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {String(props.nft.owner).substring(0, 6) +
            "..." +
            String(props.nft.owner).substring(38)}
        </a>
      </Link>
    </div>
  );
}
