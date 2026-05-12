import { Suspense } from "react";
import { HomeExperience } from "@/widgets/HomeExperience";
import { PageLoadingSkeleton } from "@/shared/ui/PageLoadingSkeleton";

export default function Page() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <HomeExperience />
    </Suspense>
  );
}
