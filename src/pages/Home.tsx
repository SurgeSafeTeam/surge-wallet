import { Banner } from "../components/Banner";
import { Section } from "../components/Section";
import type { IVerticalFeatureRowProps } from "../components/VerticalRow";
import { VerticalRow } from "../components/VerticalRow";
import bgImage from "../../public/assets/images/bgImage.svg";
import WalletBar from "../components/WalletConnect";

const verticalFeatureRowData = [
  {
    title: "Modern Tech: React.js, TailwindCSS, Rooch-Sdk",
    description:
      "Our template employs React.js, TailwindCSS and RoochSdk for dynamic, responsive dApp design.",

    imageAlt: "First feature alt text",
  },
  {
    title: "Stylish UI with DaisyUI",
    description:
      "Enhance your dApp's user experience with beautiful interfaces, thanks to our template's integration of the daisyUI library. This feature enables you to craft intuitive and aesthetically pleasing designs, making your dApp not only functional but also visually engaging.",
    image: "/assets/images/assets2.svg",
    imageAlt: "Second feature alt text",
  },
  {
    title: "Ready-to-Use Components & Hooks",
    description:
      "Our template is equipped with an array of pre-built components and custom hooks, designed to accelerate your development process. From wallet connection utilities to various essential hooks, these ready-to-use elements enable rapid feature integration, greatly enhancing your productivity and reducing development time.",
    image: "/assets/images/assets3.svg",
    imageAlt: "Third feature alt text",
  },
];

export default function () {
  return (
    <>
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
