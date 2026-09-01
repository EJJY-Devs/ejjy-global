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
export const BirHeader = ({
	branchMachine,
	siteSettings,
	title,
	user,
}: BirHeaderProps) => (
	<div className="bir-report-header">
		<div className="details">{siteSettings.proprietor}</div>
		<div className="details">{siteSettings.address_of_tax_payer}</div>
		<div className="details">{siteSettings.tin}</div>

		<br />

		<div className="details">V1.0 (Static)</div>
		<div className="details">{branchMachine?.pos_terminal}</div>
		<div className="details">{branchMachine?.name}</div>
		<div className="details">{formatDateTime(dayjs(), false)}</div>
		<div className="details">{user.employee_id}</div>

		<br />

		<div className="title">{title}</div>
	</div>
);
