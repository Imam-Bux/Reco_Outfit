import { CheckIcon } from './icons';

export default function StatusBadge({ status, onClick }: { status: string; onClick?: () => void }) {
  const completed = status === 'completed';
  const cls = completed
    ? 'bg-emerald-100/80 text-emerald-700 border-emerald-300/70 shadow-[0_6px_16px_-8px_rgba(16,185,129,0.7)]'
    : 'bg-amber-100/80 text-amber-700 border-amber-300/70 shadow-[0_6px_16px_-8px_rgba(245,158,11,0.75)]';

  const inner = completed ? (
    <>
      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white">
        <CheckIcon width={10} height={10} strokeWidth={3.5} />
      </span>
      <span>Completed</span>
    </>
  ) : (
    <>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
      </span>
      <span>Pending</span>
    </>
  );

  const base = `inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full border ${cls}`;

  if (onClick) {
    return (
      <button
        onClick={onClick}
        title={completed ? 'Mark as pending' : 'Mark as completed'}
        className={`${base} transition hover:brightness-95 active:scale-95`}
      >
        {inner}
      </button>
    );
  }

  return <span className={base}>{inner}</span>;
}