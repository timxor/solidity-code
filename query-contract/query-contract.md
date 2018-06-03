# query-contract

### 1. make sure parity is running and on KOVAN test network (id=42)
Start parity on kovan:
``` 
parity --chain kovan --no-warp
```

Now open the ```Parity UI``` MacOS application.


### 2. get the tx confirmation of your contract you just deployed
To see how to write the contract, look at [solidity-compiler/solidity-compiler.md](./../solidity-compiler/solidity-compiler.md)

It should look something like this:
``` 
0x6874ea75a56a0578b9cc70f1650cc41e21e813c83abaf1e7fa1dd00ef091677b
```

### 3. derive the contract address from the confirmation tx above
Required parameters below:
    a: RPC function name: ```"method":"eth_getTransactionReceipt"```
    b: Confirmation tx address: ```"params":["0x6874ea75a56a0578b9cc70f1650cc41e21e813c83abaf1e7fa1dd00ef091677b"]```
    c: Kovan test network id: ```"id":42```
    d: Ethereum server endpoint: ```http://127.0.0.1:8545``` or ```https://kovan.infura.io```

Combine these all together and now curl the Ethereum node from the command line:
``` 
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x6874ea75a56a0578b9cc70f1650cc41e21e813c83abaf1e7fa1dd00ef091677b"],"id":42}' -H "Content-Type: application/json" https://kovan.infura.io
```

You should get a response like this:
``` 
{"jsonrpc":"2.0","result":{"blockHash":"0xf12836d5fe84e1fa6dd398ed048decc1675efe31633e1ce14fc47bc552d90b85","blockNumber":"0x72340f","contractAddress":"0x85f217960b2eaa974e46a4f55ca3aeb5fbef9b2b","cumulativeGasUsed":"0x28892","gasUsed":"0x23044","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","root":null,"status":"0x1","transactionHash":"0x6874ea75a56a0578b9cc70f1650cc41e21e813c83abaf1e7fa1dd00ef091677b","transactionIndex":"0x1"},"id":42}
```

Now you have your contract address in which to query:
```"contractAddress":"0x85f217960b2eaa974e46a4f55ca3aeb5fbef9b2b"```

## get the keccak hash online
Ues this [website](https://emn178.github.io/online-tools/keccak_256.html)
Get the contract you want to call. In this example I am calling: ```helloSunshine()``` that takes no arguments.

``` 
keccak-256( helloSunshine() ) 
->
22644474738e5d947760bd48f9f61db8da39e72bcd707922ea279f0ddbe0c62b
```

Grab first 4 bytes/ 8 characters (1 byte = 2 characters) of the hash above:

``` 
->
0x22644474
```

Append with padding zeros and length bit.
Should look something like this: 
[4byte signature][padding 0's][length of payload: function byte length + arguments byte length + length byte length]

``` 
->
0x226444740000000000000000000000000000000000000000000000000000000000000005
```


## curl the contract from the command line
``` 
->
curl --data '{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"0x85f217960B2eAa974e46A4F55CA3aeb5FBeF9B2B", "data":"0x226444740000000000000000000000000000000000000000000000000000000000000005"}, "latest"],"id":42}' -H "Content-Type: application/json" http://127.0.0.1:8545
```

## convert the hex response to sring
``` 
hex to string converter online
https://codebeautify.org/hex-string-converter

hex response from contract
->
0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001a48656c6c6f4f4f6f6f6f4f4f2053756e7368696e65203a292929000000000000

decoded hex to string
->
 HelloOOoooOO Sunshine :)))
```

# filter response via shell
``` 
this will extract the hex response
curl …. | awk -F'[,&]' '{print $2}' | awk -F'[:&]' '{print $2}'
```

e.g. 
``` 
curl --data '{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"0x85f217960B2eAa974e46A4F55CA3aeb5FBeF9B2B", "data":"0x226444740000000000000000000000000000000000000000000000000000000000000005"}, "latest"],"id":42}' -H "Content-Type: application/json" http://127.0.0.1:8545 | awk -F'[,&]' '{print $2}' | awk -F'[:&]' '{print $2}'
```

## bits and peices how to do it

```
   https://ethereum.stackexchange.com/questions/3514/how-to-call-a-contract-method-using-the-eth-call-json-rpc-api?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
   
   https://github.com/ethereum/homestead-guide/blob/master/source/contracts-and-transactions/accessing-contracts-and-transactions.rst
   
   https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_call
   
   hex to decimal
   https://www.binaryhexconverter.com/hex-to-decimal-converter

``` 


get wallet amount in hex
``` 
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x1B77f3EbB5587c682CD6ca4c7676B9Ea0Cc01513", "latest"],"id":42}' http://127.0.0.1:8545
```

