import React from 'react';
import imgNoTransaction from '../../../../public/no-transaction.png';
import { EMPTY_CELL } from '../../../globals';
import { SiteSettings, User, XReadReport } from '../../../types';
import { formatDateTime } from '../../../utils';
import { Divider, ReceiptFooter, ReceiptHeader } from '../../Printing';
import { XAccruedContent } from './components/XAccruedContent';
import { XEjournalContent } from './components/XEjournalContent';

interface Props {
	report: XReadReport;
	siteSettings: SiteSettings;
	user: User;
	isForPrint: boolean;
}

export const XReadContent = ({
	report,
	siteSettings,
	user,
	isForPrint,
}: Props) => {
	return (
		<>
			{report.gross_sales === 0 && !isForPrint && (
				<img
					alt="no transaction"
					className="w-full absolute top-0 left-0 pointer-events-none"
					src={imgNoTransaction}
				/>
			)}

			<ReceiptHeader
				branchMachine={report.branch_machine}
				siteSettings={siteSettings}
			/>

			<div className="mt-4">
				{report.generated_by ? (
					<XAccruedContent report={report} />
				) : (
					<XEjournalContent report={report} />
				)}
			</div>

			<Divider />

			<div>
				GDT:{' '}
				{report.generation_datetime
					? formatDateTime(report.generation_datetime)
					: EMPTY_CELL}
			</div>
			<div>
				PDT:{' '}
				{report.printing_datetime
					? formatDateTime(report.printing_datetime)
					: EMPTY_CELL}
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					C: {report?.cashiering_session?.user.employee_id || EMPTY_CELL}
				</div>
				<div>
					PB:{' '}
					{user?.employee_id || report?.generated_by?.employee_id || EMPTY_CELL}
				</div>
			</div>

			<br />

			<ReceiptFooter siteSettings={siteSettings} />
		</>
	);
};
