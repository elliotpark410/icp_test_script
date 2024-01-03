import {
  createHostAgentAndIdentityFromSeed,
  getIdentityFromSeed,
} from "./icp/index";
import {
  callIcrc2Approval,
  callIcrc2TransferFrom,
} from "./icp/transfer";
import { Principal } from "@dfinity/principal";
import { encodeUuids, decodeByteArray } from "./icp/encode_decode";
import {
  convertIcpTimestamp,
  convertBigIntToBTC,
} from "./icp/index";
import { getTransactions } from "./icp/get_transactions";

const principal_id_from = "rs5mh-o6yer-kpzmc-vgwfe-7ye7l-5olpo-gj7ud-xxwmm-cnoa2-v6dyr-aae";
const principal_id_to = "rg2ah-xl6x4-z6svw-bdxfv-klmal-cwfel-cfgzg-eoi6q-nszv5-7z5hg-sqe";


async function icpDummyTokenTransfer(transfer_amount: number) {
  // seed phrase for Principal ID: rs5mh-o6yer-kpzmc-vgwfe-7ye7l-5olpo-gj7ud-xxwmm-cnoa2-v6dyr-aae
  const seedPhrase =
    "arrest citizen supreme indicate opinion eager company test nice ginger emerge jar";

  // random uuids
  const quote_uuid = "120bdd4f-6614-4c94-aaca-739e20752b5c";
  const destination_uuid = "00b40fcf-8821-4fd1-9694-fba675338f81";
  const encodedMemo = encodeUuids(quote_uuid, destination_uuid);

  // Initialize the agent with the identity
  const agent = createHostAgentAndIdentityFromSeed(seedPhrase);
  const senderIdentity = getIdentityFromSeed(seedPhrase);
  console.log("Principal: ", senderIdentity.getPrincipal().toString());

  try {
    // Call the icrc2_approve function
    const response = await callIcrc2Approval(agent, {
      amount: transfer_amount,
      memo: [encodedMemo],
    });
    console.log("Response Approval:", response);
  } catch (error) {
    console.error("Error Approval:", error);
  }

  try {
    // Call the icrc2_transfer_from function
    const response = await callIcrc2TransferFrom(agent, {
      from_principal: Principal.fromText(
        principal_id_from
      ),
      to_principal: Principal.fromText(
        principal_id_to
      ),
      amount: transfer_amount,
      memo: [encodedMemo],
    });
    console.log("Response Transfer:", response.response.headers);
    console.log("Successful transfer of ICP dummy token");
  } catch (error) {
    console.error("Error Approval:", error);
  }
}

async function icpDummyTokenTransactionLog() {
  try {
    const transactions = await getTransactions(principal_id_to);
    let count = transactions.length;

    for (const tx of transactions) {
      // does not include Mint and Approval transactions
      if (tx.transaction.kind.toString() === "transfer") {
        let quote_uuid: any;
        let destination_uuid: any;
        const encoded_memo = tx.transaction.transfer[0].memo[0];

        if (encoded_memo) {
          [quote_uuid, destination_uuid] = decodeByteArray(encoded_memo);
        }

        const txData = {
          index: tx.id.toString(),
          type: tx.transaction.kind,
          amount: convertBigIntToBTC(tx.transaction.transfer[0].amount),
          from: tx.transaction.transfer[0].from.owner.toString(),
          to: tx.transaction.transfer[0].to.owner.toString(),
          decoded_quote_uuid: quote_uuid,
          decoded_destination_uuid: destination_uuid,
          timestamp: tx.transaction.timestamp,
          converted_timestamp: convertIcpTimestamp(tx.transaction.timestamp),
        };
        console.log(`Transaction ${count--}`);
        console.log(txData);
      }
    }
    return;
  } catch (e) {
    console.error("failure logging transactions", e);
  }
}

async function executeIcpOperations() {
  await icpDummyTokenTransfer(160_000);

  // Wait for 4 seconds before executing icpDummyTokenTransactionLog
  setTimeout(async () => {
    await icpDummyTokenTransactionLog();
  }, 4000);
}

executeIcpOperations();

