import { Account } from './Account';
import { Branch } from './Branch';

export type AttendanceLogCategory = 'attendance' | 'tracker';
export type AttendanceLogType = 'in' | 'out';

export interface AttendanceLog {
	id: number;
	employee: Account;
	branch: Branch;
	online_id?: number;
	datetime_created: string;
	attendance_category: AttendanceLogCategory;
	attendance_type: AttendanceLogType;
	real_time: string;
	scheduled_time?: string;
	suggested_resolved_clock_out_time?: string;
	is_resolved_by_head_office: boolean;
}

type ForPrintingAttendanceLogSingleLog = {
	am_arrival: string;
	am_departure: string;
	pm_arrival: string;
	pm_departure: string;
	day_number: number;
};

export interface PrintingAttendanceLog {
	employee: Account;
	logs: ForPrintingAttendanceLogSingleLog;
}

export interface ProblematicAttendanceLog {
	id: number;
	employee: Account;
	branch: Branch;
	online_id?: number;
	datetime_created: string;
	attendance_category: 'attendance' | 'tracker';
	attendance_type: 'in' | 'out';
	real_time: string;
	scheduled_time?: string;
	suggested_resolved_clock_out_time?: string;
	is_resolved_by_head_office: boolean;
}
