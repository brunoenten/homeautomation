import ApplicationLayout from '../layouts/application'

const features = [
  { name: 'Creator', description: 'Developed by Bruno Enten' },
  { name: 'Language', description: 'Uses ES7 Javascript' },
  { name: 'Framework', description: 'It is a NextJS app' },
  { name: 'CSS', description: 'TailwindCSS provides the styling framework' },
  { name: 'UI toolkit', description: 'Most elements comes from TailwindUI' },
  { name: 'Source code', description: 'Source is available on github' },
]

export default function About() {
  return (
    <ApplicationLayout>
      <div className="bg-white">
        <div aria-hidden="true" className="relative">
          <img
            src="https://images.unsplash.com/photo-1510222755157-fc26750f1199?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
            alt="Nixie clock"
            className="w-full h-96 object-center object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white" />
        </div>

        <div className="relative -mt-12 max-w-7xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center lg:max-w-4xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">About Homeautomation</h2>
            <p className="mt-4 text-gray-500">
              Homeautomation is a mock up of a home automation webapp. It was created to be submitted for the UoL Bachelor of Computer Science, Databases, Network and the Web
  Coursework for midterm.
            </p>
          </div>

          <dl className="mt-16 max-w-2xl mx-auto grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </ApplicationLayout>
  )
}
