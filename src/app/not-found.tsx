import Image from "next/image";
import { NotFoundContent } from "@/components/NotFoundContent";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="relative h-16 w-full max-w-[160px] mx-auto mb-6">
          <Image
            src="/logo.png"
            alt="FabLearner"
            fill
            sizes="160px"
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        <NotFoundContent />
      </div>
    </div>
  );
}
