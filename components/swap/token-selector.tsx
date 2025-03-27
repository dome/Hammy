"use client";

import React from "react";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import type { TokenData } from "@/types/token";
import { Check, Search } from "lucide-react";
import { useAccount, useBalance } from "wagmi";
import Image from "next/image";
import { useTokenList } from "@/providers/token-list-provider";
import { zeroAddress } from "viem";

interface TokenSelectorProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSelect: (token: TokenData) => void;
	selectedToken: TokenData;
}

export function TokenSelector({
	open,
	onOpenChange,
	onSelect,
	selectedToken,
}: TokenSelectorProps) {
	const [search, setSearch] = useState("");
	const { address } = useAccount();
	const { tokens, isLoading } = useTokenList();
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
	const searchInputRef = useRef<HTMLInputElement>(null);

	// Filter tokens based on search
	const filteredTokens = tokens.filter(
		(token) =>
			token.name.toLowerCase().includes(search.toLowerCase()) ||
			token.symbol.toLowerCase().includes(search.toLowerCase()),
	);

	// Reset focus when opening modal
	useEffect(() => {
		if (open) {
			setSearch("");
			setFocusedIndex(-1);
			setTimeout(() => {
				searchInputRef.current?.focus();
			}, 100);
		}
	}, [open]);

	// Handle keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setFocusedIndex((prev) =>
				prev < filteredTokens.length - 1 ? prev + 1 : prev,
			);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
		} else if (e.key === "Enter" && focusedIndex >= 0) {
			e.preventDefault();
			filteredTokens[focusedIndex] &&
				handleSelect(filteredTokens[focusedIndex]);
		} else if (e.key === "Escape") {
			e.preventDefault();
			onOpenChange(false);
		}
	};

	// Scroll focused item into view
	useEffect(() => {
		if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
			itemRefs.current[focusedIndex]?.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		}
	}, [focusedIndex]);

	const handleSelect = (token: TokenData) => {
		onSelect(token);
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className="sm:max-w-md card-gradient border-0 fade-in"
				onKeyDown={handleKeyDown}
			>
				<DialogHeader>
					<DialogTitle className="text-amber-800">
						Select a token
					</DialogTitle>
				</DialogHeader>
				<div className="flex items-center border border-amber-100 rounded-lg px-3 py-2 mb-4 bg-white">
					<Search className="h-4 w-4 mr-2 text-amber-400" />
					<Input
						placeholder="Search by name or symbol"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-white"
						ref={searchInputRef}
					/>
				</div>
				{isLoading ? (
					<div className="text-center py-4 text-amber-600">
						Loading tokens...
					</div>
				) : (
					<div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
						{filteredTokens.map((token, index) => (
							<TokenRow
								key={token.address}
								token={token}
								selectedToken={selectedToken}
								onSelect={handleSelect}
								userAddress={address}
								isFocused={focusedIndex === index}
								ref={(el) => (itemRefs.current[index] = el)}
								tabIndex={index + 1}
							/>
						))}
						{filteredTokens.length === 0 && (
							<div className="text-center py-4 text-amber-600">
								No tokens found
							</div>
						)}
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}

interface TokenRowProps {
	token: TokenData;
	selectedToken: TokenData;
	onSelect: (token: TokenData) => void;
	userAddress?: `0x${string}`;
	isFocused: boolean;
	tabIndex: number;
}

const TokenRow = React.forwardRef<HTMLDivElement, TokenRowProps>(
	(
		{ token, selectedToken, onSelect, userAddress, isFocused, tabIndex },
		ref,
	) => {
		const { data: balance } = useBalance({
			address: userAddress,
			token:
				token.address === zeroAddress
					? undefined
					: (token.address as `0x${string}`),
			query: {
				enabled: !!userAddress,
			},
		});

		return (
			<div
				ref={ref}
				className={`flex items-center justify-between p-3 rounded-lg cursor-pointer token-selector-item keyboard-nav-item ${
					isFocused ? "bg-amber-200" : ""
				}`}
				onClick={() => onSelect(token)}
				tabIndex={tabIndex}
				role="button"
				aria-selected={isFocused}
			>
				<div className="flex items-center gap-3">
					{token.logoURI ? (
						<Image
							src={token.logoURI || "/placeholder.svg"}
							alt={token.symbol}
							width={32}
							height={32}
							className="rounded-full"
						/>
					) : (
						<div className="w-8 h-8 rounded-full token-icon flex items-center justify-center">
							{token.symbol.charAt(0)}
						</div>
					)}
					<div>
						<div className="font-medium text-amber-800">
							{token.symbol}
						</div>
						<div className="text-sm text-amber-600">
							{token.name}
						</div>
					</div>
				</div>
				<div className="flex items-center gap-2">
					{balance && (
						<div className="text-sm text-right text-amber-700 font-medium">
							{Number.parseFloat(balance.formatted).toFixed(4)}
						</div>
					)}
					{selectedToken.address === token.address && (
						<Check className="h-4 w-4 text-amber-600" />
					)}
				</div>
			</div>
		);
	},
);

TokenRow.displayName = "TokenRow";
