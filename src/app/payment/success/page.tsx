import { CheckoutSuccess } from "@/components/sections/checkout-succes";
import { metadata as layoutMetadata } from "@/app/layout";
import { ConversionTracker } from "@/components/ConversionTracker";

export const metadata = {
  ...layoutMetadata,
  title: "Payment Successful !! - FabLearner",
};

export default function Page() {
  return (
    <>
      <ConversionTracker />
      <CheckoutSuccess />
    </>
  );
}
