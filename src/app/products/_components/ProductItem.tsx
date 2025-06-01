import Image from "next/image";

import Rating from "@/components/Rating";
import { ELayout } from "@/types/mode";
import { ProductType } from "@/types/product";
import { cn } from "@/util/util";

interface ProductItemProps {
  product: ProductType;
  layout: ELayout;
}

const CONTAINER_CN = {
  [ELayout.LIST]: "flex-row gap-6",
  [ELayout.GRID]: "flex-col gap-1",
};

const ProductItem = ({
  product: { title, description, thumbnail, rating, reviews, price },
  layout,
}: ProductItemProps) => {
  const EXCHANGE_RATE = 1380.44;

  return (
    <div className={cn("flex p-4", CONTAINER_CN[layout])}>
      <div className="relative aspect-square">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-contain"
          sizes="144px"
        />
      </div>
      <div className="flex h-full flex-col justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h6 className="line-clamp-2 font-medium">{title}</h6>
          <p className="line-clamp-3 text-sm text-gray-500">{description}</p>
        </div>
        <div className="flex flex-col gap-1.5 text-sm">
          <div className="text-lg font-semibold">
            {Math.round(price * EXCHANGE_RATE).toLocaleString()}원
          </div>
          <div className="flex gap-2">
            <Rating rating={rating} />
            <span className="text-gray-600">({reviews.length})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
