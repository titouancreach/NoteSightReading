export function Summary({ className }: { className?: string }) {
  return (
    <div className={`flex justify-evenly ${className}`}>
      <div className="text-center">
        <div className="text-xs text-gray-700">tentatives</div>
        <div className="font-bold">343</div>
      </div>

      <div className="text-center">
        <div className="text-xs text-gray-700">classement</div>
        <div className="font-bold">🥇 1</div>
      </div>

      <div className="text-center">
        <div className="text-xs text-gray-600">Le plus élevé</div>
        <div className="font-bold">3434</div>
      </div>
    </div>
  );
}
