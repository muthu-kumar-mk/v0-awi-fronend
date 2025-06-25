"use client"

import { Card } from "@/components/ui/card"
import { transportationData } from "../mocks/transportation-data"

export function TransportationDetails() {
  const data = transportationData

  return (
    <Card>
      <div className="p-6 space-y-8">
        {/* Handling Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Handling Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-500">Transportation Arrangement</label>
              <div className="font-medium">{data.handlingDetails.transportationArrangement}</div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Transportation Method</label>
              <div className="font-medium">{data.handlingDetails.transportationMethod}</div>
            </div>
          </div>
        </div>

        {/* Carrier Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Carrier Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm text-gray-500">Shipping Method</label>
              <div className="font-medium">{data.carrierDetails.shippingMethod}</div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Carrier</label>
              <div className="font-medium">{data.carrierDetails.carrier}</div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Service Type</label>
              <div className="font-medium">{data.carrierDetails.serviceType}</div>
            </div>
          </div>
        </div>

        {/* Pick Up Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Pick Up Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm text-gray-500">Tracking Number</label>
              <div className="font-medium">{data.pickUpDetails.trackingNumber}</div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Load Number</label>
              <div className="font-medium">{data.pickUpDetails.loadNumber}</div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Door Number</label>
              <div className="font-medium">{data.pickUpDetails.doorNumber}</div>
            </div>
          </div>
        </div>

        {/* Pick Up Appointment */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Pick Up Appointment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-500">Est. Pickup Date to Warehouse</label>
              <div className="font-medium">{data.pickUpAppointment.estPickupDate}</div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Est. Pickup Time From & To Warehouse</label>
              <div className="font-medium">{data.pickUpAppointment.estPickupTime}</div>
            </div>
          </div>
        </div>

        {/* Transportation Schedule */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Transportation Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm text-gray-500">Need by Ship Date</label>
              <div className="font-medium">{data.transportationSchedule.needByShipDate}</div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Warehouse Instructions</label>
              <div className="font-medium">{data.transportationSchedule.warehouseInstructions}</div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Carrier Instructions</label>
              <div className="font-medium">{data.transportationSchedule.carrierInstructions}</div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Instructions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-500">Warehouse Instructions</label>
              <div className="font-medium">{data.instructions.warehouseInstructions}</div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Carrier Instructions</label>
              <div className="font-medium">{data.instructions.carrierInstructions}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
