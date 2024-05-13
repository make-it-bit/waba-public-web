import React from 'react';

import { ProfileSettingsForm } from '@/components';

export const dynamic = 'force-static';

const ProfilePage = async () => {
  return <ProfileSettingsForm />;
};

export default ProfilePage;
