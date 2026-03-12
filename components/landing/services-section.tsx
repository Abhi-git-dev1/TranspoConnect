'use client'

export function ServicesSection() {
  const services = [
    {
      icon: '📦',
      title: 'Instant Booking',
      description: 'Book vehicles in seconds with real-time availability and instant confirmation.'
    },
    {
      icon: '📍',
      title: 'Live Tracking',
      description: 'Track your shipment in real-time with GPS location updates every second.'
    },
    {
      icon: '💰',
      title: 'Transparent Pricing',
      description: 'Know your fare upfront with no hidden charges. Pay securely online or cash.'
    },
    {
      icon: '⭐',
      title: 'Verified Drivers',
      description: 'All drivers are thoroughly verified and professionally trained.'
    },
    {
      icon: '🛡️',
      title: 'Safe & Secure',
      description: 'Your shipments are insured and tracked throughout the journey.'
    },
    {
      icon: '🤝',
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your logistics needs.'
    }
  ]

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-red-600">TranspoConnect?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide the most reliable and affordable transport solution for your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-100"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
