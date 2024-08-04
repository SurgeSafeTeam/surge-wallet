import { Section } from "../components/Section";
import WalletBar from "../components/WalletConnect";
import Header from "../layout/Header";

export default function () {
  return (
    <>
      <Header haveSidebar={true} />
      <Section>
        <p className="mb-4 mt-10 text-5xl font-bold text-white">
          Unlock A New Way <br />
          of <span className="text-electric-green">Ownership</span>
        </p>
        <p className="mb-28 text-sm font-normal text-white/60">
          The most trusted decentralized custody protocol and <br />
          collective asset management platform.
        </p>
        <p className="mb-4 text-2xl font-normal text-white">Get Start</p>
        <p className="mb-6 text-xs font-normal text-white/60">
          Connect your wallet to create a new Safe Account or open an existing
          one
        </p>
        <div className="flex items-center space-x-4">
          <button className="rounded-full border border-white bg-black px-4 py-2 text-white">
            Watch any account
          </button>
          <WalletBar className="rounded-full" />
        </div>
      </Section>
    </>
  );
}
