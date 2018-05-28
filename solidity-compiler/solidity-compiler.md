# solidity-compiler


## install solidity-compiler
``` 
npm install -g solc
```


## get the version
``` 
solc --version
```

## get the contract json abi payload
```
solc --abi sourceFile.sol
```
gets you something like so:
``` 
[{"constant":true,"inputs":[],"name":"helloSunshine","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"}]
```


## get the contract binary hex payload
```
solc --bin sourceFile.sol
```
gets you something like so:
``` 
6060604052341561000f57600080fd5b6101578061001e6000396000f300606060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632264447414610046575b600080fd5b341561005157600080fd5b6100596100d4565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009957808201518184015260208101905061007e565b50505050905090810190601f1680156100c65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100dc610117565b6040805190810160405280601a81526020017f48656c6c6f4f4f6f6f6f4f4f2053756e7368696e65203a292929000000000000815250905090565b6020604051908101604052806000815250905600a165627a7a72305820d4c5a8e8c8ed765a9a625a5b4c27e788dd14f90bb59cbfb1f4c56c743ec345600029
```

## use these two values with parity to deploy the contract to kovan
```
parity --chain kovan
```
Open the parity UI app.
Click on Contract->Deploy
Enter the data in, click deploy.
You will get a tx like so:
``` 
0x6874ea75a56a0578b9cc70f1650cc41e21e813c83abaf1e7fa1dd00ef091677b
```
Look up the contract on ether scan like so:

``` 
https://kovan.etherscan.io/tx/0x6874ea75a56a0578b9cc70f1650cc41e21e813c83abaf1e7fa1dd00ef091677b
```

Next start interacting with the contract.
