# DECENTRALISED HEALTH CARE SYSTEM

This is a web-based application for managing medical records. It provides functionalities for doctors to log in, view patient information, add prescriptions, and view patient medical history.

## PROBLEM STATEMENT

### The problems in the current healthcare system

#### Overwhelming Documentation and Reporting in Diagnosis and Treatment:

The diagnostic and treatment processes involve excessive documentation and
reports, leading to potential inefficiencies and difficulties in synthesizing crucial information for patient care.

#### Incomplete Patient History:

Patients may not remember or inform their healthcare providers about previous
illnesses relevant to the current disease, resulting in an incomplete understanding of the patient's medical history and potentially impacting the accuracy of diagnosis and treatment decisions.

#### Deterioration of Critical Reports and Documents:

Important medical documents are susceptible to degradation over time,
posing a risk of vital information loss and hindering informed decision-making by healthcare professionals

#### Limited Access to Comprehensive and Up-to-Date Health Data
The challenge revolves around insurers struggling to accurately assess risks
for individuals due to limited access to comprehensive and up-to-date health
data. This dearth of a unified health information repository leads to pricing
discrepancies, as insurers lack a holistic understanding of individuals' health histories.

## APPROACH

### INTRODUCTION: 
Our proposed Comprehensive Health Management System consolidates individuals' complete medical histories, ensuring seamless accessibility, data integrity, and global acceptance. To address the challenges faced by traditional healthcare systems, we propose leveraging advanced technologies such as Blockchain, ML, and AI.

### Blockchain for Secure and Immutable Data Management:
Implement a decentralized blockchain network to securely store and manage healthcare data, ensuring immutability and integrity.
Utilize smart contracts to automate and streamline processes such as consent management, data sharing, and compliance with regulations like GDPR.
Employ cryptographic techniques for data encryption and privacy preservation, ensuring confidentiality while allowing authorized access to relevant
stakeholders.

### ML/AI for Intelligent Data Processing and Analysis:
Develop machine learning algorithms to analyze large volumes of healthcare data and extract meaningful insights, aiding in diagnosis, treatment planning, and predictive analytics. Train AI models to identify patterns and correlations within patient data, enabling personalized medicine approaches and early detection of diseases. Integrate natural language processing (NLP) algorithms to extract structured information from
unstructured medical records and reports, facilitating efficient documentation and decision-making.

### ZK Authentication for Enhanced Security:
Implement zero-knowledge (ZK) authentication protocols to enhance the security and privacy of patient data access. Enable secure and anonymous
authentication mechanisms, allowing healthcare providers and insurers to access relevant information without compromising patient confidentiality
Integrate ZK proofs to verify the authenticity of data transactions and ensure compliance with regulatory requirements regarding data privacy and consent.

By combining these technologies, our solution empowers both patients and healthcare professionals, fostering better healthcareoutcomes, research opportunities, and insurance solutions. Individuals are provided with a health card containing a unique health number, serving as a key for accessing their account on our platform hosted on a blockchain network.


## Tech Stacks

### Backend:
-Framework: Flask (Python web framework)
-RESTful API Development: Flask REST Framework.

### Frontend:
-JavaScript Library: React.js
-UI Framework: Material-UI

### ML/AI and NLP Integration:
-Machine Learning Framework: TensorFlow , Pytorch (for building and training neural
networks)

### Natural Language Processing (NLP): NLTK (Natural Language Toolkit), spaCy
-NLP Techniques: Text preprocessing, Sentiment Analysis, Transfer Learning
-Data Manipulation: NumPy, Pandas

### Blockchain Integration:
-Ethereum: Web3.js ,Ether.js
-Smart Contract Development: Solidity
-Blockchain Protocol: Ethereum's blockchain protocol
-Decentralized Storage: IPFS (InterPlanetary File System) using Filecoin,Pinata

### ZK Authentication: Zero-Knowledge Authentication Protocols (ZKPs)
-Libraries/Frameworks: Web3.js for JavaScript-based ZK authentication
-Cryptographic Techniques: zk-SNARKs (Zero-Knowledge Succinct Non- Interactive Arguments of Knowledge) for secure authentication, Circom

## Workflow
### Decentralized Identity
![alt text](<Deccentralzed identity.png>)
### Zero Knowledge Authentication
![alt text](<Zero Knowledge authentication.png>)
### Data Management
![alt text](<flow chart data management.png>)

### Features

- **Login Page:** Users can log in using their credentials.

- **Doctor Dashboard:**
  - View Doctor's Information: Doctors can view their own information such as name, specialty, contact details, etc.
  - Add New Prescription: Doctors can add new prescriptions for patients by providing patient ID, medication details, dosage, etc.
  - View Patient Medical History: Doctors can view the medical history of patients by entering their patient ID.

- **Patient Dashboard:**
  - View Patients's Information: Patients can view their own information such as name, specialty, contact details, etc.
  - View Patient Medical History: Patients  can view the medical history of patients by entering their patient ID.

-**Technologies Used:**
   -Frontend: React.js
   -Styling: CSS, Material UI
