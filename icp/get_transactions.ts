
import ic from "ic0";
import { Principal } from "@dfinity/principal";


export async function getTransactions() {
  const principalString = "rg2ah-xl6x4-z6svw-bdxfv-klmal-cwfel-cfgzg-eoi6q-nszv5-7z5hg-sqe";
  const principal = Principal.fromText(principalString);
  const canisterId = "r5dbf-aiaaa-aaaam-ab3ga-cai"; // LBTC token index canister id
  const agentCanister = ic(canisterId);
  const transactions = await agentCanister.call("get_account_transactions", {
    account: { owner: principal, subaccount: [] },
    max_results: 100,
    start: [],
  });

 return transactions.Ok.transactions;
}