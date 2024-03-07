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
      <h4>${name}</h4>
      <img width="100" src="${barcode}" />
      <img width="100" src="${qrCode}" />
    </div>
  `;
