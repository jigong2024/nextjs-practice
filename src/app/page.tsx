import SearchSection from "./components/SearchSection";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <SearchSection />

      <Link href="/HookPage" className="border border-black p-4">
        react-hook-form
      </Link>
    </div>
  );
}
