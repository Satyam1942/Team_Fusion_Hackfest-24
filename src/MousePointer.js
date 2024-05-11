// import React, { useState, useEffect } from "react";

// function MousePointer() {
//   const [x, setX] = useState(0);
//   const [y, setY] = useState(0);

//   const logMousePosition = (e) => {
//     setX(e.clientX);
//     setY(e.clientY);
//   };

//   useEffect(() => {
//     window.addEventListener("mousemove", logMousePosition);

//     return () => {
//       window.removeEventListener("mousemove", logMousePosition);
//     };
//   }, []);

//   return (
//     <div
//       style={{
//         position: "absolute",
//         left: x,
//         top: y,
//         width: 20,
//         height: 20,
//         borderRadius: "50%",
//         backgroundColor: "#00796B",
//         zIndex: 999
//       }}
//     />
//   );
// }

// export default MousePointer;