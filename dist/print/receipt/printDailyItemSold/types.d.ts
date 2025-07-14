import { SiteSettings, User } from '../../../types';
import { DailyItemSoldSummary } from '../../../components/modals/ViewDailyItemSoldModal';
export type PrintDailyItemSold = {
    dailyItemSoldSummary: DailyItemSoldSummary[];
    siteSettings: SiteSettings;
    user?: User;
    isPdf?: boolean;
};
