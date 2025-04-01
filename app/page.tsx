import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <Link href={"/dashboard"}>
        <Button className="px-4 py-2 w-[250px] h-[160px] text-6xl">أبدأ</Button>
      </Link>
    </div>
  );
}
