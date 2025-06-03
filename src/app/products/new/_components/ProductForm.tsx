import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { addProduct } from "@/apis/product";
import Button from "@/components/Button";
import SelectBox from "@/components/Input/SelectBox";
import Textarea from "@/components/Input/Textarea";
import TextInput from "@/components/Input/TextInput";
import { PRODUCT_LIST_PATH } from "@/constants/path";
import { createProductSchema } from "@/lib/zod/validation";

import TotalPrice from "./TotalPrice";

type CreateProductSchemaType = z.infer<typeof createProductSchema>;

const ProductForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductSchemaType>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 1000,
      brand: "Apple",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: CreateProductSchemaType) => {
    try {
      await addProduct({ data });
      router.push(PRODUCT_LIST_PATH);
    } catch (e) {
      throw e;
    }
  };

  const watchedPrice = useWatch({ name: "price", control });
  const watchedDiscountPercentage = useWatch({
    name: "discountPercentage",
    control,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <TextInput
        {...register("title")}
        error={errors["title"]}
        title="상품명"
        maxLength={15}
        required
        autoFocus
      />
      <Textarea
        {...register("description")}
        error={errors["description"]}
        title="상품 설명"
      />
      <SelectBox
        {...register("brand")}
        error={errors["brand"]}
        title="브랜드"
        options={["Apple", "Samsung", "Weebur"]}
      />
      <div className="grid grid-cols-2 gap-2">
        <TextInput
          {...register("price")}
          error={errors["price"]}
          title="가격"
          type="number"
          unit="원"
          // min={1000}
          placeholder="0"
          required
        />
        <TextInput
          {...register("discountPercentage")}
          error={errors["discountPercentage"]}
          title="할인율"
          type="number"
          unit="%"
          // min={0}
          placeholder="0"
        />
      </div>
      <TotalPrice
        price={watchedPrice}
        discountPercentage={watchedDiscountPercentage}
      />
      <Button
        type="submit"
        className="mt-8 self-end"
        disabled={Object.keys(errors).length > 0}
      >
        제출하기
      </Button>
    </form>
  );
};

export default ProductForm;
