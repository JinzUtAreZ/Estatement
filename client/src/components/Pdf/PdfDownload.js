import React, { useState, Component } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

//IMPORTANT: focus on downloads ito, may hooks at class
// class PdfDownload extends Component {
//   state = {
//     name: "",
//     receiptId: 0,
//     price1: 0,
//     price2: 0,
//   };

//   handleChange = ({ target: { value, name } }) =>
//     this.setState({ [name]: value });
//   //NOTE: using pdf-node.js -- html also in routes/documents
//   createAndDownloadPdf = () => {
//     axios
//       .post("/api/soa/pdf/create-pdf", this.state)
//       .then(() => axios.get("/api/soa/pdf/fetch-pdf", { responseType: "blob" }))
//       .then((res) => {
//         const pdfBlob = new Blob([res.data], { type: "application/pdf" });

//         saveAs(pdfBlob, "newPdf.pdf");
//       });
//   };

//   render() {
//     return (
//       <div className="App">
//         <input
//           type="text"
//           placeholder="Name"
//           name="name"
//           onChange={this.handleChange}
//         />
//         <input
//           type="number"
//           placeholder="Receipt ID"
//           name="receiptId"
//           onChange={this.handleChange}
//         />
//         <input
//           type="number"
//           placeholder="Price 1"
//           name="price1"
//           onChange={this.handleChange}
//         />
//         <input
//           type="number"
//           placeholder="Price 2"
//           name="price2"
//           onChange={this.handleChange}
//         />
//         <button onClick={this.createAndDownloadPdf}>Download PDF</button>
//       </div>
//     );
//   }
// }

// export default PdfDownload;

// FIX: Hooks version
const PdfDownload = () => {
  const [txtInput, setTxtInput] = useState([]);

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    setTxtInput({ ...txtInput, [event.target.name]: event.target.value });
  };

  const createAndDownloadPdf = () => {
    console.log(txtInput);
    axios
      .post("/api/soa/pdf/create-pdf", txtInput)
      .then(() => axios.get("/api/soa/pdf/fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      });
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Name"
        value={txtInput.name}
        name="name"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Receipt ID"
        value={txtInput.receiptId}
        name="receiptId"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price 1"
        value={txtInput.price1}
        name="price1"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price 2"
        value={txtInput.price2}
        name="price2"
        onChange={handleChange}
      />
      <button onClick={createAndDownloadPdf}>Download PDF</button>
    </div>
  );
};

export default PdfDownload;
