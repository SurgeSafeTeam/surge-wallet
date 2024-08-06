import { ConfirmTransaction } from "../../components/transaction/ConfirmTransaction.tsx";

export default function SendToken() {
  function confirm() {
    ConfirmTransaction();
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#101111] text-white">
      <header className="border-b border-gray-800 p-6">
        <h1 className="text-3xl font-bold">New Transaction</h1>
      </header>
      <main className="flex flex-grow p-6">
        <div className="mr-6 h-[780px] w-[368px] flex-1 rounded-lg bg-[#101111] p-6">
          <h2 className="mb-4 text-xl font-semibold">Send Tokens</h2>
          <form className="space-y-4">
            <div className="flex items-center">
              <label htmlFor="recipient" className="mb-2 block">
                Recipient Address
              </label>
              <details className="dropdown">
                <summary className="btn border-none shadow-none outline-none">
                  Recipient Address
                </summary>
                <ul className="menu dropdown-content z-[1] w-52 rounded-box p-2 text-electric-green shadow">
                  <li className="">
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </details>
            </div>
            <div>
              <label htmlFor="amount" className="mb-2 block">
                Amount
              </label>
              <div className="flex items-center rounded-lg border border-gray-700 p-2">
                <input
                  type="text"
                  id="amount"
                  className="flex-1 bg-transparent outline-none"
                  placeholder="Enter amount"
                />
                <button className="ml-2 rounded bg-blue-600 px-2 py-1">
                  Max
                </button>
                <span className="ml-2">Bitcoin</span>
              </div>
              <div className="mt-2 text-right text-gray-400">
                Balance: 0.01256666 BTC
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-green-500 py-2 text-center font-semibold"
              onClick={confirm}
            >
              Next
            </button>
          </form>
        </div>
        <div className="w-1/3 rounded-lg bg-[#101111] p-6">
          <h2 className="mb-4 text-xl font-semibold">Transaction Status</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
              Create
            </li>
            <li className="flex items-center">
              <span className="mr-2 h-2 w-2 rounded-full bg-gray-400"></span>
              Confirmed (1 of 2)
            </li>
            <li className="flex items-center">
              <span className="mr-2 h-2 w-2 rounded-full bg-gray-400"></span>
              Execute
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
