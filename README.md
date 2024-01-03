# ICP Dummy Token Transfer Script
This script is to test ICP dummy token transfer with an encoded memo and log the transactions

# Prerequisites
Before running the script, ensure you have the following installed:

- Node.js
- npm
- Typescript

# Installation
Clone the repository or download the script files to your local machine.
Navigate to the root directory of the project in your terminal.
Run npm install to install all the necessary dependencies.

# Configuration
The script requires specific principal IDs for the sender and receiver, and a seed phrase for the sender's identity. These are set up as constants at the top of the script. Ensure these values are correctly set before running the script:

*principal_id_from*: The Principal ID of the sender.

*principal_id_to*: The Principal ID of the recipient.

*seedPhrase*: The seed phrase for the sender's identity.


# Running the Script
To execute the script, run the following command in the terminal:

```
ts-node --transpile-only icp_dummy_token_transfer.ts
```

The script performs the following actions:

1. Transfers X amount of ICP dummy tokens from the sender to the recipient.
2. Waits for 4 seconds.
3. Logs the transactions associated with the recipient's principal ID.

# Output
The script output should include some responses from approving and sending a transfer, then it will log transaction data to the console:

```
Successful transfer of ICP dummy token
Transaction 16
{
  index: '30',
  type: 'transfer',
  amount: 0.0015,
  from: 'rs5mh-o6yer-kpzmc-vgwfe-7ye7l-5olpo-gj7ud-xxwmm-cnoa2-v6dyr-aae',
  to: 'rg2ah-xl6x4-z6svw-bdxfv-klmal-cwfel-cfgzg-eoi6q-nszv5-7z5hg-sqe',
  decoded_quote_uuid: '120bdd4f-6614-4c94-aaca-739e20752b5c',
  decoded_destination_uuid: '00b40fcf-8821-4fd1-9694-fba675338f81',
  timestamp: 1704248477376540535n,
  converted_timestamp: 2024-01-03T02:21:17.376Z
}
```

# Demo
[Loom video](https://www.loom.com/share/e0a8432dec094ee193a97bd6ece02323?sid=ccc9a627-6a83-4f88-bc26-3285e3b59cfc)