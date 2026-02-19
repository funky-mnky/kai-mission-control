'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Task, CalendarEvent, ContentItem, Memory,
  TASK_COLUMNS, CONTENT_STAGES,
  initialTasks, initialEvents, initialContent, initialMemories,
  activities,
} from '../lib/data';
import { formatDate, formatFullDate, getTodayStr } from '../lib/utils';

// SVG Icons as components
function DashboardIcon() {
  return <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
}
function TasksIcon() {
  return <svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>;
}
function ContentIcon() {
  return <svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>;
}
function CalendarIcon() {
  return <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function MemoryIcon() {
  return <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0110 10 10 10 0 01-10 10A10 10 0 012 12 10 10 0 0112 2z"/><path d="M12 8v4l3 3"/></svg>;
}

type Screen = 'dashboard' | 'tasks' | 'content' | 'calendar' | 'memory';

export default function MissionControl() {
  const [screen, setScreen] = useState<Screen>('dashboard');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [events] = useState<CalendarEvent[]>(initialEvents);
  const [contentItems, setContentItems] = useState<ContentItem[]>(initialContent);
  const [memories] = useState<Memory[]>(initialMemories);

  // Modal state
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  // Calendar state
  const [calendarDate, setCalendarDate] = useState(new Date());

  // Memory state
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);
  const [memoryFilter, setMemoryFilter] = useState('all');
  const [memorySearch, setMemorySearch] = useState('');

  const openModal = useCallback((content: React.ReactNode) => setModalContent(content), []);
  const closeModal = useCallback(() => setModalContent(null), []);

  // Keyboard handler for Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [closeModal]);

  // Load local tasks from localStorage
  useEffect(() => {
    try {
      const local = localStorage.getItem('kai-mc-tasks');
      if (local) {
        const parsed: Task[] = JSON.parse(local);
        setTasks(prev => {
          const ids = new Set(prev.map(t => t.id));
          const newTasks = parsed.filter(t => !ids.has(t.id));
          return [...prev, ...newTasks];
        });
      }
    } catch { /* ignore */ }
  }, []);

  function saveLocalTasks(updatedTasks: Task[]) {
    const localOnly = updatedTasks.filter(t => t._local);
    localStorage.setItem('kai-mc-tasks', JSON.stringify(localOnly));
  }

  function moveTask(id: string, column: string) {
    setTasks(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, column } : t);
      saveLocalTasks(updated);
      return updated;
    });
    closeModal();
  }

  function addTask(title: string, description: string, assignee: string, priority: 'high' | 'medium' | 'low', tagsStr: string) {
    const newTask: Task = {
      id: 't_' + Date.now(),
      title,
      description,
      assignee,
      priority,
      column: 'Not started',
      created: new Date().toISOString().split('T')[0],
      tags: tagsStr.split(',').map(t => t.trim()).filter(Boolean),
      _local: true,
    };
    setTasks(prev => {
      const updated = [...prev, newTask];
      saveLocalTasks(updated);
      return updated;
    });
    closeModal();
  }

  function moveContent(id: string, stage: string) {
    setContentItems(prev =>
      prev.map(item => item.id === id ? { ...item, stage, updated: new Date().toISOString().split('T')[0] } : item)
    );
  }

  const todayStr = getTodayStr();
  const activeTasks = tasks.filter(t => t.column !== 'Done').length;
  const inProgressCount = tasks.filter(t => t.column === 'In Progress').length;
  const upcomingEventsCount = events.filter(e => e.date >= todayStr).length;
  const inPipeline = contentItems.filter(i => i.stage !== 'Published').length;
  const publishedCount = contentItems.filter(i => i.stage === 'Published').length;

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="kai-logo">KAI</div>
          <div>
            <div className="sidebar-title">Mission Control</div>
            <div className="sidebar-subtitle">Kyle Norton • CRO</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {([
            { key: 'dashboard' as Screen, icon: <DashboardIcon />, label: 'Dashboard' },
            { key: 'tasks' as Screen, icon: <TasksIcon />, label: 'Tasks', badge: activeTasks },
            { key: 'content' as Screen, icon: <ContentIcon />, label: 'Content' },
            { key: 'calendar' as Screen, icon: <CalendarIcon />, label: 'Calendar' },
            { key: 'memory' as Screen, icon: <MemoryIcon />, label: 'Memory', badge: memories.length },
          ]).map(nav => (
            <div
              key={nav.key}
              className={`nav-item ${screen === nav.key ? 'active' : ''}`}
              onClick={() => setScreen(nav.key)}
            >
              <span className="nav-icon">{nav.icon}</span>
              {nav.label}
              {nav.badge !== undefined && <span className="nav-badge">{nav.badge}</span>}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="kai-status">
            <span className="status-dot"></span>
            KAI is online
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Dashboard */}
        {screen === 'dashboard' && (
          <DashboardScreen
            tasks={tasks}
            events={events}
            activeTasks={activeTasks}
            inProgressCount={inProgressCount}
            upcomingEventsCount={upcomingEventsCount}
            inPipeline={inPipeline}
            publishedCount={publishedCount}
            memoriesCount={memories.length}
            todayStr={todayStr}
          />
        )}

        {/* Tasks */}
        {screen === 'tasks' && (
          <TasksScreen
            tasks={tasks}
            onOpenDetail={(id) => {
              const task = tasks.find(t => t.id === id);
              if (!task) return;
              openModal(
                <TaskDetailModal task={task} onMove={moveTask} onClose={closeModal} />
              );
            }}
            onAddTask={() => {
              openModal(
                <AddTaskModal onAdd={addTask} onClose={closeModal} />
              );
            }}
          />
        )}

        {/* Content */}
        {screen === 'content' && (
          <ContentScreen
            items={contentItems}
            onMoveContent={moveContent}
            onOpenDetail={(id) => {
              const item = contentItems.find(i => i.id === id);
              if (!item) return;
              openModal(
                <ContentDetailModal item={item} onMove={(stage) => { moveContent(id, stage); closeModal(); }} onClose={closeModal} />
              );
            }}
          />
        )}

        {/* Calendar */}
        {screen === 'calendar' && (
          <CalendarScreen
            events={events}
            calendarDate={calendarDate}
            onChangeMonth={(delta) => {
              setCalendarDate(prev => {
                const next = new Date(prev);
                next.setMonth(next.getMonth() + delta);
                return next;
              });
            }}
            todayStr={todayStr}
            onSelectDay={(dateStr) => {
              const dayEvents = events.filter(e => e.date === dateStr);
              if (dayEvents.length === 0) return;
              const d = new Date(dateStr + 'T00:00:00');
              const label = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
              openModal(
                <DayDetailModal label={label} events={dayEvents} onClose={closeModal} />
              );
            }}
          />
        )}

        {/* Memory */}
        {screen === 'memory' && (
          <MemoryScreen
            memories={memories}
            selectedMemory={selectedMemory}
            onSelectMemory={setSelectedMemory}
            memoryFilter={memoryFilter}
            onSetFilter={setMemoryFilter}
            memorySearch={memorySearch}
            onSetSearch={setMemorySearch}
          />
        )}
      </main>

      {/* Modal Overlay */}
      {modalContent && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="modal">{modalContent}</div>
        </div>
      )}
    </div>
  );
}

// =================== DASHBOARD SCREEN ===================
function DashboardScreen({ tasks, events, activeTasks, inProgressCount, upcomingEventsCount, inPipeline, publishedCount, memoriesCount, todayStr }: {
  tasks: Task[]; events: CalendarEvent[]; activeTasks: number; inProgressCount: number; upcomingEventsCount: number; inPipeline: number; publishedCount: number; memoriesCount: number; todayStr: string;
}) {
  const kaiTasks = tasks.filter(t => t.assignee === 'KAI' && t.column === 'In Progress');
  const upcomingList = events
    .filter(e => e.date >= todayStr)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .slice(0, 8);

  return (
    <div className="screen active" style={{ display: 'flex' }}>
      <div className="page-header">
        <div className="page-title">Dashboard</div>
        <div className="page-header-right">
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{formatFullDate(new Date())}</span>
        </div>
      </div>
      <div className="page-body">
        <div className="stats-grid">
          <StatCard label="Active Tasks" value={activeTasks} sub={`${inProgressCount} in progress`} iconBg="rgba(59,130,246,0.12)" iconColor="var(--accent)" icon={<TasksIcon />} />
          <StatCard label="Upcoming Events" value={upcomingEventsCount} sub="Next 7 days" iconBg="rgba(139,92,246,0.12)" iconColor="var(--purple)" icon={<CalendarIcon />} />
          <StatCard label="Content Pipeline" value={inPipeline} sub={`${publishedCount} published`} iconBg="rgba(236,72,153,0.12)" iconColor="var(--pink)" icon={<ContentIcon />} />
          <StatCard label="Memories" value={memoriesCount} sub="Knowledge entries" iconBg="rgba(6,182,212,0.12)" iconColor="var(--cyan)" icon={<MemoryIcon />} />
        </div>

        <div className="dashboard-grid">
          {/* Activity Feed */}
          <div className="dash-panel">
            <div className="dash-panel-header">
              Recent Activity
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Today</span>
            </div>
            <div className="dash-panel-body">
              {activities.map((a, i) => (
                <div className="activity-item" key={i}>
                  <div className="activity-dot" style={{ background: a.color }}></div>
                  <div>
                    <div className="activity-text"><strong>{a.actor}</strong> {a.text}</div>
                    <div className="activity-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div className="dash-panel">
            <div className="dash-panel-header">
              Upcoming
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Next 48h</span>
            </div>
            <div className="dash-panel-body">
              {upcomingList.map(e => {
                const d = new Date(e.date + 'T00:00:00');
                const isToday = e.date === todayStr;
                const label = isToday ? e.time : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                return (
                  <div className="upcoming-item" key={e.id}>
                    <div className="upcoming-time">{label}</div>
                    <div className="upcoming-title">{e.title}</div>
                    <span className={`upcoming-type day-event ${e.type}`}>{e.type}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* KAI Status */}
          <div className="dash-panel kai-status-panel">
            <div className="dash-panel-header">
              KAI Status
              <span style={{ fontSize: 12, color: 'var(--green)' }}>● Active</span>
            </div>
            <div className="dash-panel-body">
              <div className="kai-status-content">
                <div className="kai-avatar">KAI</div>
                <div className="kai-status-text">
                  <h4>Currently Working On</h4>
                  <p>Rebuilt weekly prep skill with real API integrations. Mapped all 6 GTM Big Rocks from Notion. Set up CRO Weekly Brief cron for Sundays. Integrated MBR action items. Now updating Mission Control with live data from Kyle&apos;s systems.</p>
                  <div className="kai-tasks">
                    {kaiTasks.map(t => (
                      <span className="kai-task-tag" key={t.id}>{t.title}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, iconBg, iconColor, icon }: {
  label: string; value: number; sub: string; iconBg: string; iconColor: string; icon: React.ReactNode;
}) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: iconBg, color: iconColor, float: 'right' }}>
        {icon}
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-sub">{sub}</div>
    </div>
  );
}

// =================== TASKS SCREEN ===================
function TasksScreen({ tasks, onOpenDetail, onAddTask }: {
  tasks: Task[]; onOpenDetail: (id: string) => void; onAddTask: () => void;
}) {
  return (
    <div className="screen active" style={{ display: 'flex' }}>
      <div className="page-header">
        <div className="page-title">Tasks Board</div>
        <div className="page-header-right">
          <button className="btn btn-primary" onClick={onAddTask}>+ New Task</button>
        </div>
      </div>
      <div className="page-body" style={{ paddingBottom: 12 }}>
        <div className="kanban-board">
          {TASK_COLUMNS.map(col => {
            const colTasks = tasks.filter(t => t.column === col);
            return (
              <div className="kanban-column" key={col}>
                <div className="kanban-col-header">
                  <span className="kanban-col-title">{col}</span>
                  <span className="kanban-col-count">{colTasks.length}</span>
                </div>
                <div className="kanban-col-body">
                  {colTasks.map(t => (
                    <div key={t.id} className={`task-card priority-${t.priority}`} onClick={() => onOpenDetail(t.id)}>
                      <div className="task-title">{t.title}</div>
                      <div className="task-meta">
                        <span className={`task-assignee ${t.assignee.toLowerCase()}`}>{t.assignee}</span>
                        <span className="task-date">{formatDate(t.created)}</span>
                      </div>
                      {t.tags && t.tags.length > 0 && (
                        <div className="task-tags">
                          {t.tags.map(tag => <span className="task-tag" key={tag}>{tag}</span>)}
                        </div>
                      )}
                    </div>
                  ))}
                  {col === 'Not started' && (
                    <button className="add-task-btn" onClick={onAddTask}>+ Add Task</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// =================== CONTENT SCREEN ===================
function ContentScreen({ items, onMoveContent, onOpenDetail }: {
  items: ContentItem[]; onMoveContent: (id: string, stage: string) => void; onOpenDetail: (id: string) => void;
}) {
  return (
    <div className="screen active" style={{ display: 'flex' }}>
      <div className="page-header">
        <div className="page-title">Content Pipeline</div>
        <div className="page-header-right">
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Podcast • Newsletter • LinkedIn</span>
        </div>
      </div>
      <div className="page-body" style={{ paddingBottom: 12 }}>
        <div className="pipeline-board">
          {CONTENT_STAGES.map((stage, idx) => {
            const stageItems = items.filter(i => i.stage === stage);
            const prevStage = idx > 0 ? CONTENT_STAGES[idx - 1] : null;
            const nextStage = idx < CONTENT_STAGES.length - 1 ? CONTENT_STAGES[idx + 1] : null;
            return (
              <div className="pipeline-column" key={stage}>
                <div className="pipeline-col-header">
                  <span className="pipeline-col-title">{stage}</span>
                  <span className="pipeline-col-count">{stageItems.length}</span>
                </div>
                <div className="pipeline-col-body">
                  {stageItems.map(item => (
                    <div key={item.id} className="content-card" onClick={() => onOpenDetail(item.id)}>
                      <span className={`content-type-badge ${item.type}`}>{item.type}</span>
                      <div className="content-title">{item.title}</div>
                      <div className="content-notes">{item.notes}</div>
                      <div className="content-actions">
                        {prevStage && (
                          <button className="content-move-btn" onClick={(e) => { e.stopPropagation(); onMoveContent(item.id, prevStage); }}>
                            ← {prevStage}
                          </button>
                        )}
                        {nextStage && (
                          <button className="content-move-btn" onClick={(e) => { e.stopPropagation(); onMoveContent(item.id, nextStage); }}>
                            {nextStage} →
                          </button>
                        )}
                      </div>
                      <div className="content-date">Updated {formatDate(item.updated)}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// =================== CALENDAR SCREEN ===================
function CalendarScreen({ events, calendarDate, onChangeMonth, todayStr, onSelectDay }: {
  events: CalendarEvent[]; calendarDate: Date; onChangeMonth: (delta: number) => void; todayStr: string; onSelectDay: (dateStr: string) => void;
}) {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const monthName = calendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const prevMonth = new Date(year, month, 0);
  const daysInPrev = prevMonth.getDate();

  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Build calendar cells
  const cells: { day: number; dateStr: string; isOther: boolean; isToday: boolean }[] = [];

  // Previous month
  for (let i = startDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, dateStr: '', isOther: true, isToday: false });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({ day: d, dateStr, isOther: false, isToday: dateStr === todayStr });
  }
  // Next month
  const totalCells = startDay + daysInMonth;
  const remaining = (7 - (totalCells % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    cells.push({ day: i, dateStr: '', isOther: true, isToday: false });
  }

  const upcomingEvents = events
    .filter(e => e.date >= todayStr)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .slice(0, 12);

  return (
    <div className="screen active" style={{ display: 'flex' }}>
      <div className="page-header">
        <div className="page-title">Calendar</div>
      </div>
      <div className="page-body" style={{ paddingBottom: 12 }}>
        <div className="calendar-layout">
          <div className="calendar-grid-wrapper">
            <div className="calendar-nav">
              <button className="calendar-nav-btn" onClick={() => onChangeMonth(-1)}>← Prev</button>
              <span className="calendar-nav-title">{monthName}</span>
              <button className="calendar-nav-btn" onClick={() => onChangeMonth(1)}>Next →</button>
            </div>
            <div className="calendar-grid">
              {dayHeaders.map(d => (
                <div className="calendar-day-header" key={d}>{d}</div>
              ))}
              {cells.map((cell, i) => {
                const dayEvents = cell.dateStr ? events.filter(e => e.date === cell.dateStr) : [];
                return (
                  <div
                    key={i}
                    className={`calendar-day ${cell.isOther ? 'other-month' : ''} ${cell.isToday ? 'today' : ''}`}
                    onClick={() => cell.dateStr && onSelectDay(cell.dateStr)}
                  >
                    <div className="day-number">{cell.day}</div>
                    {dayEvents.slice(0, 3).map(e => (
                      <div key={e.id} className={`day-event ${e.type}`}>{e.title}</div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>+{dayEvents.length - 3} more</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="calendar-sidebar-panel">
            <div className="calendar-sidebar-header">Upcoming Events</div>
            <div className="calendar-sidebar-body">
              {upcomingEvents.map(e => {
                const d = new Date(e.date + 'T00:00:00');
                const dayLabel = e.date === todayStr ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                return (
                  <div key={e.id} className={`cal-event-item ${e.type}`}>
                    <div className="cal-event-time">{dayLabel} {e.time ? `• ${e.time}` : ''}</div>
                    <div className="cal-event-title">{e.title}</div>
                    <div className="cal-event-desc">{e.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== MEMORY SCREEN ===================
function MemoryScreen({ memories, selectedMemory, onSelectMemory, memoryFilter, onSetFilter, memorySearch, onSetSearch }: {
  memories: Memory[]; selectedMemory: string | null; onSelectMemory: (id: string) => void;
  memoryFilter: string; onSetFilter: (f: string) => void; memorySearch: string; onSetSearch: (s: string) => void;
}) {
  const categories = ['all', ...Array.from(new Set(memories.map(m => m.category)))];

  let filtered = memories;
  if (memoryFilter !== 'all') {
    filtered = filtered.filter(m => m.category === memoryFilter);
  }
  if (memorySearch) {
    const q = memorySearch.toLowerCase();
    filtered = filtered.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.content.toLowerCase().includes(q) ||
      m.tags.some(t => t.toLowerCase().includes(q))
    );
  }
  filtered = [...filtered].sort((a, b) => b.date.localeCompare(a.date));

  const selected = selectedMemory ? memories.find(m => m.id === selectedMemory) : null;

  function highlightSearch(text: string): string {
    if (!memorySearch) return text;
    const regex = new RegExp(`(${memorySearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark style="background: var(--accent-glow); color: var(--accent); padding: 0 2px; border-radius: 2px;">$1</mark>');
  }

  return (
    <div className="screen active" style={{ display: 'flex' }}>
      <div className="page-header">
        <div className="page-title">Memory Browser</div>
      </div>
      <div className="page-body" style={{ paddingBottom: 12 }}>
        <div className="memory-layout">
          <div className="memory-list-panel">
            <div className="memory-search">
              <input
                type="text"
                placeholder="Search memories..."
                value={memorySearch}
                onChange={(e) => onSetSearch(e.target.value)}
              />
            </div>
            <div className="memory-filters">
              {categories.map(c => (
                <button
                  key={c}
                  className={`memory-filter-btn ${memoryFilter === c ? 'active' : ''}`}
                  onClick={() => onSetFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="memory-list">
              {filtered.map(m => (
                <div
                  key={m.id}
                  className={`memory-item ${selectedMemory === m.id ? 'active' : ''}`}
                  onClick={() => onSelectMemory(m.id)}
                >
                  <div className="memory-item-date">{formatDate(m.date)} • {m.category}</div>
                  <div className="memory-item-title" dangerouslySetInnerHTML={{ __html: highlightSearch(m.title) }} />
                  <div className="memory-item-preview" dangerouslySetInnerHTML={{ __html: highlightSearch(m.content.substring(0, 120)) + '...' }} />
                  <div className="memory-item-tags">
                    {m.tags.map(t => <span key={t} className="memory-tag">{t}</span>)}
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="memory-empty" style={{ padding: 40 }}>No memories found</div>
              )}
            </div>
          </div>
          <div className="memory-detail-panel">
            {selected ? (
              <>
                <div className="memory-detail-header">
                  <div className="memory-detail-category">{selected.category}</div>
                  <h3>{selected.title}</h3>
                  <div className="memory-detail-date">{formatDate(selected.date)}</div>
                </div>
                <div className="memory-detail-body">
                  <div className="memory-content">{selected.content}</div>
                  <div className="memory-detail-tags">
                    {selected.tags.map(t => <span key={t} className="memory-detail-tag">{t}</span>)}
                  </div>
                </div>
              </>
            ) : (
              <div className="memory-empty">Select a memory to view details</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== MODAL COMPONENTS ===================
function TaskDetailModal({ task, onMove, onClose }: { task: Task; onMove: (id: string, col: string) => void; onClose: () => void }) {
  return (
    <>
      <div className="modal-header">
        <h3>{task.title}</h3>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>
      <div className="modal-body">
        <span className={`task-detail-priority ${task.priority}`}>{task.priority} priority</span>
        <div className="task-detail-desc">{task.description}</div>
        <div className="task-detail-meta">
          <span>👤 {task.assignee}</span>
          <span>📅 {formatDate(task.created)}</span>
          <span>📋 {task.column}</span>
        </div>
        {task.tags && task.tags.length > 0 && (
          <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {task.tags.map(t => <span key={t} className="task-tag" style={{ fontSize: 11, padding: '3px 8px' }}>{t}</span>)}
          </div>
        )}
        <div style={{ marginTop: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Move to:</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {TASK_COLUMNS.map(c => (
              <button
                key={c}
                className={`btn ${c === task.column ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: 11, padding: '6px 12px' }}
                onClick={() => onMove(task.id, c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function AddTaskModal({ onAdd, onClose }: { onAdd: (title: string, desc: string, assignee: string, priority: 'high' | 'medium' | 'low', tags: string) => void; onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [assignee, setAssignee] = useState('Kyle');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [tags, setTags] = useState('');

  return (
    <>
      <div className="modal-header">
        <h3>New Task</h3>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>
      <div className="modal-body">
        <div className="form-group">
          <label>Title</label>
          <input type="text" placeholder="Task title..." value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea placeholder="Task description..." value={desc} onChange={e => setDesc(e.target.value)} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Assignee</label>
            <select value={assignee} onChange={e => setAssignee(e.target.value)}>
              <option value="Kyle">Kyle</option>
              <option value="KAI">KAI</option>
            </select>
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value as 'high' | 'medium' | 'low')}>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input type="text" placeholder="e.g. sales, strategy" value={tags} onChange={e => setTags(e.target.value)} />
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => { if (title.trim()) onAdd(title, desc, assignee, priority, tags); }}>Create Task</button>
      </div>
    </>
  );
}

function ContentDetailModal({ item, onMove, onClose }: { item: ContentItem; onMove: (stage: string) => void; onClose: () => void }) {
  return (
    <>
      <div className="modal-header">
        <h3>{item.title}</h3>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>
      <div className="modal-body">
        <span className={`content-type-badge ${item.type}`} style={{ marginBottom: 12 }}>{item.type}</span>
        <div className="content-detail-notes">{item.notes}</div>
        <div className="content-detail-meta">
          <span>📅 Created {formatDate(item.created)}</span>
          <span>🔄 Updated {formatDate(item.updated)}</span>
        </div>
        <div style={{ marginTop: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Move to stage:</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {CONTENT_STAGES.map(s => (
              <button
                key={s}
                className={`btn ${s === item.stage ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: 11, padding: '6px 10px' }}
                onClick={() => onMove(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function DayDetailModal({ label, events, onClose }: { label: string; events: CalendarEvent[]; onClose: () => void }) {
  return (
    <>
      <div className="modal-header">
        <h3>{label}</h3>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>
      <div className="modal-body">
        {events.map(e => (
          <div key={e.id} className={`cal-event-item ${e.type}`} style={{ marginBottom: 12 }}>
            <div className="cal-event-time">{e.time || 'All day'} {e.duration ? `• ${e.duration} min` : ''}</div>
            <div className="cal-event-title">{e.title}</div>
            <div className="cal-event-desc">{e.description}</div>
            {e.recurring && (
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>🔁 Recurring: {e.recurring}</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
