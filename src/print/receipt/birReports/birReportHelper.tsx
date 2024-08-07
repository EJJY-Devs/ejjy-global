import dayjs from 'dayjs';
import React from 'react';
import { BranchMachine, SiteSettings, User } from '../../../types';
import { formatDateTime } from '../../../utils';

export const birReportStyles = React.createElement('style', {}, [
	`
    .bir-reports-pdf {
      max-width: 2300px;
      min-width: 2000px;
    }

    .bir-reports-pdf * {
      font-family: Helvetica, monospace;
      font-size: 12px;
    }

    table.bir-reports,
    .bir-report-header div.details,
    .bir-report-header .title {
      min-width: 2000px;
      width: 100%;
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

    table.bir-reports th,
    table.bir-reports .nested-row td {
      background-color: #BDD6EE;
    }

    table.bir-reports th,
    table.bir-reports td {
      border: 1px solid black;
      text-align: center;
    }

    .bir-reports-pdf .title {
      text-align: center;
      font-weight: bold;
      margin-bottom:4px;
    }
  `,
]);

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
