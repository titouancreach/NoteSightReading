export function GameHistoryCard({ total, date }: { total: number, date: Date }) {
  return (
    <div className="bg-white rounded-lg flex justify-evenly py-4">
      <div>{date.toLocaleDateString('fr-FR', {month: 'short', day: "numeric"})} </div>
      <div className="font-semibold"> {total} pts</div>
      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
        Facile
      </span>
    </div>
  );
}
