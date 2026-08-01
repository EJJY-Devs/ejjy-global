export const printEmployeeCode = (
	name: string,
	barcode: string,
	qrCode: string,
) => `
    <div
      style="
        width: 56mm;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      "
    >
      <div style="
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        word-break: break-word;
        margin: 0 0 2mm;
      ">${name}</div>
      <img width="100" style="display: block; margin-bottom: 2mm;" src="${barcode}" />
      <img width="100" style="display: block;" src="${qrCode}" />
    </div>
  `;
