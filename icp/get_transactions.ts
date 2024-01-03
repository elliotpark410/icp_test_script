
import ic from "ic0";
import { Principal } from "@dfinity/principal";

export async function getTransactions(principal_id: string) {

  const principal = Principal.fromText(principal_id);
  const canisterId = "r5dbf-aiaaa-aaaam-ab3ga-cai"; // LBTC token index canister id
  const agentCanister = ic(canisterId);
  const transactions = await agentCanister.call("get_account_transactions", {
    account: { owner: principal, subaccount: [] },
    max_results: 100,
    start: [],
  });

 return transactions.Ok.transactions;
}