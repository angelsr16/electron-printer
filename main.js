const { app, BrowserWindow } = require("electron");
const { PosPrinter } = require("@plick/electron-pos-printer");

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("index.html");

  // Get List of Printers
  let list = await win.webContents.getPrintersAsync();
  console.log("list of Printers", list);

  const {
    PosPrinter,
    PosPrintData,
    PosPrintOptions,
  } = require("@plick/electron-pos-printer");

  const options = {
    preview: false,
    margin: "0 0 0 0",
    copies: 1,
    printerName: "STMicroelectronics_USB_Portable_Printer",
    timeOutPerLine: 400,
    pageSize: "80mm", // page size
  };

  const data = [
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table' | 'divider'
      value: "SAMPLE HEADING",
      style: { fontWeight: "700", textAlign: "center", fontSize: "24px" },
    },
  ];

  PosPrinter.print(data, options)
    .then(console.log)
    .catch((error) => {
      console.error(error);
    });
};

app.whenReady().then(() => {
  createWindow();
});
