"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { Resource } from "@/lib/types";
import { ResourceDetailModal } from "./ResourceDetailModal";

interface ResourceDetailContextValue {
  openDetail: (resource: Resource) => void;
}

const ResourceDetailContext = createContext<ResourceDetailContextValue>({
  openDetail: () => {},
});

export function useResourceDetail() {
  return useContext(ResourceDetailContext);
}

export function ResourceDetailProvider({ children }: { children: ReactNode }) {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const openDetail = useCallback((resource: Resource) => {
    setSelectedResource(resource);
  }, []);

  const closeDetail = useCallback(() => {
    setSelectedResource(null);
  }, []);

  return (
    <ResourceDetailContext.Provider value={{ openDetail }}>
      {children}
      <ResourceDetailModal resource={selectedResource} onClose={closeDetail} />
    </ResourceDetailContext.Provider>
  );
}
