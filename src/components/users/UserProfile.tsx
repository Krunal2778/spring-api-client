import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../services/auth.context';
import { userService } from '../../services/api.service';

const UserProfile = () => {
  const { user } = useAuth();
  
  // Fetch current user data to ensure we have the latest information
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: userService.getAuthenticatedUser,
    enabled: !!user
  });
  
  if (isLoading) {
    return <div className="text-center py-4">Loading profile...</div>;
  }
  
  if (!currentUser) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">Unable to load profile information.</span>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">User Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and account settings</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{currentUser.username}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{currentUser.email}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Account status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  currentUser.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {currentUser.enabled ? 'Active' : 'Inactive'}
                </span>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Roles</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex flex-wrap gap-1">
                  {currentUser.roles.map((role) => (
                    <span
                      key={role.id}
                      className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800"
                    >
                      {role.name}
                    </span>
                  ))}
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="/change-password"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
        >
          Change Password
        </a>
      </div>
    </div>
  );
};

export default UserProfile;
