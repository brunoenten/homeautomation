/* This example requires Tailwind CSS v2.0+ */
import { CheckCircleIcon, InformationCircleIcon, XCircleIcon, ExclamationIcon } from '@heroicons/react/solid'

export default function Alert({level, content}) {
  switch(level) {
    case 'success':
      return (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">{content}</p>
            </div>
          </div>
        </div>
      )
    case 'error':
      return (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{content}</p>
            </div>
          </div>
        </div>
      )
    case 'warning':
      return (
        <div className="rounded-md bg-yellow-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
            <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-800">{content}</p>
            </div>
          </div>
        </div>
      )
    default:
      return (
        <div className="rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-700">{content}</p>
            </div>
          </div>
        </div>
      )
  }
}


