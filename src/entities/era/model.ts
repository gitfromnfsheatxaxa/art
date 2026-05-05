import { TIMELINE_ERAS } from "@/shared/constants/timeline";

export function getEraById(id: string) {
  return TIMELINE_ERAS.find((era) => era.id === id);
}
