
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Wallet, 
  Settings, 
  MessageSquareText, 
  Menu, 
  X,
  Search,
  UserCircle,
  Plus,
  Trash2,
  ListRestart,
  BookOpen,
  ClipboardList,
  Building2
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import TeacherList from './components/TeacherList';
import FeesManagement from './components/FeesManagement';
import AIAssistant from './components/AIAssistant';
import ResultManagement from './components/ResultManagement';
import AccountsManagement from './components/AccountsManagement';
import ProfileSettings from './components/ProfileSettings';
import { View, Student, Teacher, Jamat, Subject, Exam, ResultRecord, Transaction, TransactionCategory, MadrasaProfile } from './types';

const STORAGE_KEY_STUDENTS = 'madrasa_students_v7';
const STORAGE_KEY_TEACHERS = 'madrasa_teachers_v7';
const STORAGE_KEY_CLASSES = 'madrasa_classes_v7';
const STORAGE_KEY_SUBJECTS = 'madrasa_subjects_v7';
const STORAGE_KEY_EXAMS = 'madrasa_exams_v7';
const STORAGE_KEY_RESULTS = 'madrasa_results_v7';
const STORAGE_KEY_TRANSACTIONS = 'madrasa_transactions_v7';
const STORAGE_KEY_CATEGORIES = 'madrasa_categories_v7';
const STORAGE_KEY_PROFILE = 'madrasa_profile_v7';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [activeJamatForSubject, setActiveJamatForSubject] = useState<string | null>(null);
  const [newSubjectName, setNewSubjectName] = useState('');

  // States with LocalStorage Sync
  const [classes, setClasses] = useState<Jamat[]>(() => JSON.parse(localStorage.getItem(STORAGE_KEY_CLASSES) || '[{"id":"1","name":"মিজান"},{"id":"2","name":"নাহবেমীর"}]'));
  const [subjects, setSubjects] = useState<Subject[]>(() => JSON.parse(localStorage.getItem(STORAGE_KEY_SUBJECTS) || '[]'));
  const [exams, setExams] = useState<Exam[]>(() => JSON.parse(localStorage.getItem(STORAGE_KEY_EXAMS) || '[{"id":"1","name":"বার্ষিক পরীক্ষা"}]'));
  const [results, setResults] = useState<ResultRecord[]>(() => JSON.parse(localStorage.getItem(STORAGE_KEY_RESULTS) || '[]'));
  const [students, setStudents] = useState<Student[]>(() => JSON.parse(localStorage.getItem(STORAGE_KEY_STUDENTS) || '[]'));
  const [teachers, setTeachers] = useState<Teacher[]>(() => JSON.parse(localStorage.getItem(STORAGE_KEY_TEACHERS) || '[]'));
  const [transactions, setTransactions] = useState<Transaction[]>(() => JSON.parse(localStorage.getItem(STORAGE_KEY_TRANSACTIONS) || '[]'));
  const [categories, setCategories] = useState<TransactionCategory[]>(() => JSON.parse(localStorage.getItem(STORAGE_KEY_CATEGORIES) || '[{"id":"1","name":"বেতন","type":"expense"},{"id":"2","name":"সদকা","type":"income"}]'));
  const [profile, setProfile] = useState<MadrasaProfile>(() => JSON.parse(localStorage.getItem(STORAGE_KEY_PROFILE) || JSON.stringify({
    name: 'মাদরাসার নাম সেট করুন',
    address: 'ঠিকানা এখানে লিখুন',
    phone: '০১৭০০-০০০০০০',
    email: 'info@madrasa.com',
    established: '২০২৪',
    logo: ''
  })));

  // Syncing to LocalStorage
  useEffect(() => { localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY_TEACHERS, JSON.stringify(teachers)); }, [teachers]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY_CLASSES, JSON.stringify(classes)); }, [classes]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY_SUBJECTS, JSON.stringify(subjects)); }, [subjects]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY_EXAMS, JSON.stringify(exams)); }, [exams]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(results)); }, [results]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile)); }, [profile]);

  const navigateTo = (view: View) => {
    setCurrentView(view);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const navItems = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
    { id: 'profile', label: 'মাদরাসা প্রোফাইল', icon: Building2 },
    { id: 'students', label: 'শিক্ষার্থী', icon: GraduationCap },
    { id: 'teachers', label: 'শিক্ষক', icon: Users },
    { id: 'fees', label: 'ফি কালেকশন', icon: Wallet },
    { id: 'accounts', label: 'আয়-ব্যয় হিসাব', icon: ListRestart },
    { id: 'results', label: 'ফলাফল', icon: ClipboardList },
    { id: 'ai-assistant', label: 'স্মার্ট অ্যাসিস্ট্যান্ট', icon: MessageSquareText },
    { id: 'settings', label: 'সেটিংস', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-x-hidden">
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-emerald-900 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="p-6 border-b border-emerald-800/50 flex justify-between items-center">
          <h1 className="text-2xl font-black flex items-center gap-3">
             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center rotate-3 shadow-lg overflow-hidden">
                {profile.logo ? <img src={profile.logo} className="w-full h-full object-cover" /> : <span className="text-emerald-900 text-lg font-black">MMS</span>}
             </div>
             মাদরাসা ম্যানেজমেন্ট
          </h1>
          <button className="lg:hidden p-2" onClick={() => setSidebarOpen(false)}><X size={24} /></button>
        </div>
        <nav className="mt-8 px-4 space-y-1 overflow-y-auto max-h-[calc(100vh-120px)] custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id as View)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-200 ${currentView === item.id ? 'bg-emerald-600 text-white shadow-xl' : 'text-emerald-100 hover:bg-emerald-800/50'}`}
            >
              <item.icon size={22} />
              <span className="text-lg font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-16 lg:h-20 bg-white border-b flex items-center justify-between px-4 lg:px-8 flex-shrink-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-emerald-900 bg-emerald-50 rounded-lg"><Menu size={24} /></button>
            <h2 className="hidden md:block font-black text-emerald-900 truncate max-w-[300px]">{profile.name}</h2>
          </div>
          <div className="flex items-center gap-3">
             <div className="hidden sm:block text-right mr-2">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Admin Panel</p>
                <p className="text-xs font-bold text-emerald-700 mt-1">মুহতামিম</p>
             </div>
             <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 border-2 border-white shadow-sm">
                <UserCircle size={32} />
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-slate-50 pb-24">
          <div className="max-w-7xl mx-auto">
            {currentView === 'dashboard' && <Dashboard students={students} teachers={teachers} transactions={transactions} profile={profile} />}
            {currentView === 'profile' && <ProfileSettings profile={profile} setProfile={setProfile} />}
            {currentView === 'students' && <StudentList students={students} setStudents={setStudents} classes={classes} />}
            {currentView === 'teachers' && <TeacherList teachers={teachers} setTeachers={setTeachers} subjects={subjects} />}
            {currentView === 'fees' && <FeesManagement students={students} setStudents={setStudents} transactions={transactions} setTransactions={setTransactions} categories={categories} profile={profile} />}
            {currentView === 'accounts' && <AccountsManagement transactions={transactions} setTransactions={setTransactions} categories={categories} setCategories={setCategories} profile={profile} />}
            {currentView === 'results' && <ResultManagement students={students} classes={classes} subjects={subjects} exams={exams} setExams={setExams} results={results} setResults={setResults} profile={profile} />}
            {currentView === 'ai-assistant' && <AIAssistant />}
            {currentView === 'settings' && (
              <div className="space-y-8 pb-12">
                <div className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm">
                  <h2 className="text-2xl font-black text-slate-800 mb-6">জামাত ও বিষয় ব্যবস্থাপনা</h2>
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <input type="text" value={newClassName} onChange={(e) => setNewClassName(e.target.value)} placeholder="নতুন জামাত..." className="flex-1 p-4 bg-slate-50 rounded-xl outline-none" />
                    <button onClick={() => {if(newClassName) setClasses([...classes, {id:Date.now().toString(), name:newClassName}]); setNewClassName('')}} className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold">জামাত যোগ</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {classes.map(cls => (
                      <div key={cls.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-black text-lg">{cls.name}</span>
                          <button onClick={() => setClasses(classes.filter(c => c.id !== cls.id))} className="text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={18}/></button>
                        </div>
                        <div className="flex gap-2">
                          <input type="text" placeholder="বিষয়..." value={activeJamatForSubject === cls.id ? newSubjectName : ''} onChange={(e) => {setActiveJamatForSubject(cls.id); setNewSubjectName(e.target.value)}} className="flex-1 p-2 text-sm rounded-lg border bg-white outline-none" />
                          <button onClick={() => {if(newSubjectName) setSubjects([...subjects, {id:Date.now().toString(), name:newSubjectName, jamatId:cls.id}]); setNewSubjectName('')}} className="p-2 bg-emerald-500 text-white rounded-lg"><Plus size={18}/></button>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {subjects.filter(s => s.jamatId === cls.id).map(s => <span key={s.id} className="bg-white px-2 py-1 rounded border text-xs font-bold text-slate-600 flex items-center gap-1">{s.name}<button onClick={() => setSubjects(subjects.filter(sub => sub.id !== s.id))} className="text-rose-300">×</button></span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-12 rounded-[40px] border border-slate-100 text-center">
                  <button onClick={() => { if(confirm('সব ডাটা মুছে যাবে!')) { localStorage.clear(); window.location.reload(); }}} className="bg-rose-50 text-rose-600 px-8 py-4 rounded-2xl font-black">সিস্টেম রিসেট করুন</button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
