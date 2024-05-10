// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalRecords {
    uint256  public check = 100;
    function getCheck() public returns {uint256}
    {
        return 100;
    }

    // for patients
    struct Patient {
        string name;
        uint256 age;
        string gender;
        uint256 id;// generated automatically

    }
    event PatientAdded(address indexed user,uint256 id);

    mapping(address => Patient) public patients;

// entering patient details
function PatientDetail(string memory n,uint256 a,string memory gen ) public {
    require((bytes)(n).length>0,"Name cannot be empty");
    uint256 idd=block.timestamp;
emit PatientAdded (msg.sender,idd);
    patients[msg.sender]=Patient(n,a,gen,idd);
}
//fetching patient details using there address
function getPatientDetails(address patientAddress) public returns(string memory,uint256,string memory,uint256){
    return(patients[patientAddress].name,patients[patientAddress].age,patients[patientAddress].gender,patients[patientAddress].id);
}






    // for labs
    struct LabReport {
        address patient_address;
        address labAddress;
        string image;
        string reportHash;
        bool isUploaded;
        uint256 timestampDay;

    }

    mapping(address => LabReport) public patientRecords;
    uint256 public recordCount;

    function image(string memory imageHash) public {
        require(bytes(imageHash).length > 0, "X-Ray hash cannot be empty");

       
        patientRecords[msg.sender] = LabReport(msg.sender, address(0), imageHash, "", false);
    }

    function uploadReports( string memory _reportHash) public {
        require(msg.sender == patientRecords[msg.sender].labAddress, "Only the lab can upload reports");
        require(bytes(_reportHash).length > 0, "Reports hash cannot be empty");

        patientRecords[msg.sender].reportHash = _reportHash;
        patientRecords[msg.sender].isUploaded = true;
    }

}
