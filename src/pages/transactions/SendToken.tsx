import { ConfirmTransaction } from "../../components/transaction/ConfirmTransaction.tsx";


export default function SendToken() {

  function confirm() {
    ConfirmTransaction();
  }

  return (

    <div className="min-h-screen text-white flex flex-col bg-[#101111]">
      <header className="p-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold">New Transaction</h1>
      </header>
      <main className="flex-grow p-6 flex">
        <div className="flex-1 p-6 bg-[#101111] rounded-lg mr-6 h-[780px] w-[368px]">
          <h2 className="text-xl font-semibold mb-4">Send Tokens</h2>
          <form className="space-y-4">
            <div className="flex items-center">
              <label htmlFor="recipient" className="block mb-2">Recipient Address</label>
              <details className="dropdown">
                <summary className="btn outline-none border-none shadow-none ">Recipient Address</summary>
                <ul className="menu dropdown-content text-electric-green rounded-box z-[1] w-52 p-2 shadow">
                  <li className=""><a>Item 1</a></li>
                  <li><a>Item 2</a></li>
                </ul>
              </details>
            </div>
            <div>
              <label htmlFor="amount" className="block mb-2">Amount</label>
              <div className="flex items-center border border-gray-700 rounded-lg p-2">
                <input
                  type="text"
                  id="amount"
                  className="bg-transparent flex-1 outline-none"
                  placeholder="Enter amount"
                />
                <button className="ml-2 px-2 py-1 bg-blue-600 rounded">Max</button>
                <span className="ml-2">Bitcoin</span>
              </div>
              <div className="mt-2 text-right text-gray-400">
                Balance: 0.01256666 BTC
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-500 rounded-lg text-center font-semibold"
              onClick={confirm}
            >
              Next
            </button>
          </form>
        </div>
        <div className="w-1/3 p-6 bg-[#101111] rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Transaction Status</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Create
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
              Confirmed (1 of 2)
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
              Execute
            </li>
          </ul>
        </div>
      </main>
    </div>



  );
}