import { Account } from "./Account";
export interface AttendanceSchedule {
    id: number;
    employee: Account;
    online_id?: number;
    period: "morning" | "afternoon";
    attendance_type: "clock_in" | "clock_out";
    attendance_time: string;
}
export interface BulkUpdateAttendanceSchedulesSingleScheduleRequest {
    id: number;
    attendance_time: string;
}
