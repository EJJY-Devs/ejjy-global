import dayjs from 'dayjs';
import React from 'react';
import { BranchMachine, SiteSettings, User } from '../../../types';
import { formatDateTime } from '../../../utils';

// The BIR Sales Summary (E1) genuinely has ~29 columns and needs the full
// ~2000px table to lay them out without crushing every cell. The annex
// reports (NAAC, PWD, SC, Solo Parent) have far fewer columns; forcing them
// onto the same 2000px-wide table stretched every column way past its
// content, and — since these render into a narrower off-screen container for
// the single-page PDF capture (see renderA4SinglePagePdf) — the oversized
// table spilled past the container and got clipped/overlapped at the page's
// right edge instead of shrinking to fit. 'compact' lets these tables size
// to their own content instead of being pinned to the E1 report's width.
type BirReportStylesVariant = 'wide' | 'compact';

// eslint-disable-next-line react-refresh/only-export-components
export const birReportStyles = (variant: BirReportStylesVariant = 'wide') => {
	const isWide = variant === 'wide';

	return React.createElement('style', {}, [
		`
    .bir-reports-pdf {
      ${isWide ? 'max-width: 2300px;\n      min-width: 2000px;' : ''}
    }

    .bir-reports-pdf * {
      font-family: Helvetica, monospace;
      font-size: 12px;
    }

    .bir-report-header div.details,
    .bir-report-header .title {
      width: 100%;
    }

    table.bir-reports {
      border-collapse: collapse;
      ${isWide ? 'min-width: 2000px;\n      width: 100%;' : 'width: auto;\n      margin: 0 auto;'}
    }

    table.bir-reports th,
    table.bir-reports .nested-row td {
      min-width: 60px;
    }

    table.bir-reports th[colspan] {
      background-color: #ADB9CA;
    }

    table.bir-reports th,
    table.bir-reports .nested-row td {
      background-color: #BDD6EE;
    }

    table.bir-reports th,
    table.bir-reports td {
      border: 1px solid black;
      text-align: center;
      vertical-align: middle;
      padding: 6px 4px;
      box-sizing: border-box;
      overflow-wrap: break-word;
      word-break: normal;
      line-height: 1.3;
    }

    .bir-reports-pdf .title {
      text-align: center;
      font-weight: bold;
      margin-bottom:4px;
    }
  `,
	]);
};

type BirHeaderProps = {
	branchMachine?: BranchMachine;
	siteSettings: SiteSettings;
	title: string;
	user: User;
};
// Inline styles here are deliberate, not decorative: this markup is dropped
// straight into the host app's live DOM for html2canvas capture (see
// renderA4SinglePagePdf), so it's exposed to whatever global CSS that app
// already has for very generic class names like "details"/"title". A cascade
// collision there previously collapsed each line down to single-word width,
// wrapping the proprietor name/address/TIN one word per line. Inline styles
// win over any external stylesheet the host page happens to define for these
// class names, so the layout stays correct regardless of what else is on the
// page.
const detailLineStyle: React.CSSProperties = {
	width: '100%',
	display: 'block',
	whiteSpace: 'normal',
};

export const BirHeader = ({
	branchMachine,
	siteSettings,
	title,
	user,
}: BirHeaderProps) => (
	<div className="bir-report-header" style={{ width: '100%' }}>
		<div className="details" style={detailLineStyle}>
			{siteSettings.proprietor}
		</div>
		<div className="details" style={detailLineStyle}>
			{siteSettings.address_of_tax_payer}
		</div>
		<div className="details" style={detailLineStyle}>
			{siteSettings.tin}
		</div>

		<br />

		<div className="details" style={detailLineStyle}>
			{siteSettings.app_description} {siteSettings.product_version}
		</div>
		<div className="details" style={detailLineStyle}>
			SN: {branchMachine?.storage_serial_number}
		</div>
		<div className="details" style={detailLineStyle}>
			MIN: {branchMachine?.machine_identification_number}
		</div>
		{/* POS Terminal No. is intentionally left blank for now. */}
		<div className="details" style={detailLineStyle}>
			POS Terminal No.:
		</div>
		<div className="details" style={detailLineStyle}>
			Date Generated: {formatDateTime(dayjs(), false)}
		</div>
		{/* UserID is the authorizer's (the user generating this report) employee ID. */}
		<div className="details" style={detailLineStyle}>
			UserID: {user.employee_id}
		</div>

		<br />

		<div
			className="title"
			style={{ ...detailLineStyle, textAlign: 'center', fontWeight: 'bold' }}
		>
			{title}
		</div>
	</div>
);
