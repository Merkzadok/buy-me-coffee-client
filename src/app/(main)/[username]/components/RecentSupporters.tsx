import Image from "next/image";

export const RecentSupporters = () => {
  return (
    <div className=" p-4 space-y-3">
      <div className="flex items-start gap-3">
        <Image
          src="/space.avif"
          width={36}
          height={36}
          alt="Supporter"
          className="rounded-full object-cover mt-0.5"
        />
        <div>
          <p className="text-sm text-gray-800 font-medium">
            Guest bought a $1 coffee
          </p>
          <p className="text-sm text-gray-600">Thank you for buying coffee.</p>
        </div>
      </div>
    </div>
  );
};
