import { FormField } from "./FormField"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"

interface CheckoutFormProps {
  submit?: () => Promise<void>
}

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  cardNumber: yup
    .string()
    .required()
    .matches(
      /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
      "Card should have xxxx xxxx xxxx xxxx format"
    ),
  expDate: yup.date().nullable().default(null).required(),
  cvv: yup
    .string()
    .required()
    .matches(/^\d\d\d$/, "CVV should contain three numbers"),
})

export const CheckoutForm = ({
  submit = async () => {},
}: CheckoutFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  })

  return (
    <form data-testid="checkout-form" onSubmit={handleSubmit(submit)}>
      <FormField
        placeholder="John Smith"
        type="text"
        name="name"
        label="Cardholders Name"
        registerOptions={register("name")}
        errors={errors.name}
      />
      <FormField
        placeholder="0000 0000 0000 0000"
        type="tel"
        inputMode="numeric"
        autoComplete="cc-number"
        name="cardNumber"
        label="Card Number"
        normalize={(value) => {
          return (
            value
              .replace(/\s/g, "")
              .match(/.{1,4}/g)
              ?.join(" ")
              .substr(0, 19) || ""
          )
        }}
        registerOptions={register("cardNumber")}
        errors={errors.cardNumber}
      />
      <FormField
        type="month"
        name="expDate"
        label="Expiration Date"
        registerOptions={register("expDate")}
        errors={errors.expDate}
      />
      <FormField
        placeholder="000"
        type="number"
        name="cvv"
        label="CVV"
        registerOptions={register("cvv")}
        errors={errors.cvv}
        normalize={(value) => {
          return value.substring(0, 3)
        }}
      />
      <button className="nes-btn is-primary">Place order</button>
    </form>
  )
}
