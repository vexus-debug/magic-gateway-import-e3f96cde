import { useMemo } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  Check,
  CircleDollarSign,
  Clock3,
  CreditCard,
  ListChecks,
  Sparkles,
  Stethoscope,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageTourButton } from "@/components/dashboard/tour/PageTourButton";
import { EyeTodayScreen } from "@/components/dashboard/eye/EyeTodayScreen";
import {
  useCurrentUserName,
  useDashboardStats,
  useDentalDashboardPulse,
  useRevenueData,
  useTodaySchedule,
  useWeeklyAppointments,
} from "@/hooks/useDashboardData";
import { useOrg } from "@/hooks/useOrg";
import { cn } from "@/lib/utils";

type DashboardMode = "owner" | "dentist" | "receptionist";
type ScheduleItem = {
  id: string;
  staffId: string;
  time: string;
  patientName: string;
  dentist: string;
  chair: string;
  treatment: string;
  status: string;
};

const iconStroke = 1.8;
const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: "12px",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function roleMode(role: string): DashboardMode {
  if (["owner", "admin", "manager"].includes(role)) return "owner";
  if (role === "dentist") return "dentist";
  return "receptionist";
}

function ProgressRing({ completed, total }: { completed: number; total: number }) {
  const percentage = total ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="relative h-28 w-28 shrink-0" aria-label={`${percentage}% of today's appointments completed`}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="74%"
          outerRadius="100%"
          startAngle={90}
          endAngle={-270}
          data={[{ value: percentage }]}
        >
          <RadialBar background={{ fill: "hsl(var(--muted))" }} dataKey="value" fill="hsl(var(--primary))" cornerRadius={12} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold tabular-nums text-foreground">{percentage}%</span>
        <span className="text-[10px] font-semibold uppercase text-muted-foreground">complete</span>
      </div>
    </div>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const points = data.map((value, index) => ({ index, value }));
  return (
    <div className="h-10 w-24" aria-hidden="true">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points}>
          <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function KpiTile({ label, value, detail, icon: Icon, series }: {
  label: string;
  value: string;
  detail: string;
  icon: typeof Users;
  series: number[];
}) {
  return (
    <div className="w-[248px] shrink-0 border-r border-border/70 px-5 py-3 first:pl-0 last:border-r-0 sm:w-auto sm:min-w-[215px] sm:flex-1">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon className="h-4 w-4" strokeWidth={iconStroke} />
            <p className="truncate text-[11px] font-semibold uppercase">{label}</p>
          </div>
          <p className="mt-3 truncate text-2xl font-bold tabular-nums text-foreground">{value}</p>
          <p className="mt-1 truncate text-xs text-muted-foreground">{detail}</p>
        </div>
        <Sparkline data={series} />
      </div>
    </div>
  );
}

function ToothMotif() {
  return (
    <div className="grid grid-cols-4 gap-1" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
        <span key={item} className="h-4 w-3 rounded-t-full border border-primary/25 bg-primary/5" />
      ))}
    </div>
  );
}

function OnboardingChecklist({ basePath, activeDentists, treatmentCount, patientCount }: {
  basePath: string;
  activeDentists: number;
  treatmentCount: number;
  patientCount: number;
}) {
  const steps = [
    { label: "Add a dentist", done: activeDentists > 0, to: `${basePath}/staff` },
    { label: "Add your services", done: treatmentCount > 0, to: `${basePath}/treatments` },
    { label: "Register your first patient", done: patientCount > 0, to: `${basePath}/patients` },
  ];
  const done = steps.filter((step) => step.done).length;

  return (
    <div className="overflow-hidden rounded-lg bg-gradient-to-r from-primary/45 via-border to-primary/20 p-px">
      <div className="grid gap-6 rounded-[7px] bg-card p-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <ToothMotif />
            <div>
              <p className="text-xs font-semibold uppercase text-primary">Clinic setup</p>
              <h2 className="text-lg font-bold text-foreground">Open your digital front door</h2>
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {steps.map((step) => (
              <Link key={step.label} to={step.to} className="flex items-center gap-2 rounded-md border border-border/70 p-3 text-sm transition-colors hover:bg-muted/60">
                <span className={cn("flex h-5 w-5 items-center justify-center rounded-full border", step.done ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground")}>
                  {step.done && <Check className="h-3 w-3" strokeWidth={2} />}
                </span>
                <span className={step.done ? "text-muted-foreground line-through" : "font-medium text-foreground"}>{step.label}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="text-left md:text-right">
          <p className="text-3xl font-bold tabular-nums text-foreground">{done}/3</p>
          <p className="text-xs text-muted-foreground">setup steps complete</p>
        </div>
      </div>
    </div>
  );
}

function StandardDashboardHome() {
  const { data: stats } = useDashboardStats();
  const { data: weeklyData = [] } = useWeeklyAppointments();
  const { data: revenueData = [] } = useRevenueData();
  const { data: allSchedule = [] } = useTodaySchedule();
  const { data: pulse } = useDentalDashboardPulse();
  const { data: userName } = useCurrentUserName();
  const { currentOrg, basePath } = useOrg();
  const mode = roleMode(currentOrg?.role || "receptionist");

  const schedule = useMemo(() => {
    const items = allSchedule as ScheduleItem[];
    if (mode !== "dentist") return items;
    if (!pulse?.assignedStaffId) return [];
    return items.filter((item) => item.staffId === pulse.assignedStaffId);
  }, [allSchedule, mode, pulse?.assignedStaffId]);

  const completed = schedule.filter((item) => item.status === "completed").length;
  const activeQueue = (pulse?.queue || []).filter((item) => !["completed", "cancelled"].includes(item.status));
  const now = format(new Date(), "HH:mm");
  const nextAppointment = schedule.find((item) => item.status === "scheduled" && item.time >= now) || schedule.find((item) => item.status === "scheduled");
  const weeklySeries = weeklyData.map((day) => day.count);
  const revenueSeries = revenueData.map((month) => month.revenue);
  const paymentSeries = (pulse?.paymentSeries || []).map((day) => day.value);
  const totalWeekly = weeklySeries.reduce((sum, value) => sum + value, 0);
  const emptyDay = weeklyData.filter((day) => day.count === Math.min(...weeklySeries)).at(0)?.day;
  const s = stats || { totalPatients: 0, todayAppointments: 0, pendingPayments: 0, monthlyRevenue: 0 };

  const hero = mode === "owner"
    ? { eyebrow: "Clinic pulse", title: `${schedule.length} appointments shape today`, action: "Review clinic", to: `${basePath}/appointments`, icon: Activity }
    : mode === "dentist"
      ? { eyebrow: "Your clinical day", title: nextAppointment ? `${nextAppointment.patientName} is next` : "Your chair is clear", action: "Open schedule", to: `${basePath}/appointments`, icon: Stethoscope }
      : { eyebrow: "Front desk now", title: activeQueue.length ? `${activeQueue.length} patients need attention` : "The queue is clear", action: activeQueue.length ? "Manage queue" : "Book appointment", to: activeQueue.length ? `${basePath}/waiting-list` : `${basePath}/appointments`, icon: ListChecks };

  const kpis = mode === "owner"
    ? [
        { label: "Monthly revenue", value: formatCurrency(s.monthlyRevenue), detail: "Collected this month", icon: TrendingUp, series: revenueSeries },
        { label: "Patients", value: s.totalPatients.toLocaleString(), detail: "Clinic-wide total", icon: Users, series: weeklySeries },
        { label: "Today", value: s.todayAppointments.toString(), detail: `${completed} completed`, icon: CalendarDays, series: weeklySeries },
        { label: "Outstanding", value: formatCurrency(pulse?.pendingInvoiceValue || 0), detail: `${pulse?.pendingInvoiceCount || 0} invoices`, icon: CreditCard, series: paymentSeries },
      ]
    : mode === "dentist"
      ? [
          { label: "Your patients", value: schedule.length.toString(), detail: "Booked today", icon: Users, series: weeklySeries },
          { label: "Completed", value: completed.toString(), detail: `${Math.max(schedule.length - completed, 0)} remaining`, icon: CalendarCheck, series: weeklySeries },
          { label: "Current chair", value: nextAppointment?.chair || "—", detail: nextAppointment ? `Next at ${nextAppointment.time}` : "No patient waiting", icon: Stethoscope, series: weeklySeries },
          { label: "Recalls", value: (pulse?.recallsDue || 0).toString(), detail: "Due within 14 days", icon: Clock3, series: weeklySeries },
        ]
      : [
          { label: "Live queue", value: activeQueue.length.toString(), detail: "Patients checked in", icon: ListChecks, series: weeklySeries },
          { label: "Appointments", value: schedule.length.toString(), detail: `${schedule.filter((item) => item.status === "scheduled").length} upcoming`, icon: CalendarDays, series: weeklySeries },
          { label: "Collected today", value: formatCurrency(pulse?.todayCollections || 0), detail: "Recorded payments", icon: CircleDollarSign, series: paymentSeries },
          { label: "Pending invoices", value: (pulse?.pendingInvoiceCount || 0).toString(), detail: formatCurrency(pulse?.pendingInvoiceValue || 0), icon: CreditCard, series: paymentSeries },
        ];

  const dailyInsight = totalWeekly === 0
    ? "As appointments build, I’ll spot quieter days and opportunities to improve chair use."
    : emptyDay
      ? `${emptyDay} has the lightest appointment load this week; consider moving recalls into those open slots.`
      : "Today’s schedule is balanced across the clinic.";

  const actions = mode === "owner"
    ? [
        { count: pulse?.recallsDue || 0, text: "recalls due", action: "Send reminders", to: `${basePath}/patients`, icon: Clock3 },
        { count: pulse?.pendingInvoiceCount || 0, text: "invoices outstanding", action: "Review billing", to: `${basePath}/billing`, icon: CreditCard },
        { count: Math.max(8 - schedule.length, 0), text: "open slots today", action: "Open calendar", to: `${basePath}/appointments`, icon: CalendarDays },
      ]
    : mode === "dentist"
      ? [
          { count: Math.max(schedule.length - completed, 0), text: "patients remaining", action: "View schedule", to: `${basePath}/appointments`, icon: CalendarCheck },
          { count: pulse?.recallsDue || 0, text: "recalls due soon", action: "Review patients", to: `${basePath}/patients`, icon: Users },
        ]
      : [
          { count: activeQueue.length, text: "patients in queue", action: "Manage arrivals", to: `${basePath}/waiting-list`, icon: ListChecks },
          { count: pulse?.pendingInvoiceCount || 0, text: "payments to follow up", action: "Open billing", to: `${basePath}/billing`, icon: CreditCard },
          { count: schedule.filter((item) => item.status === "scheduled").length, text: "appointments ahead", action: "Confirm bookings", to: `${basePath}/appointments`, icon: CalendarDays },
        ];

  const showOnboarding = mode === "owner" && s.totalPatients === 0;

  return (
    <div className="space-y-6 pb-4">
      <div className="flex items-start justify-between gap-4" data-tour="page-header">
        <div>
          <p className="text-sm text-muted-foreground">{format(new Date(), "EEEE, MMMM d")}</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">{getGreeting()}, {userName || "there"}</h1>
        </div>
        <PageTourButton />
      </div>

      {showOnboarding && (
        <OnboardingChecklist
          basePath={basePath}
          activeDentists={pulse?.activeDentists || 0}
          treatmentCount={pulse?.treatmentCount || 0}
          patientCount={s.totalPatients}
        />
      )}

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg bg-gradient-to-br from-primary/60 via-primary/20 to-border p-px shadow-[0_18px_48px_-28px_hsl(var(--primary)/0.65)]">
        <div className="grid gap-5 rounded-[7px] bg-card p-5 md:grid-cols-[1fr_auto] md:items-center md:p-7">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-primary">
              <hero.icon className="h-4 w-4" strokeWidth={iconStroke} />
              <span className="text-xs font-semibold uppercase">{hero.eyebrow}</span>
            </div>
            <h2 className="mt-3 text-2xl font-bold text-foreground md:text-3xl">{hero.title}</h2>
            <div className="mt-3 flex min-h-10 items-center gap-3">
              {nextAppointment ? (
                <>
                  <Avatar className="h-9 w-9"><AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">{nextAppointment.patientName.split(" ").map((name) => name[0]).join("").slice(0, 2)}</AvatarFallback></Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{nextAppointment.time} · {nextAppointment.treatment}</p>
                    <p className="truncate text-xs text-muted-foreground">{nextAppointment.dentist} · {nextAppointment.chair}</p>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">No more scheduled patients today.</p>
              )}
            </div>
            <Button asChild className="mt-5">
              <Link to={hero.to}>{hero.action}<ArrowRight className="h-4 w-4" strokeWidth={iconStroke} /></Link>
            </Button>
          </div>
          <ProgressRing completed={completed} total={schedule.length} />
        </div>
      </motion.div>

      <div className="overflow-x-auto border-y border-border/70 py-2 scroll-momentum" data-tour="dashboard-kpi-cards">
        <div className="flex min-w-max sm:min-w-0">
          {kpis.map((kpi) => <KpiTile key={kpi.label} {...kpi} />)}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.75fr)]">
        <Card className="border-border/60 bg-card">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="text-base">{mode === "owner" ? "Clinic momentum" : mode === "dentist" ? "Your patient flow" : "Today’s arrivals"}</CardTitle>
              <CardDescription>{mode === "owner" ? "Appointments this week" : "The working list for today"}</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm"><Link to={`${basePath}/appointments`}>View all<ArrowRight className="h-4 w-4" /></Link></Button>
          </CardHeader>
          <CardContent>
            {mode === "owner" ? (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <defs><linearGradient id="weekFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.24} /><stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/50" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                    <YAxis allowDecimals={false} axisLine={false} tickLine={false} width={28} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#weekFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : schedule.length === 0 ? (
              <div className="flex h-72 flex-col items-center justify-center gap-4 text-center">
                <ToothMotif />
                <div><p className="font-semibold text-foreground">Nothing scheduled yet</p><p className="mt-1 text-sm text-muted-foreground">New appointments will appear here.</p></div>
              </div>
            ) : (
              <div className="space-y-2">
                {schedule.slice(0, 7).map((appointment) => (
                  <div key={appointment.id} className="flex items-center gap-3 border-b border-border/60 py-3 last:border-0">
                    <span className="w-12 shrink-0 text-sm font-bold tabular-nums text-foreground">{appointment.time}</span>
                    <span className={cn("h-2 w-2 shrink-0 rounded-full", appointment.status === "completed" ? "bg-primary" : "bg-muted-foreground/50")} />
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-foreground">{appointment.patientName}</p><p className="truncate text-xs text-muted-foreground">{appointment.treatment} · {appointment.chair}</p></div>
                    <span className="text-xs capitalize text-muted-foreground">{appointment.status.replace("-", " ")}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-primary"><Sparkles className="h-4 w-4" strokeWidth={iconStroke} /><p className="text-xs font-semibold uppercase">Daily insight</p></div>
              <p className="mt-3 text-sm font-medium leading-6 text-foreground">{dailyInsight}</p>
              <p className="mt-3 text-[11px] text-muted-foreground">Based on this clinic’s schedule only</p>
            </CardContent>
          </Card>
          <div className="space-y-2">
            {actions.map((item) => (
              <Link key={item.text} to={item.to} className="group flex items-center gap-3 rounded-lg border border-border/70 bg-card p-4 transition-colors hover:border-primary/30 hover:bg-primary/5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-primary"><item.icon className="h-4 w-4" strokeWidth={iconStroke} /></div>
                <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-foreground"><span className="tabular-nums">{item.count}</span> {item.text}</p><p className="mt-0.5 text-xs font-medium text-primary">{item.action}</p></div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" strokeWidth={iconStroke} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {mode === "owner" && (
        <Card className="border-border/60 bg-card">
          <CardHeader><CardTitle className="text-base">Revenue trend</CardTitle><CardDescription>Collections over the last six months</CardDescription></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.22} /><stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/50" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} width={48} tickFormatter={(value) => `${Math.round(value / 1000)}k`} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [formatCurrency(value), "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#revenueFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function DashboardHome() {
  const { currentOrg } = useOrg();
  if (currentOrg?.clinic_type === "eye") return <EyeTodayScreen />;
  return <StandardDashboardHome />;
}