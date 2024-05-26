
function getMedalEmoji(rank: number) {
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return "";
  }
}

export function Summary({
  className,
  attemptsCount,
  rank,
  bestAttempt,
}: {
  className?: string;
  attemptsCount: number;
  rank: number;
  bestAttempt: number;
}) {
  return (
    <div className={`flex justify-evenly ${className}`}>
      <div className="text-center">
        <div className="text-xs text-gray-700">Attempts</div>
        <div className="font-bold">{attemptsCount}</div>
      </div>

      <div className="text-center">
        <div className="text-xs text-gray-700">overall ranking</div>
        <div className="font-bold">{rank == 0 ? "N/A" : `${getMedalEmoji(rank)} ${rank}`}</div>
      </div>

      <div className="text-center">
        <div className="text-xs text-gray-600">best</div>
        <div className="font-bold">{bestAttempt}</div>
      </div>
    </div>
  );
}
