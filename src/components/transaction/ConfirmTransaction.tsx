

const ConfirmTransaction = () => (
  <div className="bg-gray-900 text-white min-h-screen p-8">
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Confirm Transaction</h1>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 p-6 bg-gray-800 rounded-lg">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Send Tokens</h2>
            <div className="mt-3">
              <label className="block">Send</label>
              <div className="p-2 bg-gray-700 rounded mt-1">
                Bitcoin 0.01256666
              </div>
            </div>
            <div className="mt-3">
              <label className="block">To</label>
              <div className="flex items-center p-2 bg-gray-700 rounded mt-1">
                <img src="/path-to-avatar.jpg" alt="Avatar" className="w-8 h-8 rounded-full mr-2"/>
                ABC BTC:0xAD...65F34..
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Transaction Details</h2>
            <select className="w-full p-2 bg-gray-700 rounded mt-3">
              <option>Token Transfer</option>
            </select>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Transaction Checks</h2>
            <button className="w-full p-2 bg-green-600 rounded mt-3">Simulate</button>
            <p className="text-sm text-gray-400 mt-1">Run A Simulation Powered by Tenderly</p>
          </div>
          <div className="flex justify-between items-center mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Next
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
              + Add new batch
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Next
            </button>
          </div>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Transaction Status</h2>
          <ul>
            <li><span className="text-green-500 mr-2">●</span>Create</li>
            <li><span className="text-yellow-500 mr-2">●</span>Confirmed (1 of 2)</li>
            <li><span className="text-gray-400 mr-2">●</span>Execute</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);


export {ConfirmTransaction};