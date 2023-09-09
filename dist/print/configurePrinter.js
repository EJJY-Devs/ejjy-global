"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCashOut = exports.printBirReport = exports.printCashBreakdown = exports.printZReadReport = exports.printXReadReport = exports.printDailySales = exports.printSalesInvoice = exports.printCollectionReceipt = exports.openCashDrawer = exports.configurePrinter = void 0;
const antd_1 = require("antd");
const dayjs_1 = __importDefault(require("dayjs"));
const qz_tray_1 = __importDefault(require("qz-tray"));
const globals_1 = require("../globals");
const utils_1 = require("../utils");
const PESO_SIGN = 'P';
const EMPTY_CELL = '';
const PAPER_MARGIN_INCHES = 0.2;
const PAPER_WIDTH_INCHES = 3;
const QZ_MESSAGE_KEY = 'QZ_MESSAGE_KEY';
const PRINT_MESSAGE_KEY = 'PRINT_MESSAGE_KEY';
let printerName;
let printerFontSize;
let printerFontFamily;
const configurePrinter = (appPrinterName, appprinterFontSize, appprinterFontFamily) => {
    printerName = appPrinterName;
    printerFontSize = appprinterFontSize;
    printerFontFamily = appprinterFontFamily;
    if (!qz_tray_1.default.websocket.isActive()) {
        (0, utils_1.authenticateQZTray)(qz_tray_1.default);
        antd_1.message.loading({
            content: 'Connecting to QZTray...',
            key: QZ_MESSAGE_KEY,
            duration: 5000,
        });
        qz_tray_1.default.websocket
            .connect()
            .then(() => {
            antd_1.message.success({
                content: 'Successfully connected to QZTray.',
                key: QZ_MESSAGE_KEY,
            });
        })
            .catch((err) => {
            antd_1.message.error({
                content: 'Cannot connect to QZTray.',
                key: QZ_MESSAGE_KEY,
            });
            console.error(err);
        });
    }
};
exports.configurePrinter = configurePrinter;
const openCashDrawer = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!qz_tray_1.default.websocket.isActive()) {
        antd_1.message.error({
            content: 'Printer is not connected or QZTray is not open.',
        });
        return;
    }
    antd_1.message.loading({
        content: 'Opening cash drawer...',
        key: PRINT_MESSAGE_KEY,
        duration: 5000,
    });
    let printerStatus = null;
    // Add printer callback
    qz_tray_1.default.printers.setPrinterCallbacks((event) => {
        console.log('event', event);
        printerStatus = event;
    });
    // Register listener and get status; deregister after
    yield qz_tray_1.default.printers.startListening(printerName);
    yield qz_tray_1.default.printers.getStatus();
    yield qz_tray_1.default.printers.stopListening();
    if (printerStatus === null) {
        antd_1.message.error({
            key: PRINT_MESSAGE_KEY,
            content: 'Unable to detect selected printer.',
        });
        return;
    }
    if (printerStatus.statusText === globals_1.printerStatuses.NOT_AVAILABLE) {
        antd_1.message.error({
            key: PRINT_MESSAGE_KEY,
            content: 'Printer is not available. Make sure printer is connected to the machine.',
        });
        return;
    }
    if (globals_1.printerStatuses.OK === printerStatus.statusText) {
        try {
            const config = qz_tray_1.default.configs.create(printerName);
            yield qz_tray_1.default.print(config, [
                // eslint-disable-next-line no-useless-concat
                '\x1B' + '\x40',
                // eslint-disable-next-line no-useless-concat
                '\x10' + '\x14' + '\x01' + '\x00' + '\x05',
            ]);
            antd_1.message.success({
                content: 'Cash has been opened.',
                key: PRINT_MESSAGE_KEY,
            });
        }
        catch (e) {
            antd_1.message.error({
                content: 'An error occurred while opening cash drawer.',
                key: PRINT_MESSAGE_KEY,
            });
            console.error(e);
        }
        return;
    }
    // OTHERS
    antd_1.message.error({
        key: PRINT_MESSAGE_KEY,
        content: 'Cash drawer cannot open right now. Please contact an administrator.',
    });
});
exports.openCashDrawer = openCashDrawer;
const print = (printData, entity, onComplete) => __awaiter(void 0, void 0, void 0, function* () {
    if (!qz_tray_1.default.websocket.isActive()) {
        antd_1.message.error({
            content: 'Printer is not connected or QZTray is not open.',
        });
        return;
    }
    antd_1.message.loading({
        content: `Printing ${entity.toLowerCase()}...`,
        key: PRINT_MESSAGE_KEY,
        duration: 5000,
    });
    let printerStatus = null;
    // Add printer callback
    qz_tray_1.default.printers.setPrinterCallbacks((event) => {
        console.log('event', event);
        printerStatus = event;
    });
    // Register listener and get status; deregister after
    yield qz_tray_1.default.printers.startListening(printerName);
    yield qz_tray_1.default.printers.getStatus();
    yield qz_tray_1.default.printers.stopListening();
    if (printerStatus === null) {
        antd_1.message.error({
            key: PRINT_MESSAGE_KEY,
            content: 'Unable to detect selected printer.',
        });
        return;
    }
    // NOT_AVAILABLE: Printer is not available
    if (printerStatus.statusText === globals_1.printerStatuses.NOT_AVAILABLE) {
        /*
      eventType: PRINTER
      message: NOT_AVAILABLE: Level: FATAL, From: EPSON TM-U220 Receipt, EventType: PRINTER, Code: 4096
    */
        antd_1.message.error({
            key: PRINT_MESSAGE_KEY,
            content: 'Printer is not available. Make sure printer is connected to the machine.',
        });
        return;
    }
    // OK: Ready to print
    if ([globals_1.printerStatuses.OK, globals_1.printerStatuses.PRINTING].includes(printerStatus.statusText)) {
        console.log(printData);
        try {
            const config = qz_tray_1.default.configs.create(printerName, {
                margins: {
                    top: 0,
                    right: PAPER_MARGIN_INCHES,
                    bottom: 0,
                    left: PAPER_MARGIN_INCHES,
                },
                density: 'draft',
            });
            yield qz_tray_1.default.print(config, [
                {
                    type: 'pixel',
                    format: 'html',
                    flavor: 'plain',
                    options: { pageWidth: PAPER_WIDTH_INCHES },
                    data: printData,
                },
            ]);
            antd_1.message.success({
                content: `${entity} has been printed successfully.`,
                key: PRINT_MESSAGE_KEY,
            });
        }
        catch (e) {
            antd_1.message.error({
                content: `Error occurred while trying to print ${entity}.`,
                key: PRINT_MESSAGE_KEY,
            });
            console.error(e);
        }
        finally {
            if (onComplete) {
                onComplete();
            }
        }
        return;
    }
    // OTHERS
    antd_1.message.error({
        key: PRINT_MESSAGE_KEY,
        content: 'Printer cannot print right now. Please contact an administrator.',
    });
});
const getHeader = (siteSettings, branchMachine, title) => {
    const { contact_number: contactNumber, address_of_tax_payer: location, proprietor, store_name: storeName, tax_type: taxType, tin, } = siteSettings;
    const { name, machine_identification_number: machineID, pos_terminal: posTerminal, } = branchMachine || {};
    return `
    <style>
      table {
        font-size: inherit;
      }

      td {
        padding: 0;
      }
    </style>

		<div style="text-align: center; display: flex; flex-direction: column">
      <span style="white-space: pre-line">${storeName}</span>
      <span style="white-space: pre-line">${location}</span>
      <span>${contactNumber} | ${name}</span>
			<span>${proprietor}</span>
			<span>${taxType} | ${tin}</span>
      <span>${machineID}</span>
      <span>${posTerminal}</span>
      ${title ? '</br>' : ''}
			${title ? `<span>[${title}]</span>` : ''}
		</div>`;
};
const getFooter = (siteSettings) => {
    const { software_developer: softwareDeveloper, software_developer_address: softwareDeveloperAddress, software_developer_tin: softwareDeveloperTin, pos_accreditation_number: posAccreditationNumber, pos_accreditation_date: posAccreditationDate, ptu_number: ptuNumber, ptu_date: ptuDate, } = siteSettings;
    return `
		<div style="text-align: center; display: flex; flex-direction: column">
			<span>${softwareDeveloper}</span>
			<span style="white-space: pre-line">${softwareDeveloperAddress}</span>
			<span>${softwareDeveloperTin}</span>
			<span>Acc No: ${posAccreditationNumber}</span>
			<span>Date Issued: ${posAccreditationDate}</span><br/>
      <span>PTU No: ${ptuNumber}</span>
      <span>Date Issued: ${ptuDate}</span>
			<br />
		</div>`;
};
const getPageStyle = (extraStyle = '') => {
    return `width: 100%; font-size: ${printerFontSize}pt; font-family: ${printerFontFamily}, monospace; line-height: 100%; position: relative; ${extraStyle}`;
};
const appendHtmlElement = (data) => `
  <html lang="en">
  <head>
    <style>
      .container, .container > div, .container > table {
        width: 380px !important;
      }
    </style>
  </head>
  <body>
      ${data}
  </body>
</html>`;
const formatInPesoWithUnderline = (value) => `<div style="display:inline-block">
    ${(0, utils_1.formatInPeso)(value, PESO_SIGN)}
  </div>`;
const addUnderline = (value) => Number(value) > 0
    ? '<div style="width: 100%; text-align: right">-----------</div>'
    : '';
const printCollectionReceipt = (collectionReceipt, siteSettings, branchMachine) => {
    var _a, _b, _c;
    const invoice = (_b = (_a = collectionReceipt.order_of_payment) === null || _a === void 0 ? void 0 : _a.charge_sales_transaction) === null || _b === void 0 ? void 0 : _b.invoice;
    const orderOfPayment = collectionReceipt.order_of_payment;
    const { payor, amount } = orderOfPayment;
    let description = orderOfPayment.extra_description;
    if (orderOfPayment.purpose === globals_1.orderOfPaymentPurposes.FULL_PAYMENT) {
        description = 'Full Payment';
    }
    else if (orderOfPayment.purpose === globals_1.orderOfPaymentPurposes.PARTIAL_PAYMENT) {
        description = 'Partial Payment';
    }
    const data = `
  <div style="${getPageStyle()}">
      ${getHeader(siteSettings, branchMachine, 'COLLECTION RECEIPT')}

      <br />

        <div style="text-align: center">Received payment from</div>

        <table style="width: 100%;">
          <thead>
            <tr>
              <th style="width: 130px"></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Name:</td>
              <td>${(0, utils_1.getFullName)(payor)}</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>${payor.home_address || EMPTY_CELL}</td>
            </tr>
            <tr>
              <td>Tin:</td>
              <td>${payor.tin || EMPTY_CELL}</td>
            </tr>
            <tr>
              <td>the sum of:</td>
              <td>${(0, utils_1.formatInPeso)(amount, PESO_SIGN)}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>${description}</td>
            </tr>
            <tr>
              <td>with invoice:</td>
              <td>${(invoice === null || invoice === void 0 ? void 0 : invoice.or_number) || EMPTY_CELL}</td>
            </tr>
          </tbody>
        </table>

        <br />

        ${collectionReceipt.check_number
        ? `
            <div>CHECK DETAILS</div>
            <table style="width: 100%;">
              <thead>
                <tr>
                  <th style="width: 130px"></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bank:</td>
                  <td>${collectionReceipt.bank_name || EMPTY_CELL}</td>
                </tr>
                <tr>
                  <td>Branch:</td>
                  <td>${collectionReceipt.bank_branch || EMPTY_CELL}</td>
                </tr>
                <tr>
                  <td>Check No:</td>
                  <td>${collectionReceipt.check_number || EMPTY_CELL}</td>
                </tr>
                <tr>
                  <td>Check Date:</td>
                  <td>${collectionReceipt.check_date
            ? (0, utils_1.formatDate)(collectionReceipt.check_date)
            : EMPTY_CELL}</td>
                </tr>
              </tbody>
            </table>
            <br />
          `
        : ''}

        <div>GDT: ${(0, utils_1.formatDateTime)(collectionReceipt === null || collectionReceipt === void 0 ? void 0 : collectionReceipt.datetime_created)}</div>
        <div>PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}</div>
        <div style="display: flex; align-items: center; justify-content: space-between">
          <span>ID: ${(collectionReceipt === null || collectionReceipt === void 0 ? void 0 : collectionReceipt.id) || EMPTY_CELL}</span>
          <span style="text-align: right;">${(_c = collectionReceipt === null || collectionReceipt === void 0 ? void 0 : collectionReceipt.created_by) === null || _c === void 0 ? void 0 : _c.employee_id}</span>
        </div>

        <br />

        ${getFooter(siteSettings)}
        <div style="text-align: center; display: flex; flex-direction: column">
          <span>THIS DOCUMENT IS NOT VALID FOR CLAIMING INPUT TAXES.</span>
          <span>${(siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.thank_you_message) || EMPTY_CELL}</span>
        </div>
      </div>
      `;
    print(data, 'Collection Receipt');
};
exports.printCollectionReceipt = printCollectionReceipt;
const printSalesInvoice = (transaction, siteSettings, branchMachine, isReprint = false, isPdf = false) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    const change = Number(transaction.payment.amount_tendered) - transaction.total_amount;
    const previousTransactionOrNumber = (_c = (_b = (_a = transaction === null || transaction === void 0 ? void 0 : transaction.adjustment_remarks) === null || _a === void 0 ? void 0 : _a.previous_voided_transaction) === null || _b === void 0 ? void 0 : _b.invoice) === null || _c === void 0 ? void 0 : _c.or_number;
    const newTransactionOrNumber = (_f = (_e = (_d = transaction === null || transaction === void 0 ? void 0 : transaction.adjustment_remarks) === null || _d === void 0 ? void 0 : _d.new_updated_transaction) === null || _e === void 0 ? void 0 : _e.invoice) === null || _f === void 0 ? void 0 : _f.or_number;
    // Set discount option additional fields
    let discountOptionFields = null;
    if (transaction.discount_option_additional_fields_values) {
        discountOptionFields = JSON.parse(transaction.discount_option_additional_fields_values);
    }
    // Set client name
    let title = '';
    if (transaction.payment.mode === globals_1.saleTypes.CASH) {
        title = 'CASH SALES INVOICE';
    }
    else if (transaction.payment.mode === globals_1.saleTypes.CREDIT) {
        title = 'CHARGE SALES INVOICE';
    }
    // Set client fields
    let fields = [];
    if (discountOptionFields !== null && discountOptionFields) {
        fields = Object.keys(discountOptionFields).map((key) => ({
            key,
            value: discountOptionFields === null || discountOptionFields === void 0 ? void 0 : discountOptionFields[key],
        }));
    }
    else if (((_g = transaction.client) === null || _g === void 0 ? void 0 : _g.name) ||
        ((_h = transaction.payment) === null || _h === void 0 ? void 0 : _h.creditor_account)) {
        fields = [
            {
                key: 'NAME',
                value: ((_j = transaction.client) === null || _j === void 0 ? void 0 : _j.name) ||
                    (0, utils_1.getFullName)((_k = transaction.payment) === null || _k === void 0 ? void 0 : _k.creditor_account) ||
                    '',
            },
            {
                key: 'TIN',
                value: ((_l = transaction.client) === null || _l === void 0 ? void 0 : _l.tin) ||
                    ((_o = (_m = transaction.payment) === null || _m === void 0 ? void 0 : _m.creditor_account) === null || _o === void 0 ? void 0 : _o.tin) ||
                    '',
            },
            {
                key: 'ADDRESS',
                value: ((_p = transaction.client) === null || _p === void 0 ? void 0 : _p.address) ||
                    ((_r = (_q = transaction.payment) === null || _q === void 0 ? void 0 : _q.creditor_account) === null || _r === void 0 ? void 0 : _r.home_address) ||
                    '',
            },
        ];
    }
    const data = `
	<div class="container" style="${getPageStyle()}">
		${getHeader(siteSettings, branchMachine, title)}

		<br />

		<table style="width: 100%;">
			${transaction.products
        .map((item) => `<tr>
						<td colspan="2">${item.branch_product.product.print_details} - ${item.branch_product.product.is_vat_exempted
        ? globals_1.vatTypes.VAT_EMPTY
        : globals_1.vatTypes.VATABLE}</td>
					</tr>
					<tr>
						<td style="padding-left: 4ch">${item.original_quantity} @ ${(0, utils_1.formatInPeso)(item.price_per_piece, PESO_SIGN)} </td>
						<td style="text-align: right">
							${(0, utils_1.formatInPeso)(Number(item.quantity) * Number(item.price_per_piece), PESO_SIGN)}&nbsp;</td>
					</tr>`)
        .join('')}
		</table>

		<div style="width: 100%; text-align: right">----------------</div>

		<table style="width: 100%;">
			${transaction.discount_option
        ? `
        <tr>
				  <td>GROSS AMOUNT</td>
				  <td style="text-align: right;">
					  ${(0, utils_1.formatInPeso)(transaction.gross_amount, PESO_SIGN)}&nbsp;
				  </td>
			  </tr>

        <tr>
				  <td>DISCOUNT | ${transaction.discount_option.code}</td>
				  <td style="text-align: right;">
					  (${(0, utils_1.formatInPeso)((0, utils_1.getComputedDiscount)(transaction), PESO_SIGN)})
				  </td>
			  </tr>

        ${transaction.discount_option.is_special_discount
            ? `<tr>
				  <td>VAT AMOUNT</td>
				  <td style="text-align: right;">
					  (${(0, utils_1.formatInPeso)(transaction.invoice.vat_amount, PESO_SIGN)})
				  </td>
			  </tr>`
            : ''}

        <tr>
				  <td colspan="2" style="text-align: right;">----------------</td>
			  </tr>
      `
        : ''}

			<tr>
				<td>TOTAL AMOUNT</td>
				<td style="text-align: right; font-weight: bold;">
					${(0, utils_1.formatInPeso)(transaction.total_amount, PESO_SIGN)}&nbsp;
				</td>
			</tr>
		</table>

		<br />

    ${transaction.payment.mode === globals_1.saleTypes.CASH
        ? `
        <table style="width: 100%;">
          <tr>
            <td style="padding-left: 4ch">AMOUNT RECEIVED</td>
            <td style="text-align: right">
              ${(0, utils_1.formatInPeso)(transaction.payment.amount_tendered, PESO_SIGN)}&nbsp;
            </td>
          </tr>
          <tr>
            <td style="padding-left: 4ch">AMOUNT DUE</td>
            <td style="text-align: right">
              ${(0, utils_1.formatInPeso)(transaction.total_amount, PESO_SIGN)}&nbsp;
            </td>
          </tr>
          <tr>
            <td style="padding-left: 4ch">CHANGE</td>
            <td style="text-align: right; font-weight: bold">
              ${(0, utils_1.formatInPeso)(change, PESO_SIGN)}&nbsp;
            </td>
          </tr>
        </table><br />`
        : ''}

    <table style="width: 100%;">
      <tr>
        <td>VAT Exempt</td>
        <td style="text-align: right">
          ${(0, utils_1.formatInPeso)(transaction.invoice.vat_exempt, PESO_SIGN)}&nbsp;
        </td>
      </tr>
      <tr>
        <td>VATable Sales</td>
        <td style="text-align: right">
          ${(0, utils_1.formatInPeso)(transaction.invoice.vat_sales, PESO_SIGN)}&nbsp;
        </td>
      </tr>
      <tr>
        <td>VAT Amount (12%)</td>
        <td style="text-align: right">
          ${(0, utils_1.formatInPeso)(transaction.invoice.vat_amount, PESO_SIGN)}&nbsp;
        </td>
      </tr>
      <tr>
        <td>ZERO Rated</td>
        <td style="text-align: right">
          ${(0, utils_1.formatInPeso)(0, PESO_SIGN)}&nbsp;
        </td>
      </tr>
    </table>
    <br />

    <div>GDT: ${(0, utils_1.formatDateTime)(transaction.invoice.datetime_created)}</div>
    <div>PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}</div>

		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>${transaction.invoice.or_number}</span>
			<span>${transaction.products.length} item(s)</span>
		</div>

    <div>${((_s = transaction === null || transaction === void 0 ? void 0 : transaction.teller) === null || _s === void 0 ? void 0 : _s.employee_id) || EMPTY_CELL}</div>

    <br />

    ${previousTransactionOrNumber
        ? `<div>Prev Invoice #: ${previousTransactionOrNumber}</div>`
        : ''}
    ${newTransactionOrNumber
        ? `<div>New Invoice #: ${newTransactionOrNumber}</div>`
        : ''}

    <table style="width: 100%; padding-left: 4ch;">
    ${fields
        .map(({ key, value }) => `<tr>
            <td width="80px">${key}:</td>
            <td>${value}</td>
          </tr>`)
        .join('')}
    </table>

		<br />

		${getFooter(siteSettings)}

		<div style="text-align: center; display: flex; flex-direction: column">
      <span>${isReprint && transaction.status === globals_1.transactionStatuses.FULLY_PAID
        ? 'REPRINT ONLY'
        : ''}</span>
      <span style="white-space: pre-line">${!isReprint && transaction.status === globals_1.transactionStatuses.FULLY_PAID
        ? siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.invoice_last_message
        : ''}</span>
      <span>${[
        globals_1.transactionStatuses.VOID_EDITED,
        globals_1.transactionStatuses.VOID_CANCELLED,
    ].includes(transaction.status)
        ? 'VOIDED TRANSACTION'
        : ''}</span>

      <span>"${siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.thank_you_message}"</span>
		</div>
	</div>
	`;
    if (isPdf) {
        return appendHtmlElement(data);
    }
    print(data, 'Sales Invoice');
};
exports.printSalesInvoice = printSalesInvoice;
const printDailySales = (dailySales, siteSettings, branchMachine, user, isPdf = false) => {
    const data = `
	<div class="container" style="${getPageStyle()}">
    ${getHeader(siteSettings, branchMachine)}

    <br />

		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>DAILY SALES</span>
			<span style="text-align: right;">For ${(0, utils_1.formatDate)(dailySales.daily_sales_data.date)}</span>
		</div>

		<br />

		<table style="width: 100%;">
			<tr>
				<td>CASH SALES</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.cash_sales, PESO_SIGN)}&nbsp;</td>
			</tr>
			<tr>
				<td>CREDIT SALES</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.credit_pay, PESO_SIGN)}&nbsp;</td>
			</tr>
			<tr>
				<td>GROSS SALES</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.gross_sales, PESO_SIGN)}&nbsp;</td>
			</tr>
		</table>

		<br />

		<table style="width: 100%;">
			<tr>
				<td>VAT Exempt</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.vat_exempt, PESO_SIGN)}&nbsp;</td>
			</tr>
      <tr>
        <td>VATable Sales</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.vat_sales, PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT Amount (12%)</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.vat_amount, PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
				<td>ZERO Rated</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(0, PESO_SIGN)}&nbsp;</td>
			</tr>
		</table>

		<div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>GROSS SALES</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.gross_sales, PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">REG. DISCOUNT</td>
        <td style="text-align: right">(${(0, utils_1.formatInPeso)(dailySales.regular_discount, PESO_SIGN)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">SC/PWD</td>
        <td style="text-align: right">(${(0, utils_1.formatInPeso)(dailySales.special_discount, PESO_SIGN)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VOIDED SALES</td>
        <td style="text-align: right">(${(0, utils_1.formatInPeso)(dailySales.void, PESO_SIGN)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VAT AMOUNT (12%)</td>
        <td style="text-align: right">(${(0, utils_1.formatInPeso)(dailySales.total_vat_adjusted, PESO_SIGN)})</td>
      </tr>
      <tr>
        <td><b>NET SALES</b></td>
        <td style="text-align: right;"><b>${(0, utils_1.formatInPeso)(dailySales.net_sales, PESO_SIGN)}</b></td>
      </tr>
    </table>

    <div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>ADJUSTMENT ON VAT:</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">SC/PWD</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.vat_special_discount, PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">OTHERS</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.others, PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">TOTAL</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.total_vat_adjusted, PESO_SIGN)}&nbsp;</td>
      </tr>
    </table>

    <div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>VAT AMOUNT (12%)</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.vat_amount, PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT ADJ.</td>
        <td style="text-align: right">(${(0, utils_1.formatInPeso)(dailySales.total_vat_adjusted, PESO_SIGN)})</td>
      </tr>
      <tr>
        <td>VAT PAYABLE</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.vat_payable, PESO_SIGN)}&nbsp;</td>
      </tr>
    </table>

    <br />

    <div>GDT: ${(0, utils_1.formatDate)(dailySales.daily_sales_data.date)}</div>
    <div>PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}</div>

    <div style="display: flex; align-items: center; justify-content: space-between">
			<span>C: ${dailySales.generated_by.employee_id || EMPTY_CELL}</span>
			<span>PB: ${(user === null || user === void 0 ? void 0 : user.employee_id) || EMPTY_CELL}</span>
		</div>

		<br />

		${getFooter(siteSettings)}
	</div>
	`;
    if (isPdf) {
        return appendHtmlElement(data);
    }
    print(data, 'Daily Sales');
};
exports.printDailySales = printDailySales;
const printXReadReport = (report, siteSettings, branchMachine, user, isPdf = false) => {
    var _a, _b, _c, _d;
    const data = `
	<div class="container" style="${getPageStyle()}">
  ${getHeader(siteSettings, branchMachine)}

    <br />

    ${(report === null || report === void 0 ? void 0 : report.gross_sales) === 0
        ? '<div style="text-align: center">NO TRANSACTION</div>'
        : ''}

    <br/>

		<div>X-READ</div>
    <br/>

    <div>INVOICE NUMBER</div>
    <table style="margin-left: 15px;">
      <tr>
        <td style="width: 120px;">Beg Invoice #:</td>
        <td style="text-align: right">${((_a = report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || EMPTY_CELL}</td>
      </tr>
      <tr>
      <td style="width: 120px;">End Invoice #:</td>
        <td style="text-align: right">${((_b = report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || EMPTY_CELL}</td>
      </tr>
    </table>

    <div>SALES</div>
    <table style="margin-left: 15px;">
      <tr>
        <td style="width: 120px;">Beg:</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.beginning_sales, PESO_SIGN)}</td>
      </tr>
      <tr>
        <td style="width: 120px;">Cur:</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.gross_sales, PESO_SIGN)}</td>
      </tr>
        <td style="width: 120px;">End:</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.ending_sales, PESO_SIGN)}</td>
      </tr>
    </table>

    <div>TRANSACTION COUNT</div>
    <table style="margin-left: 15px;">
      <tr>
        <td style="width: 120px;">Beg:</td>
        <td style="text-align: right">${report.beginning_transactions_count}</td>
      </tr>
      <tr>
        <td style="width: 120px;">Cur:</td>
        <td style="text-align: right">${report.total_transactions}</td>
      </tr>
        <td style="width: 120px;">End:</td>
        <td style="text-align: right">${report.ending_transactions_count}</td>
      </tr>
    </table>

		<br />

    <div style="text-align: center;">CURRENT SALES BREAKDOWN</div>

    <br/>

		<table style="width: 100%;">
			<tr>
				<td>CASH SALES</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(report.cash_sales, PESO_SIGN)}&nbsp;</td>
			</tr>
			<tr>
				<td>CREDIT SALES</td>
				<td style="text-align: right">${formatInPesoWithUnderline(report.credit_pay)}&nbsp;
        ${addUnderline(report.credit_pay)}</td>
			</tr>
			<tr>
				<td>GROSS SALES</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(report.gross_sales, PESO_SIGN)}&nbsp;</td>
			</tr>
		</table>

		<br />

		<table style="width: 100%;">
			<tr>
				<td>VAT Exempt</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(report.vat_exempt, PESO_SIGN)}&nbsp;</td>
			</tr>
      <tr>
        <td>VATable Sales</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.vat_sales, PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT Amount (12%)</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.vat_amount, PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
				<td>ZERO Rated</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(0, PESO_SIGN)}&nbsp;</td>
			</tr>
		</table>

		<div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>GROSS SALES</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.gross_sales, PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">REG. DISCOUNT</td>
        <td style="text-align: right">(${(0, utils_1.formatInPeso)(report.regular_discount, PESO_SIGN)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">SC/PWD</td>
        <td style="text-align: right">(${(0, utils_1.formatInPeso)(report.special_discount, PESO_SIGN)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VOIDED SALES</td>
        <td style="text-align: right">(${(0, utils_1.formatInPeso)(report.void, PESO_SIGN)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VAT AMOUNT (12%)</td>
        <td style="text-align: right">(${formatInPesoWithUnderline(report.total_vat_adjusted)})${addUnderline(report.total_vat_adjusted)}</td>
      </tr>
      <tr>
        <td><b>NET SALES</b></td>
        <td style="text-align: right;"><b>${(0, utils_1.formatInPeso)(report.net_sales, PESO_SIGN)}</b>&nbsp;</td>
      </tr>
    </table>

    <div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>ADJUSTMENT ON VAT:</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">SC/PWD</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.vat_special_discount, PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">OTHERS</td>
        <td style="text-align: right">${formatInPesoWithUnderline(report.others)}&nbsp;${addUnderline(report.others)}</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">TOTAL</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.total_vat_adjusted, PESO_SIGN)}&nbsp;</td>
      </tr>
    </table>

    <div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>VAT AMOUNT (12%)</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.vat_amount, PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT ADJ.</td>
        <td style="text-align: right">(${formatInPesoWithUnderline(report.total_vat_adjusted)})${addUnderline(report.total_vat_adjusted)}</td>
      </tr>
      <tr>
        <td>VAT PAYABLE</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.vat_payable, PESO_SIGN)}&nbsp;</td>
      </tr>
    </table>

    <br />

		<div>GDT: ${report.generation_datetime
        ? (0, utils_1.formatDateTime)(report.generation_datetime)
        : EMPTY_CELL}</div>
    <div>PDT: ${report.printing_datetime
        ? (0, utils_1.formatDateTime)(report.printing_datetime)
        : EMPTY_CELL}</div>

    <div style="display: flex; align-items: center; justify-content: space-between">
			<span>C: ${((_c = report === null || report === void 0 ? void 0 : report.generated_by) === null || _c === void 0 ? void 0 : _c.employee_id) || EMPTY_CELL}</span>
			<span>PB: ${(user === null || user === void 0 ? void 0 : user.employee_id) || ((_d = report === null || report === void 0 ? void 0 : report.generated_by) === null || _d === void 0 ? void 0 : _d.employee_id) || EMPTY_CELL}</span>
		</div>

		<br />

		${getFooter(siteSettings)}
	</div>
	`;
    if (isPdf) {
        return appendHtmlElement(data);
    }
    print(data, 'XRead Report');
};
exports.printXReadReport = printXReadReport;
const printZReadReport = (report, siteSettings, branchMachine, user, isPdf = false) => {
    var _a, _b, _c;
    const data = `
	<div class="container" style="${getPageStyle()}">
		${getHeader(siteSettings, branchMachine)}

    <br />

    ${(report === null || report === void 0 ? void 0 : report.total_transactions) === 0
        ? '<div style="text-align: center">NO TRANSACTION</div>'
        : ''}

    <br/>

    <div>Z-READ</div>
    <br/>

    <div>INVOICE NUMBER</div>
    <table style="margin-left: 15px;">
      <tr>
        <td style="width: 120px;">Beg Invoice #:</td>
        <td style="text-align: right;">${((_a = report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || EMPTY_CELL}</td>
      </tr>
      <tr>
        <td style="width: 120px;">End Invoice #:</td>
        <td style="text-align: right;">${((_b = report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || EMPTY_CELL}</td>
      </tr>
    </table>

    <div>SALES</div>
    <table style="margin-left: 15px;">
      <tr>
        <td style="width: 120px;">Beg:</td>
        <td style="text-align: right;">${(0, utils_1.formatInPeso)(report.beginning_sales, PESO_SIGN)}</td>
      </tr>
      <tr>
        <td style="width: 120px;">Cur:</td>
        <td style="text-align: right;">${(0, utils_1.formatInPeso)(report.current_sales, PESO_SIGN)}</td>
      </tr>
        <td style="width: 120px;">End:</td>
        <td style="text-align: right;">${(0, utils_1.formatInPeso)(report.ending_sales, PESO_SIGN)}</td>
      </tr>
    </table>

    <div>TRANSACTION COUNT</div>
    <table style="margin-left: 15px;">
      <tr>
        <td style="width: 120px;">Beg:</td>
        <td style="text-align: right;">${report.beginning_transactions_count}</td>
      </tr>
      <tr>
        <td style="width: 120px;">Cur:</td>
        <td style="text-align: right;">${report.total_transactions}</td>
      </tr>
        <td style="width: 120px;">End:</td>
        <td style="text-align: right;">${report.ending_transactions_count}</td>
      </tr>
    </table>

		<br />

    <div style="text-align: center;">ACCUMULATED SALES BREAKDOWN</div>

    <br/>

		<table style="width: 100%;">
			<tr>
				<td>CASH SALES</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(report.cash_sales, PESO_SIGN)}&nbsp;</td>
			</tr>
			<tr>
				<td>CREDIT SALES</td>
				<td style="text-align: right">${formatInPesoWithUnderline(report.credit_pay)}&nbsp;${addUnderline(report.credit_pay)}</td>
			</tr>
			<tr>
				<td>GROSS SALES</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(report.gross_sales, PESO_SIGN)}&nbsp;</td>
			</tr>
		</table>

		<br />

		<table style="width: 100%;">
			<tr>
				<td>VAT Exempt</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(report.vat_exempt, PESO_SIGN)}&nbsp;</td>
			</tr>
      <tr>
        <td>VAT Sales</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.vat_sales, PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT Amount (12%)</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.vat_amount, PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
				<td>ZERO Rated</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(0, PESO_SIGN)}&nbsp;</td>
			</tr>
		</table>

		<div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>GROSS SALES</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.gross_sales, PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">REG. DISCOUNT</td>
        <td style="text-align: right">(${(0, utils_1.formatInPeso)(report.regular_discount, PESO_SIGN)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">SC/PWD</td>
        <td style="text-align: right">(${(0, utils_1.formatInPeso)(report.special_discount, PESO_SIGN)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VOIDED SALES</td>
        <td style="text-align: right">(${(0, utils_1.formatInPeso)(report.void, PESO_SIGN)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VAT AMOUNT (12%)</td>
        <td style="text-align: right">(${formatInPesoWithUnderline(report.total_vat_adjusted)})${addUnderline(report.total_vat_adjusted)}</td>
      </tr>
      <tr>
        <td><b>ACCUM. GRAND TOTAL</b></td>
        <td style="text-align: right;"><b>${(0, utils_1.formatInPeso)(report.net_sales, PESO_SIGN)}</b>&nbsp;</td>
      </tr>
    </table>

    <div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>ADJUSTMENT ON VAT:</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">SC/PWD</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.vat_special_discount, PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">OTHERS</td>
        <td style="text-align: right">${formatInPesoWithUnderline(report.others)}&nbsp;${addUnderline(report.others)}</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">TOTAL</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.total_vat_adjusted, PESO_SIGN)}&nbsp;</td>
      </tr>
    </table>

    <div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>VAT AMOUNT (12%)</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.vat_amount, PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT ADJ.</td>
        <td style="text-align: right">(${formatInPesoWithUnderline(report.total_vat_adjusted)})${addUnderline(report.total_vat_adjusted)}</td>
      </tr>
      <tr>
        <td>VAT PAYABLE</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.vat_payable, PESO_SIGN)}&nbsp;</td>
      </tr>
    </table>

		<br />

		<div>GDT: ${report.generation_datetime
        ? (0, utils_1.formatDateTime)(report.generation_datetime)
        : EMPTY_CELL}</div>
    <div>PDT: ${report.printing_datetime
        ? (0, utils_1.formatDateTime)(report.printing_datetime)
        : EMPTY_CELL}</div>

    <div style="display: flex; align-items: center; justify-content: space-between">
			<span>C: ${((_c = report === null || report === void 0 ? void 0 : report.generated_by) === null || _c === void 0 ? void 0 : _c.employee_id) || EMPTY_CELL}</span>
			<span>PB: ${(user === null || user === void 0 ? void 0 : user.employee_id) || EMPTY_CELL}</span>
		</div>

		<br />

		${getFooter(siteSettings)}
	</div>
	`;
    if (isPdf) {
        return appendHtmlElement(data);
    }
    print(data, 'ZRead Report');
};
exports.printZReadReport = printZReadReport;
const printCashBreakdown = (cashBreakdown, siteSettings, branchMachine) => {
    const breakdownCoins = [
        {
            label: '0.25',
            quantity: cashBreakdown.coins_25,
            amount: (0, utils_1.formatInPeso)(0.25 * cashBreakdown.coins_25, ''),
        },
        {
            label: '1.00',
            quantity: cashBreakdown.coins_1,
            amount: (0, utils_1.formatInPeso)(cashBreakdown.coins_1, ''),
        },
        {
            label: '5.00',
            quantity: cashBreakdown.coins_5,
            amount: (0, utils_1.formatInPeso)(5 * cashBreakdown.coins_5, ''),
        },
        {
            label: '10.00',
            quantity: cashBreakdown.coins_10,
            amount: (0, utils_1.formatInPeso)(10 * cashBreakdown.coins_10, ''),
        },
        {
            label: '20.00',
            quantity: cashBreakdown.coins_20,
            amount: (0, utils_1.formatInPeso)(20 * cashBreakdown.coins_20, ''),
        },
    ];
    const denomCoins = breakdownCoins.map(({ label }) => `
				<div style="
						display: flex;
						align-items: center;
						justify-content: space-between
					">
					<span>P </span>
					<span>${label}</span>
				</div>
				`);
    const quantityCoins = breakdownCoins.map(({ quantity }) => `<div>${quantity}</div>`);
    const amountCoins = breakdownCoins.map(({ amount }) => `
				<div style="
						display: flex;
						align-items: center;
						justify-content: space-between
					">
					<span>P </span>
					<span>${amount}</span>
				</div>
				`);
    const breakdownBills = [
        {
            label: '20.00',
            quantity: cashBreakdown.bills_20,
            amount: (0, utils_1.formatInPeso)(20 * cashBreakdown.bills_20, ''),
        },
        {
            label: '50.00',
            quantity: cashBreakdown.bills_50,
            amount: (0, utils_1.formatInPeso)(50 * cashBreakdown.bills_50, ''),
        },
        {
            label: '100.00',
            quantity: cashBreakdown.bills_100,
            amount: (0, utils_1.formatInPeso)(100 * cashBreakdown.bills_100, ''),
        },
        {
            label: '200.00',
            quantity: cashBreakdown.bills_200,
            amount: (0, utils_1.formatInPeso)(200 * cashBreakdown.bills_200, ''),
        },
        {
            label: '500.00',
            quantity: cashBreakdown.bills_500,
            amount: (0, utils_1.formatInPeso)(500 * cashBreakdown.bills_500, ''),
        },
        {
            label: '1,000.00',
            quantity: cashBreakdown.bills_1000,
            amount: (0, utils_1.formatInPeso)(1000 * cashBreakdown.bills_1000, ''),
        },
    ];
    const denomBills = breakdownBills.map(({ label }) => `
				<div style="
						display: flex;
						align-items: center;
						justify-content: space-between
					">
					<span>P </span>
					<span>${label}</span>
				</div>
				`);
    const quantityBills = breakdownBills.map(({ quantity }) => `<div>${quantity}</div>`);
    const amountBills = breakdownBills.map(({ amount }) => `
				<div style="
						display: flex;
						align-items: center;
						justify-content: space-between
					">
					<span>P </span>
					<span>${amount}</span>
				</div>
				`);
    const data = `
	<div style="${getPageStyle()}">
		<div style="text-align: center; display: flex; flex-direction: column">
      <span style="white-space: pre-line">${siteSettings.store_name}</span>
      <span style="white-space: pre-line">${siteSettings.address_of_tax_payer}</span>
      <span>${branchMachine === null || branchMachine === void 0 ? void 0 : branchMachine.name}</span>

			<br />

			<span>[CASH BREAKDOWN]</span>
			<span>${(0, utils_1.getCashBreakdownTypeDescription)(cashBreakdown.category, cashBreakdown.type)}</span>
		</div>

		<br />

		<div style="display: flex">
			<div>
				<div style="text-align: center">DENOM</div>
				<br/>
				<div>COINS</div>
				${denomCoins.join('')}
				<br/>
				<div>BILLS</div>
				${denomBills.join('')}
			</div>
			<div style="flex: 1; padding-left: 10px; display: flex; flex-direction: column; align-items: center">
				<div>QTY</div>
				<br/>
				<br/>
				${quantityCoins.join('')}
				<br/>
				<br/>
				${quantityBills.join('')}
			</div>
			<div>
				<div style="text-align: center">AMOUNT</div>
				<br/>
				<br/>
				${amountCoins.join('')}
				<br/>
				<br/>
				${amountBills.join('')}
			</div>
		</div>


		<div style="display: flex; align-items: center; justify-content: space-evenly">
			<span>TOTAL</span>
			<span>${(0, utils_1.formatInPeso)((0, utils_1.calculateCashBreakdownTotal)(cashBreakdown), PESO_SIGN)}</span>
		</div>

		<br />

    <div>GDT: ${(0, utils_1.formatDateTime)(cashBreakdown.datetime_created)}</div>
    <div>PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}</div>
    <div>${cashBreakdown.cashiering_session.user.employee_id}</div>
    ${cashBreakdown.category === globals_1.cashBreakdownCategories.CASH_IN
        ? `<div>Remarks: ${cashBreakdown.remarks}</div>`
        : ''}

		<br />

    ${getFooter(siteSettings)}
	</div>
	`;
    print(data, 'Cash Breakdown');
};
exports.printCashBreakdown = printCashBreakdown;
const printBirReport = (birReports, siteSettings, branchMachine, user) => {
    const birReportsRow = birReports
        .map((report) => {
        var _a, _b;
        return `
    <tr>
      <td>${(0, utils_1.formatDate)(report.date)}</td>
      <td>${((_a = report === null || report === void 0 ? void 0 : report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || EMPTY_CELL}</td>
      <td>${((_b = report === null || report === void 0 ? void 0 : report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || EMPTY_CELL}</td>
      <td>${(0, utils_1.formatInPeso)(report.grand_accumulated_sales_ending_balance, PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.grand_accumulated_sales_beginning_balance, PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.gross_sales_for_the_day, PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.sales_issue_with_manual, PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.gross_sales_from_pos, PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.vatable_sales, PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.vat_amount, PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.vat_exempt_sales, PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.zero_rated_sales, PESO_SIGN)}</td>

      <td>${(0, utils_1.formatInPeso)(report.regular_discount, PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.special_discount, PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.returns, PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.void, PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.total_deductions, PESO_SIGN)}</td>

      <td>${(0, utils_1.formatInPeso)(report.vat_on_special_discounts, PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.vat_on_returns, PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.others, PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.total_vat_adjusted, PESO_SIGN)}</td>

      <td>${(0, utils_1.formatInPeso)(report.vat_payable, PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.net_sales, PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.other_income, PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.sales_overrun_or_overflow, PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.total_net_sales, PESO_SIGN)}</td>
      <td>${report.reset_counter}</td>
      <td>${report.remarks}</td>
    </tr>
  `;
    })
        .join('');
    return `
	<html lang="en">
  <head>
    <style>
      body .bir-reports-pdf {
        font-family: 'Tahoma', monospace;
        font-size: 12px;
      }

      table.bir-reports,
      div.details,
      .title {
        width: 1780px;
      }

      table.bir-reports {
        border-collapse: collapse;
      }

      table.bir-reports th,
      table.bir-reports .nested-row td {
        min-width: 60px;
        line-height: 100%;
      }

      table.bir-reports th[colspan] {
        background-color: #ADB9CA;
      }

      table.bir-reports th[rowspan],
      table.bir-reports .nested-row td {
        background-color: #BDD6EE;
      }

      table.bir-reports th,
      table.bir-reports td {
        border: 1px solid black;
        text-align: center;
      }

      .title {
        text-align: center;
        font-weight: bold;
      }
    </style>
  </head>

  <body>
    <div class="bir-reports-pdf">
      <div class="details">${siteSettings.proprietor}</div>
      <div class="details" style="white-space: pre-line">${siteSettings.store_name}</div>
      <div class="details" style="white-space: pre-line">${siteSettings.address_of_tax_payer}</div>
      <div class="details">${siteSettings.tin} - ${branchMachine === null || branchMachine === void 0 ? void 0 : branchMachine.name}</div>
      <div class="details">POS Terminal</div>

      <br/>

      <h4 class="title">BIR SALES SUMMARY REPORT</h4>
      <table class="bir-reports">
        <tr>
          <th rowspan="2">Date</th>
          <th rowspan="2">Beginning SI/OR No.</th>
          <th rowspan="2">Ending SI/OR No. </th>
          <th rowspan="2">Grand Accum. Sales Ending Balance</th>
          <th rowspan="2">Grand Accum. Sales Beginning Balance</th>
          <th rowspan="2">Gross Sales for the Day</th>
          <th rowspan="2">Sales Issued with Manual SI/OR (per RR 16-2018)</th>
          <th rowspan="2">Gross Sales From POS</th>
          <th rowspan="2">VATable Sales</th>
          <th rowspan="2">VAT Amount (12%)</th>
          <th rowspan="2">VAT-Exempt Sales</th>
          <th rowspan="2">Zero Rated Sales</th>
          <th colspan="5">Deductions</th>
          <th colspan="4">Adjustments on VAT</th>
          <th rowspan="2">VAT Payable</th>
          <th rowspan="2">Net Sales</th>
          <th rowspan="2">Other Income</th>
          <th rowspan="2">Sales Overrun/ Overflow</th>
          <th rowspan="2">Total Net Sales</th>
          <th rowspan="2">Reset Counter</th>
          <th rowspan="2">Remarks</th>
        </tr>
        <tr class="nested-row" style="font-weight: bold">
          <td>Regular Discount</td>
          <td>SC/PWD (SC/PWD)</td>
          <td>Returns</td>
          <td>Void</td>
          <td>Total Deductions</td>
          <td>VAT on SC/PWDs</td>
          <td>VAT on Returns</td>
          <td>Others </td>
          <td>Total VAT Adj.</td>
        </tr>
        ${birReportsRow}
      </table>

      <br/>

      <div class="details">PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}</div>
      <div class="details">${user.employee_id}</div>
    </div>
  </body>
  </html>
	`;
};
exports.printBirReport = printBirReport;
const printCashOut = (cashOut, siteSettings, branchMachine) => {
    const metadata = cashOut.cash_out_metadata;
    const { payee, particulars, received_by: receivedBy, prepared_by_user: preparedByUser, } = metadata;
    const datetime = (0, utils_1.formatDateTime)(cashOut.datetime_created);
    const amount = (0, utils_1.formatInPeso)(metadata.amount, 'P');
    const preparedBy = (0, utils_1.getFullName)(metadata.prepared_by_user);
    const approvedBy = (0, utils_1.getFullName)(metadata.approved_by_user);
    const data = `
	<div style="${getPageStyle()}">
    ${getHeader(siteSettings, branchMachine, 'DISBURSEMENT VOUCHER')}

		<br />

		<table style="width: 100%;">
			<thead>
				<tr>
					<th style="width: 130px"></th>
					<th></th>
				</tr>
			</thead>

			<tbody>
				<tr>
					<td>Payee:</td>
					<td>${payee}</td>
				</tr>
        <tr>
					<td>Particulars:</td>
					<td>${particulars}</td>
				</tr>
				<tr>
					<td>Amount:</td>
					<td>${amount}</td>
				</tr>
        <tr>
					<td>Received by:</td>
					<td>${receivedBy}</td>
				</tr>
				<tr>
					<td>Prepared by:</td>
					<td>${preparedBy}</td>
				</tr>
				<tr>
					<td>Approved by:</td>
					<td>${approvedBy}</td>
				</tr>
			</tbody>
		</table>

		<br />

    <div>GDT: ${datetime}</div>
    <div>PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}</div>
    <div>${preparedByUser.employee_id}</div>

    <br />

    ${getFooter(siteSettings)}
	</div>
	`;
    print(data, 'Cash Out');
};
exports.printCashOut = printCashOut;
