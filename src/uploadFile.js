import axios from 'axios';

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlYmY1ZTJmMS1lZTgyLTQ0MDYtYmVlMy1lZDJlODRhNzY4NmUiLCJlbWFpbCI6InNhdHlhbWpoYTc5MEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiM2YwMzJhMWM3ODAzZTYzYzNlN2EiLCJzY29wZWRLZXlTZWNyZXQiOiIwZDc5MzA3YzRiZjk0ZjlhZmZkNGU5NTU5ODhhOGY4MDc1MTNmODBjOGEwMDFmNDY1ZGQyODhlNjRjYzE1NTcwIiwiaWF0IjoxNzE1MDcyNzM0fQ.Cx39izSuYAYji_ba_8j33p2fPQ4zOO4RtGqLuu-oX4M"

const pinFileToIPFS = async (jsonObject, fileName) => {
  try {
    const formData = new FormData();
   
    const jsonData = JSON.stringify(jsonObject);
    
    formData.append("file",  new Blob([jsonData], { type: 'application/json' }));
    
    const pinataMetadata = JSON.stringify({
      name: `${fileName}`,
    });
    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 1,
    });

    formData.append("pinataOptions", pinataOptions);
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: "Infinity",
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'Authorization': `Bearer ${JWT}`
      }
    });
    console.log(res);
    return res
  } catch (error) {
    console.log(error);
  }
}

export default pinFileToIPFS;
