import { Coffee } from "lucide-react";

export const BuyCoffee = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Buy Space Ranger a Coffee
        </h1>
        <p className="text-sm text-gray-600 mt-1">Choose an amount below:</p>
      </div>

      {/* Coffee Amount Buttons */}
      <div className="flex flex-wrap gap-3">
        {[1, 2, 5, 10].map((amount) => (
          <button
            key={amount}
            className="inline-flex items-center gap-2 px-4 py-2 border cursor-pointer border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Coffee className="w-4 h-4" />${amount}
          </button>
        ))}
      </div>

      {/* Account URL */}
      <div>
        <h2 className="text-sm font-medium text-gray-600 mb-1">
          Your BuyMeCoffee or Social Account URL
        </h2>
        <p className="text-sm text-gray-700 border border-gray-200 rounded-md p-2 bg-gray-50">
          buymecoffee.com/merkzadok
        </p>
      </div>

      {/* Special Message */}
      <div>
        <h2 className="text-sm font-medium text-gray-600 mb-1">
          Special Message
        </h2>
        <p className="text-sm text-gray-700 border border-gray-200 rounded-md p-2 bg-gray-50 h-30 ">
          Thank you for being awesome today.
        </p>
      </div>

      {/* Support Button */}
      <div>
        <button className="w-full px-4 py-2 bg-gray-800 cursor-pointer text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
          Support
        </button>
      </div>
    </div>
  );
};
