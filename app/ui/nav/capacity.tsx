import clsx from 'clsx';
export default function capacity({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className={clsx('bg-CtaBg space-y-2 rounded-lg border p-4', {
        invisible: collapsed,
      })}
    >
      {/* <div className="flex justify-center items-center w-20 h-20 rounded-full border
      bg-[radial-gradient(closest-side,#EBF3FF_79%,transparent_80%_100%),conic-gradient(#605DFF_60%,#CFD5FF_0)]"> 
        <div className=""> 60% </div>
      </div> */}
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full border"
        style={{
          background:
            'radial-gradient(closest-side, #EBF3FF 79%, transparent 80% 100%), conic-gradient(#605DFF 60%, #CFD5FF 0)',
        }}
      >
        <div className=""> 60% </div>
      </div>
      <h2 className="font-bold">Used Capacity</h2>
      <p className="text-sm text-primary">
        {' '}
        You are already using 60% of your capacity.{' '}
      </p>
      <button className="text-neutral w-full rounded-md bg-gradient-to-r from-[#605DFF] from-[-.38%] to-[#5DA8FF] to-[100.02%] py-2 font-semibold text-white">
        {' '}
        Upgrade plan{' '}
      </button>
    </div>
  );
}
