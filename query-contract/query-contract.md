# query-contract


## get the tx confirmation of your contract you deployed
``` 
0x6874ea75a56a0578b9cc70f1650cc41e21e813c83abaf1e7fa1dd00ef091677b
```

## make sure parity is running
``` 
parity ui --chain kovan
```

## derive the contract address for the tx
``` 
to do...
```

## derive the contract function name and args
``` 
to do...
```

## get the keccak hash online
``` 
https://emn178.github.io/online-tools/keccak_256.html
keccak-256( helloSunshine() ) 
->
22644474738e5d947760bd48f9f61db8da39e72bcd707922ea279f0ddbe0c62b
```

``` 
grab first 4 bytes
->
0x22644474
```

``` 
append with padding zeros and length bit
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

