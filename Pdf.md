# PDF instructions

# New Version

1. npm i react-to-print
2. create a class based component
   class ComponentToPrint extends React.Component {
   render() {
   return (
   <html />
   )
   } }

3. const PdfPrint = () => {
   const componentRef = useRef();
   const handlePrint = useReactToPrint({
   content: () => componentRef.current,
   });

return (

<div>
<ComponentToPrint ref={componentRef} />
<button onClick={handlePrint}>Print this out!</button>
</div>
);
};

export default PdfPrint;

# Old Version

Client

1.  npm i file-saver axios
2.  createAndDownloadPdf = () => {
    axios
    .post("/create-pdf", this.state)
    .then(() => axios.get("fetch-pdf", { responseType: "blob" }))
    .then((res) => {
    const pdfBlob = new Blob([res.data], { type: "application/pdf" });

          saveAs(pdfBlob, "newPdf.pdf");
        });

    };

Server

1. npm install html-pdf body-parser cors
2. app.use(cors());
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(bodyParser.json());
   const pdfTemplate = require("./documents");

   NOTE: get pdf html parameters and body

   module.exports = ({ parameter }) => {
   const today = new Date();
   return `{pdf html written here} `;
