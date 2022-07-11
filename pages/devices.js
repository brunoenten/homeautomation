import useSWR, { useSWRConfig } from 'swr'
import { useState } from 'react'
import ApplicationLayout from "../layouts/application"
import Device from "../components/device"
import NoDevices from '../components/noDevices';
import Alert from '../components/alert';
import { PencilIcon } from '@heroicons/react/outline';

export default function Devices() {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialDevice, setInitialDevice] = useState(false);
  const [createdAlert, setCreatedAlert] = useState(false);
  const { mutate } = useSWRConfig()

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data: devices, error } = useSWR('/api/devices', fetcher)

  const handleSuccess = function () {
    setModalOpen(false)
    mutate('/api/devices')

    setCreatedAlert(true)
    setTimeout(() => {
      setCreatedAlert(false)
   }, 5000)
  }

  const handleError = function () {
    console.log(error)
  }

  const editDevice = function (device) {
    if (typeof device.settings == 'string')
      device.settings = JSON.parse(device.settings)
    setInitialDevice(device)
    setModalOpen(true)
  }

  const addDevice = function () {
    setInitialDevice({ name: "New Device", type_id: 1, room_id: 1, settings: {}})
    setModalOpen(true)
  }

  return (
    <ApplicationLayout>
      { modalOpen && (
          <Device
            onClose={() => setModalOpen(false)}
            onSuccess={handleSuccess}
            onError={handleError}
            initialDevice={initialDevice}
          />
        )
      }
      <div className="px-4 sm:px-6 lg:px-8">
        { createdAlert && (<Alert level="success" content="Database successfuly updated!"/>) }
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Devices</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the devices in your home.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => addDevice()}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add device
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                { error && (
                  <div className="py-16">
                  <div className="text-center">
                    <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Cannot fetch devices.</h1>
                    <p className="mt-2 text-base text-gray-500">{error}</p>
                  </div>
                </div>
                )}
                { !error && devices && devices.length > 0 &&
                  (
                    <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Type
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Room
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          State
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {devices.map((device) => (
                        <tr key={device.email}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {device.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{device.type_id}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{device.room_id}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{device.state}</td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              type="button"
                              onClick={() => editDevice(device)}
                              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <PencilIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    </table>
                  )
                }
                { (!error && (devices === undefined || devices.length == 0)) &&
                  (
                    <NoDevices onClick={() => setModalOpen(true)} />
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  )
}
