const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground text-gray-500">Welcome to your From the Heart Tutoring portal</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Students</h3>
            <p className="text-sm text-gray-500">Total active students</p>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">128</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Tutors</h3>
            <p className="text-sm text-gray-500">Active tutoring staff</p>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">24</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Sessions</h3>
            <p className="text-sm text-gray-500">This month</p>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">342</div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
          <div className="space-y-3">
            {[
              { date: "Today, 3:00 PM", student: "Emma Thompson", subject: "Mathematics" },
              { date: "Tomorrow, 4:30 PM", student: "James Wilson", subject: "Science" },
              { date: "Apr 25, 2:00 PM", student: "Sophia Garcia", subject: "English" },
            ].map((session, index) => (
              <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                <div>
                  <div className="font-medium">{session.student}</div>
                  <div className="text-sm text-gray-500">{session.subject}</div>
                </div>
                <div className="text-sm font-medium">{session.date}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Revenue This Month</h2>
          <div className="text-3xl font-bold text-[#ff6f61]">$3,240.00</div>
          <div className="mt-4 text-sm text-gray-500">
            <div className="flex justify-between mb-2">
              <span>Tutoring Sessions</span>
              <span>$2,850.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Materials</span>
              <span>$390.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
