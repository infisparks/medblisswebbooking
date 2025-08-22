export interface BookingDetails {
  id: string
  patientName: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    pincode: string
  }
  selectedTests: number[]
  selectedPackages: number[]
  appointmentDate: string
  appointmentTime: string
  totalAmount: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed"
  createdAt: string
  updatedAt: string
  specialInstructions?: string
  homeCollection: boolean
}

export interface CartItem {
  id: number
  type: "test" | "package"
  name: string
  price: number
  originalPrice: number
}

export interface TimeSlot {
  time: string
  available: boolean
}

export const timeSlots: TimeSlot[] = [
  { time: "06:00 AM", available: true },
  { time: "06:30 AM", available: true },
  { time: "07:00 AM", available: true },
  { time: "07:30 AM", available: true },
  { time: "08:00 AM", available: true },
  { time: "08:30 AM", available: true },
  { time: "09:00 AM", available: true },
  { time: "09:30 AM", available: false },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "11:30 AM", available: true },
  { time: "12:00 PM", available: false },
  { time: "12:30 PM", available: true },
  { time: "01:00 PM", available: true },
  { time: "01:30 PM", available: true },
  { time: "02:00 PM", available: true },
  { time: "02:30 PM", available: true },
  { time: "03:00 PM", available: true },
  { time: "03:30 PM", available: true },
  { time: "04:00 PM", available: true },
  { time: "04:30 PM", available: false },
  { time: "05:00 PM", available: true },
  { time: "05:30 PM", available: true },
]

// Mock booking data for demonstration
export const mockBookings: BookingDetails[] = [
  {
    id: "BK001",
    patientName: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91-9876543210",
    address: {
      street: "123 MG Road",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
    },
    selectedTests: [1, 2, 4],
    selectedPackages: [],
    appointmentDate: "2025-08-25",
    appointmentTime: "08:00 AM",
    totalAmount: 1597,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: "2025-08-22T10:30:00Z",
    updatedAt: "2025-08-22T10:30:00Z",
    homeCollection: true,
  },
  {
    id: "BK002",
    patientName: "Priya Patel",
    email: "priya.patel@email.com",
    phone: "+91-9876543211",
    address: {
      street: "456 Park Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    selectedTests: [],
    selectedPackages: [102],
    appointmentDate: "2025-08-26",
    appointmentTime: "09:00 AM",
    totalAmount: 2499,
    status: "pending",
    paymentStatus: "pending",
    createdAt: "2025-08-22T14:15:00Z",
    updatedAt: "2025-08-22T14:15:00Z",
    homeCollection: false,
  },
]
