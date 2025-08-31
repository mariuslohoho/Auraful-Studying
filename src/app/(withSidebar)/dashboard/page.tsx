import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { Timer } from "./_components/Timer";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <Timer />
          {/* <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div> */}
        </div>
      </div>
    </div>
  );
}
