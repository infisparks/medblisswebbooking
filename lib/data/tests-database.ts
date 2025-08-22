export interface BloodTest {
  id: number
  name: string
  description: string
  price: number
  originalPrice: number
  duration: string
  category: string
  parameters: number
  image: string
  fasting: boolean
  reportTime: string
  sampleType: string
  preparation: string[]
  includes: string[]
  whyTakeTest: string
  normalRange?: string
  featured?: boolean
}

export interface HealthPackage {
  id: number
  name: string
  description: string
  price: number
  originalPrice: number
  duration: string
  category: string
  parameters: number
  image: string
  includes: string[]
  suitableFor: string[]
  whyChoose: string
  featured?: boolean
  testsIncluded: number[]
}

export const bloodTests: BloodTest[] = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    description: "Comprehensive blood analysis including RBC, WBC, platelets, and hemoglobin levels",
    price: 299,
    originalPrice: 399,
    duration: "4-6 hours",
    category: "Basic Tests",
    parameters: 25,
    image: "/placeholder.svg?height=300&width=400",
    fasting: false,
    reportTime: "Same day",
    sampleType: "Blood",
    preparation: ["No special preparation required", "Wear comfortable clothing"],
    includes: [
      "Red Blood Cell Count",
      "White Blood Cell Count",
      "Platelet Count",
      "Hemoglobin",
      "Hematocrit",
      "Mean Corpuscular Volume",
    ],
    whyTakeTest: "Essential for detecting anemia, infections, blood disorders, and overall health assessment",
    normalRange: "Varies by parameter",
    featured: true,
  },
  {
    id: 2,
    name: "Lipid Profile",
    description: "Cholesterol and triglyceride levels assessment for heart health",
    price: 599,
    originalPrice: 799,
    duration: "12 hours fasting",
    category: "Heart Health",
    parameters: 8,
    image: "/placeholder.svg?height=300&width=400",
    fasting: true,
    reportTime: "Same day",
    sampleType: "Blood",
    preparation: [
      "Fast for 12 hours before test",
      "Only water allowed during fasting",
      "Take medications as prescribed",
    ],
    includes: [
      "Total Cholesterol",
      "LDL Cholesterol",
      "HDL Cholesterol",
      "Triglycerides",
      "VLDL Cholesterol",
      "Non-HDL Cholesterol",
      "TC/HDL Ratio",
      "LDL/HDL Ratio",
    ],
    whyTakeTest: "Assess cardiovascular risk and monitor heart health",
    normalRange: "Total Cholesterol: <200 mg/dL",
    featured: true,
  },
  {
    id: 3,
    name: "Liver Function Test (LFT)",
    description: "Comprehensive liver health assessment including enzymes and proteins",
    price: 449,
    originalPrice: 599,
    duration: "4-6 hours",
    category: "Organ Health",
    parameters: 12,
    image: "/placeholder.svg?height=300&width=400",
    fasting: false,
    reportTime: "Same day",
    sampleType: "Blood",
    preparation: ["No alcohol 24 hours before test", "Inform about medications"],
    includes: [
      "SGPT/ALT",
      "SGOT/AST",
      "Alkaline Phosphatase",
      "Total Bilirubin",
      "Direct Bilirubin",
      "Indirect Bilirubin",
      "Total Protein",
      "Albumin",
      "Globulin",
      "A/G Ratio",
    ],
    whyTakeTest: "Detect liver diseases, monitor liver health, and assess liver function",
    normalRange: "ALT: 7-56 U/L, AST: 10-40 U/L",
  },
  {
    id: 4,
    name: "Thyroid Profile (T3, T4, TSH)",
    description: "Complete thyroid function evaluation for metabolism assessment",
    price: 699,
    originalPrice: 899,
    duration: "No fasting",
    category: "Hormones",
    parameters: 3,
    image: "/placeholder.svg?height=300&width=400",
    fasting: false,
    reportTime: "Next day",
    sampleType: "Blood",
    preparation: ["No special preparation", "Take morning medications after test"],
    includes: ["T3 (Triiodothyronine)", "T4 (Thyroxine)", "TSH (Thyroid Stimulating Hormone)"],
    whyTakeTest: "Diagnose thyroid disorders, monitor thyroid treatment, assess metabolism",
    normalRange: "TSH: 0.4-4.0 mIU/L",
    featured: true,
  },
  {
    id: 5,
    name: "Diabetes Panel (HbA1c + Glucose)",
    description: "Comprehensive diabetes screening and monitoring package",
    price: 399,
    originalPrice: 549,
    duration: "8 hours fasting",
    category: "Diabetes",
    parameters: 4,
    image: "/placeholder.svg?height=300&width=400",
    fasting: true,
    reportTime: "Same day",
    sampleType: "Blood",
    preparation: ["Fast for 8 hours", "Only water allowed", "Continue diabetes medications as prescribed"],
    includes: ["Fasting Blood Glucose", "HbA1c (Glycated Hemoglobin)", "Random Blood Sugar", "Average Blood Glucose"],
    whyTakeTest: "Screen for diabetes, monitor blood sugar control, assess long-term glucose management",
    normalRange: "Fasting Glucose: 70-100 mg/dL, HbA1c: <5.7%",
    featured: true,
  },
  {
    id: 6,
    name: "Kidney Function Test (KFT)",
    description: "Complete kidney health assessment including creatinine and urea",
    price: 349,
    originalPrice: 449,
    duration: "4-6 hours",
    category: "Organ Health",
    parameters: 8,
    image: "/placeholder.svg?height=300&width=400",
    fasting: false,
    reportTime: "Same day",
    sampleType: "Blood",
    preparation: ["Stay well hydrated", "Inform about medications affecting kidneys"],
    includes: [
      "Serum Creatinine",
      "Blood Urea Nitrogen (BUN)",
      "Uric Acid",
      "Sodium",
      "Potassium",
      "Chloride",
      "eGFR",
      "BUN/Creatinine Ratio",
    ],
    whyTakeTest: "Assess kidney function, detect kidney disease, monitor kidney health",
  },
  {
    id: 7,
    name: "Vitamin D Test",
    description: "Measure vitamin D levels for bone health and immunity",
    price: 899,
    originalPrice: 1199,
    duration: "No fasting",
    category: "Vitamins",
    parameters: 1,
    image: "/placeholder.svg?height=300&width=400",
    fasting: false,
    reportTime: "Next day",
    sampleType: "Blood",
    preparation: ["No special preparation required"],
    includes: ["25-Hydroxy Vitamin D"],
    whyTakeTest: "Assess vitamin D deficiency, bone health, immune function",
  },
  {
    id: 8,
    name: "Iron Studies",
    description: "Complete iron profile including ferritin and TIBC",
    price: 799,
    originalPrice: 999,
    duration: "12 hours fasting",
    category: "Anemia Profile",
    parameters: 5,
    image: "/placeholder.svg?height=300&width=400",
    fasting: true,
    reportTime: "Same day",
    sampleType: "Blood",
    preparation: ["Fast for 12 hours", "Avoid iron supplements 24 hours before test"],
    includes: [
      "Serum Iron",
      "Total Iron Binding Capacity (TIBC)",
      "Transferrin Saturation",
      "Ferritin",
      "Unsaturated Iron Binding Capacity",
    ],
    whyTakeTest: "Diagnose iron deficiency anemia, assess iron metabolism",
  },
]

export const healthPackages: HealthPackage[] = [
  {
    id: 101,
    name: "Executive Health Checkup",
    description: "Comprehensive health screening for working professionals",
    price: 2999,
    originalPrice: 4999,
    duration: "Half day",
    category: "Premium Packages",
    parameters: 85,
    image: "/placeholder.svg?height=300&width=400",
    includes: [
      "Complete Blood Count",
      "Lipid Profile",
      "Liver Function Test",
      "Kidney Function Test",
      "Thyroid Profile",
      "Diabetes Panel",
      "Vitamin D",
      "ECG",
      "Chest X-Ray",
      "Doctor Consultation",
    ],
    suitableFor: ["Working professionals", "Age 25-60", "Preventive health screening"],
    whyChoose: "Comprehensive screening designed for busy professionals with time constraints",
    featured: true,
    testsIncluded: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 102,
    name: "Women's Wellness Package",
    description: "Specialized health screening designed for women's health needs",
    price: 2499,
    originalPrice: 3499,
    duration: "Half day",
    category: "Women's Health",
    parameters: 65,
    image: "/placeholder.svg?height=300&width=400",
    includes: [
      "Complete Blood Count",
      "Thyroid Profile",
      "Iron Studies",
      "Vitamin D",
      "Calcium",
      "Pap Smear",
      "Mammography",
      "Bone Density",
      "Gynecologist Consultation",
    ],
    suitableFor: ["Women age 21-65", "Reproductive health", "Preventive screening"],
    whyChoose: "Tailored for women's unique health needs including reproductive and bone health",
    featured: true,
    testsIncluded: [1, 4, 7, 8],
  },
  {
    id: 103,
    name: "Senior Citizen Package",
    description: "Comprehensive health screening for adults above 60 years",
    price: 1999,
    originalPrice: 2999,
    duration: "Full day",
    category: "Senior Care",
    parameters: 75,
    image: "/placeholder.svg?height=300&width=400",
    includes: [
      "Complete Blood Count",
      "Lipid Profile",
      "Diabetes Panel",
      "Kidney Function Test",
      "Liver Function Test",
      "Thyroid Profile",
      "ECG",
      "Echo Cardiogram",
      "Bone Density",
      "Geriatrician Consultation",
    ],
    suitableFor: ["Adults above 60", "Chronic disease monitoring", "Age-related health issues"],
    whyChoose: "Comprehensive screening focusing on age-related health concerns and chronic diseases",
    testsIncluded: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 104,
    name: "Basic Health Checkup",
    description: "Essential health screening for young adults",
    price: 999,
    originalPrice: 1499,
    duration: "2 hours",
    category: "Basic Packages",
    parameters: 35,
    image: "/placeholder.svg?height=300&width=400",
    includes: ["Complete Blood Count", "Lipid Profile", "Diabetes Panel", "Liver Function Test", "Doctor Consultation"],
    suitableFor: ["Age 18-35", "First-time health screening", "Budget-conscious individuals"],
    whyChoose: "Affordable comprehensive screening covering essential health parameters",
    testsIncluded: [1, 2, 5, 3],
  },
  {
    id: 105,
    name: "Heart Health Package",
    description: "Specialized cardiovascular health assessment",
    price: 1799,
    originalPrice: 2499,
    duration: "3 hours",
    category: "Specialized Packages",
    parameters: 45,
    image: "/placeholder.svg?height=300&width=400",
    includes: ["Lipid Profile", "ECG", "Echo Cardiogram", "Stress Test", "Chest X-Ray", "Cardiologist Consultation"],
    suitableFor: ["Family history of heart disease", "High cholesterol", "Hypertension"],
    whyChoose: "Comprehensive cardiovascular assessment with specialist consultation",
    testsIncluded: [2],
  },
]

export const testCategories = [
  "All Tests",
  "Basic Tests",
  "Heart Health",
  "Organ Health",
  "Hormones",
  "Diabetes",
  "Vitamins",
  "Anemia Profile",
]

export const packageCategories = [
  "All Packages",
  "Premium Packages",
  "Women's Health",
  "Senior Care",
  "Basic Packages",
  "Specialized Packages",
]

// Helper functions
export const getFeaturedTests = () => bloodTests.filter((test) => test.featured)
export const getFeaturedPackages = () => healthPackages.filter((pkg) => pkg.featured)
export const getTestById = (id: number) => bloodTests.find((test) => test.id === id)
export const getPackageById = (id: number) => healthPackages.find((pkg) => pkg.id === id)
export const getTestsByCategory = (category: string) =>
  category === "All Tests" ? bloodTests : bloodTests.filter((test) => test.category === category)
export const getPackagesByCategory = (category: string) =>
  category === "All Packages" ? healthPackages : healthPackages.filter((pkg) => pkg.category === category)
