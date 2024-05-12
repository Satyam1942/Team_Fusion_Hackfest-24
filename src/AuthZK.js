import React from 'react'
import { ethers } from "ethers";
import HackFestABI from './HackFestABI.json'
import { useNavigate } from 'react-router-dom';


import Alert from '@mui/material/Alert';

async function ConnectWallet() {
    if (!window.ethereum) {
        console.error('No Ethereum provider found. Make sure MetaMask is installed.');
        return;
    }

    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
        console.error('Error requesting accounts:', error);
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return signer;
}

export default async function AuthZK(userId, password, personType) {
    const navigate = useNavigate();
    const { bigInt } = require("snarkjs");

    const [failure, setFailure] = React.useState(false);

    const nacl = require('tweetnacl');

    const keyPair = nacl.sign.keyPair();
    const privateKey = keyPair.secretKey;
    const publicKey = keyPair.publicKey;


    /////////////////
    const Web3 = require('web3');
    const web3 = new Web3();

    // Convert your data to a buffer
    const data = password;//INPUT PASSWORD GIVEN BY USER
    const bufferData = Buffer.from(data);

    // Calculate the Keccak-256 hash
    const hash1 = web3.utils.keccak256(bufferData);

    console.log(hash1);
    ///////////////////////////



    async function FetchReports() {
        const signer = await ConnectWallet();
        if (signer) {
            const contractAddress = '0x38eaA27bE9563BdC69863f779a0202E73Cbe29d5'; // Replace with your contract address
            const contract = new ethers.Contract(contractAddress, HackFestABI, signer);

            try {
                const password = await contract.getPassword(userId);
                return password;
            }
            catch (error) {
                console.error('Error fetching patient details:', error);
            }
        }
    }



    const input1 = hash1;
    const input2 = await FetchReports();

    function hash(data) {
        return data;
    }

    const hashedInput1 = hash(input1);
    const hashedInput2 = hash(input2);


    const proof = generateProof(privateKey, input1, input2);


    const isValid = verifyProof(publicKey, proof, hashedInput1, hashedInput2);

    if (isValid) {
        return true;
    } else {
        return false;
    }

    function generateProof(privateKey, input1, input2) {

        return {
            proof: "dummyProof",
            publicSignals: [input1, input2]
        };
    }

    function verifyProof(publicKey, proof, hashedInput1, hashedInput2) {

        return hashedInput1 === hashedInput2;
    }
}