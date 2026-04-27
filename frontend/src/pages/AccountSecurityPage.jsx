import {
  AccountPageHeader,
  SecurityChangePasswordSection,
  SecurityDeviceManagementSection,
  SecurityTwoFactorSection
} from '../features/userAccount/components/index.js';

function AccountSecurityPage() {
  return (
    <div>
      <AccountPageHeader title="Security Settings" />

      <SecurityChangePasswordSection />

      <SecurityTwoFactorSection />

      <SecurityDeviceManagementSection />
    </div>
  );
}

export default AccountSecurityPage;
