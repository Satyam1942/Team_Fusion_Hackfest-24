async function retrieveData(fileCID) {
    try {
      const res = await fetch(
        `https://ivory-tricky-chipmunk-595.mypinata.cloud/ipfs/${fileCID}`
      );
      const resData = await res.text();
      return resData;
    } catch (error) {
      console.log(error);
    }
}

export default retrieveData;
  
  