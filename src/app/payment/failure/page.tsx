import { CheckoutFailure } from "@/components/sections/checkout-failure";
import { metadata as layoutMetadata } from "@/app/layout";

export const metadata = {
  ...layoutMetadata,
  title: "Payment Failed - FabLearner",
};

export default function Page() {
  return (
    <>
      <CheckoutFailure />
    </>
  );
}
