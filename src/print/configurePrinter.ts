import { message } from 'antd';
import dayjs from 'dayjs';
import qz from 'qz-tray';
import {
	cashBreakdownCategories,
	orderOfPaymentPurposes,
	printerStatuses,
	saleTypes,
	transactionStatuses,
	vatTypes,
} from '../globals';
import {
	BirReport,
	BranchMachine,
	CashBreakdown,
	CollectionReceipt,
	DailySales,
	SiteSettings,
	Transaction,
	User,
	XReadReport,
	ZReadReport,
} from '../types';
import {
	authenticateQZTray,
	calculateCashBreakdownTotal,
	formatDate,
	formatDateTime,
	formatInPeso,
	getCashBreakdownTypeDescription,
	getComputedDiscount,
	getFullName,
} from '../utils';

const PESO_SIGN = 'P';
const EMPTY_CELL = '';
const PAPER_MARGIN_INCHES = 0.2;
const PAPER_WIDTH_INCHES = 3;
const QZ_MESSAGE_KEY = 'QZ_MESSAGE_KEY';
const PRINT_MESSAGE_KEY = 'PRINT_MESSAGE_KEY';

let printerName: string;
let printerFontSize: string;
let printerFontFamily: string;

export const configurePrinter = (
	appPrinterName: string,
	appprinterFontSize: string,
	appprinterFontFamily: string,
) => {
	printerName = appPrinterName;
	printerFontSize = appprinterFontSize;
	printerFontFamily = appprinterFontFamily;

	if (!qz.websocket.isActive()) {
		authenticateQZTray(qz);

		message.loading({
			content: 'Connecting to QZTray...',
			key: QZ_MESSAGE_KEY,
			duration: 5_000,
		});

		qz.websocket
			.connect()
			.then(() => {
				message.success({
					content: 'Successfully connected to QZTray.',
					key: QZ_MESSAGE_KEY,
				});
			})
			.catch((err: Error) => {
				message.error({
					content: 'Cannot connect to QZTray.',
					key: QZ_MESSAGE_KEY,
				});
				console.error(err);
			});
	}
};

export const openCashDrawer = async () => {
	if (!qz.websocket.isActive()) {
		message.error({
			content: 'Printer is not connected or QZTray is not open.',
		});

		return;
	}

	message.loading({
		content: 'Opening cash drawer...',
		key: PRINT_MESSAGE_KEY,
		duration: 5_000,
	});

	let printerStatus: any = null;

	// Add printer callback
	qz.printers.setPrinterCallbacks((event: any) => {
		console.log('event', event);
		printerStatus = event;
	});

	// Register listener and get status; deregister after
	await qz.printers.startListening(printerName);
	await qz.printers.getStatus();
	await qz.printers.stopListening();

	if (printerStatus === null) {
		message.error({
			key: PRINT_MESSAGE_KEY,
			content: 'Unable to detect selected printer.',
		});

		return;
	}

	if (printerStatus.statusText === printerStatuses.NOT_AVAILABLE) {
		message.error({
			key: PRINT_MESSAGE_KEY,
			content:
				'Printer is not available. Make sure printer is connected to the machine.',
		});

		return;
	}

	if (printerStatuses.OK === printerStatus.statusText) {
		try {
			const config = qz.configs.create(printerName);

			await qz.print(config, [
				// eslint-disable-next-line no-useless-concat
				'\x1B' + '\x40', // init
				// eslint-disable-next-line no-useless-concat
				'\x10' + '\x14' + '\x01' + '\x00' + '\x05',
			]);

			message.success({
				content: 'Cash has been opened.',
				key: PRINT_MESSAGE_KEY,
			});
		} catch (e) {
			message.error({
				content: 'An error occurred while opening cash drawer.',
				key: PRINT_MESSAGE_KEY,
			});
			console.error(e);
		}

		return;
	}

	// OTHERS
	message.error({
		key: PRINT_MESSAGE_KEY,
		content:
			'Cash drawer cannot open right now. Please contact an administrator.',
	});
};

const print = async (
	printData: string,
	entity: string,
	onComplete?: () => void,
) => {
	if (!qz.websocket.isActive()) {
		message.error({
			content: 'Printer is not connected or QZTray is not open.',
		});

		return;
	}

	message.loading({
		content: `Printing ${entity.toLowerCase()}...`,
		key: PRINT_MESSAGE_KEY,
		duration: 5_000,
	});

	let printerStatus: any = null;

	// Add printer callback
	qz.printers.setPrinterCallbacks((event: any) => {
		console.log('event', event);
		printerStatus = event;
	});

	// Register listener and get status; deregister after
	await qz.printers.startListening(printerName);
	await qz.printers.getStatus();
	await qz.printers.stopListening();

	if (printerStatus === null) {
		message.error({
			key: PRINT_MESSAGE_KEY,
			content: 'Unable to detect selected printer.',
		});

		return;
	}

	// NOT_AVAILABLE: Printer is not available
	if (printerStatus.statusText === printerStatuses.NOT_AVAILABLE) {
		/*
      eventType: PRINTER
      message: NOT_AVAILABLE: Level: FATAL, From: EPSON TM-U220 Receipt, EventType: PRINTER, Code: 4096
    */
		message.error({
			key: PRINT_MESSAGE_KEY,
			content:
				'Printer is not available. Make sure printer is connected to the machine.',
		});

		return;
	}

	// OK: Ready to print
	if (
		[printerStatuses.OK, printerStatuses.PRINTING].includes(
			printerStatus.statusText,
		)
	) {
		console.log(printData);

		try {
			const config = qz.configs.create(printerName, {
				margins: {
					top: 0,
					right: PAPER_MARGIN_INCHES,
					bottom: 0,
					left: PAPER_MARGIN_INCHES,
				},
				density: 'draft',
			});

			await qz.print(config, [
				{
					type: 'pixel',
					format: 'html',
					flavor: 'plain',
					options: { pageWidth: PAPER_WIDTH_INCHES },
					data: printData,
				},
			]);

			message.success({
				content: `${entity} has been printed successfully.`,
				key: PRINT_MESSAGE_KEY,
			});
		} catch (e) {
			message.error({
				content: `Error occurred while trying to print ${entity}.`,
				key: PRINT_MESSAGE_KEY,
			});
			console.error(e);
		} finally {
			if (onComplete) {
				onComplete();
			}
		}

		return;
	}

	// OTHERS
	message.error({
		key: PRINT_MESSAGE_KEY,
		content: 'Printer cannot print right now. Please contact an administrator.',
	});
};

const getHeader = (
	siteSettings: SiteSettings,
	branchMachine?: BranchMachine,
	title?: string,
) => {
	const {
		contact_number: contactNumber,
		address_of_tax_payer: location,
		proprietor,
		store_name: storeName,
		tax_type: taxType,
		tin,
	} = siteSettings;
	const {
		name,
		machine_identification_number: machineID,
		pos_terminal: posTerminal,
	} = branchMachine || {};

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

const getFooter = (siteSettings: SiteSettings) => {
	const {
		software_developer: softwareDeveloper,
		software_developer_address: softwareDeveloperAddress,
		software_developer_tin: softwareDeveloperTin,
		pos_accreditation_number: posAccreditationNumber,
		pos_accreditation_date: posAccreditationDate,
		ptu_number: ptuNumber,
		ptu_date: ptuDate,
	} = siteSettings;

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

const appendHtmlElement = (data: string) => `
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

const formatInPesoWithUnderline = (
	value: string | number,
) => `<div style="display:inline-block">
    ${formatInPeso(value, PESO_SIGN)}
  </div>`;

const addUnderline = (value: string | number) =>
	Number(value) > 0
		? '<div style="width: 100%; text-align: right">-----------</div>'
		: '';

export const printCollectionReceipt = (
	collectionReceipt: CollectionReceipt,
	siteSettings: SiteSettings,
	branchMachine: BranchMachine,
) => {
	const invoice =
		collectionReceipt.order_of_payment?.charge_sales_transaction?.invoice;
	const orderOfPayment = collectionReceipt.order_of_payment;
	const { payor, amount } = orderOfPayment;

	let description = orderOfPayment.extra_description;
	if (orderOfPayment.purpose === orderOfPaymentPurposes.FULL_PAYMENT) {
		description = 'Full Payment';
	} else if (
		orderOfPayment.purpose === orderOfPaymentPurposes.PARTIAL_PAYMENT
	) {
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
              <td>${getFullName(payor)}</td>
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
              <td>${formatInPeso(amount, PESO_SIGN)}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>${description}</td>
            </tr>
            <tr>
              <td>with invoice:</td>
              <td>${invoice?.or_number || EMPTY_CELL}</td>
            </tr>
          </tbody>
        </table>

        <br />

        ${
					collectionReceipt.check_number
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
                  <td>${
										collectionReceipt.check_date
											? formatDate(collectionReceipt.check_date)
											: EMPTY_CELL
									}</td>
                </tr>
              </tbody>
            </table>
            <br />
          `
						: ''
				}

        <div>GDT: ${formatDateTime(collectionReceipt?.datetime_created)}</div>
        <div>PDT: ${formatDateTime(dayjs(), false)}</div>
        <div style="display: flex; align-items: center; justify-content: space-between">
          <span>ID: ${collectionReceipt?.id || EMPTY_CELL}</span>
          <span style="text-align: right;">${
						collectionReceipt?.created_by?.employee_id
					}</span>
        </div>

        <br />

        ${getFooter(siteSettings)}
        <div style="text-align: center; display: flex; flex-direction: column">
          <span>THIS DOCUMENT IS NOT VALID FOR CLAIMING INPUT TAXES.</span>
          <span>${siteSettings?.thank_you_message || EMPTY_CELL}</span>
        </div>
      </div>
      `;

	print(data, 'Collection Receipt');
};

export const printSalesInvoice = (
	transaction: Transaction,
	siteSettings: SiteSettings,
	branchMachine: BranchMachine,
	isReprint = false,
	isPdf = false,
) => {
	const change =
		Number(transaction.payment.amount_tendered) - transaction.total_amount;

	const previousTransactionOrNumber =
		transaction?.adjustment_remarks?.previous_voided_transaction?.invoice
			?.or_number;
	const newTransactionOrNumber =
		transaction?.adjustment_remarks?.new_updated_transaction?.invoice
			?.or_number;

	// Set discount option additional fields
	let discountOptionFields: Record<string, string> | null = null;
	if (transaction.discount_option_additional_fields_values) {
		discountOptionFields = JSON.parse(
			transaction.discount_option_additional_fields_values,
		);
	}

	// Set client name
	let title = '';
	if (transaction.payment.mode === saleTypes.CASH) {
		title = 'CASH SALES INVOICE';
	} else if (transaction.payment.mode === saleTypes.CREDIT) {
		title = 'CHARGE SALES INVOICE';
	}

	// Set client fields
	let fields: Record<string, string | undefined>[] = [];
	if (discountOptionFields !== null && discountOptionFields) {
		fields = Object.keys(discountOptionFields).map((key) => ({
			key,
			value: discountOptionFields?.[key],
		}));
	} else if (
		transaction.client?.name ||
		transaction.payment?.creditor_account
	) {
		fields = [
			{
				key: 'NAME',
				value:
					transaction.client?.name ||
					getFullName(transaction.payment?.creditor_account) ||
					'',
			},
			{
				key: 'TIN',
				value:
					transaction.client?.tin ||
					transaction.payment?.creditor_account?.tin ||
					'',
			},
			{
				key: 'ADDRESS',
				value:
					transaction.client?.address ||
					transaction.payment?.creditor_account?.home_address ||
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
				.map(
					(item) => `<tr>
						<td colspan="2">${item.branch_product.product.print_details} - ${
						item.branch_product.product.is_vat_exempted
							? vatTypes.VAT_EMPTY
							: vatTypes.VATABLE
					}</td>
					</tr>
					<tr>
						<td style="padding-left: 4ch">${item.original_quantity} @ ${formatInPeso(
						item.price_per_piece,
						PESO_SIGN,
					)} </td>
						<td style="text-align: right">
							${formatInPeso(
								Number(item.quantity) * Number(item.price_per_piece),
								PESO_SIGN,
							)}&nbsp;</td>
					</tr>`,
				)
				.join('')}
		</table>

		<div style="width: 100%; text-align: right">----------------</div>

		<table style="width: 100%;">
			${
				transaction.discount_option
					? `
        <tr>
				  <td>GROSS AMOUNT</td>
				  <td style="text-align: right;">
					  ${formatInPeso(transaction.gross_amount, PESO_SIGN)}&nbsp;
				  </td>
			  </tr>

        <tr>
				  <td>DISCOUNT | ${transaction.discount_option.code}</td>
				  <td style="text-align: right;">
					  (${formatInPeso(getComputedDiscount(transaction), PESO_SIGN)})
				  </td>
			  </tr>

        ${
					transaction.discount_option.is_special_discount
						? `<tr>
				  <td>VAT AMOUNT</td>
				  <td style="text-align: right;">
					  (${formatInPeso(transaction.invoice.vat_amount, PESO_SIGN)})
				  </td>
			  </tr>`
						: ''
				}

        <tr>
				  <td colspan="2" style="text-align: right;">----------------</td>
			  </tr>
      `
					: ''
			}

			<tr>
				<td>TOTAL AMOUNT</td>
				<td style="text-align: right; font-weight: bold;">
					${formatInPeso(transaction.total_amount, PESO_SIGN)}&nbsp;
				</td>
			</tr>
		</table>

		<br />

    ${
			transaction.payment.mode === saleTypes.CASH
				? `
        <table style="width: 100%;">
          <tr>
            <td style="padding-left: 4ch">AMOUNT RECEIVED</td>
            <td style="text-align: right">
              ${formatInPeso(
								transaction.payment.amount_tendered,
								PESO_SIGN,
							)}&nbsp;
            </td>
          </tr>
          <tr>
            <td style="padding-left: 4ch">AMOUNT DUE</td>
            <td style="text-align: right">
              ${formatInPeso(transaction.total_amount, PESO_SIGN)}&nbsp;
            </td>
          </tr>
          <tr>
            <td style="padding-left: 4ch">CHANGE</td>
            <td style="text-align: right; font-weight: bold">
              ${formatInPeso(change, PESO_SIGN)}&nbsp;
            </td>
          </tr>
        </table><br />`
				: ''
		}

    <table style="width: 100%;">
      <tr>
        <td>VAT Exempt</td>
        <td style="text-align: right">
          ${formatInPeso(transaction.invoice.vat_exempt, PESO_SIGN)}&nbsp;
        </td>
      </tr>
      <tr>
        <td>VATable Sales</td>
        <td style="text-align: right">
          ${formatInPeso(transaction.invoice.vat_sales, PESO_SIGN)}&nbsp;
        </td>
      </tr>
      <tr>
        <td>VAT Amount (12%)</td>
        <td style="text-align: right">
          ${formatInPeso(transaction.invoice.vat_amount, PESO_SIGN)}&nbsp;
        </td>
      </tr>
      <tr>
        <td>ZERO Rated</td>
        <td style="text-align: right">
          ${formatInPeso(0, PESO_SIGN)}&nbsp;
        </td>
      </tr>
    </table>
    <br />

    <div>GDT: ${formatDateTime(transaction.invoice.datetime_created)}</div>
    <div>PDT: ${formatDateTime(dayjs(), false)}</div>

		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>${transaction.invoice.or_number}</span>
			<span>${transaction.products.length} item(s)</span>
		</div>

    <div>${transaction?.teller?.employee_id || EMPTY_CELL}</div>

    <br />

    ${
			previousTransactionOrNumber
				? `<div>Prev Invoice #: ${previousTransactionOrNumber}</div>`
				: ''
		}
    ${
			newTransactionOrNumber
				? `<div>New Invoice #: ${newTransactionOrNumber}</div>`
				: ''
		}

    <table style="width: 100%; padding-left: 4ch;">
    ${fields
			.map(
				({ key, value }) =>
					`<tr>
            <td width="80px">${key}:</td>
            <td>${value}</td>
          </tr>`,
			)
			.join('')}
    </table>

		<br />

		${getFooter(siteSettings)}

		<div style="text-align: center; display: flex; flex-direction: column">
      <span>${
				isReprint && transaction.status === transactionStatuses.FULLY_PAID
					? 'REPRINT ONLY'
					: ''
			}</span>
      <span style="white-space: pre-line">${
				!isReprint && transaction.status === transactionStatuses.FULLY_PAID
					? siteSettings?.invoice_last_message
					: ''
			}</span>
      <span>${
				[
					transactionStatuses.VOID_EDITED,
					transactionStatuses.VOID_CANCELLED,
				].includes(transaction.status)
					? 'VOIDED TRANSACTION'
					: ''
			}</span>

      <span>"${siteSettings?.thank_you_message}"</span>
		</div>
	</div>
	`;

	if (isPdf) {
		return appendHtmlElement(data);
	}

	print(data, 'Sales Invoice');
};

export const printDailySales = (
	dailySales: DailySales,
	siteSettings: SiteSettings,
	branchMachine: BranchMachine,
	user: User,
	isPdf = false,
) => {
	const data = `
	<div class="container" style="${getPageStyle()}">
    ${getHeader(siteSettings, branchMachine)}

    <br />

		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>DAILY SALES</span>
			<span style="text-align: right;">For ${formatDate(
				dailySales.daily_sales_data.date,
			)}</span>
		</div>

		<br />

		<table style="width: 100%;">
			<tr>
				<td>CASH SALES</td>
				<td style="text-align: right">${formatInPeso(
					dailySales.cash_sales,
					PESO_SIGN,
				)}&nbsp;</td>
			</tr>
			<tr>
				<td>CREDIT SALES</td>
				<td style="text-align: right">${formatInPeso(
					dailySales.credit_pay,
					PESO_SIGN,
				)}&nbsp;</td>
			</tr>
			<tr>
				<td>GROSS SALES</td>
				<td style="text-align: right">${formatInPeso(
					dailySales.gross_sales,
					PESO_SIGN,
				)}&nbsp;</td>
			</tr>
		</table>

		<br />

		<table style="width: 100%;">
			<tr>
				<td>VAT Exempt</td>
				<td style="text-align: right">${formatInPeso(
					dailySales.vat_exempt,
					PESO_SIGN,
				)}&nbsp;</td>
			</tr>
      <tr>
        <td>VATable Sales</td>
        <td style="text-align: right">${formatInPeso(
					dailySales.vat_sales,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT Amount (12%)</td>
        <td style="text-align: right">${formatInPeso(
					dailySales.vat_amount,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
				<td>ZERO Rated</td>
				<td style="text-align: right">${formatInPeso(0, PESO_SIGN)}&nbsp;</td>
			</tr>
		</table>

		<div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>GROSS SALES</td>
        <td style="text-align: right">${formatInPeso(
					dailySales.gross_sales,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">REG. DISCOUNT</td>
        <td style="text-align: right">(${formatInPeso(
					dailySales.regular_discount,
					PESO_SIGN,
				)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">SC/PWD</td>
        <td style="text-align: right">(${formatInPeso(
					dailySales.special_discount,
					PESO_SIGN,
				)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VOIDED SALES</td>
        <td style="text-align: right">(${formatInPeso(
					dailySales.void,
					PESO_SIGN,
				)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VAT AMOUNT (12%)</td>
        <td style="text-align: right">(${formatInPeso(
					dailySales.total_vat_adjusted,
					PESO_SIGN,
				)})</td>
      </tr>
      <tr>
        <td><b>NET SALES</b></td>
        <td style="text-align: right;"><b>${formatInPeso(
					dailySales.net_sales,
					PESO_SIGN,
				)}</b></td>
      </tr>
    </table>

    <div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>ADJUSTMENT ON VAT:</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">SC/PWD</td>
        <td style="text-align: right">${formatInPeso(
					dailySales.vat_special_discount,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">OTHERS</td>
        <td style="text-align: right">${formatInPeso(
					dailySales.others,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">TOTAL</td>
        <td style="text-align: right">${formatInPeso(
					dailySales.total_vat_adjusted,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
    </table>

    <div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>VAT AMOUNT (12%)</td>
        <td style="text-align: right">${formatInPeso(
					dailySales.vat_amount,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT ADJ.</td>
        <td style="text-align: right">(${formatInPeso(
					dailySales.total_vat_adjusted,
					PESO_SIGN,
				)})</td>
      </tr>
      <tr>
        <td>VAT PAYABLE</td>
        <td style="text-align: right">${formatInPeso(
					dailySales.vat_payable,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
    </table>

    <br />

    <div>GDT: ${formatDate(dailySales.daily_sales_data.date)}</div>
    <div>PDT: ${formatDateTime(dayjs(), false)}</div>

    <div style="display: flex; align-items: center; justify-content: space-between">
			<span>C: ${dailySales.generated_by.employee_id || EMPTY_CELL}</span>
			<span>PB: ${user?.employee_id || EMPTY_CELL}</span>
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

export const printXReadReport = (
	report: XReadReport,
	siteSettings: SiteSettings,
	branchMachine: BranchMachine,
	user: User,
	isPdf = false,
) => {
	const data = `
	<div class="container" style="${getPageStyle()}">
  ${getHeader(siteSettings, branchMachine)}

    <br />

    ${
			report?.gross_sales === 0
				? '<div style="text-align: center">NO TRANSACTION</div>'
				: ''
		}

    <br/>

		<div>X-READ</div>
    <br/>

    <div>INVOICE NUMBER</div>
    <table style="margin-left: 15px;">
      <tr>
        <td style="width: 120px;">Beg Invoice #:</td>
        <td style="text-align: right">${
					report.beginning_or?.or_number || EMPTY_CELL
				}</td>
      </tr>
      <tr>
      <td style="width: 120px;">End Invoice #:</td>
        <td style="text-align: right">${
					report.ending_or?.or_number || EMPTY_CELL
				}</td>
      </tr>
    </table>

    <div>SALES</div>
    <table style="margin-left: 15px;">
      <tr>
        <td style="width: 120px;">Beg:</td>
        <td style="text-align: right">${formatInPeso(
					report.beginning_sales,
					PESO_SIGN,
				)}</td>
      </tr>
      <tr>
        <td style="width: 120px;">Cur:</td>
        <td style="text-align: right">${formatInPeso(
					report.gross_sales,
					PESO_SIGN,
				)}</td>
      </tr>
        <td style="width: 120px;">End:</td>
        <td style="text-align: right">${formatInPeso(
					report.ending_sales,
					PESO_SIGN,
				)}</td>
      </tr>
    </table>

    <div>TRANSACTION COUNT</div>
    <table style="margin-left: 15px;">
      <tr>
        <td style="width: 120px;">Beg:</td>
        <td style="text-align: right">${
					report.beginning_transactions_count
				}</td>
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
				<td style="text-align: right">${formatInPeso(
					report.cash_sales,
					PESO_SIGN,
				)}&nbsp;</td>
			</tr>
			<tr>
				<td>CREDIT SALES</td>
				<td style="text-align: right">${formatInPesoWithUnderline(
					report.credit_pay,
				)}&nbsp;
        ${addUnderline(report.credit_pay)}</td>
			</tr>
			<tr>
				<td>GROSS SALES</td>
				<td style="text-align: right">${formatInPeso(
					report.gross_sales,
					PESO_SIGN,
				)}&nbsp;</td>
			</tr>
		</table>

		<br />

		<table style="width: 100%;">
			<tr>
				<td>VAT Exempt</td>
				<td style="text-align: right">${formatInPeso(
					report.vat_exempt,
					PESO_SIGN,
				)}&nbsp;</td>
			</tr>
      <tr>
        <td>VATable Sales</td>
        <td style="text-align: right">${formatInPeso(
					report.vat_sales,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT Amount (12%)</td>
        <td style="text-align: right">${formatInPeso(
					report.vat_amount,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
				<td>ZERO Rated</td>
				<td style="text-align: right">${formatInPeso(0, PESO_SIGN)}&nbsp;</td>
			</tr>
		</table>

		<div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>GROSS SALES</td>
        <td style="text-align: right">${formatInPeso(
					report.gross_sales,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">REG. DISCOUNT</td>
        <td style="text-align: right">(${formatInPeso(
					report.regular_discount,
					PESO_SIGN,
				)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">SC/PWD</td>
        <td style="text-align: right">(${formatInPeso(
					report.special_discount,
					PESO_SIGN,
				)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VOIDED SALES</td>
        <td style="text-align: right">(${formatInPeso(
					report.void,
					PESO_SIGN,
				)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VAT AMOUNT (12%)</td>
        <td style="text-align: right">(${formatInPesoWithUnderline(
					report.total_vat_adjusted,
				)})${addUnderline(report.total_vat_adjusted)}</td>
      </tr>
      <tr>
        <td><b>NET SALES</b></td>
        <td style="text-align: right;"><b>${formatInPeso(
					report.net_sales,
					PESO_SIGN,
				)}</b>&nbsp;</td>
      </tr>
    </table>

    <div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>ADJUSTMENT ON VAT:</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">SC/PWD</td>
        <td style="text-align: right">${formatInPeso(
					report.vat_special_discount,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">OTHERS</td>
        <td style="text-align: right">${formatInPesoWithUnderline(
					report.others,
				)}&nbsp;${addUnderline(report.others)}</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">TOTAL</td>
        <td style="text-align: right">${formatInPeso(
					report.total_vat_adjusted,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
    </table>

    <div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>VAT AMOUNT (12%)</td>
        <td style="text-align: right">${formatInPeso(
					report.vat_amount,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT ADJ.</td>
        <td style="text-align: right">(${formatInPesoWithUnderline(
					report.total_vat_adjusted,
				)})${addUnderline(report.total_vat_adjusted)}</td>
      </tr>
      <tr>
        <td>VAT PAYABLE</td>
        <td style="text-align: right">${formatInPeso(
					report.vat_payable,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
    </table>

    <br />

		<div>GDT: ${
			report.generation_datetime
				? formatDateTime(report.generation_datetime)
				: EMPTY_CELL
		}</div>
    <div>PDT: ${
			report.printing_datetime
				? formatDateTime(report.printing_datetime)
				: EMPTY_CELL
		}</div>

    <div style="display: flex; align-items: center; justify-content: space-between">
			<span>C: ${report?.generated_by?.employee_id || EMPTY_CELL}</span>
			<span>PB: ${
				user?.employee_id || report?.generated_by?.employee_id || EMPTY_CELL
			}</span>
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

export const printZReadReport = (
	report: ZReadReport,
	siteSettings: SiteSettings,
	branchMachine: BranchMachine,
	user: User,
	isPdf = false,
) => {
	const data = `
	<div class="container" style="${getPageStyle()}">
		${getHeader(siteSettings, branchMachine)}

    <br />

    ${
			report?.total_transactions === 0
				? '<div style="text-align: center">NO TRANSACTION</div>'
				: ''
		}

    <br/>

    <div>Z-READ</div>
    <br/>

    <div>INVOICE NUMBER</div>
    <table style="margin-left: 15px;">
      <tr>
        <td style="width: 120px;">Beg Invoice #:</td>
        <td style="text-align: right;">${
					report.beginning_or?.or_number || EMPTY_CELL
				}</td>
      </tr>
      <tr>
        <td style="width: 120px;">End Invoice #:</td>
        <td style="text-align: right;">${
					report.ending_or?.or_number || EMPTY_CELL
				}</td>
      </tr>
    </table>

    <div>SALES</div>
    <table style="margin-left: 15px;">
      <tr>
        <td style="width: 120px;">Beg:</td>
        <td style="text-align: right;">${formatInPeso(
					report.beginning_sales,
					PESO_SIGN,
				)}</td>
      </tr>
      <tr>
        <td style="width: 120px;">Cur:</td>
        <td style="text-align: right;">${formatInPeso(
					report.current_sales,
					PESO_SIGN,
				)}</td>
      </tr>
        <td style="width: 120px;">End:</td>
        <td style="text-align: right;">${formatInPeso(
					report.ending_sales,
					PESO_SIGN,
				)}</td>
      </tr>
    </table>

    <div>TRANSACTION COUNT</div>
    <table style="margin-left: 15px;">
      <tr>
        <td style="width: 120px;">Beg:</td>
        <td style="text-align: right;">${
					report.beginning_transactions_count
				}</td>
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
				<td style="text-align: right">${formatInPeso(
					report.cash_sales,
					PESO_SIGN,
				)}&nbsp;</td>
			</tr>
			<tr>
				<td>CREDIT SALES</td>
				<td style="text-align: right">${formatInPesoWithUnderline(
					report.credit_pay,
				)}&nbsp;${addUnderline(report.credit_pay)}</td>
			</tr>
			<tr>
				<td>GROSS SALES</td>
				<td style="text-align: right">${formatInPeso(
					report.gross_sales,
					PESO_SIGN,
				)}&nbsp;</td>
			</tr>
		</table>

		<br />

		<table style="width: 100%;">
			<tr>
				<td>VAT Exempt</td>
				<td style="text-align: right">${formatInPeso(
					report.vat_exempt,
					PESO_SIGN,
				)}&nbsp;</td>
			</tr>
      <tr>
        <td>VAT Sales</td>
        <td style="text-align: right">${formatInPeso(
					report.vat_sales,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT Amount (12%)</td>
        <td style="text-align: right">${formatInPeso(
					report.vat_amount,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
				<td>ZERO Rated</td>
				<td style="text-align: right">${formatInPeso(0, PESO_SIGN)}&nbsp;</td>
			</tr>
		</table>

		<div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>GROSS SALES</td>
        <td style="text-align: right">${formatInPeso(
					report.gross_sales,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">REG. DISCOUNT</td>
        <td style="text-align: right">(${formatInPeso(
					report.regular_discount,
					PESO_SIGN,
				)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">SC/PWD</td>
        <td style="text-align: right">(${formatInPeso(
					report.special_discount,
					PESO_SIGN,
				)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VOIDED SALES</td>
        <td style="text-align: right">(${formatInPeso(
					report.void,
					PESO_SIGN,
				)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VAT AMOUNT (12%)</td>
        <td style="text-align: right">(${formatInPesoWithUnderline(
					report.total_vat_adjusted,
				)})${addUnderline(report.total_vat_adjusted)}</td>
      </tr>
      <tr>
        <td><b>ACCUM. GRAND TOTAL</b></td>
        <td style="text-align: right;"><b>${formatInPeso(
					report.net_sales,
					PESO_SIGN,
				)}</b>&nbsp;</td>
      </tr>
    </table>

    <div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>ADJUSTMENT ON VAT:</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">SC/PWD</td>
        <td style="text-align: right">${formatInPeso(
					report.vat_special_discount,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">OTHERS</td>
        <td style="text-align: right">${formatInPesoWithUnderline(
					report.others,
				)}&nbsp;${addUnderline(report.others)}</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">TOTAL</td>
        <td style="text-align: right">${formatInPeso(
					report.total_vat_adjusted,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
    </table>

    <div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>VAT AMOUNT (12%)</td>
        <td style="text-align: right">${formatInPeso(
					report.vat_amount,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT ADJ.</td>
        <td style="text-align: right">(${formatInPesoWithUnderline(
					report.total_vat_adjusted,
				)})${addUnderline(report.total_vat_adjusted)}</td>
      </tr>
      <tr>
        <td>VAT PAYABLE</td>
        <td style="text-align: right">${formatInPeso(
					report.vat_payable,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
    </table>

		<br />

		<div>GDT: ${
			report.generation_datetime
				? formatDateTime(report.generation_datetime)
				: EMPTY_CELL
		}</div>
    <div>PDT: ${
			report.printing_datetime
				? formatDateTime(report.printing_datetime)
				: EMPTY_CELL
		}</div>

    <div style="display: flex; align-items: center; justify-content: space-between">
			<span>C: ${report?.generated_by?.employee_id || EMPTY_CELL}</span>
			<span>PB: ${user?.employee_id || EMPTY_CELL}</span>
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

export const printCashBreakdown = (
	cashBreakdown: CashBreakdown,
	siteSettings: SiteSettings,
	branchMachine: BranchMachine,
) => {
	const breakdownCoins = [
		{
			label: '0.25',
			quantity: cashBreakdown.coins_25,
			amount: formatInPeso(0.25 * cashBreakdown.coins_25, ''),
		},
		{
			label: '1.00',
			quantity: cashBreakdown.coins_1,
			amount: formatInPeso(cashBreakdown.coins_1, ''),
		},
		{
			label: '5.00',
			quantity: cashBreakdown.coins_5,
			amount: formatInPeso(5 * cashBreakdown.coins_5, ''),
		},
		{
			label: '10.00',
			quantity: cashBreakdown.coins_10,
			amount: formatInPeso(10 * cashBreakdown.coins_10, ''),
		},
		{
			label: '20.00',
			quantity: cashBreakdown.coins_20,
			amount: formatInPeso(20 * cashBreakdown.coins_20, ''),
		},
	];
	const denomCoins = breakdownCoins.map(
		({ label }) => `
				<div style="
						display: flex;
						align-items: center;
						justify-content: space-between
					">
					<span>P </span>
					<span>${label}</span>
				</div>
				`,
	);
	const quantityCoins = breakdownCoins.map(
		({ quantity }) => `<div>${quantity}</div>`,
	);
	const amountCoins = breakdownCoins.map(
		({ amount }) => `
				<div style="
						display: flex;
						align-items: center;
						justify-content: space-between
					">
					<span>P </span>
					<span>${amount}</span>
				</div>
				`,
	);
	const breakdownBills = [
		{
			label: '20.00',
			quantity: cashBreakdown.bills_20,
			amount: formatInPeso(20 * cashBreakdown.bills_20, ''),
		},
		{
			label: '50.00',
			quantity: cashBreakdown.bills_50,
			amount: formatInPeso(50 * cashBreakdown.bills_50, ''),
		},
		{
			label: '100.00',
			quantity: cashBreakdown.bills_100,
			amount: formatInPeso(100 * cashBreakdown.bills_100, ''),
		},
		{
			label: '200.00',
			quantity: cashBreakdown.bills_200,
			amount: formatInPeso(200 * cashBreakdown.bills_200, ''),
		},
		{
			label: '500.00',
			quantity: cashBreakdown.bills_500,
			amount: formatInPeso(500 * cashBreakdown.bills_500, ''),
		},
		{
			label: '1,000.00',
			quantity: cashBreakdown.bills_1000,
			amount: formatInPeso(1000 * cashBreakdown.bills_1000, ''),
		},
	];
	const denomBills = breakdownBills.map(
		({ label }) => `
				<div style="
						display: flex;
						align-items: center;
						justify-content: space-between
					">
					<span>P </span>
					<span>${label}</span>
				</div>
				`,
	);
	const quantityBills = breakdownBills.map(
		({ quantity }) => `<div>${quantity}</div>`,
	);
	const amountBills = breakdownBills.map(
		({ amount }) => `
				<div style="
						display: flex;
						align-items: center;
						justify-content: space-between
					">
					<span>P </span>
					<span>${amount}</span>
				</div>
				`,
	);

	const data = `
	<div style="${getPageStyle()}">
		<div style="text-align: center; display: flex; flex-direction: column">
      <span style="white-space: pre-line">${siteSettings.store_name}</span>
      <span style="white-space: pre-line">${
				siteSettings.address_of_tax_payer
			}</span>
      <span>${branchMachine?.name}</span>

			<br />

			<span>[CASH BREAKDOWN]</span>
			<span>${getCashBreakdownTypeDescription(
				cashBreakdown.category,
				cashBreakdown.type,
			)}</span>
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
			<span>${formatInPeso(
				calculateCashBreakdownTotal(cashBreakdown),
				PESO_SIGN,
			)}</span>
		</div>

		<br />

    <div>GDT: ${formatDateTime(cashBreakdown.datetime_created)}</div>
    <div>PDT: ${formatDateTime(dayjs(), false)}</div>
    <div>${cashBreakdown.cashiering_session.user.employee_id}</div>
    ${
			cashBreakdown.category === cashBreakdownCategories.CASH_IN
				? `<div>Remarks: ${cashBreakdown.remarks}</div>`
				: ''
		}

		<br />

    ${getFooter(siteSettings)}
	</div>
	`;

	print(data, 'Cash Breakdown');
};

export const printBirReport = (
	birReports: BirReport[],
	siteSettings: SiteSettings,
	branchMachine: BranchMachine,
	user: User,
) => {
	const birReportsRow = birReports
		.map(
			(report) => `
    <tr>
      <td>${formatDate(report.date)}</td>
      <td>${report?.beginning_or?.or_number || EMPTY_CELL}</td>
      <td>${report?.ending_or?.or_number || EMPTY_CELL}</td>
      <td>${formatInPeso(
				report.grand_accumulated_sales_ending_balance,
				PESO_SIGN,
			)}</td>
      <td>${formatInPeso(
				report.grand_accumulated_sales_beginning_balance,
				PESO_SIGN,
			)}</td>
      <td>${formatInPeso(report.gross_sales_for_the_day, PESO_SIGN)}</td>
      <td>${formatInPeso(report.sales_issue_with_manual, PESO_SIGN)}</td>
      <td>${formatInPeso(report.gross_sales_from_pos, PESO_SIGN)}</td>
      <td>${formatInPeso(report.vatable_sales, PESO_SIGN)}</td>
      <td>${formatInPeso(report.vat_amount, PESO_SIGN)}</td>
      <td>${formatInPeso(report.vat_exempt_sales, PESO_SIGN)}</td>
      <td>${formatInPeso(report.zero_rated_sales, PESO_SIGN)}</td>

      <td>${formatInPeso(report.regular_discount, PESO_SIGN)}</td>
      <td>${formatInPeso(report.special_discount, PESO_SIGN)}</td>
      <td>${formatInPeso(report.returns, PESO_SIGN)}</td>
      <td>${formatInPeso(report.void, PESO_SIGN)}</td>
      <td>${formatInPeso(report.total_deductions, PESO_SIGN)}</td>

      <td>${formatInPeso(report.vat_on_special_discounts, PESO_SIGN)}</td>
      <td>${formatInPeso(report.vat_on_returns, PESO_SIGN)}</td>
      <td>${formatInPeso(report.others, PESO_SIGN)}</td>
      <td>${formatInPeso(report.total_vat_adjusted, PESO_SIGN)}</td>

      <td>${formatInPeso(report.vat_payable, PESO_SIGN)}</td>
      <td>${formatInPeso(report.net_sales, PESO_SIGN)}</td>
      <td>${formatInPeso(report.other_income, PESO_SIGN)}</td>
      <td>${formatInPeso(report.sales_overrun_or_overflow, PESO_SIGN)}</td>
      <td>${formatInPeso(report.total_net_sales, PESO_SIGN)}</td>
      <td>${report.reset_counter}</td>
      <td>${report.remarks}</td>
    </tr>
  `,
		)
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
      <div class="details" style="white-space: pre-line">${
				siteSettings.store_name
			}</div>
      <div class="details" style="white-space: pre-line">${
				siteSettings.address_of_tax_payer
			}</div>
      <div class="details">${siteSettings.tin} - ${branchMachine?.name}</div>
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

      <div class="details">PDT: ${formatDateTime(dayjs(), false)}</div>
      <div class="details">${user.employee_id}</div>
    </div>
  </body>
  </html>
	`;
};

export const printCashOut = (
	cashOut: CashBreakdown,
	siteSettings: SiteSettings,
	branchMachine: BranchMachine,
) => {
	const metadata = cashOut.cash_out_metadata;

	const {
		payee,
		particulars,
		received_by: receivedBy,
		prepared_by_user: preparedByUser,
	} = metadata;
	const datetime = formatDateTime(cashOut.datetime_created);
	const amount = formatInPeso(metadata.amount, 'P');
	const preparedBy = getFullName(metadata.prepared_by_user);
	const approvedBy = getFullName(metadata.approved_by_user);

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
    <div>PDT: ${formatDateTime(dayjs(), false)}</div>
    <div>${preparedByUser.employee_id}</div>

    <br />

    ${getFooter(siteSettings)}
	</div>
	`;

	print(data, 'Cash Out');
};
