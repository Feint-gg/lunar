export default function Footer() {
  return (
    <footer className="border px-3 flex items-center rounded-b bg-primary-100 h-8 bottom-0 sticky">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 animate-pulse rounded-full" />
        <div className="text-xs text-mute">Connected to League Client</div>
      </div>
    </footer>
  );
}
