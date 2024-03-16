import dayjs from 'dayjs';
import React from 'react';
import { BranchMachine, SiteSettings, User } from '../../../types';
import { formatDateTime } from '../../../utils';

export const birReportStyles = React.createElement('style', {}, [
	`
    body .bir-reports-pdf {
      font-family: Tahoma, monospace;
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

    bir-reports-pdf .title {
      text-align: center;
      font-weight: bold;
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
	<>
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

		<h4 className="title">{title}</h4>
	</>
);
