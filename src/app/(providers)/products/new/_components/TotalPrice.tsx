interface TotalPriceProps {
  price?: number;
  discountPercentage?: number;
}
const TotalPrice = ({ price = 0, discountPercentage = 0 }: TotalPriceProps) => {
  const calculatedPrice =
    discountPercentage > 0 ? price - (price * discountPercentage) / 100 : price;

  return (
    <div className="flex flex-col items-end self-end">
      {!!price && discountPercentage > 0 && (
        <span className="text-xs text-gray-500 line-through">
          {Number(price).toLocaleString()}원
        </span>
      )}
      <span className="text-2xl font-medium">
        {Number(calculatedPrice).toLocaleString() || 0}원
      </span>
    </div>
  );
};

export default TotalPrice;
