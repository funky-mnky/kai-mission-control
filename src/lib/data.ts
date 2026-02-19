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
  type: 'meeting' | 'cron' | 'deadline' | 'reminder';
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

export const TASK_COLUMNS = ['Backlog', 'In Progress', 'Review', 'Done'];
export const CONTENT_STAGES = ['Ideas', 'Script', 'Thumbnail', 'Filming', 'Editing', 'Published'];

export const initialTasks: Task[] = [
  { id: 't1', title: 'Q1 Revenue Forecast Update', description: 'Update the Q1 revenue forecast model with January actuals and February pipeline data. Need to present to leadership next week.', assignee: 'Kyle', priority: 'high', column: 'In Progress', created: '2026-02-15', tags: ['finance', 'leadership'] },
  { id: 't2', title: 'Prep Revenue Leadership Podcast Ep. 47', description: 'Guest: VP of Sales at Figma. Topics: PLG to sales-led transition, hiring first AEs, comp plans. Need to finalize questions and send pre-read.', assignee: 'Kyle', priority: 'high', column: 'In Progress', created: '2026-02-12', tags: ['podcast', 'content'] },
  { id: 't3', title: 'Analyze CS Health Score Data', description: 'KAI to pull and analyze customer health scores from last quarter. Identify accounts at risk and prepare summary for CS team sync.', assignee: 'KAI', priority: 'high', column: 'In Progress', created: '2026-02-17', tags: ['cs', 'data'] },
  { id: 't4', title: 'Draft LinkedIn Post: Cold Outbound Lessons', description: 'Write a LinkedIn post about the 5 cold outbound lessons learned from scaling Owner.com\'s SDR team from 2 to 15.', assignee: 'KAI', priority: 'medium', column: 'Review', created: '2026-02-14', tags: ['linkedin', 'content'] },
  { id: 't5', title: 'Weekly GTM MAPLE Sync Prep', description: 'Prepare agenda and metrics for weekly GTM MAPLE meeting. Pull latest pipeline numbers and key deal updates.', assignee: 'KAI', priority: 'medium', column: 'Backlog', created: '2026-02-18', tags: ['meetings', 'gtm'] },
  { id: 't6', title: 'Partnership Proposal: Toast Integration', description: 'Review and provide feedback on the Toast integration partnership proposal. Need to assess revenue impact and resource requirements.', assignee: 'Kyle', priority: 'medium', column: 'Backlog', created: '2026-02-16', tags: ['partnerships', 'strategy'] },
  { id: 't7', title: 'Newsletter: Metrics That Matter for CROs', description: 'Substack newsletter edition about the 7 metrics every CRO should track weekly. Include real examples from Owner.com.', assignee: 'Kyle', priority: 'medium', column: 'Backlog', created: '2026-02-13', tags: ['newsletter', 'content'] },
  { id: 't8', title: 'Summarize CX SLT Meeting Notes', description: 'Pull and summarize key action items from the latest CX Senior Leadership Team meeting in Notion.', assignee: 'KAI', priority: 'low', column: 'Done', created: '2026-02-10', tags: ['meetings', 'cx'] },
  { id: 't9', title: 'Update Team 1:1 Templates', description: 'Refresh the 1:1 meeting templates for direct reports. Add sections for career development and quarterly goal tracking.', assignee: 'KAI', priority: 'low', column: 'Done', created: '2026-02-08', tags: ['team', 'process'] },
  { id: 't10', title: 'Sales Comp Plan Review', description: 'Review proposed changes to Q2 sales compensation plans. Model out impact on quota attainment and total cost.', assignee: 'Kyle', priority: 'high', column: 'Backlog', created: '2026-02-19', tags: ['sales', 'comp'] },
  { id: 't11', title: 'Research AI SDR Tools', description: 'KAI to research top AI SDR tools in market (11x, Artisan, Regie.ai). Compare features, pricing, and case studies for Owner.com evaluation.', assignee: 'KAI', priority: 'medium', column: 'In Progress', created: '2026-02-16', tags: ['research', 'tools'] },
  { id: 't12', title: 'Compile Board Deck Revenue Section', description: 'Prepare the revenue section for the upcoming board deck. Include ARR growth, net retention, pipeline coverage, and key wins.', assignee: 'Kyle', priority: 'high', column: 'Review', created: '2026-02-11', tags: ['board', 'finance'] },
];

export const initialEvents: CalendarEvent[] = [
  { id: 'e1', title: 'Weekly GTM MAPLE Sync', type: 'meeting', date: '2026-02-19', time: '10:00', duration: 60, recurring: 'weekly', description: 'Cross-functional GTM alignment meeting' },
  { id: 'e2', title: 'CX SLT Meeting', type: 'meeting', date: '2026-02-19', time: '14:00', duration: 60, recurring: 'weekly', description: 'Customer Experience Senior Leadership Team sync' },
  { id: 'e3', title: 'Email Digest Check', type: 'cron', date: '2026-02-19', time: '08:00', duration: 15, recurring: 'daily', description: 'KAI checks and summarizes important emails' },
  { id: 'e4', title: 'Revenue Leadership Podcast Recording', type: 'meeting', date: '2026-02-20', time: '11:00', duration: 90, recurring: null, description: 'Episode 47 recording with VP Sales, Figma' },
  { id: 'e5', title: '1:1 with Head of Sales', type: 'meeting', date: '2026-02-20', time: '09:00', duration: 30, recurring: 'weekly', description: 'Weekly sync with sales leader' },
  { id: 'e6', title: 'Pipeline Review', type: 'meeting', date: '2026-02-20', time: '15:00', duration: 60, recurring: 'weekly', description: 'Review pipeline health and key deals' },
  { id: 'e7', title: 'Calendar & Notion Sync', type: 'cron', date: '2026-02-19', time: '07:00', duration: 10, recurring: 'daily', description: 'KAI syncs calendar events with Notion tasks' },
  { id: 'e8', title: 'Board Deck Deadline', type: 'deadline', date: '2026-02-25', time: '17:00', duration: 0, recurring: null, description: 'Final revenue section due for board deck' },
  { id: 'e9', title: 'Newsletter Publish Day', type: 'reminder', date: '2026-02-21', time: '09:00', duration: 0, recurring: 'weekly', description: 'Substack newsletter goes out on Saturdays' },
  { id: 'e10', title: '1:1 with Head of Partnerships', type: 'meeting', date: '2026-02-21', time: '10:00', duration: 30, recurring: 'weekly', description: 'Weekly partnerships sync' },
  { id: 'e11', title: 'Memory & Context Refresh', type: 'cron', date: '2026-02-19', time: '06:00', duration: 10, recurring: 'daily', description: 'KAI reviews and updates long-term memory files' },
  { id: 'e12', title: 'LinkedIn Post Schedule', type: 'reminder', date: '2026-02-19', time: '12:00', duration: 0, recurring: 'mon,wed,fri', description: 'Publish LinkedIn content (3x/week)' },
  { id: 'e13', title: 'All-Hands Revenue Update', type: 'meeting', date: '2026-02-24', time: '13:00', duration: 30, recurring: 'monthly', description: 'Company all-hands revenue section presentation' },
  { id: 'e14', title: 'Sales Comp Plan Review Meeting', type: 'meeting', date: '2026-02-23', time: '14:00', duration: 60, recurring: null, description: 'Review Q2 comp plan changes with finance and sales ops' },
  { id: 'e15', title: 'Weekly Health Check Reminder', type: 'reminder', date: '2026-02-22', time: '08:00', duration: 0, recurring: 'weekly', description: 'Sunday health protocol check-in' },
  { id: 'e16', title: 'Social Media Analytics Pull', type: 'cron', date: '2026-02-22', time: '07:00', duration: 15, recurring: 'weekly', description: 'KAI pulls LinkedIn and podcast analytics' },
];

export const initialContent: ContentItem[] = [
  { id: 'c1', title: 'PLG to Sales-Led: Lessons from Figma', type: 'podcast', stage: 'Script', notes: 'Episode 47. Guest confirmed. Need to finalize question list and pre-read doc. Recording Feb 20.', created: '2026-02-05', updated: '2026-02-17' },
  { id: 'c2', title: '5 Cold Outbound Lessons from Scaling SDRs', type: 'linkedin', stage: 'Editing', notes: 'Draft written by KAI. Kyle reviewing for personal anecdotes. Target publish: Feb 19.', created: '2026-02-14', updated: '2026-02-18' },
  { id: 'c3', title: 'Metrics That Matter for CROs', type: 'newsletter', stage: 'Ideas', notes: '7 metrics every CRO should track weekly. Use Owner.com as case study. Aiming for Feb 21 publish.', created: '2026-02-13', updated: '2026-02-13' },
  { id: 'c4', title: 'The AI CRO Stack in 2026', type: 'linkedin', stage: 'Ideas', notes: 'Post about the tools a modern CRO should be using. Include KAI as example of AI assistant integration.', created: '2026-02-18', updated: '2026-02-18' },
  { id: 'c5', title: 'Building a CS-Led Growth Engine', type: 'podcast', stage: 'Ideas', notes: 'Potential guest: Head of CS at Notion or Canva. Topic: CS as revenue driver, expansion playbooks.', created: '2026-02-10', updated: '2026-02-10' },
  { id: 'c6', title: 'Revenue Alignment: Sales + CS + Partnerships', type: 'newsletter', stage: 'Script', notes: "How to align all revenue functions. Framework from Owner.com's GTM MAPLE process. Draft 60% done.", created: '2026-02-08', updated: '2026-02-16' },
  { id: 'c7', title: 'Why Your Pipeline Coverage Ratio is Lying', type: 'linkedin', stage: 'Published', notes: "Published Feb 12. 4,200 impressions, 89 likes, 23 comments. Strong engagement on the '3x is a myth' angle.", created: '2026-02-06', updated: '2026-02-12' },
  { id: 'c8', title: 'Hiring Your First 10 AEs', type: 'podcast', stage: 'Published', notes: 'Episode 46. Published Feb 7. Guest: VP Sales at Ramp. 2,400 downloads in first week. Top 3 episode.', created: '2026-01-20', updated: '2026-02-07' },
  { id: 'c9', title: "The CRO's Monday Morning Dashboard", type: 'newsletter', stage: 'Published', notes: "Published Feb 14. 48% open rate, 12% click rate. Readers loved the 'red/yellow/green' framework.", created: '2026-02-01', updated: '2026-02-14' },
  { id: 'c10', title: 'Comp Plans That Actually Motivate', type: 'linkedin', stage: 'Thumbnail', notes: 'Carousel post format. 8 slides designed. Need final review of data points before publishing.', created: '2026-02-11', updated: '2026-02-17' },
];

export const initialMemories: Memory[] = [
  { id: 'm1', date: '2026-02-19', category: 'daily', tags: ['tasks', 'dashboard'], title: 'Mission Control Dashboard Build', content: "Built the KAI Mission Control dashboard — a single-page HTML app for Kyle to track tasks, content pipeline, calendar, and memories. Designed with dark theme, kanban board, and calendar views. Deployed via OpenClaw Canvas." },
  { id: 'm2', date: '2026-02-18', category: 'daily', tags: ['email', 'meetings', 'content'], title: 'Daily Operations & Content Review', content: "Checked morning emails — nothing urgent. Prepped agenda for tomorrow's GTM MAPLE sync. Reviewed Kyle's LinkedIn draft on cold outbound lessons. Suggested adding the specific metric about reply rate improvement (2.1% → 4.7%) when they added personalized video. Kyle approved, moving to final edit." },
  { id: 'm3', date: '2026-02-17', category: 'daily', tags: ['research', 'ai-tools'], title: 'AI SDR Tool Research Kickoff', content: "Started deep research on AI SDR tools per Kyle's request. Looking at 11x (Alice), Artisan (Ava), Regie.ai, and AiSDR. Key evaluation criteria: integration with Owner.com's existing Salesforce + Outreach stack, cost per meeting booked, and ramp time. Initial findings: 11x has strongest enterprise references but highest price point." },
  { id: 'm4', date: '2026-02-16', category: 'daily', tags: ['partnerships', 'toast'], title: 'Toast Partnership Analysis', content: "Kyle forwarded the Toast integration proposal. Key points: They want to embed Owner.com's online ordering into Toast POS. Revenue share model proposed at 15/85 split. I flagged that their proposed exclusivity clause in Section 4.2 is too broad — would prevent us from partnering with Square or Clover. Recommended counter-proposal with limited exclusivity (restaurant vertical only, 18-month term)." },
  { id: 'm5', date: '2026-02-15', category: 'strategy', tags: ['revenue', 'forecast', 'q1'], title: 'Q1 Revenue Forecast Notes', content: "January actuals came in 8% above forecast. Key drivers: (1) Enterprise segment grew 23% MoM from the new outbound motion, (2) Net revenue retention improved to 112% from 108% last quarter, (3) Partnership channel contributed $340K — first month over $300K. February pipeline coverage is 3.8x which is healthy but concentrated in mid-market. Need to diversify." },
  { id: 'm6', date: '2026-02-14', category: 'team', tags: ['team', '1on1', 'sales'], title: 'Head of Sales 1:1 Takeaways', content: "Key discussion points from Marcus's 1:1: (1) Two senior AEs considering competing offers — need to fast-track retention packages, (2) New SDR cohort (started Feb 1) is ramping faster than expected — 3 meetings booked in first 2 weeks vs. target of 2, (3) Enterprise deal with Sweetgreen moving to legal review — $450K ACV. Marcus wants to hire a Deal Desk analyst — agreed to include in Q2 headcount plan." },
  { id: 'm7', date: '2026-02-12', category: 'content', tags: ['linkedin', 'performance'], title: 'LinkedIn Content Performance Review', content: "Reviewed last 30 days of LinkedIn performance. Top post: 'Why Your Pipeline Coverage Ratio is Lying' — 4,200 impressions, 89 likes, 23 comments. The contrarian angle works well. Kyle's audience engages most with: (1) data-backed insights, (2) contrarian takes on SaaS gospel, (3) specific examples from Owner.com. Posting cadence of 3x/week is sustainable. Best days: Tuesday and Thursday mornings." },
  { id: 'm8', date: '2026-02-10', category: 'health', tags: ['health', 'protocol', 'supplements'], title: 'Health Protocol Update', content: "Kyle's current health stack: Morning — AG1, creatine (5g), vitamin D3 (5000 IU), omega-3. Pre-workout — coffee + L-theanine. Evening — magnesium glycinate, ashwagandha. Workout split: Push/Pull/Legs, 4x/week. Sleep target: 7.5 hours. Currently averaging 7.1 per Oura ring data. Suggestion: add 10min evening meditation to improve sleep onset latency." },
  { id: 'm9', date: '2026-02-08', category: 'team', tags: ['team', 'cs', 'profiles'], title: 'CS Team Restructure Plan', content: "Kyle is considering restructuring CS into two tracks: (1) Strategic CSMs for enterprise accounts ($100K+ ACV) — focus on expansion and executive relationships, (2) Scaled CS for SMB — tech-touch with quarterly business reviews. This aligns with the NRR improvement initiative. Need to model out headcount impact and present to CEO by end of February. Current CS team: 12 CSMs, 2 CS Ops, 1 Head of CS." },
  { id: 'm10', date: '2026-02-05', category: 'strategy', tags: ['strategy', 'board', '2026'], title: '2026 Strategic Priorities', content: "Board-aligned strategic priorities for revenue org in 2026: (1) Scale ARR from $28M to $50M (78% growth), (2) Improve NRR from 108% to 115%, (3) Achieve $200K+ enterprise ACV deals (currently avg $85K), (4) Launch partnership channel to 15% of new ARR (currently 8%), (5) Reduce CAC payback from 18 months to 14 months. Kyle's personal focus areas: enterprise upmarket motion, AI-augmented sales, and building the revenue leadership brand." },
  { id: 'm11', date: '2026-02-03', category: 'daily', tags: ['notion', 'process'], title: 'Notion Workspace Cleanup', content: "Reorganized Kyle's Notion workspace. Created new views in the Tasks Tracker: (1) 'My Focus' — filtered to Kyle's high-priority items, (2) 'KAI Queue' — tasks assigned to me, (3) 'This Week' — deadline-based view. Also archived 47 completed tasks from Q4 2025. Set up a recurring reminder to archive done tasks monthly." },
  { id: 'm12', date: '2026-01-28', category: 'content', tags: ['podcast', 'analytics'], title: 'Podcast Analytics Deep Dive', content: "Revenue Leadership Podcast stats through January 2026: Total downloads: 48,000 (lifetime). Average per episode: 1,800 (up from 1,200 in Q3 2025). Top episodes by downloads: (1) 'From SDR to CRO' — 3,800, (2) 'Building a $10M Pipeline Machine' — 3,200, (3) 'Hiring Your First VP Sales' — 2,900. Listener demographics: 68% director+, 42% in SaaS, top metros: SF, NYC, Austin. Sponsorship inquiry from Gong — Kyle wants to keep it sponsor-free for now." },
  { id: 'm13', date: '2026-01-25', category: 'team', tags: ['team', 'partnerships'], title: 'Partnerships Team Profile', content: "Head of Partnerships: Sarah Chen. Joined Owner.com October 2025. Background: Former BD lead at DoorDash. Managing 3 partnership managers. Current focus: POS integrations (Toast, Square, Clover), marketplace partnerships, and channel reseller program. Q1 target: $1.2M in partner-sourced pipeline. Style: Very data-driven, prefers async communication, sends detailed weekly reports every Friday." },
  { id: 'm14', date: '2026-01-20', category: 'strategy', tags: ['owner-com', 'product'], title: 'Owner.com Platform Overview', content: "Owner.com is a restaurant technology platform helping independent restaurants compete with chains and third-party delivery apps. Core products: (1) Online ordering & delivery (own-channel), (2) Marketing automation (email, SMS, loyalty), (3) Website builder, (4) Review management. Founded by Adam Guild. Key differentiator: restaurants keep 100% of their revenue vs. 15-30% commission on DoorDash/UberEats. Currently serving 10,000+ restaurants. Kyle joined as CRO in 2024 to scale the go-to-market engine." },
];

export const activities = [
  { color: 'var(--accent)', actor: 'KAI', text: 'analyzed CS health score data and prepared risk summary', time: '2 hours ago' },
  { color: 'var(--green)', actor: 'KAI', text: 'completed LinkedIn draft review — "5 Cold Outbound Lessons"', time: '3 hours ago' },
  { color: 'var(--purple)', actor: 'KAI', text: 'synced calendar events with Notion tasks', time: '5 hours ago' },
  { color: 'var(--orange)', actor: 'Kyle', text: 'moved "Board Deck Revenue Section" to Review', time: '6 hours ago' },
  { color: 'var(--accent)', actor: 'KAI', text: 'pulled AI SDR tool comparison data (11x, Artisan, Regie.ai)', time: '8 hours ago' },
  { color: 'var(--pink)', actor: 'KAI', text: 'checked morning emails — no urgent items', time: '10 hours ago' },
  { color: 'var(--cyan)', actor: 'KAI', text: 'updated memory files and refreshed long-term context', time: '12 hours ago' },
];
