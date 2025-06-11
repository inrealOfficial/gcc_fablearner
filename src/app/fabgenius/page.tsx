import { metadata as layoutMetadata } from "@/app/layout";
import FabGeniusCheckout from "@/components/sections/FabGeniusCheckout";

export const metadata = {
  ...layoutMetadata,
  title: "FabGenius Premium Program - FabLearner",
};

export default function Page() {
  return (
    <>
      <FabGeniusCheckout />
    </>
  );
}
