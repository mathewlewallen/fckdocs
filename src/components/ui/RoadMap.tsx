import { Badge } from '@fck/components/ui/badge';
import {
  BarChart3,
  Bell,
  Check,
  CreditCard,
  FolderCheck,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from 'lucide-react';

export default function Roadmap() {
  return (
    <div className="w-full py-10 lg:py-20">
      <div className="container mx-auto">
        <div className="flex w-full flex-col gap-4">
        <Badge>Platform</Badge>
        <h2 className="font-regular text-3xl tracking-tighter md:text-5xl">
          Our Intelligent Business Stack — Evolving with You
        </h2>
        <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed tracking-tight">
          Cloud Context is your all-in-one business operating system. Our MVP
          brings essential tools to help modern teams launch and scale. What’s
          next? Even more automation, intelligence, and collaboration — right
          when you need it.
        </p>
      </div>
      <div className="flex w-full flex-col gap-10 pt-12">
        <div className="grid grid-cols-2 items-start gap-10 lg:grid-cols-3">
          <div className="flex w-full flex-row items-start gap-6">
            <User className="h-10 w-10 text-primary" />
            <div className="flex flex-col gap-1">
              <p>LIVE: Unified Business Workspace</p>
              <p className="text-muted-foreground text-sm">
                Consolidate CRM, CMS, marketing, and collaboration into one
                intuitive dashboard — no more switching tools.
              </p>
            </div>
          </div>
          <div className="flex flex-row items-start gap-6">
            <Sparkles className="h-10 w-10 text-primary" />
            <div className="flex flex-col gap-1">
              <p>LIVE: AI-Powered Automation</p>
              <p className="text-muted-foreground text-sm">
                Automate repetitive tasks and streamline workflows with
                intelligent defaults and smart triggers.
              </p>
            </div>
          </div>
          <div className="flex flex-row items-start gap-6">
            <BarChart3 className="h-10 w-10 text-primary" />
            <div className="flex flex-col gap-1">
              <p>LIVE: Real-Time Business Intelligence</p>
              <p className="text-muted-foreground text-sm">
                Monitor KPIs and make data-driven decisions with live
                dashboards, reports, and alerts.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-row items-start gap-6">
            <ShieldCheck className="h-10 w-10 text-primary" />
            <div className="flex flex-col gap-1">
              <p>LIVE: Secure & Scalable Infrastructure</p>
              <p className="text-muted-foreground text-sm">
                Built on enterprise-grade cloud with encryption, audit trails,
                and reliability from day one.
              </p>
            </div>
          </div>
          <div className="flex flex-row items-start gap-6">
            <Users className="h-10 w-10 text-primary" />
            <div className="flex flex-col gap-1">
              <p>UPCOMING: Team Collaboration & Permissions</p>
              <p className="text-muted-foreground text-sm">
                Work with your entire team securely — assign roles, manage
                access, and collaborate in shared views. (Q2 2025)
              </p>
            </div>
          </div>
          <div className="flex flex-row items-start gap-6">
            <Check className="h-10 w-10 text-primary" />
            <div className="flex flex-col gap-1">
              <p>UPCOMING: No-Code Workflow Builder</p>
              <p className="text-muted-foreground text-sm">
                Build powerful automations using a drag-and-drop canvas with
                built-in AI assistance. (Q3 2025)
              </p>
            </div>
          </div>
          <div className="flex flex-row items-start gap-6">
            <CreditCard className="h-10 w-10 text-primary" />
            <div className="flex flex-col gap-1">
              <p>UPCOMING: Integrated Payments & Invoicing</p>
              <p className="text-muted-foreground text-sm">
                Send invoices, accept payments, and track revenue directly from
                your workspace. (Q3 2025)
              </p>
            </div>
          </div>
          <div className="flex flex-row items-start gap-6">
            <Bell className="h-10 w-10 text-primary" />
            <div className="flex flex-col gap-1">
              <p>UPCOMING: Smart Notifications & Alerts</p>{' '}
              <p className="text-muted-foreground text-sm">
                Stay in the loop with actionable alerts, reminders, and
                AI-prioritized to-dos that help you focus on what matters most.
                (Q4 2025)
              </p>
            </div>
          </div>
          <div className="flex flex-row items-start gap-6">
            <FolderCheck className="h-10 w-10 text-primary" />
            <div className="flex flex-col gap-1">
              <p>UPCOMING: Knowledge Base & Help Center</p>{' '}
              <p className="text-muted-foreground text-sm">
                Build internal documentation or customer-facing support pages —
                all powered by markdown, AI search, and CMS-backed content. (Q4
                2025)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
