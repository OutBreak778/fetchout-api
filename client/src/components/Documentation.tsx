const Documentation = () => {
 return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <h1 className="text-4xl font-bold mb-2">📄 Fetchout API Documentation</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Welcome to the official documentation for the Fetchout API platform.
        </p>

        {/* Development Notice */}
        <div className="bg-yellow-100 dark:bg-yellow-800 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-100 p-4 mb-6">
          <p className="font-semibold">🚧 This documentation is under development</p>
          <p>Full endpoint details and examples will be available soon. Stay tuned!</p>
        </div>

        {/* Project Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">What is Fetchout?</h2>
          <p>
            Fetchout is a platform designed for developers to <strong>discover, manage, and test APIs</strong> 
            efficiently. You can browse public APIs, create your own endpoints, monitor usage, and control 
            access with authentication and rate limiting.
          </p>
        </section>

        {/* Expected Features */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Planned Features</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>🔍 API Discovery – Search and explore public APIs</li>
            <li>🛠 Create & Manage your own APIs</li>
            <li>🔐 Public/Private toggle for APIs</li>
            <li>📊 Usage logs & analytics</li>
            <li>⚡ Live endpoint testing</li>
            <li>🚦 Rate limiting & security</li>
          </ul>
        </section>

        {/* Coming Soon Placeholder */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Endpoints & Examples</h2>
          <div className="p-4 border rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
            Endpoint example details will be added here soon.
          </div>
        </section>

        {/* Footer */}
        <div className="mt-10 text-sm text-gray-500 dark:text-gray-400">
          Last Updated: <span className="italic">In development</span>
        </div>
      </div>
    </div>
  );
}

export default Documentation