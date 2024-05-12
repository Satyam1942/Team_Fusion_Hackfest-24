// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract HackFest 
{
     uint256 private nonce = 0;
    
    struct Patient {
        uint256 Id;
        string Name;
        string Gender;
        uint256 Age;
        uint256 reportCount;
        uint256 PrescriptionCount;
        uint256 password;
    }

    mapping(uint256 => Patient) patients;
    event PatientRegistered(uint256 indexed patientId,uint256 password);
    event LabReportFetched(uint256 indexed patientId,string hash);
    event DoctorRegistered(uint256 indexed doctorID,uint256 password);
    event LabRegistered(uint256 indexed LabID,uint256 password);
  

    function RegisterPatientDetails(string memory name, string memory gender, uint256 age) public {
    uint256 patientId = block.timestamp;
    uint256 password = uint256(keccak256(abi.encodePacked(patientId,age, nonce)))%patientId ;
    patients[patientId] = Patient(patientId, name, gender, age, 0, 0,password);
    emit PatientRegistered(patientId, password);
    nonce++;
}

    function getPassword(uint256 patid) public view returns (string memory){
        return (toString(patients[patid].password));
    }

    struct DoctoRegistration{
        string name;
        uint256 DoctoId;
        uint256 passcode;
    }
    mapping(uint256=>DoctoRegistration) Doc;

    function RegisterDoctor(string memory name) public{
        uint256 doctorID=block.timestamp;
        uint256 password=uint256(keccak256(abi.encodePacked(doctorID, nonce)))%doctorID;
        Doc[doctorID]=DoctoRegistration(name,doctorID,password);
        emit DoctorRegistered(doctorID,password);
        nonce++;
    }

    function getDoctorPassword(uint256 docid) public view returns(string memory){
        return toString(Doc[docid].passcode);
    }

    struct LabRegister{
        string LabType;
        uint256 LabID;
        uint256 passcode;
    }

    mapping(uint256=>LabRegister) LR;

    function RegisterLab(string memory labtype) public {
      uint256  labid=block.timestamp;
      uint256 password=uint256(keccak256(abi.encodePacked(labid, nonce)))%labid;
      LR[labid]=LabRegister(labtype,labid,password);
      emit LabRegistered(labid,password);
      nonce++;
    }

    function getLabPassword(uint256 labid) public view returns (string memory)
    {
        return toString(LR[labid].passcode);
    }


function toString(uint256 value) internal pure returns (string memory) {
    if (value == 0) {
        return "0";
    }
    uint256 temp = value;
    uint256 digits;
    while (temp != 0) {
        digits++;
        temp /= 10;
    }
    bytes memory buffer = new bytes(digits);
    while (value != 0) {
        digits -= 1;
        buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
        value /= 10;
    }
    return string(buffer);
}







    struct Lab {
        uint256 LabID;
        uint256 PatientID;
        string Report_Hash;
        string Prescription;
        uint256 timestamp;
    }
    struct DoctorPrescription {
        uint256 DoctorID;
        string  PrescriptionHash;
        uint256 timestamp;
    }
    
struct Doctor{
    string DocID;
    string PrecriptionHash;
    uint256 timestamp;
}

// function to upload prescription

mapping(uint256=>mapping(uint256=>DoctorPrescription)) docpres;
function UploadPrescription(uint256 patID,uint256 docID,string memory prescriptionHash) public {
    uint256 PrescriptionCount=patients[patID].PrescriptionCount;
    docpres[patID][PrescriptionCount]=DoctorPrescription(docID,prescriptionHash,block.timestamp);
    patients[patID].PrescriptionCount++;
}

// lab mapping
    mapping(uint256 => mapping(uint256 => Lab)) labReports;

// function to check correct patient id
function CheckCorrectPatientID(uint256 patientID) public view returns(uint256) {
    if(patients[patientID].Id == patientID)
    return 1;
    else return 0;
}
// function for lab to upload patient reports
    function UploadLab(uint256 labID, uint256 patientID, string memory report_Hash, string memory prescription) public {
        
        if(CheckCorrectPatientID(patientID)==1)
        {
        uint256 time = block.timestamp;
        uint256 patientReportCount = patients[patientID].reportCount;
        labReports[patientID][patientReportCount] = Lab(labID, patientID, report_Hash, prescription, time);
        patients[patientID].reportCount++;
        }
    }

function getLabAsJson(uint256 patientID, uint256 index) public view returns (Lab memory) {
    Lab memory lab = labReports[patientID][index];
    return Lab({
        LabID: lab.LabID,
        PatientID: lab.PatientID,
        Report_Hash: lab.Report_Hash,
        Prescription: lab.Prescription,
        timestamp: lab.timestamp
    });
}

 struct Labb {
        string LabID;
        string PatientID;
        string Report_Hash;
        string Prescription;
        uint256 timestamp;
    }

function getAllTheDetails(uint256 patientID, uint256 last_index) public view returns (Labb[] memory) {
    uint256 reportCount = patients[patientID].reportCount;
    last_index = last_index < reportCount ? last_index : reportCount;

    Labb[] memory labJsons = new Labb[](last_index);
    for (uint256 i = 0; i < last_index; i++) {
        Lab memory lab = labReports[patientID][i];
        string memory labid=toString(lab.LabID);
        string memory pid=toString(lab.PatientID);

        labJsons[i].LabID=labid;
        labJsons[i].PatientID=pid;
        labJsons[i].Report_Hash=lab.Report_Hash;
        labJsons[i].Prescription=lab.Prescription;
        labJsons[i].timestamp=lab.timestamp;
        
    }
    return labJsons;
}

function FetchPrescription(uint256 patientID, uint256 last_index) public view returns (DoctorPrescription[] memory) {
    uint256 prescriptionCount = patients[patientID].PrescriptionCount;
    last_index = last_index < prescriptionCount ? last_index : prescriptionCount;

    DoctorPrescription[] memory doctorPrescriptions = new DoctorPrescription[](last_index);
    for (uint256 i = 0; i < last_index; i++) {
        DoctorPrescription memory dp = docpres[patientID][i];
        doctorPrescriptions[i] = DoctorPrescription({
            DoctorID: dp.DoctorID,
            PrescriptionHash: dp.PrescriptionHash,
            timestamp: dp.timestamp
        });
    }
    return doctorPrescriptions;
}


    
}
