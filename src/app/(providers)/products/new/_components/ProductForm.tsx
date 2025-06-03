import { useState } from "react";
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
import { useToast } from "@/context/toast";
import { createProductSchema } from "@/lib/zod/validation";
import { registerWith } from "@/util/util";

import TotalPrice from "./TotalPrice";

type CreateProductSchemaType = z.infer<typeof createProductSchema>;

const ProductForm = () => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const { add } = useToast();
  const {
    register,
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductSchemaType>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      brand: "Apple",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: CreateProductSchemaType) => {
    try {
      setSubmitting(true);
      await addProduct({ data });
      setSubmitting(false);
      add("상품이 추가됐어요");
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
        {...registerWith<CreateProductSchemaType>({
          name: "title",
          register,
          trigger,
          errors,
        })}
        title="상품명"
        maxLength={15}
        required
        autoFocus
      />
      <Textarea
        {...registerWith<CreateProductSchemaType>({
          name: "description",
          register,
          trigger,
          errors,
        })}
        title="상품 설명"
      />
      <SelectBox
        {...registerWith<CreateProductSchemaType>({
          name: "brand",
          register,
          trigger,
          errors,
        })}
        title="브랜드"
        options={["Apple", "Samsung", "Weebur"]}
      />
      <div className="grid grid-cols-2 gap-2">
        <TextInput
          {...registerWith<CreateProductSchemaType>({
            name: "price",
            register,
            trigger,
            errors,
          })}
          title="가격"
          type="number"
          unit="원"
          placeholder="0"
          required
        />
        <TextInput
          {...registerWith<CreateProductSchemaType>({
            name: "discountPercentage",
            register,
            trigger,
            errors,
          })}
          title="할인율"
          type="number"
          unit="%"
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
        disabled={Object.keys(errors).length > 0 || isSubmitting}
      >
        제출하기
      </Button>
    </form>
  );
};

export default ProductForm;
