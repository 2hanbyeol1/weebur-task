import { getDiscountPrice } from "@/util/util";

interface TotalPriceProps {
  price?: number;
  discountPercentage?: number;
}
const TotalPrice = ({ price = 0, discountPercentage = 0 }: TotalPriceProps) => {
  const calculatedPrice = getDiscountPrice(price, discountPercentage);

  return (
    <div className="flex flex-col items-end self-end">
      {price > 0 && discountPercentage > 0 && (
        <span className="text-xs text-gray-500 line-through">
          {price.toLocaleString()}원
        </span>
      )}
      <span className="text-2xl font-medium">
        {calculatedPrice.toLocaleString() || 0}원
      </span>
    </div>
  );
};

export default TotalPrice;
