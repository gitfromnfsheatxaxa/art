import { Suspense } from "react";
import { TimelineExperience } from "@/widgets/TimelineExperience";
import { PageLoadingSkeleton } from "@/shared/ui/PageLoadingSkeleton";

export default function TimelinePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <TimelineExperience />
    </Suspense>
  );
}
