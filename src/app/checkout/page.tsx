import CheckoutPage from "@/components/sections/CheckoutPage";
import { metadata as layoutMetadata } from "@/app/layout";

export const metadata = {
  ...layoutMetadata,
  title: "Checkout - FabLearner",
};

export default function Page() {
  return (
    <>
      <CheckoutPage />
    </>
  );
}
