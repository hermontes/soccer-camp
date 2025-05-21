import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function NavigationSkeleton() {
  return (
    <section className="">
      <header className="w-full border-b bg-white shadow-sm px-2">
        <div className="mx-auto flex h-16 items-center justify-between">
          {/* Logo skeleton */}
          <div className="font-bold text-xl flex items-center">
            <span className="text-[#4CAF50]">Soccer</span>Camp
          </div>
          {/* User skeleton from previous navigation logic when using client side rendering */}
          <div className="flex gap-1 items-center justify-center">
            <Skeleton className="size-8 rounded-full bg-[#4CAF50]/50" />

            <Skeleton className="h-6 w-20 bg-[#4CAF50]/50" />
          </div>

          {/* Desktop navigation skeleton */}
          <nav className="hidden md:flex items-center gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-4 w-16" />
            ))}
          </nav>

          {/* Auth buttons skeleton */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-4">
              <Skeleton className="h-9 w-20" /> {/* Login button */}
              <Skeleton className="h-9 w-24" /> {/* Sign up button */}
            </div>

            {/* Mobile menu button skeleton */}
            <Skeleton className="h-9 w-9 md:hidden" />
          </div>
        </div>
      </header>
    </section>
  );
}
