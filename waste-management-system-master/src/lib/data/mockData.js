// Mock Users for Auth
export const USERS = [
    {
      id: "bd8f33c5-9e45-4b9e-a91a-4ac5e2b53c5f",
      email: "business@example.com",
      password: "business123",
      role: "business",
    },
    {
      id: "7e9b1b9e-9b1b-4b9e-9b1b-9b1b9b1b9b1b",
      email: "provider@example.com",
      password: "provider123",
      role: "provider",
    },
    {
      id: "6e1c7d4e-8f2a-4b9c-9d1e-3f5a2b1c7d4e",
      email: "government@example.com",
      password: "government123",
      role: "government",
    },
  ];
  
  // Business Profiles
  export const BUSINESSES = [
    {
      id: "a7c53e1d-9b4f-4c8a-8d7e-2b3a1c5f9e8d",
      userId: "bd8f33c5-9e45-4b9e-a91a-4ac5e2b53c5f",
      name: "Green Solutions Inc.",
      businessType: "Manufacturing",
      contactPerson: "Jane Smith",
      phone: "555-123-4567",
      email: "business@example.com",
      address: "123 Green Street",
      city: "Eco City",
      state: "Green State",
      postalCode: "12345",
      latitude: 40.7128,
      longitude: -74.006,
      verified: true,
      wasteProfiles: [
        {
          id: "1e9c8b7a-6d5e-4f3c-2b1a-9d8e7f6c5b4a",
          wasteTypeId: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
          estimatedVolumeKg: 250.5,
          notes: "Weekly disposal needed"
        },
        {
          id: "2d1e0f9c-8b7a-6e5d-4f3c-2b1a0e9d8f7c",
          wasteTypeId: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7",
          estimatedVolumeKg: 120.0,
          notes: "Bi-weekly disposal"
        }
      ]
    },
    {
      id: "b8d9e2f1-7c6b-5a4d-3e2f-1a0b9c8d7e6f",
      userId: null,
      name: "Tech Innovators Ltd.",
      businessType: "Technology",
      contactPerson: "John Doe",
      phone: "555-987-6543",
      email: "tech@example.com",
      address: "456 Tech Avenue",
      city: "Tech City",
      state: "Innovation State",
      postalCode: "67890",
      latitude: 37.7749,
      longitude: -122.4194,
      verified: true,
      wasteProfiles: [
        {
          id: "3f2e1d0c-9b8a-7e6d-5f4c-3b2a1c0d9e8f",
          wasteTypeId: "c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8",
          estimatedVolumeKg: 75.2,
          notes: "Electronic waste disposal"
        }
      ]
    }
  ];
  
  // Waste Types
  export const WASTE_TYPES = [
    {
      id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
      name: "Plastic",
      description: "All types of plastic waste",
      hazardous: false
    },
    {
      id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7",
      name: "Paper",
      description: "Paper and cardboard waste",
      hazardous: false
    },
    {
      id: "c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8",
      name: "Electronic",
      description: "Electronic waste including computers and mobile devices",
      hazardous: true
    },
    {
      id: "d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9",
      name: "Medical",
      description: "Medical waste requiring special handling",
      hazardous: true
    },
    {
      id: "e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0",
      name: "Organic",
      description: "Food and other biodegradable waste",
      hazardous: false
    }
  ];
  
  // Waste Providers
  export const WASTE_PROVIDERS = [
    {
      id: "f7e6d5c4-b3a2-1d0e-9f8a-7b6c5d4e3f2",
      userId: "7e9b1b9e-9b1b-4b9e-9b1b-9b1b9b1b9b1b",
      companyName: "EcoWaste Solutions",
      licenseNumber: "WM-12345-ECO",
      contactPerson: "Robert Johnson",
      phone: "555-789-0123",
      email: "provider@example.com",
      address: "789 Recycling Road",
      city: "Green Valley",
      state: "Eco State",
      postalCode: "54321",
      latitude: 34.0522,
      longitude: -118.2437,
      serviceRadiusKm: 25,
      verified: true
    },
    {
      id: "a9b8c7d6-e5f4-3a2b-1c0d-9e8f7a6b5c4",
      userId: null,
      companyName: "CleanEarth Disposal",
      licenseNumber: "WM-67890-CED",
      contactPerson: "Lisa Williams",
      phone: "555-456-7890",
      email: "cleanearth@example.com",
      address: "101 Clean Street",
      city: "Greenfield",
      state: "Nature State",
      postalCode: "13579",
      latitude: 41.8781,
      longitude: -87.6298,
      serviceRadiusKm: 30,
      verified: true
    }
  ];
  
  // Pickup Requests
  export const PICKUP_REQUESTS = [
    {
      id: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
      businessId: "a7c53e1d-9b4f-4c8a-8d7e-2b3a1c5f9e8d",
      providerId: "f7e6d5c4-b3a2-1d0e-9f8a-7b6c5d4e3f2",
      wasteTypeId: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
      status: "scheduled", // pending, scheduled, in_progress, completed, cancelled
      scheduledDate: "2025-03-02T10:00:00Z",
      volumeKg: 200,
      notes: "Please pick up from the loading dock",
      createdAt: "2025-02-22T15:30:00Z",
      updatedAt: "2025-02-23T09:15:00Z",
      pickupAddress: "123 Green Street, Eco City, Green State",
      paymentStatus: "pending", // pending, paid, failed
      totalAmount: 125.00,
      trackingDetails: {
        assignedVehicle: "ECO-TRUCK-01",
        assignedDriver: "Michael Brown",
        estimatedArrival: "2025-03-02T10:30:00Z",
        actualPickupTime: null,
        disposalCompletionTime: null,
        currentStatus: "assigned"
      }
    },
    {
      id: "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
      businessId: "a7c53e1d-9b4f-4c8a-8d7e-2b3a1c5f9e8d",
      providerId: "f7e6d5c4-b3a2-1d0e-9f8a-7b6c5d4e3f2",
      wasteTypeId: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7",
      status: "completed",
      scheduledDate: "2025-02-15T13:00:00Z",
      volumeKg: 100,
      notes: "Recycling paper waste",
      createdAt: "2025-02-10T11:45:00Z",
      updatedAt: "2025-02-15T15:30:00Z",
      pickupAddress: "123 Green Street, Eco City, Green State",
      paymentStatus: "paid",
      totalAmount: 75.00,
      trackingDetails: {
        assignedVehicle: "ECO-TRUCK-03",
        assignedDriver: "Sarah Wilson",
        estimatedArrival: "2025-02-15T13:15:00Z",
        actualPickupTime: "2025-02-15T13:10:00Z",
        disposalCompletionTime: "2025-02-15T14:45:00Z",
        currentStatus: "completed"
      }
    },
    {
      id: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
      businessId: "b8d9e2f1-7c6b-5a4d-3e2f-1a0b9c8d7e6f",
      providerId: "a9b8c7d6-e5f4-3a2b-1c0d-9e8f7a6b5c4",
      wasteTypeId: "c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8",
      status: "in_progress",
      scheduledDate: "2025-02-26T09:30:00Z",
      volumeKg: 50,
      notes: "Electronic waste from recent upgrade",
      createdAt: "2025-02-20T14:20:00Z",
      updatedAt: "2025-02-26T10:00:00Z",
      pickupAddress: "456 Tech Avenue, Tech City, Innovation State",
      paymentStatus: "paid",
      totalAmount: 150.00,
      trackingDetails: {
        assignedVehicle: "CE-TRUCK-02",
        assignedDriver: "David Martinez",
        estimatedArrival: "2025-02-26T09:45:00Z",
        actualPickupTime: "2025-02-26T09:50:00Z",
        disposalCompletionTime: null,
        currentStatus: "in_transit"
      }
    }
  ];
  
  // Analytics Data for Government Dashboard
  export const ANALYTICS_DATA = {
    totalWasteCollected: 3450, // kg
    wasteByType: [
      { name: "Plastic", value: 1200 },
      { name: "Paper", value: 950 },
      { name: "Electronic", value: 450 },
      { name: "Medical", value: 200 },
      { name: "Organic", value: 650 }
    ],
    monthlyCollection: [
      { month: "Jan", amount: 250 },
      { month: "Feb", amount: 350 },
      { month: "Mar", amount: 300 },
      { month: "Apr", amount: 275 },
      { month: "May", amount: 400 },
      { month: "Jun", amount: 375 },
      { month: "Jul", amount: 425 },
      { month: "Aug", amount: 450 },
      { month: "Sep", amount: 350 },
      { month: "Oct", amount: 275 },
      { month: "Nov", amount: 0 },
      { month: "Dec", amount: 0 }
    ],
    servicePerformance: [
      { provider: "EcoWaste Solutions", onTimeRate: 92, completionRate: 98 },
      { provider: "CleanEarth Disposal", onTimeRate: 89, completionRate: 95 },
      { provider: "GreenPath Recycling", onTimeRate: 94, completionRate: 97 },
    ],
    complianceRate: 94.5, // percentage
  };
  
  // Vehicles for waste providers
  export const VEHICLES = [
    {
      id: "v1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6",
      providerId: "f7e6d5c4-b3a2-1d0e-9f8a-7b6c5d4e3f2",
      vehicleNumber: "ECO-TRUCK-01",
      vehicleType: "Heavy Duty Truck",
      capacity: "5 tons",
      licensePlate: "ECO-123",
      lastMaintenance: "2025-01-15",
      status: "active" // active, maintenance, inactive
    },
    {
      id: "v2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7",
      providerId: "f7e6d5c4-b3a2-1d0e-9f8a-7b6c5d4e3f2",
      vehicleNumber: "ECO-TRUCK-03",
      vehicleType: "Medium Duty Truck",
      capacity: "3 tons",
      licensePlate: "ECO-456",
      lastMaintenance: "2025-02-05",
      status: "active"
    },
    {
      id: "v3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8",
      providerId: "a9b8c7d6-e5f4-3a2b-1c0d-9e8f7a6b5c4",
      vehicleNumber: "CE-TRUCK-02",
      vehicleType: "Special Waste Truck",
      capacity: "2 tons",
      licensePlate: "CE-789",
      lastMaintenance: "2025-01-25",
      status: "active"
    }
  ];
  
  // Drivers for waste providers
  export const DRIVERS = [
    {
      id: "d1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6",
      providerId: "f7e6d5c4-b3a2-1d0e-9f8a-7b6c5d4e3f2",
      name: "Michael Brown",
      licenseNumber: "DL-12345",
      phone: "555-111-2222",
      email: "michael@ecowaste.example.com",
      status: "on_duty" // on_duty, off_duty, on_leave
    },
    {
      id: "d2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7",
      providerId: "f7e6d5c4-b3a2-1d0e-9f8a-7b6c5d4e3f2",
      name: "Sarah Wilson",
      licenseNumber: "DL-23456",
      phone: "555-333-4444",
      email: "sarah@ecowaste.example.com",
      status: "on_duty"
    },
    {
      id: "d3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8",
      providerId: "a9b8c7d6-e5f4-3a2b-1c0d-9e8f7a6b5c4",
      name: "David Martinez",
      licenseNumber: "DL-34567",
      phone: "555-555-6666",
      email: "david@cleanearth.example.com",
      status: "on_duty"
    }
  ];
  
  // Compliance Reports
  export const COMPLIANCE_REPORTS = [
    {
      id: "r1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6",
      providerId: "f7e6d5c4-b3a2-1d0e-9f8a-7b6c5d4e3f2",
      title: "January 2025 Waste Disposal Report",
      reportPeriod: "January 2025",
      submittedDate: "2025-02-05T10:15:00Z",
      status: "approved", // submitted, under_review, approved, rejected
      reviewNotes: "All disposal procedures followed correctly",
      wasteVolume: 650,
      disposalMethods: {
        recycled: 450,
        landfill: 50,
        incinerated: 150
      },
      approvedBy: "Environmental Protection Agency",
      approvalDate: "2025-02-10T14:30:00Z"
    },
    {
      id: "r2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7",
      providerId: "a9b8c7d6-e5f4-3a2b-1c0d-9e8f7a6b5c4",
      title: "January 2025 Hazardous Waste Report",
      reportPeriod: "January 2025",
      submittedDate: "2025-02-06T09:30:00Z",
      status: "approved",
      reviewNotes: "Proper handling of hazardous materials confirmed",
      wasteVolume: 180,
      disposalMethods: {
        recycled: 30,
        specialized_treatment: 150
      },
      approvedBy: "Environmental Protection Agency",
      approvalDate: "2025-02-12T11:45:00Z"
    },
    {
      id: "r3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8",
      providerId: "f7e6d5c4-b3a2-1d0e-9f8a-7b6c5d4e3f2",
      title: "February 2025 Waste Disposal Report",
      reportPeriod: "February 2025",
      submittedDate: "2025-03-04T16:20:00Z",
      status: "under_review",
      reviewNotes: "Pending verification of recycling percentages",
      wasteVolume: 720,
      disposalMethods: {
        recycled: 520,
        landfill: 70,
        incinerated: 130
      },
      approvedBy: null,
      approvalDate: null
    }
  ];