"use client";

import type React from "react";

import {
	WagmiProvider,
	createConfig,
	injected,
	useAccount,
	useChains,
	useReconnect,
	useSwitchChain,
} from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { http } from "viem";
import { TokenListProvider } from "@/providers/token-list-provider";
import { useEffect } from "react";
import { defineChain } from 'viem';

const bctChain = defineChain({
  id: 1190,
  name: 'bctChain',
  nativeCurrency: {
    decimals: 18,
    name: 'Test Custom Coin',
    symbol: 'BCT',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.bctchain.com'],
    },
    public: {
      http: ['https://rpc.bctchain.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'My Custom Testnet Explorer',
      url: 'https://scan.bctchain.com',
    },
  },
  testnet: false,
});
const queryClient = new QueryClient();
const connectKitConfig = getDefaultConfig({
	appName: "Hammy Swap",
	walletConnectProjectId:
		process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo",
	chains: [mainnet, bctChain],
	transports: {
		[bctChain.id]: http(),
	},
	ssr: true,
});

// Create wagmi config with ConnectKit
const config = createConfig(connectKitConfig);

//@ts-expect-error - JSON stupid api
BigInt.prototype.toJSON = function () {
	return this.toString();
};

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<ConnectKitProvider
					theme="auto"
					mode="light"
					customTheme={{
						"--ck-font-family": "Inter",
						"--ck-font-weight": "400",
						"--ck-border-radius": "20px",
						"--ck-overlay-backdrop-filter": "blur(0px)",
						"--ck-modal-heading-font-weight": "500",
						"--ck-qr-border-radius": "16px",
						"--ck-connectbutton-font-size": "15px",
						"--ck-connectbutton-color": "#78350f",
						"--ck-connectbutton-background": "#ffcc33",
						"--ck-connectbutton-background-secondary": "#FFFFFF",
						"--ck-connectbutton-border-radius": "16px",
						"--ck-connectbutton-box-shadow": "0 0 0 0 #ffffff",
						"--ck-connectbutton-hover-color": "#78350f",
						"--ck-connectbutton-hover-background": "#ffb347",
						"--ck-connectbutton-hover-box-shadow":
							"0 0 0 0 #ffffff",
						"--ck-connectbutton-active-color": "#373737",
						"--ck-connectbutton-active-background": "#EAECF1",
						"--ck-connectbutton-active-box-shadow":
							"0 0 0 0 #ffffff",
						"--ck-connectbutton-balance-color": "#373737",
						"--ck-connectbutton-balance-background": "#fff",
						"--ck-connectbutton-balance-box-shadow":
							"inset 0 0 0 1px #F6F7F9",
						"--ck-connectbutton-balance-hover-background":
							"#F6F7F9",
						"--ck-connectbutton-balance-hover-box-shadow":
							"inset 0 0 0 1px #F0F2F5",
						"--ck-connectbutton-balance-active-background":
							"#F0F2F5",
						"--ck-connectbutton-balance-active-box-shadow":
							"inset 0 0 0 1px #EAECF1",
						"--ck-primary-button-font-weight": "600",
						"--ck-primary-button-border-radius": "16px",
						"--ck-primary-button-color": "#78350f",
						"--ck-primary-button-background": "#ffcc33",
						"--ck-primary-button-box-shadow": "0 0 0 0 #ffffff",
						"--ck-primary-button-hover-color": "#78350f",
						"--ck-primary-button-hover-background": "#ffb347",
						"--ck-primary-button-hover-box-shadow":
							"0 0 0 0 #ffffff",
						"--ck-primary-button-active-color": "#373737",
						"--ck-primary-button-active-background": "#F0F2F5",
						"--ck-primary-button-active-box-shadow":
							"0 0 0 0 #ffffff",
						"--ck-secondary-button-font-weight": "500",
						"--ck-secondary-button-border-radius": "16px",
						"--ck-secondary-button-color": "#78350f",
						"--ck-secondary-button-background": "#ffcc33",
						"--ck-secondary-button-box-shadow": "0 0 0 0 #ffffff",
						"--ck-secondary-button-hover-color": "#78350f",
						"--ck-secondary-button-hover-background": "#ffb347",
						"--ck-secondary-button-hover-box-shadow":
							"0 0 0 0 #ffffff",
						"--ck-secondary-button-active-color": "#373737",
						"--ck-secondary-button-active-background": "#dfe4ec",
						"--ck-secondary-button-active-box-shadow":
							"0 0 0 0 #ffffff",
						"--ck-tertiary-button-font-weight": "500",
						"--ck-tertiary-button-border-radius": "16px",
						"--ck-tertiary-button-color": "#78350f",
						"--ck-tertiary-button-background": "#ffcc33",
						"--ck-tertiary-button-box-shadow": "0 0 0 0 #ffffff",
						"--ck-tertiary-button-hover-color": "#78350f",
						"--ck-tertiary-button-hover-background": "#ffb347",
						"--ck-tertiary-button-hover-box-shadow":
							"0 0 0 0 #ffffff",
						"--ck-tertiary-button-active-color": "#373737",
						"--ck-tertiary-button-active-background": "#F6F7F9",
						"--ck-tertiary-button-active-box-shadow":
							"0 0 0 0 #ffffff",
						"--ck-modal-box-shadow": "0px 2px 4px 0px #00000005",
						"--ck-overlay-background": "#000000bf",
						"--ck-body-color": "#78350f",
						"--ck-body-color-muted": "#999999",
						"--ck-body-color-muted-hover": "#111111",
						"--ck-body-background": "#fffaf0",
						"--ck-body-background-transparent":
							"rgba(255,255,255,0)",
						"--ck-body-background-secondary": "#f6f7f9",
						"--ck-body-background-secondary-hover-background":
							"#e0e4eb",
						"--ck-body-background-secondary-hover-outline":
							"#4282FF",
						"--ck-body-background-tertiary": "#F3F4F7",
						"--ck-body-action-color": "#999999",
						"--ck-body-divider": "#f7f6f8",
						"--ck-body-color-danger": "#FF4E4E",
						"--ck-body-color-valid": "#32D74B",
						"--ck-siwe-border": "#F0F0F0",
						"--ck-body-disclaimer-background": "#f6f7f9",
						"--ck-body-disclaimer-color": "#AAAAAB",
						"--ck-body-disclaimer-link-color": "#838485",
						"--ck-body-disclaimer-link-hover-color": "#000000",
						"--ck-tooltip-background": "#ffffff",
						"--ck-tooltip-background-secondary": "#ffffff",
						"--ck-tooltip-color": "#999999",
						"--ck-tooltip-shadow": "0px 2px 10px 0 #00000014",
						"--ck-dropdown-button-color": "#999999",
						"--ck-dropdown-button-box-shadow":
							"0 0 0 1px rgba(0,0,0,0.01), 0px 0px 7px rgba(0, 0, 0, 0.05)",
						"--ck-dropdown-button-background": "#fff",
						"--ck-dropdown-button-hover-color": "#8B8B8B",
						"--ck-dropdown-button-hover-background": "#F5F7F9",
						"--ck-qr-dot-color": "#78350f",
						"--ck-qr-background": "#ffffff",
						"--ck-qr-border-color": "#f7f6f8",
						"--ck-focus-color": "#1A88F8",
						"--ck-spinner-color": "#1A88F8",
						"--ck-copytoclipboard-stroke": "#CCCCCC",
						"--ck-recent-badge-color": "#777",
						"--ck-recent-badge-background": "#F6F7F9",
						"--ck-recent-badge-border-radius": "32px",
					}}
				>
					<ChainSwitcher />
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem={false}
						disableTransitionOnChange
					>
						<TokenListProvider>{children}</TokenListProvider>
					</ThemeProvider>
				</ConnectKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}

function ChainSwitcher() {
	// Check if conencted on mainnet, and switch to XRPL if so
	const { chain } = useAccount();
	const { switchChain } = useSwitchChain();
	const allChains = useChains();

	useEffect(() => {
		if (chain?.id === mainnet.id) {
			const timeout = setTimeout(() => {
				switchChain({
					chainId: bctChain.id,
				});
				allChains;
			}, 1000);

			return () => clearTimeout(timeout);
		}
	}, [chain?.id, switchChain]);

	return null;
}
