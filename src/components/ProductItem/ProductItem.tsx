import clsx from "clsx";
import Image from "next/image";

import { ELayout } from "@/types/mode";
import { ProductType } from "@/types/product";

interface ProductItemProps {
  product: ProductType;
  layout: ELayout;
}

const CONTAINER_CN = {
  [ELayout.LIST]: "flex-row gap-4",
  [ELayout.GRID]: "flex-col gap-1",
};

const IMAGE_CONTAINER_CN = {
  [ELayout.LIST]: "aspect-square",
  [ELayout.GRID]: "aspect-video",
};

const ITEM_INFO_CN = {
  [ELayout.LIST]: "h-full py-4",
  [ELayout.GRID]: "h-40",
};

const ProductItem = ({
  product: { title, description, thumbnail, rating, reviews },
  layout,
}: ProductItemProps) => {
  return (
    <div className={clsx("flex", CONTAINER_CN[layout])}>
      <div className={clsx("relative h-36", IMAGE_CONTAINER_CN[layout])}>
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-contain"
          sizes="144px"
        />
      </div>
      <div
        className={clsx("flex flex-col justify-between", ITEM_INFO_CN[layout])}
      >
        <div>
          <h6 className="mb-1.5 line-clamp-2 font-semibold">{title}</h6>
          <p className="line-clamp-3 text-sm text-gray-600">{description}</p>
        </div>
        <div className="flex gap-1.5 text-sm">
          <span>⭐️</span>
          <span>
            {rating} ({reviews.length})
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
