import TodoManager from '@/components/todo/TodoManager';
import Navbar from '@/components/layout/Navbar';

export default function DashboardPage() {
  return (
    <div className="min-h-screen relative" style={{ background: '#E6E6E6' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '45vh',
          background: '#FFF',
          borderRadius: '40px',
          zIndex: 0,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)',
          boxShadow: '0 2px 16px 0 rgba(0,0,0,0.03)'
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <TodoManager />
        </main>
      </div>
    </div>
  );
}
