import Image from "next/image";

export const Profile = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Image
          src="/space.avif"
          width={40}
          height={40}
          alt="Picture of the author"
          className="rounded-full object-cover"
        />
        <p className="font-semibold text-lg text-gray-800">Space Ranger</p>
      </div>

      <div>
        <h2 className="text-sm text-gray-300 font-medium uppercase tracking-wide mb-1">
          About
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae alias
          voluptates impedit, amet, laboriosam quam officia iure quasi similique
          dolore ea laudantium quidem quis eius distinctio explicabo quia minus
          libero.
        </p>
      </div>
    </div>
  );
};
