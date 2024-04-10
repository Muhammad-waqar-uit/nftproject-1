import "./App.css";
import { Routes, Route } from "react-router-dom";
import MintNFT from "./pages/MintNFT";
import { MainPage } from "./pages/MainPage";
import { ExploreNFTs } from "./pages/ExploreNFTs";
import { MyNfts } from "./pages/MyNfts";
import NftDetailPage from "./componensts/nftDetails";
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/MintNft" element={<MintNFT />}></Route>
          <Route path="/ExploreNfts" element={<ExploreNFTs />}></Route>
          <Route path="/MyNfts/:ownerAddress" element={<MyNfts />}></Route>
          <Route path="/:_id" element={<NftDetailPage />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
