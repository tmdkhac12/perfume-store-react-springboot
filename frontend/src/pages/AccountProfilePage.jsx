import {
  AccountPageHeader,
  ProfilePersonalInformationSection,
  ProfilePreferencesSection,
  ProfileSignatureNotesSection
} from '../features/userAccount/components/index.js';

function AccountProfilePage() {
  return (
    <div>
      <AccountPageHeader
        description="Manage your personal details and account preferences."
        title="Profile Settings"
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ProfilePersonalInformationSection />
        <ProfilePreferencesSection />
        <ProfileSignatureNotesSection />
      </div>
    </div>
  );
}

export default AccountProfilePage;
