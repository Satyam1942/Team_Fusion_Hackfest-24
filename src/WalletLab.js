import React, { useState } from 'react';
import { ethers } from 'ethers';
import HackFestABI from './HackFestABI.json'; // Assuming you have the ABI in a file

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

function WalletButton(props) {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const {labId, patientId, imageHash, reportHash} = props;

    const connectWalletAndRegisterPatient = async () => {
        const signer = await ConnectWallet();

        if (signer) {
            const contractAddress = '0xb738A6d0b59fef9053D3E7E8Bf12d9D8b64eC722'; // Replace with your contract address
            const contract = new ethers.Contract(contractAddress, HackFestABI, signer);

            try {
                await contract.RegisterPatientDetails("Satyam", "Male", 22);
                console.log('Patient details registered successfully.');
            } catch (error) {
                console.error('Error registering patient details:', error);
            }
        }
        setupEventListener(signer)
    };
    function setupEventListener(signer) {
       
        const contractAddress = '0xb738A6d0b59fef9053D3E7E8Bf12d9D8b64eC722'; // Replace with your contract address
        const contract = new ethers.Contract(contractAddress, HackFestABI, signer);

        if (contract) {
            contract.on('PatientRegistered', (patientId) => {
                console.log(`Patient registered with ID: ${patientId.toString()}`);
                // Perform other actions as needed
            });
        }
    }

    const connectWalletandUploadLab = async () => {
        const signer = await ConnectWallet();
        if (signer) {
            const contractAddress = '0xb738A6d0b59fef9053D3E7E8Bf12d9D8b64eC722'; // Replace with your contract address
            const contract = new ethers.Contract(contractAddress, HackFestABI, signer);
     
     try{
        await contract.UploadLab(labId,patientId,reportHash,imageHash);
        console.log('succesfully uploaded');
     }catch(error){
        console.error('Error registering patient details:', error);
     }
    }
    }

    async function FetchReports() {
        const signer = await ConnectWallet();
        if(signer){
            const contractAddress = '0xb738A6d0b59fef9053D3E7E8Bf12d9D8b64eC722'; // Replace with your contract address
            const contract = new ethers.Contract(contractAddress, HackFestABI, signer);

            try{
                const patientId = 1715406708;
                const count=3;
                const patientReports = await contract.getAllTheDetails(patientId,count);
                console.log('Patient details:', patientReports);
            }
            catch (error) {
                console.error('Error fetching patient details:', error);
            }
        }
    }

    return (
        <div>
           
            <button onClick={connectWalletAndRegisterPatient}>
                Connect Wallet & Register Patient
            </button>
            <button onClick={connectWalletandUploadLab}>
                Connect Wallet & Upload Lab
            </button>
            <button onClick = {FetchReports}>
                Fetch Datas
            </button>
        </div>
    );
}
