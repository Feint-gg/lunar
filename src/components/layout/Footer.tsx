import { useEffect } from "react";
import { useLCU } from "../../lib/lcu";

export default function Footer() {
  const lcu = useLCU();

  useEffect(() => {
    console.log(lcu)
  }, [])

  return (
    <footer className="border px-3 flex items-center rounded-b bg-primary-100 h-8 bottom-0 sticky">
      <div className="flex items-center gap-2">
        {lcu?.data ? (
          <>
            <div className="w-3 h-3 bg-green-500 animate-pulse rounded-full" />
            <div className="text-xs text-mute">Connected to the League Client</div>
          </>
        ) : (
          <>
            <div className="w-3 h-3 bg-red-500 animate-pulse rounded-full" />
            <div className="text-xs text-mute">Not connected to the League Client</div>
          </>
        )}
      </div>
    </footer>
  );
}
