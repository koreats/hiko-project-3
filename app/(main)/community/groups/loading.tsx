export default function GroupsLoading() {
  return (
    <div className="bg-main-bg min-h-screen">
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {/* Header */}
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>

          {/* Search */}
          <div className="h-10 bg-gray-200 rounded"></div>

          {/* Category filters */}
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded w-20"></div>
            ))}
          </div>

          {/* Group cards */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-4">
              <div className="flex space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="flex space-x-2">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
