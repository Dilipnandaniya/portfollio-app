import { useEffect, useState } from 'react'
import {
  ArrowDownRight, ArrowRight, CheckCircle2, ChevronRight, Download,
  ExternalLink, Mail, Menu, Phone, Sparkles, X,
} from 'lucide-react'

type Project = {
  id: string
  index: string
  title: string
  summary: string
  impact: string
  type: string
  tags: string[]
  color: string
  accent: string
  visual: 'intranet' | 'workflow' | 'dashboard'
  image: string
  challenge: string
  solution: string
  features: string[]
  contribution: string[]
}

const projects: Project[] = [
  {
    id: 'purview-label-automation', index: '01', title: 'Purview label automation',
    summary: 'An SPFx and Power Automate solution for requesting, approving and applying Microsoft Purview sensitivity labels across SharePoint sites, libraries and folders—with pagination, failure tracking and linked notification reports.',
    impact: 'Automated governance with auditable approvals and failure reporting',
    type: 'Microsoft Purview · Governance', tags: ['Microsoft Purview', 'SPFx', 'Power Automate', 'Microsoft Graph'],
    color: '#d9ff3f', accent: '#17201b', visual: 'intranet',
    image: "/images/projects/purview.png",
    challenge: "Information protection teams needed a consistent way to apply sensitivity labels across SharePoint sites, libraries and folders without losing approval control or visibility into failures.",
    solution: "I designed an SPFx request experience connected to Power Automate and Microsoft Graph. It guides label selection, routes approvals, applies the chosen label at scale and produces a linked exception report when an item cannot be processed.",
    features: ["Guided label requests for sites, libraries and folders","Approval workflow with clear request status","Microsoft Graph label retrieval and pagination","Automated label application with failure tracking","Notification reports with direct links to affected items"],
    contribution: ["Requirements and solution architecture","SPFx, React and TypeScript development","Power Automate workflow design","Deployment, testing and production support"],
  },
  {
    id: 'akte-management', index: '02', title: 'Project Akte Management',
    summary: 'A single source of truth for construction projects, resource planning, travel logistics and documentation, connected to CRM with automated SharePoint workspaces, permissions and standard folder structures.',
    impact: 'More than 70% less project administration reported after automation',
    type: 'Microsoft 365 · Project operations', tags: ['SPFx', 'React', 'SharePoint', 'Power Automate', 'Azure DevOps'],
    color: '#405cff', accent: '#ffffff', visual: 'workflow',
    image: "/images/projects/akte.png",
    challenge: "Project data, staffing, travel and construction documents were spread across disconnected tools, creating repeated entry, inconsistent workspaces and heavy administration.",
    solution: "I helped build a central project operations platform connected to CRM. It provisions structured SharePoint workspaces, coordinates project and resource data, and gives teams one place for logistics and documentation.",
    features: ["Project list, filters and map-based overview","Automated workspace and folder provisioning","Resource availability and workload planning","Hotel, transport and invoice coordination","Structured document libraries and permissions"],
    contribution: ["SPFx and React interface development","PnPjs and Microsoft Graph integrations","Power Automate provisioning workflows","Azure DevOps delivery and release support"],
  },
  {
    id: 'construction-site-app', index: '03', title: 'Construction Site App',
    summary: 'A Microsoft Teams app for daily site reporting, employee timesheets, tasks, notes, evidence uploads and automatically generated PDF reports, with country-specific working-hour validation.',
    impact: 'Reported 60–70% reduction in daily reporting time',
    type: 'Microsoft Teams · Site operations', tags: ['Teams Toolkit', 'SharePoint', 'Power Automate', 'PDF generation'],
    color: '#ef755f', accent: '#17201b', visual: 'workflow',
    image: "/images/projects/construction.png",
    challenge: "Site teams relied on manual timesheets, scattered notes and document exchanges, which slowed daily reporting and made working-hour compliance difficult to verify.",
    solution: "I created a Teams-based site operations experience linked to Project Akte. Supervisors can capture hours, tasks, evidence and notes in one flow, then generate a consistent PDF report automatically.",
    features: ["Daily overview with weather and site context","Timesheets with working-hour validation","Tasks, notes and evidence uploads","Safety and progress reporting","Automatically generated PDF site reports"],
    contribution: ["Requirements analysis and user-flow design","Teams and SharePoint application development","Power Automate reporting workflows","Validation rules, testing and rollout support"],
  },
  {
    id: 'weekly-meetings', index: '04', title: 'Weekly Meeting System',
    summary: 'A structured coordination system linked to Project Akte that creates weekly meeting records, synchronizes Outlook invitations, centralizes calendars and assigns department actions with role-based visibility.',
    impact: 'Reported 80% reduction in manual coordination processes',
    type: 'SharePoint · Collaboration automation', tags: ['SPFx', 'React', 'Outlook', 'Power Automate', 'Role-based access'],
    color: '#f2c84b', accent: '#17201b', visual: 'dashboard',
    image: "/images/projects/weekly.png",
    challenge: "Weekly meetings were scheduled and documented in separate places, leaving teams without a reliable view of participants, decisions or department actions.",
    solution: "I built a structured coordination system connected to Project Akte and Outlook. It creates meeting records, synchronizes invitations, centralizes calendars and assigns actions with role-based visibility.",
    features: ["Participant and Outlook invitation sync","Weekly protocols and reusable agendas","Department action tracking","Central calendar and meeting history","Automatic record creation and prefilled context"],
    contribution: ["SPFx and React experience development","Outlook and SharePoint integration","Power Automate workflow implementation","Role-based access and acceptance testing"],
  },
  {
    id: 'hrms-portal', index: '05', title: 'HRMS Portal',
    summary: 'A centralized workforce platform for employee records, onboarding, contract generation, performance notices and leave management with overlap detection, balance validation and secure role-based access.',
    impact: 'Reported 60% reduction in manual HR work',
    type: 'SharePoint · Workforce management', tags: ['SPFx', 'Power Automate', 'PnP', 'SharePoint Lists', 'RBAC'],
    color: '#bda8ff', accent: '#17201b', visual: 'intranet',
    image: "/images/projects/hrms.png",
    challenge: "Employee data, contracts, onboarding and leave requests were handled through fragmented files and manual processes, limiting visibility and increasing HR effort.",
    solution: "I delivered a central SharePoint HR portal that manages the employee lifecycle, automates documents and approvals, and applies secure role-based access to sensitive workforce information.",
    features: ["Employee directory and profile management","Onboarding and contract generation","Leave balances and overlap detection","Performance notices and work-clothes tracking","Role-based access to sensitive records"],
    contribution: ["SPFx portal and component development","Power Automate document workflows","PnP provisioning and SharePoint data design","Permission model, validation and support"],
  },
  {
    id: 'document-catalogue', index: '06', title: 'Catalogue & document management',
    summary: 'A searchable technical catalogue for drawings, PDFs, images and 3D models with taxonomy-driven filters, hover previews and enforced metadata during drag-and-drop uploads.',
    impact: 'Reported 80% faster search with zero untagged uploads',
    type: 'SharePoint · Enterprise search', tags: ['PnP Modern Search', 'SPFx', 'React', 'PnPjs', 'Metadata'],
    color: '#77d9c5', accent: '#17201b', visual: 'dashboard',
    image: "/images/projects/catalogue.png",
    challenge: "Technical drawings, PDFs, images and 3D assets were difficult to find because files were scattered and metadata was missing or inconsistent.",
    solution: "I created a searchable catalogue with taxonomy-driven filters, rich result templates and a guided upload experience that requires useful metadata before a file enters the library.",
    features: ["Search with taxonomy and file-type filters","Rich cards and hover previews","Drag-and-drop document upload","Required metadata and validation","Reusable modern search result templates"],
    contribution: ["SPFx and React search experience","PnPjs data and upload integration","PnP Modern Search template work","Metadata model and usability testing"],
  },
  {
    id: 'healthcare-dms', index: '07', title: 'Healthcare DMS',
    summary: 'A low-code SharePoint document system that centralizes client and branch records, reveals hierarchical relationships and secures supporting contracts, correspondence and compliance files.',
    impact: 'Faster record discovery with scalable, consistent client provisioning',
    type: 'SharePoint · Client document management', tags: ['PnP Modern Search', 'Handlebars', 'PnP PowerShell', 'SharePoint', 'RBAC'],
    color: '#8fd0ff', accent: '#17201b', visual: 'intranet',
    image: "/images/projects/dms.png",
    challenge: "Client and branch information lived in spreadsheets while contracts, correspondence and compliance files were dispersed across folders with inconsistent access.",
    solution: "I designed a SharePoint document system that represents client-to-branch relationships, provides refined search and provisions consistent, secured document workspaces as the organization grows.",
    features: ["Client and branch hierarchy","Search refiners and tailored result layouts","Versioned libraries with structured metadata","Role-based permissions for sensitive files","Repeatable PnP workspace provisioning"],
    contribution: ["Information architecture and data modelling","PnP Modern Search and Handlebars templates","PnP PowerShell provisioning","Permissions, migration support and validation"],
  },
  {
    id: 'nemt-healthops', index: '08', title: 'NEMT HealthOps Platform',
    summary: 'A full-stack healthcare operations platform covering trips, dispatch, live tracking, driver onboarding, vehicles, documents, billing, notifications, audit logs and invoice management.',
    impact: 'One operational platform spanning dispatch through invoicing',
    type: 'Full-stack · Healthcare operations', tags: ['React', '.NET Web API', 'EF Core', 'SQL Server', 'Azure DevOps'],
    color: '#ff9d77', accent: '#17201b', visual: 'dashboard',
    image: "/images/projects/nemt.png",
    challenge: "Non-emergency medical transportation operations required trips, dispatch, drivers, vehicles, documents and billing to work together across one dependable system.",
    solution: "I contribute to a full-stack platform that connects the complete operational flow, from trip creation and live tracking through driver compliance, invoice generation and audit history.",
    features: ["Trip scheduling, dispatch and tracking","Driver onboarding and document compliance","Vehicle records and inspections","Billing, invoices and account management","Notifications, audit logs and courier workflows"],
    contribution: ["React and TypeScript frontend delivery","ASP.NET Core APIs and business logic","EF Core and SQL Server integration","CI/CD and multi-environment deployments"],
  },
  {
    id: 'sharepoint-backup-archival', index: '09', title: 'SharePoint Site Backup & Archival Automation',
    summary: 'An enterprise-grade PnP PowerShell solution that identifies, backs up and archives SharePoint Online documents through configurable business and retention rules while preserving metadata, versions, permissions and folder structures.',
    impact: 'Automated large-scale content lifecycle management with auditable, governance-ready archival',
    type: 'SharePoint · Backup & lifecycle automation', tags: ['PnP PowerShell', 'SharePoint Online', 'Microsoft 365', 'CSOM', 'REST API', 'Azure AD'],
    color: '#d9ff3f', accent: '#17201b', visual: 'workflow',
    image: '/images/projects/backup-archival.png',
    challenge: 'Large SharePoint estates needed a dependable way to archive content according to configurable retention criteria without losing document history, metadata, permissions or site hierarchy. Large files and reporting requirements added further operational risk.',
    solution: 'I developed a PnP PowerShell automation framework that evaluates archival rules, processes documents in controlled batches, preserves their business context and produces CSV-based audit records for governance and compliance teams.',
    features: ['Rule-based document identification and archival','Preserved versions, metadata, permissions and hierarchy','Chunked upload processing for large files','Staging mechanisms for controlled lifecycle operations','CSV audit logging and governance reporting'],
    contribution: ['Automation architecture and PnP PowerShell development','CSOM and SharePoint REST API integration','Large-file processing and recovery controls','Audit framework, testing and operational documentation'],
  },
  {
    id: 'sharepoint-site-provisioning', index: '10', title: 'SharePoint Site Provisioning & Configuration Automation',
    summary: 'A reusable PowerShell automation framework for provisioning SharePoint Online sites with standardized columns, content types, libraries, metadata, permissions and governance configuration across enterprise environments.',
    impact: 'Reduced manual setup effort while improving deployment speed, consistency and governance',
    type: 'SharePoint · Provisioning automation', tags: ['PnP PowerShell', 'SharePoint Online', 'Microsoft 365', 'CSOM', 'REST API'],
    color: '#8fd0ff', accent: '#17201b', visual: 'intranet',
    image: '/images/projects/site-provisioning.png',
    challenge: 'Manually configuring sites created inconsistent structures, permissions and naming standards. Repeated setup work also made enterprise rollouts slower and harder to govern as the number of sites increased.',
    solution: 'I designed a PowerShell-based provisioning framework that applies reusable templates and governance rules to every site, creating the required information architecture and access model through a consistent deployment process.',
    features: ['Automated site provisioning and configuration','Reusable columns, content types and library definitions','Standard metadata structures and naming rules','Automated permissions and access controls','Repeatable deployment across enterprise environments'],
    contribution: ['Provisioning framework and reusable script design','PnP PowerShell, CSOM and REST implementation','Governance and permission configuration','Deployment validation and technical documentation'],
  },
]

const services = [
  ['01', 'Microsoft 365 & SharePoint', 'SharePoint Online, SPFx, PnPjs, PnP Modern Search, Graph API, migrations, metadata, permissions and document management.'],
  ['02', 'Purview & Power Platform', 'Sensitivity labels, information protection, retention, label automation, Power Automate approvals and Power Apps integration.'],
  ['03', 'Azure & intelligent search', 'Azure Functions, App Service, Storage, SQL, Key Vault, Azure AI, Azure OpenAI, Azure AI Search and CI/CD.'],
  ['04', 'Full-stack engineering', 'React and TypeScript frontends backed by C#, ASP.NET Core, EF Core, REST APIs, SQL Server and background processing.'],
]

function Logo() {
  return <a href="#top" className="focus-ring flex items-center gap-3 rounded-sm" aria-label="Dilip Nandaniya, home">
    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#17201b] text-xs font-black tracking-tight text-white">DN</span>
    <span className="hidden text-sm font-bold tracking-tight sm:block">Dilip Nandaniya</span>
  </a>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [['Work', '#work'], ['Expertise', '#expertise'], ['Experience', '#experience'], ['About', '#about']]

  return <header className="fixed inset-x-0 top-0 z-50 px-5 pt-4 md:px-10 lg:px-14">
    <div className={`mx-auto flex max-w-[1440px] items-center justify-between rounded-full border px-4 py-3 backdrop-blur-xl transition-all duration-300 md:px-5 ${scrolled ? 'border-black/10 bg-[#f3f2ec]/90 shadow-[0_10px_40px_rgba(23,32,27,.10)]' : 'border-transparent bg-transparent'}`}>
      <Logo />
      <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
        {links.map(([label, href]) => <a key={href} href={href} className="focus-ring rounded-sm text-sm font-semibold text-black/70 transition hover:text-black">{label}</a>)}
      </nav>
      <a href="/resume/Dilip_Nandaniya_Resume.pdf" target="_blank" rel="noreferrer" className="focus-ring hidden items-center gap-2 rounded-full bg-[#17201b] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#405cff] md:flex">View resume <Download size={16} /></a>
      <button className="focus-ring rounded-full p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav className="mx-auto mt-2 grid max-w-[1440px] gap-1 rounded-3xl border border-black/10 bg-[#f3f2ec] p-3 shadow-xl md:hidden">
      {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-2xl px-5 py-4 text-lg font-semibold hover:bg-white">{label}</a>)}
      <a href="/resume/Dilip_Nandaniya_Resume.pdf" target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="rounded-2xl bg-[#17201b] px-5 py-4 text-lg font-semibold text-white">View résumé</a>
    </nav>}
  </header>
}

const heroWords = ['SharePoint solutions', 'Purview automation', 'Power Platform workflows', 'Azure-powered apps', 'React + .NET products']

function RotatingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI(n => (n + 1) % heroWords.length), 2600)
    return () => clearInterval(t)
  }, [])
  return <span className="inline-block min-h-[1.5em] align-top">
    <span key={i} className="word-in inline-block font-bold text-[#405cff]">{heroWords[i]}</span>
  </span>
}

function HeroVisual() {
  const outcomes = [
    { metric: '70%+', label: 'less project administration', project: 'Project Akte Management', pct: 70, color: '#d9ff3f' },
    { metric: '60–70%', label: 'less daily reporting time', project: 'Construction Site App', pct: 65, color: '#405cff' },
    { metric: '80%', label: 'less manual coordination', project: 'Weekly Meeting System', pct: 80, color: '#ef755f' },
  ]

  return <div className="relative mx-auto w-full max-w-[440px] lg:max-w-[460px] lg:justify-self-end">
    <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-[2rem] bg-[#d9ff3f]" />
    <div className="noise relative overflow-hidden rounded-[2rem] bg-[#17201b] p-5 text-white shadow-[0_30px_70px_rgba(23,32,27,.22)] md:p-6">
      <div className="mb-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[.22em] text-white/55">
        <span className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-[#d9ff3f]" /> Reported impact</span>
        <span>Enterprise projects</span>
      </div>

      <div className="grid gap-2.5">
        {outcomes.map(o => (
          <div key={o.project} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex items-baseline justify-between gap-4">
              <div className="display text-2xl leading-none md:text-3xl" style={{ color: o.color }}>{o.metric}</div>
              <div className="text-right text-xs font-semibold text-white/80">{o.label}</div>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full" style={{ width: `${o.pct}%`, background: o.color }} />
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-white/45">
              <CheckCircle2 size={12} className="text-[#d9ff3f]" /> {o.project}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
        {['SharePoint', 'Purview', 'Power Automate', 'Azure', 'React', '.NET'].map(t => (
          <span key={t} className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-semibold text-white/70">{t}</span>
        ))}
      </div>
    </div>
  </div>
}

function Hero() {
  const stats = [['5+', 'Years of experience'], ['10', 'Projects delivered'], ['6', 'M365 & Azure services']]
  return <section id="top" className="noise relative overflow-hidden px-5 pb-14 pt-24 md:px-10 md:pb-16 md:pt-28 lg:px-14">
    <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#405cff]/10 blur-3xl" />
    <div className="absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-[#d9ff3f]/30 blur-3xl" />

    <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
      <div className="relative z-10">
        <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white/70 px-3.5 py-1.5 text-xs font-bold text-black/65 backdrop-blur">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" /><span className="relative h-2 w-2 rounded-full bg-green-500" /></span>
          Available for new opportunities
        </div>

        <h1 className="display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1.02] tracking-[-0.03em]">
          Complex systems.<br /><span className="italic text-[#405cff]">Clear</span> experiences.
        </h1>

        <p className="mt-4 text-base text-black/70 md:text-lg">Currently building <RotatingWord /></p>

        <p className="mt-3 max-w-[32rem] text-sm leading-relaxed text-black/55 md:text-base">
          I’m Dilip Nandaniya, a Microsoft 365 and SharePoint developer turning governance, workflows and data into tools people enjoy using.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <a href="#work" className="focus-ring group inline-flex items-center gap-2.5 rounded-full bg-[#17201b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#405cff]">View case studies <ArrowDownRight size={17} className="transition group-hover:rotate-[-45deg]" /></a>
          <a href="#contact" className="focus-ring inline-flex items-center gap-2.5 rounded-full bg-[#d9ff3f] px-6 py-3 text-sm font-bold text-[#17201b] transition hover:brightness-95">Let’s talk <ArrowRight size={17} /></a>
          <a href="/resume/Dilip_Nandaniya_Resume.pdf" target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full px-3 py-3 text-sm font-bold underline-offset-4 hover:underline">Resume <Download size={15} /></a>
        </div>

        <dl className="mt-8 grid max-w-md grid-cols-3 gap-5 border-t border-black/10 pt-5">
          {stats.map(([n, l]) => <div key={l}>
            <dt className="display text-3xl md:text-4xl">{n}</dt>
            <dd className="mt-1 text-[11px] leading-snug text-black/50">{l}</dd>
          </div>)}
        </dl>
      </div>

      <HeroVisual />
    </div>
  </section>
}

function Marquee() {
  const words = ['SHAREPOINT', 'MICROSOFT 365', 'PURVIEW', 'AZURE', 'POWER PLATFORM', 'REACT', '.NET']
  return <div className="overflow-hidden border-y border-white/10 bg-[#17201b] py-5 text-white" aria-hidden="true"><div className="marquee-track flex items-center">{[...words,...words].map((w,i)=><span key={`${w}-${i}`} className="flex items-center whitespace-nowrap text-sm font-black tracking-[.12em]"><Sparkles className="mx-7 text-[#d9ff3f]" size={17}/>{w}</span>)}</div></div>
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  return <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#17201b]/75 p-3 backdrop-blur-md md:p-7" role="dialog" aria-modal="true" aria-labelledby={`case-study-${project.id}`} onMouseDown={event => event.target === event.currentTarget && onClose()}>
    <div className="mx-auto my-3 max-w-[1180px] overflow-hidden rounded-[2rem] bg-[#f3f2ec] shadow-2xl md:my-7 md:rounded-[2.75rem]">
      <div className="sticky top-3 z-20 flex h-0 justify-end pr-3 pt-3 md:top-7 md:pr-5 md:pt-5"><button type="button" autoFocus onClick={onClose} aria-label="Close case study" className="focus-ring grid h-12 w-12 place-items-center rounded-full bg-[#17201b] text-white shadow-xl transition hover:rotate-6 hover:bg-[#405cff]"><X size={21}/></button></div>
      <div className="relative aspect-[16/10] max-h-[680px] overflow-hidden bg-white"><img src={project.image} alt={`Concept interface for ${project.title}`} className="h-full w-full object-cover"/><div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"/><div className="absolute bottom-5 left-5 rounded-full bg-[#d9ff3f] px-4 py-2 text-xs font-black uppercase tracking-[.14em] text-[#17201b] md:bottom-8 md:left-8">{project.index} · Enterprise case study</div></div>
      <div className="px-6 py-10 md:px-12 md:py-14 lg:px-16">
        <div className="grid gap-8 border-b border-black/10 pb-10 lg:grid-cols-[1.25fr_.75fr] lg:items-end"><div><div className="mb-4 text-xs font-black uppercase tracking-[.15em] text-[#405cff]">{project.type}</div><h2 id={`case-study-${project.id}`} className="display text-5xl leading-[.92] md:text-7xl">{project.title}</h2><p className="mt-6 max-w-3xl text-lg leading-relaxed text-black/60">{project.summary}</p></div><div className="rounded-3xl bg-[#17201b] p-6 text-white"><div className="mb-2 text-[10px] font-black uppercase tracking-[.18em] text-[#d9ff3f]">Outcome</div><p className="font-bold leading-relaxed">{project.impact}</p></div></div>
        <div className="grid gap-10 py-10 md:grid-cols-2 md:py-14"><div><div className="mb-4 text-xs font-black uppercase tracking-[.16em] text-black/40">The challenge</div><p className="text-lg leading-relaxed text-black/65">{project.challenge}</p></div><div><div className="mb-4 text-xs font-black uppercase tracking-[.16em] text-black/40">The solution</div><p className="text-lg leading-relaxed text-black/65">{project.solution}</p></div></div>
        <div className="grid gap-8 border-t border-black/10 pt-10 md:grid-cols-2"><div className="rounded-[2rem] bg-white p-7 md:p-9"><h3 className="display mb-6 text-3xl">Key capabilities</h3><ul className="grid gap-4">{project.features.map(item => <li key={item} className="flex gap-3 leading-relaxed text-black/65"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#405cff]"/>{item}</li>)}</ul></div><div className="rounded-[2rem] bg-[#d9ff3f] p-7 md:p-9"><h3 className="display mb-6 text-3xl">My contribution</h3><ul className="grid gap-4">{project.contribution.map(item => <li key={item} className="flex gap-3 leading-relaxed text-black/70"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#17201b]"/>{item}</li>)}</ul></div></div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-black/10 pt-8"><div className="flex flex-wrap gap-2">{project.tags.map(tag => <span key={tag} className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-bold">{tag}</span>)}</div><a href="#contact" onClick={onClose} className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#405cff] px-6 py-3 font-bold text-white hover:bg-[#17201b]">Discuss a similar project <ArrowRight size={17}/></a></div>
      </div>
    </div>
  </div>
}

const categoryById: Record<string, string> = {
  'purview-label-automation': 'Governance & automation',
  'sharepoint-backup-archival': 'Governance & automation',
  'sharepoint-site-provisioning': 'Governance & automation',
  'akte-management': 'Apps & portals',
  'construction-site-app': 'Apps & portals',
  'weekly-meetings': 'Apps & portals',
  'hrms-portal': 'Apps & portals',
  'nemt-healthops': 'Apps & portals',
  'document-catalogue': 'Search & documents',
  'healthcare-dms': 'Search & documents',
}
const filters = ['All', 'Apps & portals', 'Governance & automation', 'Search & documents']
const INITIAL_COUNT = 6

function Work() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState('All')
  const [showAll, setShowAll] = useState(false)

  const filtered = projects.filter(p => filter === 'All' || categoryById[p.id] === filter)
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT)
  const hiddenCount = filtered.length - visible.length

  return <section id="work" className="bg-[#f3f2ec] px-5 py-24 md:px-10 md:py-32 lg:px-14">
    <div className="mx-auto max-w-[1440px]">
      <div className="reveal mb-10 grid gap-6 md:grid-cols-[1fr_.75fr] md:items-end">
        <div>
          <div className="mb-4 text-xs font-black uppercase tracking-[.18em] text-[#405cff]">Selected case studies</div>
          <h2 className="display text-5xl leading-none md:text-7xl">Solutions in practice.</h2>
        </div>
        <p className="max-w-xl text-base leading-relaxed text-black/55 md:text-lg">Enterprise systems shaped around real operational challenges. Select any project to explore the problem, solution and outcome.</p>
      </div>

      {/* Filter chips */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter projects">
        {filters.map(f => {
          const count = f === 'All' ? projects.length : projects.filter(p => categoryById[p.id] === f).length
          const active = filter === f
          return <button key={f} role="tab" aria-selected={active}
            onClick={() => { setFilter(f); setShowAll(false) }}
            className={`focus-ring shrink-0 rounded-full border px-5 py-2.5 text-sm font-bold transition ${active ? 'border-[#17201b] bg-[#17201b] text-white' : 'border-black/15 bg-white/60 hover:bg-white'}`}>
            {f} <span className={active ? 'text-[#d9ff3f]' : 'text-black/35'}>{count}</span>
          </button>
        })}
      </div>

      {/* Compact grid (no .reveal on cards, so filtered cards never stay hidden) */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(project => (
          <article key={project.id} className="project-card overflow-hidden rounded-[1.75rem] border border-black/10 bg-white">
            <button type="button" onClick={() => setSelectedProject(project)} aria-haspopup="dialog" className="focus-ring group flex h-full w-full flex-col text-left">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#17201b]">
                <img src={project.image} alt={`Concept interface for ${project.title}`} loading="lazy" decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1.5 text-[10px] font-black tracking-[.14em] text-[#17201b] backdrop-blur">{project.index}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 text-[11px] font-bold uppercase tracking-[.14em] text-black/40">{project.type}</div>
                <h3 className="display text-2xl leading-[1.05] md:text-3xl">{project.title}</h3>
                <p className="mt-3 line-clamp-2 text-sm font-semibold leading-relaxed text-black/60">{project.impact}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map(tag => <span key={tag} className="rounded-full border border-black/10 bg-[#f3f2ec] px-2.5 py-1 text-[11px] font-bold">{tag}</span>)}
                  {project.tags.length > 3 && <span className="px-1 py-1 text-[11px] font-bold text-black/40">+{project.tags.length - 3}</span>}
                </div>
                <div className="mt-auto flex items-center justify-between pt-5 text-sm font-bold">
                  <span>View case study</span>
                  <ArrowDownRight className="transition group-hover:-rotate-45 group-hover:text-[#405cff]" size={20} />
                </div>
              </div>
            </button>
          </article>
        ))}
      </div>

      {/* Show more / less */}
      {filtered.length > INITIAL_COUNT && (
        <div className="mt-10 flex justify-center">
          <button onClick={() => setShowAll(!showAll)}
            className="focus-ring inline-flex items-center gap-3 rounded-full border border-black/20 bg-white/60 px-7 py-4 font-bold transition hover:bg-white">
            {showAll ? 'Show fewer projects' : `Show ${hiddenCount} more projects`}
            <ArrowDownRight size={18} className={showAll ? 'rotate-180' : ''} />
          </button>
        </div>
      )}
    </div>
    {selectedProject && <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
  </section>
}

function Expertise() {
  return <section id="expertise" className="noise bg-[#17201b] px-5 py-24 text-white md:px-10 md:py-32 lg:px-14">
    <div className="mx-auto max-w-[1440px]">
      <div className="reveal grid gap-7 border-b border-white/15 pb-14 md:grid-cols-2"><h2 className="display text-5xl leading-[.92] md:text-7xl">From governance<br/>to <span className="italic text-[#d9ff3f]">full-stack delivery.</span></h2><div className="max-w-xl md:justify-self-end"><p className="text-lg leading-relaxed text-white/60">My work spans enterprise collaboration, information protection, workflow automation, intelligent search and complete web application delivery.</p><div className="mt-7 flex flex-wrap gap-2">{['Microsoft 365','SharePoint Online','SPFx','Purview','Power Automate','Azure OpenAI','React','TypeScript','C# / .NET'].map(x=><span key={x} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70">{x}</span>)}</div></div></div>
      <div className="divide-y divide-white/15">{services.map(([n,title,body])=><div key={n} className="reveal group grid gap-5 py-9 transition md:grid-cols-[90px_1fr_1fr_40px] md:items-center"><span className="text-sm text-[#d9ff3f]">{n}</span><h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h3><p className="max-w-lg leading-relaxed text-white/50">{body}</p><ChevronRight className="hidden transition group-hover:translate-x-1 md:block"/></div>)}</div>
    </div>
  </section>
}

function Experience() {
  const roles = [
    {
      period: '07/2023 — Present',
      role: 'Software Developer',
      company: 'Easeteq Software Solutions',
      location: 'Vadodara, Gujarat',
      details: [
        'Design and develop enterprise SharePoint Online solutions using SPFx, React, TypeScript, PnPjs, REST and Microsoft Graph.',
        'Build Microsoft Purview sensitivity label automation, SharePoint migrations and Power Automate business workflows.',
        'Deliver full-stack React and .NET applications, Azure Functions, intelligent search and Azure OpenAI integrations.',
        'Manage Azure services and CI/CD across App Service, Storage, SQL, Key Vault and Azure DevOps.',
      ],
    },
    {
      period: '10/2021 — 06/2023',
      role: 'Jr. Software Developer',
      company: 'HSP Software Solutions',
      location: '',
      details: [
        'Developed SharePoint solutions, custom web parts, forms and workflow-driven business applications.',
        'Designed Power Automate flows for approvals, onboarding, helpdesk management and status tracking.',
        'Automated provisioning of lists, libraries, permissions and site configuration with PowerShell and PnP.',
        'Created reusable components that improved SharePoint UI consistency and maintainability.',
      ],
    },
  ]
  return <section id="experience" className="bg-[#f3f2ec] px-5 py-24 md:px-10 md:py-32 lg:px-14">
    <div className="mx-auto max-w-[1440px]">
      <div className="reveal mb-14 grid gap-6 md:grid-cols-[.75fr_1.25fr] md:items-end"><div><div className="mb-4 text-xs font-black uppercase tracking-[.18em] text-[#405cff]">Professional journey</div><h2 className="display text-5xl leading-none md:text-7xl">Experience.</h2></div><p className="max-w-2xl text-lg leading-relaxed text-black/55">More than five years delivering enterprise collaboration, governance, automation and custom application solutions.</p></div>
      <div className="divide-y divide-black/10 border-y border-black/10">
        {roles.map((role, index) => <article key={role.company} className="reveal grid gap-7 py-10 md:grid-cols-[.55fr_1fr] md:py-14">
          <div><div className="mb-3 text-sm font-black text-[#405cff]">0{index + 1}</div><div className="text-sm font-bold uppercase tracking-wider text-black/45">{role.period}</div>{role.location && <div className="mt-2 text-sm text-black/45">{role.location}</div>}</div>
          <div><h3 className="display text-4xl leading-none md:text-5xl">{role.role}</h3><div className="mt-3 text-lg font-bold">{role.company}</div><ul className="mt-7 grid gap-4 text-black/60 md:grid-cols-2">{role.details.map(detail => <li key={detail} className="flex gap-3 leading-relaxed"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#405cff]"/>{detail}</li>)}</ul></div>
        </article>)}
      </div>
    </div>
  </section>
}

function About() {
  return <section id="about" className="overflow-hidden bg-[#d9ff3f] px-5 py-24 md:px-10 md:py-32 lg:px-14">
    <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
      <div className="reveal relative aspect-square max-w-[590px]">
        <div className="absolute inset-[2%_12%_8%_2%] -rotate-3 rounded-[3rem] border-2 border-[#17201b]"/>
        <div className="noise absolute inset-[8%_2%_2%_10%] rotate-2 overflow-hidden rounded-[3rem] bg-[#405cff] text-white"><div className="absolute -right-20 -top-16 h-64 w-64 rounded-full border-[50px] border-white/10"/><div className="absolute bottom-[8%] left-[8%] right-[8%]"><div className="display text-[clamp(5rem,14vw,11rem)] leading-none text-[#d9ff3f]">DN</div><div className="mt-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[.2em]"><span className="h-px w-10 bg-white/40"/> Developer · Problem solver</div></div></div>
        <div className="absolute right-0 top-[6%] grid h-24 w-24 -rotate-6 place-items-center rounded-full bg-[#ef755f] text-center text-[10px] font-black uppercase tracking-wider shadow-lg">Build<br/>with purpose</div>
      </div>
      <div className="reveal"><div className="mb-5 text-xs font-black uppercase tracking-[.18em]">A little about me</div><h2 className="display text-5xl leading-[.95] md:text-7xl">Enterprise depth.<br/>Product mindset.</h2><div className="mt-8 grid gap-5 text-lg leading-relaxed text-black/65 md:grid-cols-2"><p>I specialize in SharePoint Online, Microsoft Purview and Power Platform solutions—from document governance and sensitivity labels to migrations, enterprise search and automated workflows.</p><p>I also build Azure-integrated full-stack products with React, TypeScript, C# and .NET, connecting thoughtful user interfaces to dependable APIs, data and deployment pipelines.</p></div><div className="mt-10 flex flex-wrap gap-3"><a href="#contact" className="focus-ring inline-flex items-center gap-3 rounded-full bg-[#17201b] px-7 py-4 font-bold text-white hover:bg-[#405cff]">Talk about a role <ArrowRight size={18}/></a><a href="/resume/Dilip_Nandaniya_Resume.pdf" target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-3 rounded-full border border-black/25 px-7 py-4 font-bold hover:bg-white/40">View full resume <ExternalLink size={17}/></a></div></div>
    </div>
  </section>
}

function Contact() {
  return <section id="contact" className="noise bg-[#f3f2ec] px-5 py-24 md:px-10 md:py-32 lg:px-14">
    <div className="mx-auto max-w-[1440px]">
      <div className="reveal relative overflow-hidden rounded-[2.5rem] bg-[#405cff] px-7 py-12 text-white md:px-14 md:py-16 lg:px-20 lg:py-20">
        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full border-[70px] border-white/10"/><div className="absolute -bottom-24 right-[23%] h-56 w-56 rounded-full bg-[#d9ff3f]/20 blur-3xl"/>
        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end"><div><div className="mb-5 text-xs font-black uppercase tracking-[.2em] text-[#d9ff3f]">Let’s make something useful</div><h2 className="display max-w-4xl text-6xl leading-[.88] md:text-8xl">Have a challenge<br/>worth solving?</h2><p className="mt-7 max-w-xl text-lg leading-relaxed text-white/65">I’m open to developer opportunities and freelance projects across Microsoft 365, SharePoint, Purview, Azure and full-stack development.</p></div><div className="grid gap-3 lg:min-w-[360px] lg:justify-self-end"><a href="mailto:dilipnandaniya5585@gmail.com" className="focus-ring flex items-center justify-between rounded-full bg-[#d9ff3f] px-6 py-5 font-black text-[#17201b] transition hover:bg-white">Email me <Mail size={20}/></a><a href="tel:+919409247369" className="focus-ring flex items-center justify-between rounded-full border border-white/20 px-6 py-4 font-bold text-white transition hover:bg-white/10"><span>+91 94092 47369</span><Phone size={18}/></a><a href="https://www.linkedin.com/in/dilip-nandaniya" target="_blank" rel="noreferrer" className="focus-ring flex items-center justify-between rounded-full border border-white/20 px-6 py-4 font-bold text-white transition hover:bg-white/10"><span>Connect on LinkedIn</span><ExternalLink size={18}/></a></div></div>
      </div>
      <footer className="flex flex-col gap-7 pt-12 md:flex-row md:items-end md:justify-between"><div><Logo/><p className="mt-4 max-w-md text-sm leading-relaxed text-black/45">Microsoft 365, SharePoint, Purview and full-stack development—shaped into clear enterprise solutions.</p></div><div className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold"><a className="focus-ring rounded-sm hover:text-[#405cff]" href="mailto:dilipnandaniya5585@gmail.com">Email</a><a className="focus-ring rounded-sm hover:text-[#405cff]" href="https://www.linkedin.com/in/dilip-nandaniya" target="_blank" rel="noreferrer">LinkedIn</a><a className="focus-ring rounded-sm hover:text-[#405cff]" href="/resume/Dilip_Nandaniya_Resume.pdf" target="_blank" rel="noreferrer">Resume</a><span className="text-black/35">© {new Date().getFullYear()} Dilip Nandaniya</span></div></footer>
    </div>
  </section>
}

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: .12 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return <><Header/><main><Hero/><Marquee/><Work/><Expertise/><Experience/><About/><Contact/></main></>
}
