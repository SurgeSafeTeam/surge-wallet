const ConfirmTransaction = () => (
  <div className="min-h-screen bg-gray-900 p-8 text-white">
    <div className="container mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Confirm Transaction</h1>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 rounded-lg bg-gray-800 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Send Tokens</h2>
            <div className="mt-3">
              <label className="block">Send</label>
              <div className="mt-1 rounded bg-gray-700 p-2">
                Bitcoin 0.01256666
              </div>
            </div>
            <div className="mt-3">
              <label className="block">To</label>
              <div className="mt-1 flex items-center rounded bg-gray-700 p-2">
                <img
                  src="/path-to-avatar.jpg"
                  alt="Avatar"
                  className="mr-2 h-8 w-8 rounded-full"
                />
                ABC BTC:0xAD...65F34..
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Transaction Details</h2>
            <select className="mt-3 w-full rounded bg-gray-700 p-2">
              <option>Token Transfer</option>
            </select>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Transaction Checks</h2>
            <button className="mt-3 w-full rounded bg-green-600 p-2">
              Simulate
            </button>
            <p className="mt-1 text-sm text-gray-400">
              Run A Simulation Powered by Tenderly
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <button className="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700">
              Next
            </button>
            <button className="rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-600">
              + Add new batch
            </button>
            <button className="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700">
              Next
            </button>
          </div>
        </div>
        <div className="rounded-lg bg-gray-800 p-6">
          <h2 className="mb-4 text-lg font-semibold">Transaction Status</h2>
          <ul>
            <li>
              <span className="mr-2 text-green-500">●</span>Create
            </li>
            <li>
              <span className="mr-2 text-yellow-500">●</span>Confirmed (1 of 2)
            </li>
            <li>
              <span className="mr-2 text-gray-400">●</span>Execute
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export { ConfirmTransaction };
