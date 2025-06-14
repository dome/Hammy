import type { Address } from "viem";
import { env } from "./utils/env";

// Uniswap V2 Factory and Router addresses on Ethereum mainnet
export const UNISWAP_V2_FACTORY = env.NEXT_PUBLIC_UNISWAP_V2_FACTORY as Address;
export const UNISWAP_V2_ROUTER = env.NEXT_PUBLIC_UNISWAP_V2_ROUTER as Address;
export const WETH_ADDRESS = env.NEXT_PUBLIC_WETH_ADDRESS as Address;

// Token addresses for price calculations
export const USDC_ADDRESS = "0x49be54686D911D454bB0887FdE424e3C617dA683" as Address;

// ABIs
export const UNISWAP_V2_ROUTER_ABI = [
	// Only including the functions we need
	{
		inputs: [
			{ internalType: "uint256", name: "amountIn", type: "uint256" },
			{ internalType: "uint256", name: "amountOutMin", type: "uint256" },
			{ internalType: "address[]", name: "path", type: "address[]" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "deadline", type: "uint256" },
		],
		name: "swapExactTokensForTokens",
		outputs: [
			{ internalType: "uint256[]", name: "amounts", type: "uint256[]" },
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "amountOutMin", type: "uint256" },
			{ internalType: "address[]", name: "path", type: "address[]" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "deadline", type: "uint256" },
		],
		name: "swapExactETHForTokens",
		outputs: [
			{ internalType: "uint256[]", name: "amounts", type: "uint256[]" },
		],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "amountIn", type: "uint256" },
			{ internalType: "uint256", name: "amountOutMin", type: "uint256" },
			{ internalType: "address[]", name: "path", type: "address[]" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "deadline", type: "uint256" },
		],
		name: "swapExactTokensForETH",
		outputs: [
			{ internalType: "uint256[]", name: "amounts", type: "uint256[]" },
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "tokenA", type: "address" },
			{ internalType: "address", name: "tokenB", type: "address" },
			{
				internalType: "uint256",
				name: "amountADesired",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "amountBDesired",
				type: "uint256",
			},
			{ internalType: "uint256", name: "amountAMin", type: "uint256" },
			{ internalType: "uint256", name: "amountBMin", type: "uint256" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "deadline", type: "uint256" },
		],
		name: "addLiquidity",
		outputs: [
			{ internalType: "uint256", name: "amountA", type: "uint256" },
			{ internalType: "uint256", name: "amountB", type: "uint256" },
			{ internalType: "uint256", name: "liquidity", type: "uint256" },
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "token", type: "address" },
			{
				internalType: "uint256",
				name: "amountTokenDesired",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256",
			},
			{ internalType: "uint256", name: "amountETHMin", type: "uint256" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "deadline", type: "uint256" },
		],
		name: "addLiquidityETH",
		outputs: [
			{ internalType: "uint256", name: "amountToken", type: "uint256" },
			{ internalType: "uint256", name: "amountETH", type: "uint256" },
			{ internalType: "uint256", name: "liquidity", type: "uint256" },
		],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "tokenA", type: "address" },
			{ internalType: "address", name: "tokenB", type: "address" },
			{ internalType: "uint256", name: "liquidity", type: "uint256" },
			{ internalType: "uint256", name: "amountAMin", type: "uint256" },
			{ internalType: "uint256", name: "amountBMin", type: "uint256" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "deadline", type: "uint256" },
		],
		name: "removeLiquidity",
		outputs: [
			{ internalType: "uint256", name: "amountA", type: "uint256" },
			{ internalType: "uint256", name: "amountB", type: "uint256" },
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "token", type: "address" },
			{ internalType: "uint256", name: "liquidity", type: "uint256" },
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256",
			},
			{ internalType: "uint256", name: "amountETHMin", type: "uint256" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "deadline", type: "uint256" },
		],
		name: "removeLiquidityETH",
		outputs: [
			{ internalType: "uint256", name: "amountToken", type: "uint256" },
			{ internalType: "uint256", name: "amountETH", type: "uint256" },
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "amountIn", type: "uint256" },
			{ internalType: "address[]", name: "path", type: "address[]" },
		],
		name: "getAmountsOut",
		outputs: [
			{ internalType: "uint256[]", name: "amounts", type: "uint256[]" },
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "amountOut", type: "uint256" },
			{ internalType: "address[]", name: "path", type: "address[]" },
		],
		name: "getAmountsIn",
		outputs: [
			{ internalType: "uint256[]", name: "amounts", type: "uint256[]" },
		],
		stateMutability: "view",
		type: "function",
	},
] as const;

export const UNISWAP_V2_FACTORY_ABI = [
	{
		inputs: [
			{ internalType: "address", name: "tokenA", type: "address" },
			{ internalType: "address", name: "tokenB", type: "address" },
		],
		name: "getPair",
		outputs: [{ internalType: "address", name: "pair", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
] as const;

export const ERC20_ABI = [
	{
		inputs: [
			{ internalType: "address", name: "owner", type: "address" },
			{ internalType: "address", name: "spender", type: "address" },
		],
		name: "allowance",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "spender", type: "address" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
		],
		name: "approve",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "account", type: "address" }],
		name: "balanceOf",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
] as const;

export const UNISWAP_V2_PAIR_ABI = [
	{
		inputs: [],
		name: "getReserves",
		outputs: [
			{ internalType: "uint112", name: "reserve0", type: "uint112" },
			{ internalType: "uint112", name: "reserve1", type: "uint112" },
			{
				internalType: "uint32",
				name: "blockTimestampLast",
				type: "uint32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "token0",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
] as const;

// WXRP ABI - Same as WETH but for XRP wrapping
export const WXRP_ABI = [
	{
		inputs: [],
		name: "deposit",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
		name: "withdraw",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "decimals",
		outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "account", type: "address" }],
		name: "balanceOf",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "owner", type: "address" },
			{ internalType: "address", name: "spender", type: "address" },
		],
		name: "allowance",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "spender", type: "address" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
		],
		name: "approve",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
] as const;
