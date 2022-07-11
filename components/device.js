import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AdjustmentsIcon } from '@heroicons/react/outline'
import useSWR from 'swr'

import CustomSelect from './customSelect'
import Toggle from './forms/toggle'

export default function Device({ onClose, onSuccess, initialDevice }) {
  const [ device, setDevice ] = useState(initialDevice)
  const [ selectedType, setSelectedType ] = useState({ settings: "[]" })
  const [ selectedRoom, setSelectedRoom ] = useState({ })
  const cancelButtonRef = useRef(null)

  //const { mutate } = useSWRConfig()

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data: types, typesError } = useSWR('/api/types', fetcher)
  const { data: rooms, roomsError } = useSWR('/api/rooms', fetcher)


  useEffect(() => {
    if (types && device.type_id)
      updateSelectedType(device.type_id)
  }, [types, device])

  useEffect(() => {
    if (rooms && device.room_id)
      updateSelectedRoom(device.room_id)
  }, [rooms, device])

  const updateSelectedType = function (type_id) {
    const type = types.find((t) => { return t.id == type_id})
    if (type)
      setSelectedType(type)
  }

  const updateSelectedRoom = function (room_id) {
    const room = rooms.find((r) => { return r.id == room_id})
    if (room)
      setSelectedRoom(room)
  }


  const updateDevice = function (name, value) {
    if (name.substring(0,8) == 'settings') {
      setDevice(prevDevice => {
        let updatedValues= {}
        const nameWithoutPrefix = name.substring(9)
        updatedValues[nameWithoutPrefix] = value
        prevDevice.settings = {...prevDevice.settings, ...updatedValues}
        return prevDevice
      })
    } else {
      setDevice(prevDevice => {
        let updatedValues= {}
        updatedValues[name] = value
        return {...prevDevice, ...updatedValues}
      })
    }
  }

  const handleReactChange = updateDevice

  const handleHTMLChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    updateDevice(name, value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const JSONSettings = JSON.stringify(device.settings)
    const deviceClone = structuredClone(device)
    deviceClone.settings = JSONSettings
    const JSONData = JSON.stringify(deviceClone)

    let endpoint
    let options
    if (device.id) {
      endpoint = '/api/devices/' + device.id
      options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONData,
      }
    } else {
      endpoint = '/api/devices'
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONData,
      }
    }

    fetch(endpoint, options)
      .then((response) => {
        if (response.status >= 200 && response.status <= 300) {
          onSuccess()
        } else {
          onError(response.body())
        }
      })
      .catch((error) => {
        onError(error)
      })
  }

  const dynamicField = function(field) {
    switch(field.type) {
      case 'toggle':
      return (
        <div className="sm:col-span-4">
          <Toggle name={'settings.' + field.name} label={field.label} enabled={device.settings[field.name]} onChange={handleReactChange} />
        </div>
      )
      case 'text':
        return (
          <>
          <div className="sm:col-span-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name={'settings.' + field.name}
                id={'settings.' + field.name}
                value={device.settings[field.name]}
                required={field.required ? 'required' : ''}
                onChange={handleHTMLChange}
                className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                title={field.help}
              />
            </div>
          </div>
          </>
        )
    }
  }

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <form onSubmit={handleSubmit}>
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AdjustmentsIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      { device.id ? 'Edit Device' : 'Add Device' }
                    </Dialog.Title>

                      <div className="space-y-8 divide-y divide-gray-200">
                        <div>
                          <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Common</h3>
                            <p className="mt-1 text-sm text-gray-500">Settings common to all types</p>
                          </div>
                          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                  type="text"
                                  name="name"
                                  value={device.name}
                                  id="name"
                                  required
                                  onChange={handleHTMLChange}
                                  className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                  title="Enter a unique name for this device"
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-3">
                              <CustomSelect options={types} label="Type" name="type_id" onChange={handleReactChange} selected={selectedType} />
                            </div>
                            <div className="sm:col-span-3">
                              <CustomSelect options={rooms} label="Room" name="room_id" onChange={handleReactChange} selected={selectedRoom} />
                            </div>
                          </div>
                        </div>

                        <div className="pt-8">
                          <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedType.name} Settings</h3>
                            <p className="mt-1 text-sm text-gray-500">Specific settings for a {selectedType.name} device</p>
                          </div>
                          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            { device.settings && JSON.parse(selectedType.settings).map((field) =>
                              { return dynamicField(field)}
                            )}
                          </div>
                        </div>
                      </div>

                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    { device.id ? 'Save' : 'Add'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => onClose()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
