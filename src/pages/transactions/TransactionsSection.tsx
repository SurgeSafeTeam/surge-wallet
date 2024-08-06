export default function Transaction() {
  function sendToken() {}

  function swapToken() {}

  return (
    <div className="mx-auto flex h-[450px] w-[1200px] items-center justify-between rounded-3xl bg-[#101111] pl-[56px] pr-[132px] text-white">
      <div className="flex flex-col items-center gap-y-1">
        <img src="/public/assets/images/new-transaction.svg" className="w-64" />
        <span className="text-2xl">New transaction</span>
      </div>
      <div className="flex flex-col items-center gap-y-6 text-black">
        <span className="text-2xl text-white">Manage Assets</span>
        <button
          className="w-[380px] rounded-2xl bg-[#12FF80] py-6"
          onClick={sendToken}
        >
          Send Token
        </button>
        <button
          className="w-[380px] rounded-2xl bg-[#12FF80] py-6"
          onClick={swapToken}
        >
          Swap Tokens
        </button>
      </div>
    </div>
  );
}
