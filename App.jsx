// File Version: Working2 (Admin Modules Implemented)
import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight, 
  LogOut, 
  UserCircle,
  LayoutDashboard,
  Search,
  List,
  LayoutGrid,
  Edit,
  Key,
  AlertTriangle,
  CheckCircle,
  Info,
  Users,
  UserPlus,
  Shield,
  Activity,
  GraduationCap,
  BookOpen,
  Calculator,
  ChevronRight,
  Save,
  FileSpreadsheet,
  CheckSquare,
  Check,
  X,
  Clock
} from 'lucide-react';

// ==========================================
// --- MOCK DATA & THEME ---
// ==========================================
const THEME = {
  primary: '#800000', // Deep Maroon
  accent: '#FFD700',  // Gold
  background: '#f8f9fa',
};

const MOCK_USERS = [
  { id: 'ADM-0921', name: 'Avery Anderson', role: 'Admin', department: 'System Administration', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=avery', lastUpdated: '2026-04-20' },
  { id: 'SUP-5543', name: 'Elias Jensen', role: 'Supervisor', department: 'Engineering', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=elias', lastUpdated: '2026-04-21' },
  { id: 'FAC-8821', name: 'Bennett Chen', role: 'Faculty', department: 'Computer Science', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=bennett', lastUpdated: '2026-04-24' },
  { id: 'FAC-7301', name: 'Marcus Tso', role: 'Faculty', department: 'Software Engineering', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?u=marcus', lastUpdated: '2026-04-18' },
  { id: 'STU-9482', name: 'Julian Alverez', role: 'Student', department: 'Faculty of Sciences', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=julian', lastUpdated: '2026-04-19' },
  { id: 'STU-8821', name: 'Elena Rostova', role: 'Student', department: 'Humanities', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=elena', lastUpdated: '2026-04-20' },
  { id: 'STU-1093', name: 'Daria Mikhailova', role: 'Student', department: 'Psychology', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=daria', lastUpdated: '2026-04-22' },
  { id: 'STU-6193', name: 'Sophia Garcia', role: 'Student', department: 'MD Surgery', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=sophia', lastUpdated: '2026-04-23' },
  { id: 'ADM-1022', name: 'Diana Prince', role: 'Admin', department: 'System Administration', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=diana', lastUpdated: '2026-04-24' },
  { id: 'FAC-9932', name: 'Clark Kent', role: 'Faculty', department: 'Journalism', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=clark', lastUpdated: '2026-04-15' },
  { id: 'SUP-4421', name: 'Bruce Wayne', role: 'Supervisor', department: 'Business Administration', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=bruce', lastUpdated: '2026-04-14' },
  { id: 'STU-1122', name: 'Barry Allen', role: 'Student', department: 'Physics', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=barry', lastUpdated: '2026-04-25' }
];

const MOCK_AUDIT_LOG = [
  { id: 1, time: '2026-04-24 10:15 AM', user: 'ADM-0921', action: 'Created User Account', target: 'STU-6193', status: 'Success' },
  { id: 2, time: '2026-04-24 09:45 AM', user: 'SUP-5543', action: 'Assigned Subject', target: 'HCI 1 to FAC-8821', status: 'Success' },
  { id: 3, time: '2026-04-24 08:30 AM', user: 'FAC-8821', action: 'Encoded Grades', target: 'Prelim - Section 2207', status: 'Success' },
  { id: 4, time: '2026-04-23 04:20 PM', user: 'ADM-0921', action: 'Modified Role', target: 'FAC-7301', status: 'Success' },
  { id: 5, time: '2026-04-23 02:11 PM', user: 'FAC-8821', action: 'Failed Login Attempt', target: 'System', status: 'Failed' },
  { id: 6, time: '2026-04-22 11:05 AM', user: 'ADM-0921', action: 'System Backup', target: 'Database', status: 'Success' },
];

const INITIAL_SUBJECTS = [
  { id: 'SUB-101', code: 'CS101', name: 'Introduction to Computing', units: 3, assignedTo: null, assignedName: null },
  { id: 'SUB-102', code: 'HCI101', name: 'Human-Computer Interaction', units: 3, assignedTo: 'FAC-8821', assignedName: 'Bennett Chen' },
  { id: 'SUB-103', code: 'MATH201', name: 'Advanced Calculus', units: 4, assignedTo: null, assignedName: null },
  { id: 'SUB-104', code: 'ENG102', name: 'Technical Writing', units: 3, assignedTo: null, assignedName: null },
  { id: 'SUB-105', code: 'PHYS101', name: 'University Physics', units: 5, assignedTo: 'FAC-7301', assignedName: 'Marcus Tso' },
];

const MOCK_STUDENTS = [
  { id: '948271A', name: 'Julian Alverez', program: 'BSc. Theoretical Physics', yearLevel: 'Senior (Year 4)', department: 'Faculty of Sciences', avatar: 'https://i.pravatar.cc/150?u=julian', lastUpdated: '2026-04-19' },
  { id: '882194C', name: 'Elena Rostova', program: 'MA Comparative Literature', yearLevel: 'Graduate (Year 1)', department: 'Humanities', avatar: 'https://i.pravatar.cc/150?u=elena', lastUpdated: '2026-04-20' },
  { id: '109384B', name: 'Marcus Lin', program: 'BArch. Architecture', yearLevel: 'Junior (Year 3)', department: 'School of Design', avatar: 'https://i.pravatar.cc/150?u=marcus', lastUpdated: '2026-04-18' },
  { id: '554329D', name: 'Sarah Jenkins', program: 'BSc. Computer Science', yearLevel: 'Sophomore (Year 2)', department: 'Engineering', avatar: 'https://i.pravatar.cc/150?u=sarah', lastUpdated: '2026-04-21' },
  { id: '952140A', name: 'Liam Smith', program: 'BSc. Mathematics', yearLevel: 'Freshman (Year 1)', department: 'Faculty of Sciences', avatar: 'https://i.pravatar.cc/150?u=liam', lastUpdated: '2026-04-15' },
  { id: '837462B', name: 'James O\'Connor', program: 'BA English Literature', yearLevel: 'Senior (Year 4)', department: 'Humanities', avatar: 'https://i.pravatar.cc/150?u=james', lastUpdated: '2026-04-22' },
  { id: '726354C', name: 'David Chen', program: 'BSc. Information Technology', yearLevel: 'Junior (Year 3)', department: 'Computer Science', avatar: 'https://i.pravatar.cc/150?u=david', lastUpdated: '2026-04-23' },
  { id: '841295B', name: 'Chloe Bennett', program: 'BA History', yearLevel: 'Sophomore (Year 2)', department: 'Humanities', avatar: 'https://i.pravatar.cc/150?u=chloe', lastUpdated: '2026-04-24' },
  { id: '112233E', name: 'Barry Allen', program: 'BSc. Physics', yearLevel: 'Junior (Year 3)', department: 'Faculty of Sciences', avatar: 'https://i.pravatar.cc/150?u=barry', lastUpdated: '2026-04-25' },
  { id: '445566F', name: 'Hal Jordan', program: 'BSc. Aviation', yearLevel: 'Senior (Year 4)', department: 'Engineering', avatar: 'https://i.pravatar.cc/150?u=hal', lastUpdated: '2026-04-14' },
  { id: '778899G', name: 'Arthur Curry', program: 'BSc. Marine Biology', yearLevel: 'Sophomore (Year 2)', department: 'Faculty of Sciences', avatar: 'https://i.pravatar.cc/150?u=arthur', lastUpdated: '2026-04-16' },
  { id: '990011H', name: 'Victor Stone', program: 'BSc. Computer Science', yearLevel: 'Freshman (Year 1)', department: 'Computer Science', avatar: 'https://i.pravatar.cc/150?u=victor', lastUpdated: '2026-04-17' }
];

const MOCK_GRADES = MOCK_STUDENTS.map(student => ({
  studentId: student.id,
  name: student.name,
  avatar: student.avatar,
  periods: {
    prelim: {
      attendance: Math.floor(Math.random() * 15) + 85,
      quizzes: Math.floor(Math.random() * 25) + 75,
      project: Math.floor(Math.random() * 20) + 80,
      exam: Math.floor(Math.random() * 30) + 70,
    },
    midterm: {
      attendance: Math.floor(Math.random() * 15) + 85,
      quizzes: Math.floor(Math.random() * 25) + 75,
      project: Math.floor(Math.random() * 20) + 80,
      exam: Math.floor(Math.random() * 30) + 70,
    },
    finals: {
      attendance: '',
      quizzes: '',
      project: '',
      exam: '',
    }
  }
}));

// ==========================================
// --- SHARED HCI UI COMPONENTS ---
// ==========================================
const HCIConfirmation = ({ isOpen, onClose, onConfirm, title, message, type = "primary" }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className={`h-2 ${type === 'danger' ? 'bg-red-600' : 'bg-[#FFD700]'}`}></div>
        <div className="p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-2 rounded-full ${type === 'danger' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-600 mb-8 text-sm leading-relaxed">{message}</p>
          <div className="flex gap-3 justify-end">
            <button onClick={onClose} className="px-5 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-lg min-h-[44px] min-w-[44px]">Cancel</button>
            <button onClick={onConfirm} className="px-6 py-2 text-sm font-bold text-white rounded-lg bg-[#800000] hover:bg-[#600000] shadow-md min-h-[44px] min-w-[44px]">Confirm Action</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessToast = ({ show, message }) => {
  if (!show) return null;
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-green-600 text-white px-8 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/20">
        <CheckCircle size={20} /> <span className="font-bold text-sm tracking-wide">{message}</span>
      </div>
    </div>
  );
};

// ==========================================
// --- LOGIN PAGE COMPONENT ---
// ==========================================
const LoginPage = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleManualLogin = (e) => {
    e.preventDefault();
    onLogin({ name: 'Prof. Homer T. Favenir', role: 'Faculty', id: id || 'FAC-001' });
  };

  const handleRecover = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setIsRecovering(false);
    setRecoveryEmail('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f5] font-sans selection:bg-[#800000] selection:text-white">
      <SuccessToast show={showToast} message="Recovery instructions sent to your email." />
      
      <header className="flex justify-between items-center px-8 h-16 w-full fixed top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="flex items-center gap-4">
          <ShieldCheck className="text-[#800000]" size={28} />
          <h1 className="font-bold text-xl tracking-tight text-[#1e1b18]">Institutional Portal</h1>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm font-semibold text-[#800000] border-b-2 border-[#FFD700] pb-1">Portal Home</a>
          <div className="relative group flex items-center">
            <HelpCircle className="text-gray-600 cursor-pointer hover:text-[#800000] transition-colors" size={24} />
            <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] font-normal leading-relaxed text-left">
              Enter your assigned Institutional ID and Password. If you are a new user, please contact the IT Helpdesk.
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 mt-16">
        <div className="bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)] w-full max-w-[440px] overflow-hidden border-t-4 border-t-[#800000]">
          <div className="p-8 md:p-10">
            <div className="flex justify-center mb-6">
              <Lock className="text-[#800000]" size={48} />
            </div>
            
            {isRecovering ? (
              <>
                <h2 className="text-2xl font-bold text-center text-[#1e1b18] mb-2 tracking-tight">Password Recovery</h2>
                <p className="text-center text-sm text-gray-500 mb-8">Enter your details to receive a recovery link.</p>

                <form onSubmit={handleRecover} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Institutional ID</label>
                    <input 
                      type="text" 
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      required
                      className="w-full h-12 px-4 border border-gray-300 rounded focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/20 outline-none transition-all text-base"
                      placeholder="e.g. FAC-2026-001"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Registered Email</label>
                    <input 
                      type="email" 
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      required
                      className="w-full h-12 px-4 border border-gray-300 rounded focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/20 outline-none transition-all text-base"
                      placeholder="email@perpetualdalta.edu.ph"
                    />
                  </div>

                  <div className="pt-2 flex flex-col gap-3">
                    <button type="submit" className="w-full bg-[#800000] text-white font-bold h-12 rounded hover:bg-[#600000] active:scale-[0.98] transition-all">
                      Send Recovery Link
                    </button>
                    <button type="button" onClick={() => setIsRecovering(false)} className="w-full text-gray-600 font-bold h-12 rounded hover:bg-gray-100 transition-colors">
                      Back to Login
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-center text-[#1e1b18] mb-2 tracking-tight">Secure Sign In</h2>
                <p className="text-center text-sm text-gray-500 mb-8">Access your institutional workspace and credentials.</p>

                <form onSubmit={handleManualLogin} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Institutional ID</label>
                    <input 
                      type="text" 
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      className="w-full h-12 px-4 border border-gray-300 rounded focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/20 outline-none transition-all text-base"
                      placeholder="e.g. FAC-2026-001"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Password</label>
                      <a href="#" onClick={(e) => { e.preventDefault(); setIsRecovering(true); }} className="text-xs text-[#800000] hover:underline font-semibold">Forgot Password?</a>
                    </div>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-12 px-4 border border-gray-300 rounded focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/20 outline-none transition-all text-base"
                      placeholder="••••••••"
                    />
                    <p className="text-[10px] text-gray-500 mt-1">Default passwords are provided by the University Registrar.</p>
                  </div>

                  <button type="submit" className="w-full bg-[#800000] text-white font-bold h-12 rounded hover:bg-[#600000] active:scale-[0.98] transition-all flex justify-center items-center gap-2">
                    AUTHORIZE ENTRY <ArrowRight size={18} />
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-xs text-center text-gray-400 font-semibold uppercase tracking-wider mb-4">Developer Bypass (Testing Only)</p>
                  <div className="grid grid-cols-1 gap-2">
                    <button onClick={() => onLogin({ name: 'Dr. Thomas Tance', role: 'Admin', id: 'ADM-001' })} className="text-sm bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors">Login as Admin</button>
                    <button onClick={() => onLogin({ name: 'Prof. Mary Sue', role: 'Faculty', id: 'FAC-882' })} className="text-sm bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors">Login as Faculty</button>
                    <button onClick={() => onLogin({ name: 'Dr. Elias Jensen', role: 'Supervisor', id: 'SUP-554' })} className="text-sm bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors">Login as Supervisor</button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="bg-gray-50 p-4 border-t border-gray-100 flex items-center justify-center gap-2">
            <ShieldCheck className="text-green-600" size={16} />
            <span className="text-xs text-gray-500 font-medium">Encryption Secure TLS 1.3</span>
          </div>
        </div>
      </main>

      <footer className="py-6 px-12 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 bg-white text-xs text-gray-500">
        <p>&copy; 2026 University of Perpetual Help System DALTA. All Rights Reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#800000] uppercase font-bold tracking-wider">Security Policy</a>
          <a href="#" className="hover:text-[#800000] uppercase font-bold tracking-wider">Terms of Access</a>
          <a href="#" className="hover:text-[#800000] uppercase font-bold tracking-wider">Contact Support</a>
        </div>
      </footer>
    </div>
  );
};

// ==========================================
// --- TOP NAVIGATION COMPONENT ---
// ==========================================
const TopNav = ({ user, onLogout }) => {
  return (
    <nav className="bg-[#800000] text-white h-16 px-6 flex items-center justify-between sticky top-0 z-40 shadow-md">
      <div className="flex items-center gap-3">
        <ShieldCheck className="text-[#FFD700]" size={32} />
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-none tracking-tight">UPHSD Portal</span>
          <span className="text-[10px] text-white/70 uppercase tracking-widest">{user.role} Dashboard</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 text-right hidden md:flex">
          <div className="flex flex-col">
            <span className="font-semibold text-sm leading-tight">{user.name}</span>
            <span className="text-xs text-[#FFD700] uppercase">{user.role}</span>
          </div>
          <UserCircle size={36} className="text-gray-300" />
        </div>
        <div className="w-px h-8 bg-white/20 hidden md:block"></div>
        <button onClick={onLogout} className="flex items-center gap-2 text-sm font-medium hover:text-[#FFD700] transition-colors">
          <LogOut size={18} />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </nav>
  );
};

// ==========================================
// --- ADMIN SUB-COMPONENTS ---
// ==========================================
const AdminOverview = () => (
  <div className="animate-in fade-in duration-500">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900">System Overview</h2>
      <p className="text-gray-500">Monitor the institution's portal health and summary metrics.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-t-4 border-t-[#800000]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#fff8f5] rounded-full text-[#800000]">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Users</p>
            <h3 className="text-3xl font-bold text-gray-900">8,402</h3>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-t-4 border-t-[#800000]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#fff8f5] rounded-full text-[#800000]">
            <GraduationCap size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Active Faculty</p>
            <h3 className="text-3xl font-bold text-gray-900">152</h3>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-t-4 border-t-[#800000]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#fff8f5] rounded-full text-[#800000]">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Active Supervisors</p>
            <h3 className="text-3xl font-bold text-gray-900">12</h3>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-bold text-gray-800">System Alerts</h3>
        <span className="text-xs text-gray-500">Last updated: Today, 09:41 AM</span>
      </div>
      <div className="divide-y divide-gray-100">
        <div className="px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
          <AlertTriangle className="text-[#FFD700] mt-1" size={20} />
          <div>
            <p className="font-semibold text-gray-800">Pending access requests require approval</p>
            <p className="text-sm text-gray-500">3 new faculty accounts are waiting for verification.</p>
          </div>
        </div>
        <div className="px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
          <CheckCircle className="text-green-600 mt-1" size={20} />
          <div>
            <p className="font-semibold text-gray-800">Database backup completed successfully</p>
            <p className="text-sm text-gray-500">Automated backup finished at 03:00 AM.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const UserManagement = () => {
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');

  const filteredUsers = MOCK_USERS.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.id.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    if (sortBy === 'recent') return new Date(b.lastUpdated) - new Date(a.lastUpdated);
    if (sortBy === 'id-asc') return a.id.localeCompare(b.id);
    return 0;
  });

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-500">View, search, and manage portal accounts.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg focus:border-[#800000] focus:ring-1 focus:ring-[#800000] outline-none text-sm"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 px-3 border border-gray-300 rounded-lg outline-none focus:border-[#800000] focus:ring-1 focus:ring-[#800000] bg-white text-gray-700 text-base min-w-[140px]"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="recent">Recently Updated</option>
            <option value="id-asc">ID Number</option>
          </select>
          <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-[#800000]' : 'text-gray-500 hover:text-gray-700'}`}
              title="List View"
            >
              <List size={18} />
            </button>
            <button 
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-md transition-all ${viewMode === 'kanban' ? 'bg-white shadow-sm text-[#800000]' : 'text-gray-500 hover:text-gray-700'}`}
              title="Kanban View"
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID / Role</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                        <span className="font-semibold text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{user.id}</span>
                        <span className="text-xs text-gray-500">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{user.department}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-gray-500 hover:text-[#800000] hover:bg-red-50 rounded transition-colors" title="Edit Role">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-[#800000] hover:bg-red-50 rounded transition-colors" title="Reset Password">
                          <Key size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredUsers.length === 0 && (
            <div className="p-8 text-center text-gray-500">No users found matching your search.</div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Admin', 'Supervisor', 'Faculty', 'Student'].map((role) => (
            <div key={role} className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex flex-col h-[600px]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                <h3 className="font-bold text-gray-800">{role}s</h3>
                <span className="bg-gray-200 text-gray-700 text-xs py-1 px-2 rounded-full font-bold">
                  {filteredUsers.filter(u => u.role === role).length}
                </span>
              </div>
              <div className="flex-grow overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {filteredUsers.filter(u => u.role === role).map((user) => (
                  <div key={user.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-grab">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-gray-900 leading-tight">{user.name}</span>
                        <span className="text-xs text-gray-500">{user.id}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mb-3 bg-gray-50 px-2 py-1 rounded inline-block">
                      {user.department}
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span className={`text-[10px] uppercase font-bold tracking-wider ${user.status === 'Active' ? 'text-green-600' : 'text-gray-500'}`}>
                        {user.status}
                      </span>
                      <div className="flex gap-1">
                        <button className="text-gray-400 hover:text-[#800000]"><Edit size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Newly Added Module for Hanginon's assignment
const CreateUser = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      e.target.reset();
    }, 800);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-3xl">
      <SuccessToast show={showToast} message="New user successfully provisioned and notified." />
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Create User</h2>
        <p className="text-gray-500">Provision a new account for the UPHSD portal.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden border-t-4 border-t-[#800000]">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <UserPlus size={18} className="text-[#800000]" /> Account Details
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">First Name</label>
              <input required type="text" placeholder="e.g. John" className="w-full h-11 px-4 border border-gray-300 rounded focus:border-[#800000] focus:ring-1 focus:ring-[#800000] outline-none transition-all text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Last Name</label>
              <input required type="text" placeholder="e.g. Doe" className="w-full h-11 px-4 border border-gray-300 rounded focus:border-[#800000] focus:ring-1 focus:ring-[#800000] outline-none transition-all text-sm" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Email Address</label>
              <input required type="email" placeholder="john.doe@perpetualdalta.edu.ph" className="w-full h-11 px-4 border border-gray-300 rounded focus:border-[#800000] focus:ring-1 focus:ring-[#800000] outline-none transition-all text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Institutional ID</label>
              <input required type="text" placeholder="e.g. FAC-2026-001" className="w-full h-11 px-4 border border-gray-300 rounded focus:border-[#800000] focus:ring-1 focus:ring-[#800000] outline-none transition-all text-sm" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">System Role</label>
              <select className="w-full h-11 px-4 border border-gray-300 rounded focus:border-[#800000] focus:ring-1 focus:ring-[#800000] outline-none transition-all text-sm bg-white">
                <option>Student</option>
                <option>Faculty</option>
                <option>Supervisor</option>
                <option>Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Department</label>
              <select className="w-full h-11 px-4 border border-gray-300 rounded focus:border-[#800000] focus:ring-1 focus:ring-[#800000] outline-none transition-all text-sm bg-white">
                <option>College of Computer Studies</option>
                <option>Engineering</option>
                <option>Faculty of Sciences</option>
                <option>Humanities</option>
                <option>Business Administration</option>
              </select>
            </div>
          </div>
          
          <div className="pt-6 border-t border-gray-100 flex justify-end gap-3 mt-4">
            <button type="button" className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSaving}
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#800000] hover:bg-[#600000] rounded-lg shadow-sm transition-all flex items-center gap-2 disabled:opacity-70"
            >
              {isSaving ? <Activity className="animate-spin" size={18} /> : <UserPlus size={18} />}
              {isSaving ? 'Provisioning...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Newly Added Module for Hanginon's assignment
const RolesPrivileges = () => {
  const ROLES_MATRIX = [
    { module: 'User Management', admin: true, supervisor: false, faculty: false, student: false },
    { module: 'Assign Subjects', admin: false, supervisor: true, faculty: false, student: false },
    { module: 'Encode Grades', admin: false, supervisor: false, faculty: true, student: false },
    { module: 'View Roster', admin: true, supervisor: true, faculty: true, student: false },
    { module: 'View Own Grades', admin: false, supervisor: false, faculty: false, student: true },
  ];

  const renderCheck = (hasAccess) => hasAccess ? <Check className="text-green-600 mx-auto" size={20} /> : <X className="text-gray-300 mx-auto" size={20} />;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Roles & Privileges</h2>
        <p className="text-gray-500">Review system access levels mapped to user roles.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full border-t-4 border-t-[#800000]">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
          <Shield size={20} className="text-[#800000]" />
          <h3 className="font-bold text-gray-800">Access Matrix</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-200">
                <th className="px-6 py-4 text-sm font-bold text-gray-800 uppercase tracking-wider w-1/3">Module / Action</th>
                <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center border-l border-gray-100">Admin</th>
                <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center border-l border-gray-100">Supervisor</th>
                <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center border-l border-gray-100">Faculty</th>
                <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center border-l border-gray-100">Student</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ROLES_MATRIX.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-700 text-sm">{row.module}</td>
                  <td className="px-4 py-4 border-l border-gray-100 text-center">{renderCheck(row.admin)}</td>
                  <td className="px-4 py-4 border-l border-gray-100 text-center">{renderCheck(row.supervisor)}</td>
                  <td className="px-4 py-4 border-l border-gray-100 text-center">{renderCheck(row.faculty)}</td>
                  <td className="px-4 py-4 border-l border-gray-100 text-center">{renderCheck(row.student)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-blue-50 p-4 border-t border-blue-100 flex gap-3 text-sm text-blue-800">
          <Info size={20} className="flex-shrink-0 mt-0.5 text-blue-600" />
          <p>This matrix is read-only. Role capabilities are hardcoded based on the institutional policies and the Grading System TOR. Contact IT constraints for modifications.</p>
        </div>
      </div>
    </div>
  );
};

// Newly Added Module for Hanginon's assignment
const AuditTrail = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredLogs = MOCK_AUDIT_LOG.filter(log => 
    log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Audit Trail</h2>
          <p className="text-gray-500">Track user sessions, actions, and system modifications.</p>
        </div>
        
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by User ID or Action..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg focus:border-[#800000] focus:ring-1 focus:ring-[#800000] outline-none text-sm transition-shadow shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full border-t-4 border-t-[#800000]">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action Performed</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Target</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={14} className="text-gray-400" /> {log.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-[#800000] text-sm">{log.user}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-800">{log.action}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">{log.target}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${log.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredLogs.length === 0 && (
          <div className="p-8 text-center text-gray-500">No audit logs found matching your criteria.</div>
        )}
      </div>
    </div>
  );
};

// Modified Admin Dashboard to Route the new Components
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const MENU_ITEMS = [
    { id: 'overview', label: 'System Overview', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'create', label: 'Create User', icon: UserPlus },
    { id: 'roles', label: 'Roles & Privileges', icon: Shield },
    { id: 'audit', label: 'Audit Trail', icon: Activity },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-24">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider">Admin Controls</h3>
          </div>
          <nav className="flex flex-col p-2">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-left font-medium text-sm
                    ${isActive ? 'bg-[#fff8f5] text-[#800000]' : 'text-gray-600 hover:bg-gray-50 hover:text-[#800000]'}`}
                >
                  <Icon size={18} className={isActive ? 'text-[#800000]' : 'text-gray-400'} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="flex-grow min-w-0">
        {activeTab === 'overview' && <AdminOverview />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'create' && <CreateUser />}
        {activeTab === 'roles' && <RolesPrivileges />}
        {activeTab === 'audit' && <AuditTrail />}
      </div>
    </div>
  );
};

// ==========================================
// --- FACULTY SUB-COMPONENTS ---
// ==========================================

const FacultyOverview = () => (
  <div className="animate-in fade-in duration-500">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
      <p className="text-gray-500">Quick summary of your classes and pending tasks.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-t-4 border-t-[#800000]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#fff8f5] rounded-full text-[#800000]">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Active Classes</p>
            <h3 className="text-3xl font-bold text-gray-900">4</h3>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-t-4 border-t-[#800000]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#fff8f5] rounded-full text-[#800000]">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Students</p>
            <h3 className="text-3xl font-bold text-gray-900">128</h3>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-t-4 border-t-[#800000]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#fff8f5] rounded-full text-[#800000]">
            <Calculator size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Pending Grades</p>
            <h3 className="text-3xl font-bold text-gray-900">2</h3>
          </div>
        </div>
      </div>
    </div>

    {/* System Status & Alerts */}
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <Activity size={18} className="text-[#800000]" /> 
          System Status & Alerts
        </h3>
        <span className="text-xs text-gray-500 font-medium">Last updated: Today, 08:30 AM</span>
      </div>
      <div className="divide-y divide-gray-100">
        <div className="px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors border-l-4 border-l-[#FFD700]">
          <AlertTriangle className="text-amber-500 mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="font-semibold text-gray-800">Midterm grade encoding deadline is approaching</p>
            <p className="text-sm text-gray-500 mt-1">Please ensure all midterm grades are finalized, computed, and submitted by Friday at 5:00 PM.</p>
          </div>
        </div>
        <div className="px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors border-l-4 border-l-blue-500">
          <Info className="text-blue-500 mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="font-semibold text-gray-800">Faculty Evaluation Period Open</p>
            <p className="text-sm text-gray-500 mt-1">Students are currently evaluating faculty performance. Departmental results will be available early next month.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MySubjects = ({ setActiveTab }) => {
  const FACULTY_SUBJECTS = [
    { id: 'SUB-102', code: 'HCI101', name: 'Human-Computer Interaction', units: 3, students: 42 },
    { id: 'SUB-105', code: 'PHYS101', name: 'University Physics', units: 5, students: 38 },
    { id: 'SUB-107', code: 'CS101', name: 'Introduction to Computing', units: 3, students: 48 },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Subjects</h2>
          <p className="text-gray-500">Manage your assigned classes for the current semester.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FACULTY_SUBJECTS.map((sub) => (
          <div key={sub.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col border-t-4 border-t-[#800000] hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{sub.code}</h3>
                <p className="text-sm text-gray-600 font-medium mt-1">{sub.name}</p>
              </div>
              <div className="bg-[#fff8f5] p-2 rounded-full text-[#800000]">
                <BookOpen size={20} />
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-4 mt-2">
              <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-semibold">{sub.units} Units</span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                <UserCircle size={14} className="text-[#800000]" />
                <span>{sub.students} Enrolled</span>
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-100 flex gap-3">
              <button 
                onClick={() => setActiveTab('students')} 
                className="flex-1 py-2 text-sm font-bold text-[#800000] bg-[#fff8f5] border border-[#800000]/20 hover:bg-[#800000] hover:text-white rounded transition-colors flex items-center justify-center gap-2"
              >
                <UserCircle size={16} /> View Roster
              </button>
              <button 
                onClick={() => setActiveTab('encoding')} 
                className="flex-1 py-2 text-sm font-bold text-white bg-[#800000] hover:bg-[#600000] rounded shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Calculator size={16} /> Input Grades
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 text-sm text-blue-800">
        <Info size={20} className="flex-shrink-0 mt-0.5 text-blue-600" />
        <p>If a subject is missing from your load, please contact your department supervisor.</p>
      </div>
    </div>
  );
};

const MyStudents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name-asc');
  
  const filteredStudents = MOCK_STUDENTS.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    if (sortBy === 'recent') return new Date(b.lastUpdated) - new Date(a.lastUpdated);
    if (sortBy === 'id-asc') return a.id.localeCompare(b.id);
    return 0;
  });

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Students</h2>
          <p className="text-gray-500">View and manage the students enrolled in your subjects.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search students..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg focus:border-[#800000] focus:ring-1 focus:ring-[#800000] outline-none text-sm transition-shadow shadow-sm"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 px-3 border border-gray-300 rounded-lg outline-none focus:border-[#800000] focus:ring-1 focus:ring-[#800000] bg-white text-gray-700 text-base min-w-[140px]"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="recent">Recently Updated</option>
            <option value="id-asc">ID Number</option>
          </select>

          <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-[#800000]' : 'text-gray-500 hover:text-gray-700'}`}
              title="List View"
            >
              <List size={18} />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#800000]' : 'text-gray-500 hover:text-gray-700'}`}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div 
              key={student.id} 
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all relative overflow-hidden group border-l-4 border-l-transparent hover:border-l-[#FFD700]"
            >
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-4">
                  <img src={student.avatar} alt={student.name} className="w-14 h-14 rounded-full object-cover border border-gray-200 shadow-sm" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-[#800000] transition-colors">{student.name}</h3>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full inline-block mt-1">ID: {student.id}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Program</p>
                  <p className="text-sm font-medium text-gray-800">{student.program}</p>
                </div>
                
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Year Level</p>
                  <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#800000]"></span>
                    {student.yearLevel}
                  </p>
                </div>
                
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Department</p>
                  <p className="text-sm font-medium text-gray-800">{student.department}</p>
                </div>
              </div>

              <button className="w-full py-2.5 text-sm font-bold text-[#800000] bg-[#fff8f5] border border-[#800000]/10 hover:bg-[#800000] hover:text-white rounded transition-colors flex items-center justify-center gap-2">
                View Profile <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full border-t-4 border-t-[#800000]">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID / Program</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Year Level</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm" />
                        <span className="font-bold text-gray-900 group-hover:text-[#800000] transition-colors">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#800000]">{student.id}</span>
                        <span className="text-xs text-gray-600 truncate max-w-[200px]" title={student.program}>{student.program}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-800 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#800000]"></span>
                        {student.yearLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{student.department}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="px-4 py-2 text-xs font-bold text-[#800000] bg-[#fff8f5] border border-[#800000]/20 hover:bg-[#800000] hover:text-white rounded transition-colors inline-flex items-center gap-1 min-h-[44px]">
                        View Profile <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredStudents.length === 0 && (
        <div className="p-12 text-center flex flex-col items-center justify-center bg-white rounded-lg border border-gray-200 border-dashed">
          <Users size={48} className="text-gray-300 mb-4" />
          <p className="text-lg font-semibold text-gray-700">No students found</p>
          <p className="text-gray-500">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

// ==========================================
// --- GRADE ENCODING SYSTEM ---
// ==========================================
const GradeEncoding = ({ readOnly = false, subjectInfo = null }) => {
  const [grades, setGrades] = useState(MOCK_GRADES);
  const [activeTab, setActiveTab] = useState('prelim');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);

  // Clear active edit row when switching tabs to prevent lingering states
  useEffect(() => {
    setEditingStudentId(null);
  }, [activeTab]);

  const handleGradeChange = (studentId, field, value) => {
    if (readOnly) return; // Prevent state changes if read-only
    const numValue = value === '' ? '' : Math.min(100, Math.max(0, Number(value)));
    setGrades(prev => prev.map(g => {
      if (g.studentId === studentId) {
        return {
          ...g,
          periods: { ...g.periods, [activeTab]: { ...g.periods[activeTab], [field]: numValue } }
        };
      }
      return g;
    }));
  };

  const computeClassPerformance = (student, period) => {
    const att = student.periods[period].attendance;
    const quiz = student.periods[period].quizzes;
    const proj = student.periods[period].project;
    if (att === '' && quiz === '' && proj === '') return '';
    return ((Number(att || 0) * 0.10) + (Number(quiz || 0) * 0.30) + (Number(proj || 0) * 0.30)).toFixed(2);
  };

  const computePeriodGrade = (student, period) => {
    const classPerf = computeClassPerformance(student, period);
    const exam = student.periods[period].exam;
    if (classPerf === '' && exam === '') return '';
    return (Number(classPerf || 0) + (Number(exam || 0) * 0.30)).toFixed(2);
  };

  const computeOverallSemesterGrade = (student) => {
    const prelim = computePeriodGrade(student, 'prelim');
    const midterm = computePeriodGrade(student, 'midterm');
    const finals = computePeriodGrade(student, 'finals');
    if (!prelim || !midterm || !finals) return 'Incomplete';
    return ((Number(prelim) * 0.30) + (Number(midterm) * 0.30) + (Number(finals) * 0.40)).toFixed(2);
  };

  const computeTransmutedGrade = (overallPercentage) => {
    if (overallPercentage === 'Incomplete') return 'INC';
    const score = Math.round(Number(overallPercentage));
    if (score >= 98) return '1.00';
    if (score >= 95) return '1.25';
    if (score >= 92) return '1.50';
    if (score >= 89) return '1.75';
    if (score >= 86) return '2.00';
    if (score >= 83) return '2.25';
    if (score >= 80) return '2.50';
    if (score >= 77) return '2.75';
    if (score >= 75) return '3.00';
    return '5.00';
  };

  const handleSaveGrades = () => {
    if (readOnly) return;
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 800);
  };

  return (
    <div className="animate-in fade-in duration-500">
      {readOnly && (
        <div className="bg-amber-50 border-l-4 border-l-[#FFD700] p-4 mb-6 rounded-r-lg flex items-start gap-3 shadow-sm">
          <AlertTriangle className="text-amber-600 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-bold text-amber-800">Oversight View Restricted</h3>
            <p className="text-sm text-amber-700">Oversight View: Grade editing is restricted for Supervisors. Read-only mode active.</p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{readOnly ? 'Class Oversight' : 'Grade Encoding'}</h2>
          <p className="text-gray-500 text-sm mt-1">
            Subject: <span className="font-semibold text-gray-700">{subjectInfo ? `${subjectInfo.code} - ${subjectInfo.name}` : '9408-AY-225-BSCS-2207-LEC (HCI 1)'}</span>
          </p>
        </div>
        
        {!readOnly && activeTab !== 'summary' && (
          <button 
            onClick={handleSaveGrades}
            disabled={isSaving}
            className="bg-[#800000] text-white font-bold py-2.5 px-5 rounded-lg shadow-sm hover:bg-[#600000] transition-colors flex items-center gap-2 disabled:opacity-70 min-h-[44px]"
          >
            {isSaving ? <Activity className="animate-spin" size={18} /> : <Save size={18} />}
            {isSaving ? 'Saving...' : `Save ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
          </button>
        )}
      </div>

      {showToast && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 flex items-center gap-3 animate-in slide-in-from-top-2">
          <CheckCircle size={18} className="text-green-600" />
          <span className="font-medium text-sm">Grades for {activeTab} have been successfully saved to the system.</span>
        </div>
      )}

      {/* Period Selection Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 bg-gray-100 p-1 rounded-lg inline-flex">
        {[
          { id: 'prelim', label: 'Prelims' },
          { id: 'midterm', label: 'Midterms' },
          { id: 'finals', label: 'Finals' },
          { id: 'summary', label: 'Overall Summary', isSpecial: true }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2.5 text-sm font-bold rounded-md transition-all flex items-center gap-2
              ${activeTab === tab.id 
                ? (tab.isSpecial ? 'bg-gray-800 text-white shadow-sm' : 'bg-[#800000] text-white shadow-sm')
                : 'text-gray-600 hover:bg-gray-200'}`}
          >
            {tab.isSpecial ? <FileSpreadsheet size={16} /> : <CheckSquare size={16} />}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab !== 'summary' ? (
        <>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex gap-3 text-sm text-blue-800">
            <Info size={20} className="flex-shrink-0 mt-0.5 text-blue-600" />
            <p>
              <strong>{readOnly ? `Viewing ${activeTab.toUpperCase()}:` : `Encoding ${activeTab.toUpperCase()}:`}</strong> 
              {readOnly ? ' All fields are locked for editing.' : <> Click <strong>"Edit"</strong> on a student's row to unlock their inputs. This prevents accidental grade entries in the wrong row. Fields with a gold background and lock icon (<Lock size={12} className="inline mx-0.5 text-[#800000]"/>) are <span className="font-bold underline">system-computed</span> and cannot be edited manually.</>}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10 w-64 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">Student Name</th>
                    <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center border-l border-gray-200 w-32">Attendance <br/><span className="text-[#800000]">(10%)</span></th>
                    <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center border-l border-gray-200 w-32">Quizzes <br/><span className="text-[#800000]">(30%)</span></th>
                    <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center border-l border-gray-200 w-32">Project <br/><span className="text-[#800000]">(30%)</span></th>
                    <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center border-l border-gray-200 bg-[#fff8f5] w-36">Class Perf. <br/><span className="text-[#800000]">(70% Max)</span></th>
                    <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center border-l border-gray-200 w-32">Major Exam <br/><span className="text-[#800000]">(30%)</span></th>
                    <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center border-l border-gray-200 bg-[#fff8f5] w-36">{activeTab} Grade <br/><span className="text-[#800000]">(100%)</span></th>
                    {!readOnly && (
                      <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center border-l border-gray-200 w-32">Action</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {grades.map((student) => {
                    const classPerf = computeClassPerformance(student, activeTab);
                    const finalPeriodGrade = computePeriodGrade(student, activeTab);
                    
                    const isEditingThisRow = editingStudentId === student.studentId;
                    const isAnotherRowEditing = editingStudentId !== null && !isEditingThisRow;
                    const isInputDisabled = readOnly || !isEditingThisRow;
                    
                    const rowClasses = `transition-all duration-300 group ${
                      isAnotherRowEditing ? 'opacity-40 grayscale bg-gray-50' : 
                      isEditingThisRow ? 'bg-blue-50/20 border-y-2 border-[#800000]/20 shadow-sm relative z-20' : 
                      'hover:bg-gray-50 bg-white'
                    }`;

                    return (
                      <tr key={student.studentId} className={rowClasses}>
                        <td className={`px-6 py-3 sticky left-0 z-10 border-r border-transparent shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] transition-colors ${isEditingThisRow ? 'bg-blue-50/20' : 'bg-white group-hover:bg-gray-50'}`}>
                          <div className="flex items-center gap-3">
                            <img src={student.avatar} alt={student.name} className={`w-8 h-8 rounded-full object-cover border border-gray-200 transition-all ${isEditingThisRow ? 'ring-2 ring-[#800000]' : ''}`} />
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-900 text-sm">{student.name}</span>
                              <span className="text-[10px] text-gray-500">{student.studentId}</span>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-4 py-3 border-l border-gray-200 text-center">
                          <input type="number" disabled={isInputDisabled} value={student.periods[activeTab].attendance} onChange={(e) => handleGradeChange(student.studentId, 'attendance', e.target.value)} className={`w-full text-center h-10 border border-gray-300 rounded focus:border-[#800000] focus:ring-1 focus:ring-[#800000] outline-none text-base font-medium transition-all ${isInputDisabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed opacity-80' : 'bg-white shadow-inner hover:border-[#800000]/50'}`} />
                        </td>
                        <td className="px-4 py-3 border-l border-gray-200 text-center">
                          <input type="number" disabled={isInputDisabled} value={student.periods[activeTab].quizzes} onChange={(e) => handleGradeChange(student.studentId, 'quizzes', e.target.value)} className={`w-full text-center h-10 border border-gray-300 rounded focus:border-[#800000] focus:ring-1 focus:ring-[#800000] outline-none text-base font-medium transition-all ${isInputDisabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed opacity-80' : 'bg-white shadow-inner hover:border-[#800000]/50'}`} />
                        </td>
                        <td className="px-4 py-3 border-l border-gray-200 text-center">
                          <input type="number" disabled={isInputDisabled} value={student.periods[activeTab].project} onChange={(e) => handleGradeChange(student.studentId, 'project', e.target.value)} className={`w-full text-center h-10 border border-gray-300 rounded focus:border-[#800000] focus:ring-1 focus:ring-[#800000] outline-none text-base font-medium transition-all ${isInputDisabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed opacity-80' : 'bg-white shadow-inner hover:border-[#800000]/50'}`} />
                        </td>
                        <td className="px-4 py-3 border-l border-gray-200 bg-[#fafafa]">
                          <div className="flex items-center justify-between px-3 h-10 bg-[#fff8f5] rounded border border-[#800000]/10 text-[#800000] cursor-not-allowed">
                            <span className="font-bold text-sm w-full text-center">{classPerf || '-'}</span>
                            <Lock size={12} className="text-gray-400 opacity-60 flex-shrink-0" />
                          </div>
                        </td>
                        <td className="px-4 py-3 border-l border-gray-200 text-center">
                          <input type="number" disabled={isInputDisabled} value={student.periods[activeTab].exam} onChange={(e) => handleGradeChange(student.studentId, 'exam', e.target.value)} className={`w-full text-center h-10 border border-gray-300 rounded focus:border-[#800000] focus:ring-1 focus:ring-[#800000] outline-none text-base font-medium transition-all ${isInputDisabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed opacity-80' : 'bg-white shadow-inner hover:border-[#800000]/50'}`} />
                        </td>
                        <td className="px-4 py-3 border-l border-gray-200 bg-[#fafafa]">
                          <div className="flex items-center justify-between px-3 h-10 bg-[#fff8f5] rounded border border-[#FFD700]/40 text-[#1e1b18] cursor-not-allowed shadow-inner">
                            <span className="font-bold text-sm w-full text-center">{finalPeriodGrade || '-'}</span>
                            <Lock size={12} className="text-[#800000] opacity-80 flex-shrink-0" />
                          </div>
                        </td>
                        {!readOnly && (
                          <td className="px-4 py-3 border-l border-gray-200 text-center">
                            {isEditingThisRow ? (
                              <button 
                                onClick={() => setEditingStudentId(null)}
                                className="w-full min-h-[44px] px-3 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded transition-colors flex items-center justify-center gap-1 shadow-sm"
                              >
                                <Check size={16} /> Done
                              </button>
                            ) : (
                              <button 
                                onClick={() => setEditingStudentId(student.studentId)}
                                disabled={isAnotherRowEditing}
                                className={`w-full min-h-[44px] px-3 py-2 text-sm font-bold rounded transition-colors flex items-center justify-center gap-1
                                  ${isAnotherRowEditing ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-[#800000] bg-[#fff8f5] border border-[#800000]/20 hover:bg-[#800000] hover:text-white'}`}
                              >
                                <Edit size={16} /> Edit
                              </button>
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* OVERALL SUMMARY VIEW */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full border-t-4 border-t-gray-800">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
             <div>
               <h3 className="font-bold text-gray-800 text-lg">Official Grade Report</h3>
               <p className="text-sm text-gray-500">Read-only view of computed semester totals and transmutations.</p>
             </div>
             <ShieldCheck size={28} className="text-[#800000]" />
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">Student Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Prelim (30%)</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Midterm (30%)</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Finals (40%)</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center bg-gray-50">Overall Grade</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#800000] uppercase tracking-wider text-center bg-[#fff8f5] relative group cursor-help">
                    <div className="flex items-center justify-center gap-1">
                      GWA <HelpCircle size={14} className="text-[#800000]" />
                    </div>
                    <div className="absolute top-full right-0 mt-2 w-52 p-3 bg-gray-800 text-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] text-left font-normal normal-case tracking-normal">
                      <div className="font-bold mb-2 border-b border-gray-600 pb-1">GWA Scale Reference</div>
                      <ul className="space-y-1 text-xs">
                        <li><span className="text-green-400 font-semibold inline-block w-20">1.00 - 1.50</span> Excellent</li>
                        <li><span className="text-green-300 font-semibold inline-block w-20">1.75 - 2.50</span> Good</li>
                        <li><span className="text-orange-300 font-semibold inline-block w-20">2.75 - 3.00</span> Passing</li>
                        <li><span className="text-red-400 font-semibold inline-block w-20">5.00 / INC</span> Failed</li>
                      </ul>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {grades.map((student) => {
                  const pGrade = computePeriodGrade(student, 'prelim');
                  const mGrade = computePeriodGrade(student, 'midterm');
                  const fGrade = computePeriodGrade(student, 'finals');
                  const overall = computeOverallSemesterGrade(student);
                  const pointGrade = computeTransmutedGrade(overall);
                  
                  let badgeColor = '';
                  if (pointGrade === 'INC' || pointGrade === '5.00') {
                    badgeColor = 'bg-red-100 text-red-800 border-red-200';
                  } else if (pointGrade === '2.75' || pointGrade === '3.00') {
                    badgeColor = 'bg-orange-100 text-orange-800 border-orange-200';
                  } else {
                    badgeColor = 'bg-green-100 text-green-800 border-green-200';
                  }

                  return (
                    <tr key={student.studentId} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 sticky left-0 bg-white group-hover:bg-gray-50 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                        <div className="flex items-center gap-3">
                          <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900 text-sm">{student.name}</span>
                            <span className="text-[10px] text-gray-500">{student.studentId}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-medium text-gray-700">{pGrade || '-'}</td>
                      <td className="px-6 py-4 text-center font-medium text-gray-700">{mGrade || '-'}</td>
                      <td className="px-6 py-4 text-center font-medium text-gray-700">{fGrade || '-'}</td>
                      <td className="px-6 py-4 text-center bg-gray-50">
                        <span className="font-bold text-gray-800">{overall !== 'Incomplete' ? overall : '-'}</span>
                      </td>
                      <td className="px-6 py-4 text-center bg-[#fff8f5]">
                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold border ${badgeColor}`}>
                          {pointGrade}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// --- FACULTY DASHBOARD COMPONENT ---
// ==========================================
const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const MENU_ITEMS = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'subjects', label: 'My Subjects', icon: BookOpen },
    { id: 'students', label: 'My Students', icon: Users },
    { id: 'encoding', label: 'Grade Encoding', icon: Calculator },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-24">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider">Faculty Portal</h3>
          </div>
          <nav className="flex flex-col p-2">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-left font-medium text-sm
                    ${isActive ? 'bg-[#fff8f5] text-[#800000]' : 'text-gray-600 hover:bg-gray-50 hover:text-[#800000]'}`}
                >
                  <Icon size={18} className={isActive ? 'text-[#800000]' : 'text-gray-400'} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="flex-grow min-w-0">
        {activeTab === 'overview' && <FacultyOverview />}
        {activeTab === 'subjects' && <MySubjects setActiveTab={setActiveTab} />}
        {activeTab === 'students' && <MyStudents />}
        {activeTab === 'encoding' && <GradeEncoding />}
      </div>
    </div>
  );
};

// ==========================================
// --- DASHBOARD PLACEHOLDER COMPONENTS ---
// ==========================================
const SupervisorOverview = () => (
  <div className="animate-in fade-in duration-500">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900">Department Dashboard</h2>
      <p className="text-gray-500">Overview of departmental metrics and pending actions.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-t-4 border-t-[#800000]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#fff8f5] rounded-full text-[#800000]">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Subjects</p>
            <h3 className="text-3xl font-bold text-gray-900">42</h3>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-t-4 border-t-[#800000]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#fff8f5] rounded-full text-[#800000]">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Active Faculty</p>
            <h3 className="text-3xl font-bold text-gray-900">18</h3>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <AlertTriangle size={18} className="text-[#800000]" /> 
          Pending Items & Alerts
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {/* High Priority Alert - Red Highlight */}
        <div className="px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors border-l-4 border-l-red-600 bg-red-50/40">
          <AlertTriangle className="text-red-600 mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="font-bold text-red-800">Unassigned Core Subjects</p>
            <p className="text-sm text-red-700/90 mt-1">3 major subjects lack assigned faculty for the upcoming term. Immediate action required to prevent schedule conflicts.</p>
          </div>
        </div>
        
        {/* Warning Alert - Gold Highlight */}
        <div className="px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors border-l-4 border-l-[#FFD700]">
          <AlertTriangle className="text-amber-600 mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="font-semibold text-gray-800">Delayed Grade Submissions</p>
            <p className="text-sm text-gray-500 mt-1">2 faculty members have not yet finalized and submitted their midterm grades for review.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AssignSubjectView = ({ subjects, onAssign }) => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');

  const activeFaculty = MOCK_USERS.filter(u => u.role === 'Faculty' && u.status === 'Active');
  const unassignedSubjects = subjects.filter(s => !s.assignedTo);

  const handleAssignClick = () => {
    if (!selectedSubject || !selectedFaculty) return;
    onAssign(selectedSubject, selectedFaculty);
    setSelectedSubject('');
    setSelectedFaculty('');
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-3xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Assign Subject</h2>
        <p className="text-gray-500">Allocate subjects to available faculty members for the current term.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden border-t-4 border-t-[#800000]">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
          <BookOpen size={20} className="text-[#800000]" />
          <h3 className="font-bold text-gray-800">Assignment Configuration</h3>
        </div>
        
        <div className="p-8 space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
              Select Subject
            </label>
            <select 
              className="w-full h-12 px-4 border border-gray-300 rounded focus:border-[#800000] focus:ring-1 focus:ring-[#800000] outline-none transition-all text-base bg-white"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="" disabled>-- Choose an unassigned subject --</option>
              {unassignedSubjects.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.code} - {sub.name} ({sub.units} Units)</option>
              ))}
            </select>
            {unassignedSubjects.length === 0 && (
              <p className="text-xs text-[#800000] mt-2 font-medium flex items-center gap-1">
                <Info size={14} /> All subjects are currently assigned.
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
              Select Faculty Member
            </label>
            <select 
              className="w-full h-12 px-4 border border-gray-300 rounded focus:border-[#800000] focus:ring-1 focus:ring-[#800000] outline-none transition-all text-base bg-white"
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
            >
              <option value="" disabled>-- Choose active faculty --</option>
              {activeFaculty.map(fac => (
                <option key={fac.id} value={fac.id}>{fac.name} ({fac.id})</option>
              ))}
            </select>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button 
              onClick={handleAssignClick}
              disabled={!selectedSubject || !selectedFaculty}
              className="px-6 py-3 font-bold text-white bg-[#800000] hover:bg-[#600000] rounded-lg shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-base"
            >
              <CheckCircle size={18} className="text-[#FFD700]" /> Assign Faculty
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DepartmentSubjectsView = ({ subjects, onUnassign }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Department Subjects</h2>
          <p className="text-gray-500">Overview of all departmental courses and their assigned professors.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full border-t-4 border-t-[#800000]">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Subject Code</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Units</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Assigned Faculty</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subjects.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900 text-sm">{sub.code}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{sub.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 font-medium">{sub.units}.0</span>
                  </td>
                  <td className="px-6 py-4">
                    {sub.assignedTo ? (
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">{sub.assignedName}</span>
                        <span className="text-xs text-[#800000]">{sub.assignedTo}</span>
                      </div>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                        Unassigned
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {sub.assignedTo ? (
                      <button 
                        onClick={() => onUnassign(sub)}
                        className="px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 border border-red-200 rounded transition-colors inline-flex items-center gap-1 min-h-[44px]"
                      >
                        <X size={14} /> Unassign
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 italic">No action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const FacultyRosterView = ({ subjects, onReviewClass }) => {
  const [viewMode, setViewMode] = useState('grid');
  const facultyMembers = MOCK_USERS.filter(u => u.role === 'Faculty');

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Faculty Roster</h2>
          <p className="text-gray-500">View department faculty and oversee their assigned classes.</p>
        </div>
        
        <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-[#800000]' : 'text-gray-500 hover:text-gray-700'}`}
            title="List View"
          >
            <List size={18} />
          </button>
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#800000]' : 'text-gray-500 hover:text-gray-700'}`}
            title="Grid View"
          >
            <LayoutGrid size={18} />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {facultyMembers.map(faculty => {
            const assignedClasses = subjects.filter(sub => sub.assignedTo === faculty.id);
            
            return (
              <div key={faculty.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-gray-50">
                  <img src={faculty.avatar} alt={faculty.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{faculty.name}</h3>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full inline-block mt-1">{faculty.id}</span>
                  </div>
                </div>
                
                <div className="p-6 flex-grow">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <BookOpen size={14} /> Assigned Classes ({assignedClasses.length})
                  </h4>
                  
                  {assignedClasses.length > 0 ? (
                    <ul className="space-y-3">
                      {assignedClasses.map(sub => (
                        <li key={sub.id} className="p-3 bg-[#fff8f5] border border-[#800000]/10 rounded-md flex justify-between items-center group">
                          <div>
                            <p className="text-sm font-bold text-gray-900">{sub.code}</p>
                            <p className="text-xs text-gray-600 truncate max-w-[150px]">{sub.name}</p>
                          </div>
                          <button 
                            onClick={() => onReviewClass(sub)}
                            className="px-3 py-1.5 text-xs font-bold text-white bg-[#800000] hover:bg-[#600000] rounded shadow-sm transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100 focus:opacity-100 min-h-[44px]"
                          >
                            <Search size={14} /> Review
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400 italic text-center py-4">No classes assigned yet.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full border-t-4 border-t-[#800000]">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Faculty Member</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Faculty ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Assigned Classes</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {facultyMembers.map(faculty => {
                  const assignedClasses = subjects.filter(sub => sub.assignedTo === faculty.id);
                  
                  return (
                    <tr key={faculty.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={faculty.avatar} alt={faculty.name} className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm" />
                          <span className="font-bold text-gray-900">{faculty.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-[#800000]">{faculty.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        {assignedClasses.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {assignedClasses.map(sub => (
                              <span key={sub.id} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-[#fff8f5] text-[#800000] border border-[#800000]/20" title={sub.name}>
                                {sub.code}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 italic">No classes assigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {assignedClasses.length > 0 ? (
                          <div className="flex flex-col gap-2 items-end">
                            {assignedClasses.map(sub => (
                              <button 
                                key={sub.id}
                                onClick={() => onReviewClass(sub)}
                                className="px-3 py-1 text-xs font-bold text-[#800000] bg-white border border-[#800000]/20 hover:bg-[#800000] hover:text-white rounded transition-colors inline-flex items-center gap-1 min-h-[36px]"
                              >
                                <Search size={14} /> Review {sub.code}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 italic px-3 py-1">N/A</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const SupervisorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [selectedOversightSubject, setSelectedOversightSubject] = useState(null);
  
  // HCI Modal & Toast State
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '', type: 'primary', action: null });
  const [toastMessage, setToastMessage] = useState({ show: false, text: '' });

  const MENU_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assign-subject', label: 'Assign Subject', icon: BookOpen },
    { id: 'department-subjects', label: 'Department Subjects', icon: List },
    { id: 'faculty-roster', label: 'Faculty Roster', icon: Users },
  ];

  const showToast = (text) => {
    setToastMessage({ show: true, text });
    setTimeout(() => setToastMessage({ show: false, text: '' }), 3000);
  };

  const confirmAction = () => {
    if (modalConfig.action) modalConfig.action();
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  // Logic Handlers
  const requestAssign = (subjectId, facultyId) => {
    const subject = subjects.find(s => s.id === subjectId);
    const faculty = MOCK_USERS.find(u => u.id === facultyId);
    
    setModalConfig({
      isOpen: true,
      title: 'Confirm Assignment',
      message: `You are about to assign ${subject.code} (${subject.name}) to ${faculty.name}. Do you wish to proceed with this assignment?`,
      type: 'primary',
      action: () => {
        setSubjects(prev => prev.map(s => s.id === subjectId ? { ...s, assignedTo: faculty.id, assignedName: faculty.name } : s));
        showToast(`Successfully assigned ${subject.code} to ${faculty.name}.`);
      }
    });
  };

  const requestUnassign = (subject) => {
    setModalConfig({
      isOpen: true,
      title: 'Confirm Unassignment',
      message: `Are you sure you want to remove ${subject.assignedName} from teaching ${subject.code}? This will leave the subject unassigned.`,
      type: 'danger',
      action: () => {
        setSubjects(prev => prev.map(s => s.id === subject.id ? { ...s, assignedTo: null, assignedName: null } : s));
        showToast(`Faculty removed from ${subject.code}. Subject is now unassigned.`);
      }
    });
  };

  const handleReviewClass = (subject) => {
    setSelectedOversightSubject(subject);
    setActiveTab('oversight');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative">
      <HCIConfirmation 
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onConfirm={confirmAction}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
      />
      <SuccessToast show={toastMessage.show} message={toastMessage.text} />

      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-24">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider">Supervisor Portal</h3>
          </div>
          <nav className="flex flex-col p-2 gap-1">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-md transition-colors text-left font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#800000] focus:ring-offset-1
                    ${isActive ? 'bg-[#fff8f5] text-[#800000]' : 'text-gray-600 hover:bg-gray-50 hover:text-[#800000]'}`}
                >
                  <Icon size={18} className={isActive ? 'text-[#800000]' : 'text-gray-400'} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="flex-grow min-w-0">
        {activeTab === 'dashboard' && <SupervisorOverview />}
        {activeTab === 'assign-subject' && <AssignSubjectView subjects={subjects} onAssign={requestAssign} />}
        {activeTab === 'department-subjects' && <DepartmentSubjectsView subjects={subjects} onUnassign={requestUnassign} />}
        {activeTab === 'faculty-roster' && <FacultyRosterView subjects={subjects} onReviewClass={handleReviewClass} />}
        
        {activeTab === 'oversight' && (
          <div className="animate-in fade-in duration-500">
            <button 
              onClick={() => setActiveTab('faculty-roster')}
              className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#800000] transition-colors min-h-[44px] px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000]"
            >
              <ChevronRight className="rotate-180" size={18} /> Back to Faculty Roster
            </button>
            <GradeEncoding readOnly={true} subjectInfo={selectedOversightSubject} />
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// --- MAIN APP (STATE & ROUTER) ---
// ==========================================
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');

  const handleLogin = (user) => {
    setCurrentUser(user);
    if (user.role === 'Admin') setCurrentPage('admin-dashboard');
    else if (user.role === 'Faculty') setCurrentPage('faculty-dashboard');
    else if (user.role === 'Supervisor') setCurrentPage('supervisor-dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  if (!currentUser || currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#f3f4f5] font-sans pb-12 w-full">
      <TopNav user={currentUser} onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto mt-8 px-6 w-full">
        {currentPage === 'admin-dashboard' && <AdminDashboard />}
        {currentPage === 'faculty-dashboard' && <FacultyDashboard />}
        {currentPage === 'supervisor-dashboard' && <SupervisorDashboard />}
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
}
