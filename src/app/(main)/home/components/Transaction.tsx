import Image from "next/image";

export const Transaction = () => {
  return (
    <div className="w-[955px] h-[989px] border border-gray-200 rounded-lg p-4 ">
      <div className=" pb-4 flex items-center gap-4">
        <div>
          <Image
            src="/unnamed.webp/"
           alt="user avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <div>
          <h2 className="font-bold">Guest</h2>
          <p>instagram.com/welesley</p>
          <div className="">
            <p>$1</p>
            <p>10hours ago</p>
          </div>
          <p>Thank you for being so awesome everyday! You always manage to brighten up my day when I am feeling down.Although $1 isn't that much money.It's all I can do contribute at the moment. </p>
        </div>
      </div>
    </div>
  );
};
export default Transaction;
