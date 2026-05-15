import type { Metadata } from "next";
import DealFlowLanding from "@/components/deal-flow/DealFlowLanding";

export const metadata: Metadata = {
  title: "Deal Flow | AJIONE",
  description:
    "AJIONE brokers creator-brand deals on success: matching, outreach, and facilitation with no upfront fees.",
};

export default function DealFlowPage() {
  return <DealFlowLanding />;
}

