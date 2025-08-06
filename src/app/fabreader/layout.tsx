import { metadata as layoutMetadata } from "@/app/layout";

export const metadata = {
  ...layoutMetadata,
  title: "FabReader Premium Program - FabLearner",
  description: "Transform your child into a confident reader with FabReader Premium. India's #1 parent-led reading program trusted by 5,000+ families. No teaching experience needed!",
  keywords: "reading program, children education, phonics, literacy, early learning, parent-led education, FabReader",
  openGraph: {
    title: "FabReader Premium Program - FabLearner",
    description: "Transform your child into a confident reader with FabReader Premium. India's #1 parent-led reading program trusted by 5,000+ families.",
    type: "website",
  },
};

export default function FabReaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}