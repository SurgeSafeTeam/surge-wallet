import AddIcon from "@/assets/svg/add.svg?react";

export default function Account() {
  return (
    <div className="mx-auto mt-24 flex max-w-[1200px] flex-col items-center justify-center text-white">
      <div className="mt-30 flex w-full items-center justify-between">
        <h4 className="text-lg">Surge Accounts</h4>
        <button className="rounded-full border border-electric-green px-5 py-3 text-electric-green">
          Create Account
        </button>
      </div>
      <div className="mt-8 w-[1000px] rounded-3xl bg-[#121314] p-6">
        <h6>My Accounts(1)</h6>
        <p className="py-16 text-center text-white/50">
          You don't have any Surge Accounts yet
        </p>
      </div>
      <div className="mt-8 w-[1000px] rounded-3xl bg-[#121314] p-6">
        <div className="flex items-center justify-between">
          <h6>Watchlist</h6>
          <button className="flex items-center rounded-full border bg-white/5 px-2.5 py-1 text-sm">
            <AddIcon />
            <span>Add coins</span>
          </button>
        </div>
        <p className="py-16 text-center text-white/50">
          Watch any Watch any Surge Account to keep an eye on its activity to
          keep an eye on its activity
        </p>
      </div>
    </div>
  );
}
