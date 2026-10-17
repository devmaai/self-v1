import V2Interactions from "@/components/v2/V2Interactions";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";

// Shared header and footer for pages that do not render their own.
export default function ConsumerChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="v2-home">
      <V2Interactions />
      <V2Nav variant="inner" />
      {children}
      <V2Footer />
    </div>
  );
}
