import Image from "next/image";
import coin from "../../public/coin.png";
export const Credits = ({ credits }) => {
  return (
    <div className="flex bg-blue-200 gap-2 px-4 py-2 rounded-full shadow-lg text-black cursor-pointer transform hover:scale-105 transition-all duration-300">
      <Image src={coin} alt="Coin" width={24} height={24} />
      <span>{credits || 3} Credits left</span>
    </div>
  );
};
