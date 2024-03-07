"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printOrderOfPayment = void 0;
const globals_1 = require("../../globals");
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const printOrderOfPayment = (orderOfPayment) => {
    var _a, _b;
    const opNo = orderOfPayment.id;
    const date = (0, utils_1.formatDate)(orderOfPayment.datetime_created);
    const payor = (0, utils_1.getFullName)(orderOfPayment.payor);
    const address = orderOfPayment.payor.home_address;
    const amount = (0, utils_1.formatInPeso)(orderOfPayment.amount, helper_receipt_1.PESO_SIGN);
    const invoiceId = ((_b = (_a = orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.charge_sales_transaction) === null || _a === void 0 ? void 0 : _a.invoice) === null || _b === void 0 ? void 0 : _b.or_number) || '&nbsp;';
    const invoiceDate = (orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.charge_sales_transaction)
        ? (0, utils_1.formatDateTime)(orderOfPayment.charge_sales_transaction.invoice.datetime_created)
        : '&nbsp;';
    let purposeDescription = orderOfPayment.extra_description;
    if (orderOfPayment.purpose === globals_1.orderOfPaymentPurposes.PARTIAL_PAYMENT) {
        purposeDescription = 'Partial Payment';
    }
    else if (orderOfPayment.purpose === globals_1.orderOfPaymentPurposes.FULL_PAYMENT) {
        purposeDescription = 'Full Payment';
    }
    const letterStyles = 'display: inline-block; min-width: 225px; padding: 0 8px; border-bottom: 2px solid black; text-align:center; font-weight: bold';
    const data = `
		<div style="${(0, helper_receipt_1.getPageStyle)('padding: 24px; width: 795px;')}">
			<div><b>Entity Name: EJ & JY WET MARKET AND ENTERPRISES</b></div>
			<div style="display:flex; justify-content: space-between">
				<div>
					<b>OP No.: <span style="width: 200px; display: inline-block; border-bottom: 2px solid black; text-align:center;">${opNo}</span></b>
				</div>
				<div>
					<b>Date: <span style="width: 200px; display: inline-block; border-bottom: 2px solid black; text-align:center;">${date}</span></b>
				</div>
			</div>

			<br/>
			<br/>

			<div style="font-size: 1.5em; font-weight: bold; text-align: center">ORDER OF PAYMENT</div>

			<br/>

			<div><b>The Cashier</b></div>
			<div>Cashiering Unit</div>

			<br/>
			<br/>

			<div style="text-align: justify">&emsp;&emsp;&emsp;Please issue Collection Receipt in favor of
				<span style="${letterStyles}">${payor}</span> from
				<span style="${letterStyles}; min-width: 300px">${address}</span> in the amount of
				<span style="${letterStyles}">${amount}</span> for payment of
				<span style="${letterStyles}">${purposeDescription}</span> per Charge Invoice No.
				<span style="${letterStyles}">${invoiceId}</span> dated
				<span style="${letterStyles}">${invoiceDate}</span>.
			</div>

			<br/>
			<br/>
			<br/>
			<br/>
			<br/>

			<div style="padding: 0 12px; width: 60%; border-top: 2px solid black; float:right; text-align: center;">
				Manager/Authorized Official
			</div>
		</div>
	`;
    return data;
};
exports.printOrderOfPayment = printOrderOfPayment;
