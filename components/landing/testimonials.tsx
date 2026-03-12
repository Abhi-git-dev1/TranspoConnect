'use client'

export function Testimonials() {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Business Owner',
      content: 'TranspoConnect has transformed our logistics operations. We save 40% on transport costs now.',
      avatar: '👨‍💼'
    },
    {
      name: 'Priya Singh',
      role: 'E-commerce Manager',
      content: 'The real-time tracking gives us and our customers peace of mind. Highly recommended!',
      avatar: '👩‍💼'
    },
    {
      name: 'Arjun Patel',
      role: 'Driver Partner',
      content: 'Excellent platform for drivers. Transparent payments and great customer support.',
      avatar: '👨‍🚗'
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Trusted by <span className="text-red-600">Thousands</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of businesses and drivers who are revolutionizing logistics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-red-300 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-red-600">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
