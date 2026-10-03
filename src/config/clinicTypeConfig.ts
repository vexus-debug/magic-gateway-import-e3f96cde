import {
  LayoutDashboard, Users, CalendarDays, Stethoscope, CreditCard, FlaskConical,
  UserCog, Package, BarChart3, Bell, Settings, GraduationCap, Microscope,
  ClipboardList, DollarSign, Wrench, MessageSquare, Star, Receipt, Shield,
  FileCheck, FolderOpen, Eye, Heart, Baby, Bone, Ear, Wallet, FileText,
  PiggyBank, TrendingUp, Calculator, Clock, CalendarClock, Truck,
   ShoppingCart, Link2, LineChart, Globe,
  ScanLine, Pill, FileSearch, Glasses, Contact, Activity, Scissors,
} from "lucide-react";

export interface NavItem {
  title: string;
  path: string; // relative path after /clinic/:slug/
  icon: any;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface ClinicTypeConfig {
  label: string;
  navGroups: NavGroup[];
}

export interface ClinicTypeOption {
  value: string;
  label: string;
  description: string;
  icon: any;
  comingSoon: boolean;
}

// All supported clinic types for selection UI
export const clinicTypeOptions: ClinicTypeOption[] = [
  { value: "dental", label: "Dental Clinic", description: "General & specialized dentistry", icon: Stethoscope, comingSoon: false },
  { value: "eye", label: "Eye Clinic", description: "Ophthalmology & optometry", icon: Eye, comingSoon: false },
  { value: "dermatology", label: "Dermatology Clinic", description: "Skin care & cosmetic dermatology", icon: Heart, comingSoon: true },
  { value: "orthopedic", label: "Orthopedic Clinic", description: "Bone, joint & musculoskeletal care", icon: Bone, comingSoon: true },
  { value: "pediatric", label: "Pediatric Clinic", description: "Children's healthcare", icon: Baby, comingSoon: true },
  { value: "cardiology", label: "Cardiology Clinic", description: "Heart & cardiovascular care", icon: Heart, comingSoon: true },
  { value: "ent", label: "ENT Clinic", description: "Ear, nose & throat specialist", icon: Ear, comingSoon: true },
  { value: "general", label: "General Practice", description: "Primary care & family medicine", icon: Stethoscope, comingSoon: true },
  { value: "diagnostic", label: "Diagnostic Centre", description: "Laboratory, imaging & pharmacy services", icon: Microscope, comingSoon: false },
];

const dentalNav: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", path: "dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Patient Care",
    items: [
      { title: "Patients", path: "patients", icon: Users },
      { title: "Appointments", path: "appointments", icon: CalendarDays },
      { title: "Waiting List", path: "waiting-list", icon: Clock },
      { title: "Schedules", path: "schedules", icon: CalendarClock },
      { title: "Reviews", path: "reviews", icon: Star },
    ],
  },
  {
    label: "Clinical",
    items: [
      { title: "Dental Charts", path: "dental-charts", icon: Stethoscope },
      { title: "Treatments", path: "treatments", icon: Stethoscope },
      { title: "Prescriptions", path: "prescriptions", icon: Stethoscope },
      { title: "Consent Forms", path: "consent-forms", icon: FileCheck },
    ],
  },
  {
    label: "In-House Lab",
    items: [
      { title: "Lab Dashboard", path: "lab", icon: Microscope },
      { title: "Lab Cases", path: "lab/cases", icon: ClipboardList },
      { title: "Lab Work Orders", path: "lab-work", icon: FlaskConical },
      { title: "Technicians", path: "lab/technicians", icon: Users },
      { title: "Lab Billing", path: "lab/billing", icon: DollarSign },
      { title: "Lab Settings", path: "lab/settings", icon: Wrench },
    ],
  },

  {
    label: "Finance",
    items: [
      { title: "Billing", path: "billing", icon: CreditCard },
      { title: "Estimates", path: "estimates", icon: FileText },
      { title: "Payment Plans", path: "payment-plans", icon: Wallet },
      { title: "Expenses", path: "expenses", icon: Receipt },
      { title: "Commissions", path: "commissions", icon: Calculator },
      { title: "Revenue Allocation", path: "revenue-allocation", icon: DollarSign },
      { title: "Profitability", path: "profitability", icon: TrendingUp },
    ],
  },
  {
    label: "Reports",
    items: [
      { title: "Reports", path: "reports", icon: BarChart3 },
      { title: "Advanced Analytics", path: "analytics", icon: LineChart },
    ],
  },
  {
    label: "Inventory & Supply",
    items: [
      { title: "Inventory", path: "inventory", icon: Package },
      { title: "Inventory Costs", path: "inventory-costs", icon: PiggyBank },
      { title: "Treatment Materials", path: "treatment-materials", icon: Link2 },
      { title: "Suppliers", path: "suppliers", icon: Truck },
      { title: "Purchase Orders", path: "purchase-orders", icon: ShoppingCart },
    ],
  },
  {
    label: "Administration",
    items: [
      { title: "Staff", path: "staff", icon: UserCog },
      { title: "Documents", path: "documents", icon: FolderOpen },
      { title: "Audit Log", path: "audit-log", icon: Shield },
      { title: "Website Settings", path: "website-settings", icon: Globe },
      { title: "Shop Management", path: "shop-management", icon: ShoppingCart },
    ],
  },
];

const extraItems: NavItem[] = [
  { title: "Messages", path: "messages", icon: MessageSquare },
  { title: "Notifications", path: "notifications", icon: Bell },
  { title: "Tutorials", path: "tutorials", icon: GraduationCap },
  { title: "Settings", path: "settings", icon: Settings },
];

const diagnosticNav: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", path: "dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Laboratory",
    items: [
      { title: "Lab Overview", path: "diagnostics", icon: Microscope },
      { title: "Test Forms", path: "diagnostics/forms", icon: ClipboardList },
      { title: "Result Search", path: "diagnostics/results", icon: FileSearch },
      { title: "Manage Tests", path: "diagnostics/tests", icon: FlaskConical },
      { title: "Scientists", path: "diagnostics/scientists", icon: Users },
      { title: "Lab Settings", path: "diagnostics/settings", icon: Wrench },
    ],
  },
  {
    label: "Imaging",
    items: [
      { title: "Imaging Overview", path: "imaging", icon: ScanLine },
      { title: "Scan Patients", path: "imaging/patients", icon: Users },
      { title: "Scans", path: "imaging/scans", icon: ScanLine },
      { title: "Scan Appointments", path: "imaging/appointments", icon: CalendarDays },
      { title: "Scan Activity", path: "imaging/activity", icon: Shield },
    ],
  },
  {
    label: "Pharmacy",
    items: [
      { title: "Drug Stock", path: "pharmacy/drugs", icon: Pill },
      { title: "Dispensing", path: "pharmacy/dispensing", icon: Package },
    ],
  },
  {
    label: "Patient Care",
    items: [
      { title: "Patients", path: "patients", icon: Users },
      { title: "Appointments", path: "appointments", icon: CalendarDays },
      { title: "Waiting List", path: "waiting-list", icon: Clock },
      { title: "Reviews", path: "reviews", icon: Star },
    ],
  },
  {
    label: "Finance",
    items: [
      { title: "Billing", path: "billing", icon: CreditCard },
      { title: "Expenses", path: "expenses", icon: Receipt },
      { title: "Revenue Allocation", path: "revenue-allocation", icon: DollarSign },
      { title: "Profitability", path: "profitability", icon: TrendingUp },
    ],
  },
  {
    label: "Reports",
    items: [
      { title: "Reports", path: "reports", icon: BarChart3 },
      { title: "Advanced Analytics", path: "analytics", icon: LineChart },
    ],
  },
  {
    label: "Inventory & Supply",
    items: [
      { title: "Inventory", path: "inventory", icon: Package },
      { title: "Suppliers", path: "suppliers", icon: Truck },
      { title: "Purchase Orders", path: "purchase-orders", icon: ShoppingCart },
    ],
  },
  {
    label: "Administration",
    items: [
      { title: "Staff", path: "staff", icon: UserCog },
      { title: "Documents", path: "documents", icon: FolderOpen },
      { title: "Audit Log", path: "audit-log", icon: Shield },
      { title: "Website Settings", path: "website-settings", icon: Globe },
    ],
  },
];

const eyeNav: NavGroup[] = [
  {
    label: "Today",
    items: [
      { title: "Today", path: "dashboard", icon: LayoutDashboard },
      { title: "Patient Progress", path: "eye/flow", icon: Activity },
      { title: "Doctor Visit", path: "eye/visit", icon: Stethoscope },
      { title: "Eye Clinic Overview", path: "eye", icon: Eye },
    ],
  },
  {
    label: "Patient Care",
    items: [
      { title: "Patients", path: "patients", icon: Users },
      { title: "Appointments", path: "appointments", icon: CalendarDays },
      { title: "Waiting List", path: "waiting-list", icon: Clock },
      { title: "Schedules", path: "schedules", icon: CalendarClock },
      { title: "Consent Forms", path: "consent-forms", icon: FileCheck },
      { title: "Reviews", path: "reviews", icon: Star },
    ],
  },
  {
    label: "Eye Clinic",
    items: [
      { title: "Eye Records", path: "eye/records", icon: FileSearch },
      { title: "Prescriptions", path: "eye/prescriptions", icon: Glasses },
      { title: "Surgery Bookings", path: "eye/surgery", icon: Scissors },
      { title: "Surgery Checklists", path: "eye/surgery-checklists", icon: ClipboardList },
      { title: "Referrals", path: "eye/referrals", icon: Link2 },
    ],
  },
  {
    label: "Optical",
    items: [
      { title: "Glasses Orders", path: "eye/orders", icon: ShoppingCart },
      { title: "Glasses Pickup", path: "eye/pickup", icon: Bell },
      { title: "Frames & Lenses", path: "eye/stock", icon: Package },
    ],
  },
  {
    label: "Finance",
    items: [
      { title: "Billing", path: "billing", icon: CreditCard },
      { title: "Estimates", path: "estimates", icon: FileText },
      { title: "Payment Plans", path: "payment-plans", icon: Wallet },
      { title: "Expenses", path: "expenses", icon: Receipt },
      { title: "Revenue Allocation", path: "revenue-allocation", icon: DollarSign },
      { title: "Profitability", path: "profitability", icon: TrendingUp },
    ],
  },
  {
    label: "Reports",
    items: [
      { title: "Reports", path: "reports", icon: BarChart3 },
      { title: "Advanced Analytics", path: "analytics", icon: LineChart },
    ],
  },
  {
    label: "Inventory & Supply",
    items: [
      { title: "Inventory", path: "inventory", icon: Package },
      { title: "Suppliers", path: "suppliers", icon: Truck },
      { title: "Purchase Orders", path: "purchase-orders", icon: ShoppingCart },
    ],
  },
  {
    label: "Administration",
    items: [
      { title: "Staff", path: "staff", icon: UserCog },
      { title: "Documents", path: "documents", icon: FolderOpen },
      { title: "Audit Log", path: "audit-log", icon: Shield },
      { title: "Website Settings", path: "website-settings", icon: Globe },
      { title: "Shop Management", path: "shop-management", icon: ShoppingCart },
    ],
  },
];

export const clinicTypeConfig: Record<string, ClinicTypeConfig> = {
  dental: {
    label: "Dental Clinic",
    navGroups: dentalNav,
  },
  eye: {
    label: "Eye Clinic",
    navGroups: eyeNav,
  },
  diagnostic: {
    label: "Diagnostic Centre",
    navGroups: diagnosticNav,
  },
  // Future clinic types will be added here with their own navGroups
};

export const sharedNavItems = extraItems;

// Get config for a clinic type, falling back to dental
export function getClinicConfig(clinicType: string): ClinicTypeConfig {
  return clinicTypeConfig[clinicType] || clinicTypeConfig.dental;
}

// Check if a clinic type is available (not coming soon)
export function isClinicTypeAvailable(clinicType: string): boolean {
  const option = clinicTypeOptions.find((o) => o.value === clinicType);
  return option ? !option.comingSoon : false;
}
