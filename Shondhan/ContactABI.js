const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": false, "internalType": "address", "name": "_admin", "type": "address" },
        { "indexed": false, "internalType": "string", "name": "reportId", "type": "string" },
        { "indexed": false, "internalType": "string", "name": "userId", "type": "string" },
        { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
      ],
      "name": "ReportApproved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": false, "internalType": "address", "name": "_admin", "type": "address" },
        { "indexed": false, "internalType": "string", "name": "reportId", "type": "string" },
        { "indexed": false, "internalType": "string", "name": "userId", "type": "string" },
        { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
      ],
      "name": "ReportBanned",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": false, "internalType": "address", "name": "admin", "type": "address" },
        { "indexed": false, "internalType": "string", "name": "userId", "type": "string" },
        { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
      ],
      "name": "UserBanned",
      "type": "event"
    },
    {
      "inputs": [{ "internalType": "string", "name": "_reportId", "type": "string" }],
      "name": "approveReport",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "string", "name": "_reportId", "type": "string" }],
      "name": "banReport",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "string", "name": "_userId", "type": "string" }],
      "name": "banUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "string", "name": "", "type": "string" }],
      "name": "reports",
      "outputs": [
        { "internalType": "string", "name": "reportId", "type": "string" },
        { "internalType": "string", "name": "userId", "type": "string" },
        { "internalType": "bool", "name": "isReportApproved", "type": "bool" },
        { "internalType": "bool", "name": "isReportBanned", "type": "bool" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "string", "name": "", "type": "string" }],
      "name": "users",
      "outputs": [
        { "internalType": "string", "name": "userId", "type": "string" },
        { "internalType": "string", "name": "userName", "type": "string" },
        { "internalType": "bool", "name": "isUserBanned", "type": "bool" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  
  export default contractABI;