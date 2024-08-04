"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function FlowbiteScript() {
  const path = usePathname();

  useEffect(() => {
    const loadFlowbite = async () => {
      if (typeof window !== "undefined") {
        import("flowbite").then((module) => module.initFlowbite());
        import("flowbite").then((module) => module.initAccordions());
        import("flowbite").then((module) => module.initCarousels());
        import("flowbite").then((module) => module.initCollapses());
        import("flowbite").then((module) => module.initDials());
        import("flowbite").then((module) => module.initDismisses());
        import("flowbite").then((module) => module.initDrawers());
        import("flowbite").then((module) => module.initDropdowns());
        import("flowbite").then((module) => module.initModals());
        import("flowbite").then((module) => module.initPopovers());
        import("flowbite").then((module) => module.initTabs());
        import("flowbite").then((module) => module.initTooltips());
        import("flowbite").then((module) => module.initInputCounters());
        import("flowbite").then((module) => module.initCopyClipboards());
        import("flowbite").then((module) => module.initDatepickers());
      }
    };

    loadFlowbite();
  }, [path]);

  return null;
}
