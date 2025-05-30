import { CheckoutSuccess } from "@/components/sections/checkout-succes";
import { metadata as layoutMetadata } from "@/app/layout";

export const metadata = {
  ...layoutMetadata,
  title: "Payment Successful !! - Fablerner",
};

export default function Page() {
  return (
    <>
      <CheckoutSuccess />
    </>
  );
}
