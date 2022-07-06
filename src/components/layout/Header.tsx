import { MinusIcon, XIcon } from "@heroicons/react/solid";
import { getVersion } from '@tauri-apps/api/app'
import { useEffect, useState } from "react";
import { appWindow } from '@tauri-apps/api/window'

export default function Header() {
  const [version, setVersion] = useState("0.0.0");

  useEffect(() => {
    getVersion().then(setVersion);
  }, [])

  return (
    <header
      data-tauri-drag-region
      className="h-10 sticky top-0 flex items-center px-2 w-full rounded-t bg-primary-100  border select-none"
    >
      <div className="flex gap-3 items-center">
        <a
          href="https://feint.gg"
          className="text-center font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-pink-500 to-blue-500"
        >
          Feint
        </a>
        <span className="text-sm bg-primary-200 py-0.5 px-2 rounded">
          v{version}
        </span>
      </div>
      <div className="mx-auto">
        <input placeholder="Search for a summoner" className="border px-2 text-sm p-1 bg-theme rounded" />
      </div>
      <div className="flex ml-auto items-center text-mute text-lg font-bold gap-x-2">
        <button onClick={() => appWindow.minimize()} className="text-mute">
          <MinusIcon width={18} height={20} />
        </button>
        <button onClick={() => appWindow.close()} className="text-mute">
          <XIcon width={20} height={20} />
        </button>
      </div>
    </header>
  );
}
