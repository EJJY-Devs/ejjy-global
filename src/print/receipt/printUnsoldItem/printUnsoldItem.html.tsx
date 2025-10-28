import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Branch, BranchMachine, User } from '../../../types';
import {
	appendHtmlElement,
	getPageStyleObject,
	print,
} from '../../helper-receipt';
import { PrintUnsoldItem, UnsoldItemSummary } from './types';

export const UnsoldItemContent = ({
	unsoldItemSummary,
	branch,
	branchMachine,
	reportDate,
}: {
	unsoldItemSummary: UnsoldItemSummary[];
	branch: Branch;
	branchMachine?: BranchMachine;
	user?: User;
	reportDate?: string;
}) => (
	<div
		className="container"
		style={{
			textAlign: 'center',
			fontFamily: 'monospace',
			fontSize: '14px',
			lineHeight: '1.4',
		}}
	>
		<div>
			<strong>{branchMachine?.name || branch?.name || 'Branch'}</strong>
			<br />
			<span>{branch?.store_address || branch?.location || ''}</span>
			<br />
			<br />
			<strong>UNSOLD ITEM</strong>
			<br />
			<span>{reportDate}</span>
			<br />
			<br />
		</div>

		{unsoldItemSummary.length === 0 ? (
			<div style={{ padding: '32px 0', textAlign: 'center' }}>
				<span>No unsold items today</span>
			</div>
		) : (
			<table style={{ width: '100%', borderCollapse: 'collapse' }}>
				<thead>
					<tr>
						<th
							style={{
								textAlign: 'left',
								padding: '4px',
								borderBottom: '1px solid #000',
							}}
						>
							Name
						</th>
						<th
							style={{
								textAlign: 'center',
								padding: '4px',
								borderBottom: '1px solid #000',
							}}
						>
							Quantity
						</th>
					</tr>
				</thead>
				<tbody>
					{unsoldItemSummary.map((item, index) => (
						<tr key={`${item.name}-${index}`}>
							<td style={{ padding: '2px 4px' }}>{item.name}</td>
							<td style={{ textAlign: 'center', padding: '2px 4px' }}>
								{item.quantity.toLocaleString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		)}

		<br />
		<span>
			PDT:{' '}
			{new Date().toLocaleDateString('en-US', {
				month: '2-digit',
				day: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				hour12: true,
			})}
		</span>
		<br />
		<br />
	</div>
);

// eslint-disable-next-line react-refresh/only-export-components
export const printUnsoldItemHtml = ({
	unsoldItemSummary,
	branch,
	branchMachine,
	user,
	isPdf = false,
	reportDate,
}: PrintUnsoldItem) => {
	const data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<UnsoldItemContent
				unsoldItemSummary={unsoldItemSummary}
				branch={branch}
				branchMachine={branchMachine}
				user={user}
				reportDate={reportDate}
			/>
		</div>,
	);

	if (isPdf) {
		return appendHtmlElement(data);
	}

	print(data, 'Unsold Item Summary');
};
