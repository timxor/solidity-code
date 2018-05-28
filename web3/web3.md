# web3 

## install web3
``` 
npm install web3
```

## start geth
``` 
geth
```

## attach to geth
``` 
geth attach
```

## load web3
``` 
var Web = require('web3')
```

## connect to local eth node
``` 
var web = new Web(Web.providers.HttpProvider('http://localhost:8545'))
```

## confirm it connected
``` 
web.isConnected()
```
