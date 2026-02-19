export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'high' | 'medium' | 'low';
  column: string;
  created: string;
  tags: string[];
  _local?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'meeting' | 'cron' | 'deadline' | 'reminder' | 'personal' | 'interview';
  date: string;
  time: string;
  duration: number;
  recurring: string | null;
  description: string;
}

export interface ContentItem {
  id: string;
  title: string;
  type: 'podcast' | 'newsletter' | 'linkedin';
  stage: string;
  notes: string;
  created: string;
  updated: string;
}

export interface Memory {
  id: string;
  date: string;
  category: string;
  tags: string[];
  title: string;
  content: string;
}

export const TASK_COLUMNS = ['Not started', 'In Progress', 'Review', 'Done'];
export const CONTENT_STAGES = ['Ideas', 'Script', 'Recording', 'Editing', 'Published'];

// =================== REAL TASKS FROM NOTION ===================
// Source: Notion Tasks Tracker (270ef052-25bb-80fd-ab9b-cb32452deb2e)
// Pulled: 2026-02-19
export const initialTasks: Task[] = [
  { id: '270ef052-25bb-80f4-9e8f-f755ab1aca20', title: 'Contract talks with Otter', description: '', assignee: 'Kyle', priority: 'high', column: 'In Progress', created: '2025-09-16', tags: ['partnerships', 'contracts'] },
  { id: '2edef052-25bb-817f-9865-d11f495343cc', title: 'Team Commitments to Monitor', description: 'Running list of commitments from direct reports that KAI extracts from meetings. Direct Reports: Steve Dinner, Maria Paula Soto, Ryan Berner, Brandon Davenport, Robert Yuen, Tina Glickman', assignee: 'KAI', priority: 'high', column: 'In Progress', created: '2026-01-19', tags: ['team', 'accountability'] },
  { id: '2e0ef052-25bb-8019-8cfd-c985b3a9fb16', title: 'Sales rep skills analysis', description: 'Nat and Kaitlyn working on pulling the data', assignee: 'Kyle', priority: 'medium', column: 'In Progress', created: '2026-01-06', tags: ['sales', 'analysis'] },
  { id: '2d1ef052-25bb-8177-87d6-c59b340280a5', title: 'Execute option exercise on January 2 for tax efficiency', description: 'From Kyle/Sanjiv Sync - Dec 18. Convert shares to capital gains for tax efficiency', assignee: 'Kyle', priority: 'high', column: 'Not started', created: '2025-12-22', tags: ['finance', 'tax', 'options'] },
  { id: '2d1ef052-25bb-8106-a5c2-f8c1fbde11db', title: 'Schedule workout sync with Sanjiv in early January', description: 'From Kyle/Sanjiv Sync - Dec 18', assignee: 'Kyle', priority: 'low', column: 'Not started', created: '2025-12-22', tags: ['personal', 'health'] },
  { id: '2d1ef052-25bb-81c3-81d4-e87904ff97af', title: 'Prepare sales leadership profile definition for Govdash recruitment', description: 'From Kyle/Sanjiv Sync - Dec 18. Define VP Sales profile to scale Govdash in 18 months.', assignee: 'Kyle', priority: 'medium', column: 'Not started', created: '2025-12-22', tags: ['hiring', 'advisory'] },
  { id: '2d2ef052-25bb-803a-bafd-cc32f8886a2d', title: 'Sell some POS deals', description: '', assignee: 'Kyle', priority: 'medium', column: 'Not started', created: '2025-12-23', tags: ['sales', 'pos'] },
  { id: '2e1ef052-25bb-809c-9118-f7db2e9795ac', title: 'Snappr photoshoot approach', description: 'Should we present the customer a launch cost that they opt out of? We want the default to be doing and paying for a photoshoot', assignee: 'Kyle', priority: 'medium', column: 'Not started', created: '2026-01-07', tags: ['launch', 'process'] },
  { id: '308ef052-25bb-80d5-ba4c-e9b76ca25e69', title: 'Datalane intro', description: '', assignee: 'Kyle', priority: 'low', column: 'Not started', created: '2026-02-15', tags: ['networking'] },
];

// =================== REAL CALENDAR EVENTS ===================
// Source: Google Calendar (kyle@owner.com) + KAI Cron Jobs
// Pulled: 2026-02-19
export const initialEvents: CalendarEvent[] = [
  // ── Feb 19 (Thu) — Today ──
  { id: 'e-0219-lift', title: 'Lift', type: 'personal', date: '2026-02-19', time: '06:30', duration: 60, recurring: null, description: 'Morning strength training' },
  { id: 'e-0219-michelle', title: 'Michelle short', type: 'meeting', date: '2026-02-19', time: '07:30', duration: 30, recurring: null, description: '' },
  { id: 'e-0219-dorsey', title: 'Kyle Norton and Kevin Dorsey', type: 'meeting', date: '2026-02-19', time: '08:00', duration: 30, recurring: null, description: '' },
  { id: 'e-0219-chloe', title: 'Final Round Interview - Chloe Petteplace (SDR Intern, Toronto)', type: 'interview', date: '2026-02-19', time: '08:30', duration: 30, recurring: null, description: 'Sales Development Representative intern candidate' },
  { id: 'e-0219-rob', title: '1:1 Rob <> Kyle | Performance Review', type: 'meeting', date: '2026-02-19', time: '09:00', duration: 45, recurring: 'weekly', description: 'Rob Yuen performance review sync' },
  { id: 'e-0219-vivi', title: 'Kyle <> Vivi', type: 'meeting', date: '2026-02-19', time: '09:45', duration: 15, recurring: null, description: '' },
  { id: 'e-0219-vibescale', title: 'Vibescaling Podcast Recording', type: 'meeting', date: '2026-02-19', time: '10:30', duration: 60, recurring: null, description: 'Guest appearance on Vibescaling podcast (includes travel time hold 10:00-12:00)' },
  { id: 'e-0219-youssef', title: 'Kyle / Youssef', type: 'meeting', date: '2026-02-19', time: '11:30', duration: 30, recurring: null, description: '' },
  { id: 'e-0219-cw', title: 'CWs Outside Qualification Criteria', type: 'meeting', date: '2026-02-19', time: '12:00', duration: 30, recurring: null, description: '' },
  { id: 'e-0219-pos', title: 'POS Sync', type: 'meeting', date: '2026-02-19', time: '12:30', duration: 30, recurring: 'weekly', description: 'Weekly POS product sync' },
  { id: 'e-0219-slt', title: 'Owner SLT | February', type: 'meeting', date: '2026-02-19', time: '13:00', duration: 60, recurring: 'monthly', description: 'Senior Leadership Team monthly meeting' },
  { id: 'e-0219-lighthouse', title: 'Kyle Norton <> Brett Kohn & Dave Collier (Lighthouse)', type: 'meeting', date: '2026-02-19', time: '14:00', duration: 30, recurring: null, description: 'Lighthouse partnership discussion' },
  { id: 'e-0219-lauren', title: 'Office | 1:1 Kyle <> Lauren', type: 'meeting', date: '2026-02-19', time: '14:30', duration: 30, recurring: 'weekly', description: '' },
  { id: 'e-0219-riviera', title: 'Kyle Norton <> Arjun Reddy (Riviera)', type: 'meeting', date: '2026-02-19', time: '15:00', duration: 30, recurring: null, description: '' },
  { id: 'e-0219-asad', title: 'Kyle <> Asad | Catch up', type: 'meeting', date: '2026-02-19', time: '15:30', duration: 45, recurring: null, description: '' },
  { id: 'e-0219-shari', title: 'Kyle Norton <> Shari Johnston', type: 'meeting', date: '2026-02-19', time: '16:30', duration: 30, recurring: null, description: '' },
  { id: 'e-0219-ali', title: 'Ali x Kyle', type: 'meeting', date: '2026-02-19', time: '17:00', duration: 15, recurring: null, description: '' },

  // ── Feb 20 (Fri) ──
  { id: 'e-0220-run', title: 'Trail Run | Kyle <> Harris', type: 'personal', date: '2026-02-20', time: '06:45', duration: 60, recurring: null, description: 'Morning trail run with Harris' },
  { id: 'e-0220-ty', title: 'Final Round Interview - Ty Stansfield (SDR, Toronto)', type: 'interview', date: '2026-02-20', time: '08:00', duration: 30, recurring: null, description: 'Sales Development Representative candidate' },
  { id: 'e-0220-mj', title: 'Final Round Interview - Maryjose (MJ) Cobos (Onboarding Specialist)', type: 'interview', date: '2026-02-20', time: '08:30', duration: 30, recurring: null, description: 'Customer Onboarding Specialist candidate' },
  { id: 'e-0220-brendan', title: 'Kyle Norton <> Brendan McBride: Bi-weekly', type: 'meeting', date: '2026-02-20', time: '09:00', duration: 30, recurring: 'biweekly', description: '' },
  { id: 'e-0220-kevin', title: 'Kevin / Kyle', type: 'meeting', date: '2026-02-20', time: '09:30', duration: 60, recurring: null, description: 'Kevin Wranovix sync' },
  { id: 'e-0220-ryan', title: '1:1 Kyle <> Ryan', type: 'meeting', date: '2026-02-20', time: '10:30', duration: 30, recurring: 'weekly', description: 'Ryan Berner weekly sync' },
  { id: 'e-0220-podcast', title: 'Podcast Recording: The Revenue Leadership Podcast', type: 'meeting', date: '2026-02-20', time: '11:00', duration: 90, recurring: null, description: 'Revenue Leadership Podcast recording session' },
  { id: 'e-0220-script', title: 'AE Script Review | +PROFIT Onsite', type: 'meeting', date: '2026-02-20', time: '12:30', duration: 90, recurring: null, description: '' },
  { id: 'e-0220-elia', title: 'Kyle Norton <> Elia Wallen | Intro', type: 'meeting', date: '2026-02-20', time: '14:00', duration: 30, recurring: null, description: '' },
  { id: 'e-0220-arwin', title: 'Kyle Norton <> Arwin Rahmatpanah | Bi-weekly sync', type: 'meeting', date: '2026-02-20', time: '14:30', duration: 30, recurring: 'biweekly', description: '' },
  { id: 'e-0220-sasan', title: '1:1 Kyle <> Sasan', type: 'meeting', date: '2026-02-20', time: '15:00', duration: 30, recurring: 'weekly', description: 'Sasan Mahapourian POS GTM sync' },
  { id: 'e-0220-kalil', title: 'Final Round Interview - Kalil Langston (Account Executive)', type: 'interview', date: '2026-02-20', time: '15:30', duration: 45, recurring: null, description: 'AE candidate final round' },
  { id: 'e-0220-dad', title: 'DNB - Dad duty', type: 'personal', date: '2026-02-20', time: '16:15', duration: 105, recurring: null, description: 'Family time — dinner, bath, bedtime' },

  // ── Feb 21 (Sat) ──
  { id: 'e-0221-hiit', title: 'HIIT Ride/Run', type: 'personal', date: '2026-02-21', time: '14:00', duration: 30, recurring: 'weekly', description: 'High intensity interval training' },

  // ── Feb 22 (Sun) ──
  { id: 'e-0222-lift', title: 'Lift', type: 'personal', date: '2026-02-22', time: '10:30', duration: 75, recurring: null, description: 'Strength training session' },
  { id: 'e-0222-weekplan', title: 'Calendar Review & Week Plan', type: 'reminder', date: '2026-02-22', time: '18:00', duration: 60, recurring: 'weekly', description: 'Sunday evening week planning session' },

  // ── Feb 23 (Mon) ──
  { id: 'e-0223-lift', title: 'Lift', type: 'personal', date: '2026-02-23', time: '06:30', duration: 60, recurring: null, description: 'Morning strength training' },
  { id: 'e-0223-weeklyprep', title: 'Weekly Prep', type: 'meeting', date: '2026-02-23', time: '08:00', duration: 60, recurring: 'weekly', description: 'Monday morning weekly preparation' },
  { id: 'e-0223-exec', title: 'Exec Meeting', type: 'meeting', date: '2026-02-23', time: '09:00', duration: 90, recurring: 'weekly', description: 'Executive leadership meeting' },
  { id: 'e-0223-allhands', title: 'Weekly All-Hands Meeting', type: 'meeting', date: '2026-02-23', time: '10:30', duration: 30, recurring: 'weekly', description: 'Company-wide all-hands' },
  { id: 'e-0223-revslt', title: 'Rev SLT Weekly', type: 'meeting', date: '2026-02-23', time: '11:30', duration: 45, recurring: 'weekly', description: 'Revenue Senior Leadership Team weekly sync' },
  { id: 'e-0223-buildops', title: 'Kyle Norton <> BuildOps Team | Momentum', type: 'meeting', date: '2026-02-23', time: '12:30', duration: 30, recurring: null, description: '' },
  { id: 'e-0223-mapi', title: '1:1 Kyle <> Maria Paula', type: 'meeting', date: '2026-02-23', time: '13:00', duration: 30, recurring: 'weekly', description: 'Maria Paula Soto (Launch) weekly sync' },
  { id: 'e-0223-genevieve', title: 'Kyle Norton <> Genevieve Robertson | Intro', type: 'meeting', date: '2026-02-23', time: '13:30', duration: 30, recurring: null, description: '' },
  { id: 'e-0223-raphael', title: 'Final Round Interview - Raphael Peralta (SDR Intern, Toronto)', type: 'interview', date: '2026-02-23', time: '14:00', duration: 30, recurring: null, description: '' },
  { id: 'e-0223-robbie', title: 'Final Round Interview - Robbie Leslie (SDR, Toronto)', type: 'interview', date: '2026-02-23', time: '14:30', duration: 30, recurring: null, description: '' },
  { id: 'e-0223-rob', title: 'Office | 1:1 Rob <> Kyle', type: 'meeting', date: '2026-02-23', time: '15:00', duration: 45, recurring: 'weekly', description: 'Rob Yuen weekly sync' },
  { id: 'e-0223-wyatt', title: '1:1 Kyle <> Wyatt', type: 'meeting', date: '2026-02-23', time: '16:00', duration: 30, recurring: 'weekly', description: '' },
  { id: 'e-0223-eod', title: 'EOD Update', type: 'reminder', date: '2026-02-23', time: '16:30', duration: 30, recurring: 'daily', description: 'End of day update/review' },
  { id: 'e-0223-happy', title: 'Happy Hour hosted by Wealthsimple', type: 'meeting', date: '2026-02-23', time: '17:00', duration: 120, recurring: null, description: 'Networking event' },

  // ── Feb 24 (Tue) ──
  { id: 'e-0224-swim', title: 'Swim', type: 'personal', date: '2026-02-24', time: '06:30', duration: 45, recurring: null, description: 'Morning swim session' },
  { id: 'e-0224-salesleadership', title: 'Sales Leadership Weekly', type: 'meeting', date: '2026-02-24', time: '08:00', duration: 60, recurring: 'weekly', description: 'Weekly sales leadership meeting' },
  { id: 'e-0224-jonathan', title: '1:1 Kyle <> Jonathan', type: 'meeting', date: '2026-02-24', time: '09:00', duration: 30, recurring: 'weekly', description: '' },
  { id: 'e-0224-ryan', title: '1:1 Kyle <> Ryan', type: 'meeting', date: '2026-02-24', time: '09:30', duration: 30, recurring: 'weekly', description: '' },
  { id: 'e-0224-tina', title: '1:1 Kyle <> Tina', type: 'meeting', date: '2026-02-24', time: '10:00', duration: 30, recurring: 'weekly', description: 'Tina Glickman weekly sync' },
  { id: 'e-0224-steve', title: '1:1 Kyle <> Steve', type: 'meeting', date: '2026-02-24', time: '10:30', duration: 30, recurring: 'weekly', description: 'Steve Dinner weekly sync' },
  { id: 'e-0224-amanda', title: 'Kyle <> Amanda | Intro', type: 'meeting', date: '2026-02-24', time: '11:00', duration: 20, recurring: null, description: '' },
  { id: 'e-0224-hemavantha', title: 'Final Round Interview - Hemavantha Varma (Principal Solution Architect)', type: 'interview', date: '2026-02-24', time: '11:30', duration: 30, recurring: null, description: '' },
  { id: 'e-0224-jeremy', title: 'Final Round Interview - Jeremy Edwards (SDR, Toronto)', type: 'interview', date: '2026-02-24', time: '12:00', duration: 30, recurring: null, description: '' },
  { id: 'e-0224-isaac', title: 'Final Round Interview - Isaac Oshunniyi (BDR, Toronto)', type: 'interview', date: '2026-02-24', time: '13:00', duration: 30, recurring: null, description: '' },
  { id: 'e-0224-roby', title: '1:1 Kyle <> Rob Y', type: 'meeting', date: '2026-02-24', time: '13:30', duration: 30, recurring: 'weekly', description: 'Rob Yuen weekly sync' },
  { id: 'e-0224-pos', title: 'Weekly POS Updates', type: 'meeting', date: '2026-02-24', time: '14:00', duration: 45, recurring: 'weekly', description: '' },
  { id: 'e-0224-chris', title: '1:1 Chris Moreira <> Kyle', type: 'meeting', date: '2026-02-24', time: '15:00', duration: 30, recurring: 'weekly', description: '' },
  { id: 'e-0224-eod', title: 'EOD Update', type: 'reminder', date: '2026-02-24', time: '16:00', duration: 30, recurring: 'daily', description: '' },

  // ── Feb 25 (Wed) ──
  { id: 'e-0225-lift', title: 'Lift', type: 'personal', date: '2026-02-25', time: '06:30', duration: 60, recurring: null, description: 'Morning strength training' },
  { id: 'e-0225-riley', title: 'Final Round Interview - Riley O\'Brien (SDR, Toronto)', type: 'interview', date: '2026-02-25', time: '08:30', duration: 30, recurring: null, description: '' },
  { id: 'e-0225-mackenzie', title: 'Final Round Interview - Mackenzie McKeage (SDR, Toronto)', type: 'interview', date: '2026-02-25', time: '09:00', duration: 30, recurring: null, description: '' },
  { id: 'e-0225-berner', title: 'Kyle <> Berner <> Davenport <> Kaitlyn', type: 'meeting', date: '2026-02-25', time: '09:30', duration: 30, recurring: null, description: 'Sales leadership sync with Berner, Davenport, and Kaitlyn' },
  { id: 'e-0225-ray', title: 'Kyle Norton <> Ray Owais', type: 'meeting', date: '2026-02-25', time: '10:00', duration: 30, recurring: null, description: '' },
  { id: 'e-0225-dennin', title: 'Quarterly: Kyle <> Dennin', type: 'meeting', date: '2026-02-25', time: '10:30', duration: 30, recurring: 'quarterly', description: 'Quarterly check-in with Dennin' },
  { id: 'e-0225-midquarter', title: 'The Mid-Quarter Boost LIVE: Objection Handling for SDRs', type: 'meeting', date: '2026-02-25', time: '11:00', duration: 60, recurring: null, description: 'Live SDR training session on objection handling' },
  { id: 'e-0225-brandon', title: '1:1 Kyle <> Brandon', type: 'meeting', date: '2026-02-25', time: '12:00', duration: 30, recurring: 'weekly', description: 'Brandon Davenport (XDR) weekly sync' },
  { id: 'e-0225-brendan', title: 'Kyle Norton <> Brendan McBride: Bi-weekly', type: 'meeting', date: '2026-02-25', time: '13:00', duration: 30, recurring: 'biweekly', description: '' },
  { id: 'e-0225-lauren', title: 'Office | 1:1 Kyle <> Lauren', type: 'meeting', date: '2026-02-25', time: '13:30', duration: 30, recurring: 'weekly', description: '' },
  { id: 'e-0225-ciara', title: 'Full Round Interview - Ciara McVicar-Scorgie (People BP, CX & GTM)', type: 'interview', date: '2026-02-25', time: '14:00', duration: 30, recurring: null, description: '' },
  { id: 'e-0225-interview2', title: 'Interview', type: 'interview', date: '2026-02-25', time: '14:30', duration: 30, recurring: null, description: '' },
  { id: 'e-0225-avarra', title: 'Avarra Advisory Meeting', type: 'meeting', date: '2026-02-25', time: '15:00', duration: 45, recurring: null, description: 'Advisory board meeting' },
  { id: 'e-0225-spiro', title: 'Kyle Norton <> Michael Spiro', type: 'meeting', date: '2026-02-25', time: '16:00', duration: 30, recurring: null, description: '' },
  { id: 'e-0225-training', title: 'Sales Training Videos', type: 'meeting', date: '2026-02-25', time: '16:30', duration: 30, recurring: null, description: '' },

  // ── KAI Cron Jobs (recurring) ──
  { id: 'cron-morning', title: 'KAI Morning Briefing', type: 'cron', date: '2026-02-19', time: '07:00', duration: 15, recurring: 'weekdays', description: 'KAI delivers morning briefing — emails, calendar, priorities' },
  { id: 'cron-slack', title: 'Slack Nightly Digest', type: 'cron', date: '2026-02-19', time: '23:00', duration: 10, recurring: 'daily', description: 'KAI summarizes key Slack activity from the day' },
  { id: 'cron-memory', title: 'Nightly Memory Update', type: 'cron', date: '2026-02-19', time: '23:00', duration: 10, recurring: 'daily', description: 'KAI updates long-term memory files and context' },
  { id: 'cron-audit', title: 'Daily Workspace Audit', type: 'cron', date: '2026-02-19', time: '14:00', duration: 10, recurring: 'daily', description: 'KAI audits workspace files and git status (currently erroring)' },
  { id: 'cron-maple', title: 'MAPLE Update', type: 'cron', date: '2026-02-20', time: '16:00', duration: 20, recurring: 'fridays', description: 'KAI generates weekly MAPLE update for exec team' },
  { id: 'cron-cro-brief', title: 'CRO Weekly Brief', type: 'cron', date: '2026-02-22', time: '17:00', duration: 30, recurring: 'sundays', description: 'KAI generates comprehensive CRO weekly prep with leadership review' },
  { id: 'cron-weekly-prep', title: 'Weekly Prep', type: 'cron', date: '2026-02-22', time: '18:00', duration: 20, recurring: 'sundays', description: 'KAI preps calendar, priorities, and context for the week ahead' },
];

// =================== REAL CONTENT PIPELINE ===================
// Source: Memory files + known initiatives
export const initialContent: ContentItem[] = [
  { id: 'c1', title: 'Vibescaling Podcast Guest Appearance', type: 'podcast', stage: 'Recording', notes: 'Kyle appearing as a guest on the Vibescaling podcast. Recording today Feb 19, 10:30am-11:30am PT. Travel time hold included.', created: '2026-02-12', updated: '2026-02-19' },
  { id: 'c2', title: 'Revenue Leadership Podcast - Next Episode', type: 'podcast', stage: 'Recording', notes: 'Recording session scheduled for Feb 20, 11:00am-12:30pm PT. Kyle\'s own podcast — continuing to build the revenue leadership brand.', created: '2026-02-10', updated: '2026-02-19' },
  { id: 'c3', title: 'The Mid-Quarter Boost LIVE: Objection Handling for SDRs', type: 'linkedin', stage: 'Script', notes: 'Live training session on Feb 25. Potential to repurpose into LinkedIn content and newsletter material. Objection handling frameworks for SDR teams.', created: '2026-02-15', updated: '2026-02-19' },
  { id: 'c4', title: 'Coaching Mastery Newsletter', type: 'newsletter', stage: 'Ideas', notes: 'Kyle\'s ongoing newsletter on revenue leadership and coaching. Part of the "Coaching Mastery" initiative. Topics: RevenueOS, MAPLE framework, corporate athlete model.', created: '2026-01-15', updated: '2026-02-18' },
  { id: 'c5', title: 'AE Script Review / +PROFIT Methodology', type: 'linkedin', stage: 'Ideas', notes: 'AE Script Review session happening Feb 20 during Toronto onsite. Could become LinkedIn content about sales methodology and script optimization.', created: '2026-02-18', updated: '2026-02-19' },
  { id: 'c6', title: 'Revenue Operating System (RevenueOS) Framework', type: 'newsletter', stage: 'Script', notes: 'Formalizing the RevenueOS framework: Measuring, Managing, Planning, Communicating rhythm. Core thought leadership piece for Substack.', created: '2026-02-01', updated: '2026-02-16' },
  { id: 'c7', title: 'Synapse Selling Methodology Overview', type: 'linkedin', stage: 'Ideas', notes: 'Owner.com\'s structured sales motion philosophy. Potential multi-part LinkedIn series breaking down the methodology for revenue leaders.', created: '2026-02-10', updated: '2026-02-10' },
  { id: 'c8', title: 'Leadership Academy Launch Content', type: 'newsletter', stage: 'Ideas', notes: 'Content around the Leadership Academy initiative at Owner.com. Building next-gen revenue leaders. Could be a compelling Substack series.', created: '2026-02-05', updated: '2026-02-05' },
];

// =================== REAL MEMORIES ===================
// Source: MEMORY.md + memory/2026-02-18.md + memory/2026-02-19.md
export const initialMemories: Memory[] = [
  { id: 'm1', date: '2026-02-19', category: 'operations', tags: ['skills', 'cron', 'weekly-prep'], title: 'Weekly Prep Skill Rebuild & CRO Brief Setup', content: 'Rebuilt the weekly prep skill from scratch — now uses gog for calendar, curl for Notion API, outputs conversational text. Created cron job for Sunday 5PM PT. Expanded into "CRO Weekly Brief" with Leadership Review section covering Sales and Launch functions. Key direct reports to track: Kevin Wranovix (AEs), Brandon Davenport (XDR), Mapi Soto (Launch).' },
  { id: 'm2', date: '2026-02-19', category: 'strategy', tags: ['gtm', 'big-rocks', '2026'], title: 'GTM Big Rocks Mapped from Notion', content: 'Found and mapped all 6 GTM rocks from Owner 2026 Plan: (1) Launch & Refine New Pricing → Rob Yuen, (2) Scale POS GTM → Sasan Mahapourian, (3) Launch as Strategic Partner → Mapi Soto, (4) Scale Lighthouse/Mid-Market → Kevin Wranovix, (5) Support Bottom of Market (Semi-Self-Serve) → Cross-functional, (6) Materially Improve Efficiency & Productivity → Kyle + Will Schreiber. Can\'t Miss KPIs: Monthly eMRR goal, 90% Launch rate, 99% F30D Retention.' },
  { id: 'm3', date: '2026-02-19', category: 'operations', tags: ['mbr', 'sales', 'launch'], title: 'MBR Action Items Integrated', content: 'Integrated Jan 2026 MBR data. Key Sales actions: Tom waterfall view, model adjustment, probationary period for new AEs (Kevin\'s now). Key Launch actions: Mapi iOS SLA comms, Will+Mapi launch step metrics. App launch metric extended 28→35 days during Apple delays.' },
  { id: 'm4', date: '2026-02-18', category: 'operations', tags: ['openclaw', 'setup', 'github'], title: 'OpenClaw Setup & Configuration Day', content: 'Completed OpenClaw onboarding. Created workspace files, connected to GitHub (funky-mnky/claude-brain). Added skill security audit protocol. Configured Telegram (working), web UI via Tailscale (working), TUI (still broken). Gateway on loopback with Tailscale serve. Elevated command approval system unreliable.' },
  { id: 'm5', date: '2026-02-18', category: 'profile', tags: ['memory', 'kyle', 'context'], title: 'MEMORY.md Built — Full Kyle Profile', content: 'Built comprehensive long-term memory: Kyle Norton, 38, CRO at Owner.com. From Vancouver → Toronto → Mill Valley. Married, two kids. Previously Shopify. 750+ consecutive workout day streak. Cross-border tax complexity (Canadian → US). Key frameworks: Revenue Operating System, MAPLE, CRAMPS, Synapse Selling, Corporate Athlete.' },
  { id: 'm6', date: '2026-02-19', category: 'team', tags: ['direct-reports', 'org'], title: 'Direct Report Scope Clarified', content: 'Kyle clarified Leadership Review focus: Sales and Launch ONLY. Sales leaders: Kevin Wranovix (AEs), Brandon Davenport (XDR). Launch leader: Mapi Soto. Rob, Sasan, Tina, Steve = supporting context, not primary review targets. Full direct reports: Tina Glickman, Mapi Soto, Rob Yuen, Steve Dinner, Brandon Davenport, Sasan Mahapourian, Kevin Wranovix.' },
  { id: 'm7', date: '2026-02-15', category: 'profile', tags: ['health', 'protocol', 'supplements'], title: 'Health Operating System', content: 'Kyle\'s health stack: 84kg/187lbs, 14.2% body fat, RMR 1858 kcal. Training: Strength 3x/week, Zone 2 3x/week (1hr bike rides), HIIT 1x/week, Mobility 1x/week. 750+ consecutive workout day streak. Supplements: Whey 50g, creatine 10g, AG1, magnesium threonate, ashwagandha, tongkat ali, NMN 250mg, L-theanine, D3+K, B12, L-carnitine. CPAP since April 2025.' },
  { id: 'm8', date: '2026-02-10', category: 'strategy', tags: ['owner-com', 'revenue', '2026'], title: '2026 Strategic Priorities', content: 'Board-aligned revenue org priorities: Scale ARR $28M → $50M (78% growth). Improve NRR 108% → 115%. Achieve $200K+ enterprise ACV deals (currently avg $85K). Launch partnership channel to 15% of new ARR (currently 8%). Reduce CAC payback 18mo → 14mo. Kyle\'s personal focus: enterprise upmarket motion, AI-augmented sales, revenue leadership brand.' },
  { id: 'm9', date: '2026-02-01', category: 'profile', tags: ['owner-com', 'product', 'context'], title: 'Owner.com Platform Overview', content: 'Owner.com: restaurant technology platform helping independent restaurants compete with chains and delivery apps. Products: Online ordering, marketing automation (email/SMS/loyalty), website builder, review management. Founded by Adam Guild. Key differentiator: restaurants keep 100% of revenue vs 15-30% on DoorDash/UberEats. 10,000+ restaurants. Kyle joined as CRO in 2024.' },
  { id: 'm10', date: '2026-01-25', category: 'profile', tags: ['kyle', 'communication', 'style'], title: 'Kyle\'s Communication & Cognitive Profile', content: 'Communication: Direct, candid, structured. Research-backed, framework-first, high signal. Zero tolerance for fluff or pseudoscience. Cognitive: Hierarchical systems thinker, schema builder. Strategic long-horizon decision maker. Calculated aggression on risk. High complexity tolerance. Under stress: increases intensity and structure, risk of reduced recovery prioritization.' },
  { id: 'm11', date: '2026-01-20', category: 'profile', tags: ['kyle', 'goals', 'personal'], title: 'Kyle\'s 3-5 Year Goals', content: 'Career: Build Owner into dominant vertical SaaS, establish reputation as elite revenue operator. Financial: Maximize equity outcome (QSBS, cross-border tax strategy). Health: Maximize healthspan, sub-15% body fat, maintain fitness into 40s. Family: High-engagement father, design quality experiences (Tahoe, travel, outdoor culture). Reputation: Known as disciplined, high-agency revenue architect.' },
  { id: 'm12', date: '2026-01-15', category: 'profile', tags: ['leadership', 'frameworks'], title: 'Leadership Philosophy & Frameworks', content: 'Core: Servant leadership with performance culture. Radical ownership. Key frameworks: Revenue Operating System (measure, manage, plan, communicate), MAPLE (Metrics, Advanced, Planned, Learnings, Emergencies), CRAMPS (Community, Autonomy, Mastery, Purpose, Career Steps), Coaching Mastery (questions-based coaching, deep practice), Synapse Selling, Corporate Athlete model.' },
];

export const activities = [
  { color: 'var(--accent)', actor: 'KAI', text: 'rebuilt weekly prep skill — now uses real APIs (gog + Notion)', time: '3 hours ago' },
  { color: 'var(--green)', actor: 'KAI', text: 'mapped all 6 GTM Big Rocks from Notion 2026 Plan', time: '4 hours ago' },
  { color: 'var(--purple)', actor: 'KAI', text: 'integrated Jan 2026 MBR action items into context', time: '5 hours ago' },
  { color: 'var(--orange)', actor: 'KAI', text: 'set up CRO Weekly Brief cron — Sundays 5PM PT', time: '6 hours ago' },
  { color: 'var(--accent)', actor: 'KAI', text: 'completed OpenClaw setup — Telegram, web UI, GitHub sync', time: '14 hours ago' },
  { color: 'var(--pink)', actor: 'KAI', text: 'built MEMORY.md with full Kyle profile and context', time: '14 hours ago' },
  { color: 'var(--cyan)', actor: 'KAI', text: 'created skill security audit protocol in AGENTS.md', time: '15 hours ago' },
];
