/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SomosConnect CRM - Main Application Container
 * Corporación Social Somos Uno · Área de Servicio al Cliente
 * Slogan: "Conectamos personas, mejoramos experiencias"
 */

import React, { useState } from 'react';
import { CRMProvider, useCRM } from './context/CRMContext';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './views/DashboardView';
import { UsersView } from './views/UsersView';
import { PQRSView } from './views/PQRSView';
import { ChannelsView } from './views/ChannelsView';
import { TrackingView } from './views/TrackingView';
import { SatisfactionView } from './views/SatisfactionView';
import { ReportsView } from './views/ReportsView';
import { KPIsView } from './views/KPIsView';
import { LegalNormsView } from './views/LegalNormsView';
import { PHVACycleView } from './views/PHVACycleView';
import { JobManualView } from './views/JobManualView';
import { UserManualView } from './views/UserManualView';
import { InstallView } from './views/InstallView';
import { UninstallView } from './views/UninstallView';
import { SecurityView } from './views/SecurityView';

// Modals
import { NewUserModal } from './components/modals/NewUserModal';
import { NewPQRSModal } from './components/modals/NewPQRSModal';
import { TicketDetailModal } from './components/modals/TicketDetailModal';
import { SatisfactionModal } from './components/modals/SatisfactionModal';
import { ConfirmAuthModal } from './components/modals/ConfirmAuthModal';
import { CRMUser, SolicitudPQRS } from './types';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    toastMessage, 
    hideToast, 
    deleteUser, 
    deletePQRS, 
    showToast 
  } = useCRM();

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Modals state
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [preselectedUserId, setPreselectedUserId] = useState<string | undefined>(undefined);
  
  const [selectedTicket, setSelectedTicket] = useState<SolicitudPQRS | null>(null);
  const [isTicketDetailOpen, setIsTicketDetailOpen] = useState(false);
  
  const [surveyTicket, setSurveyTicket] = useState<SolicitudPQRS | null>(null);
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);

  // Deletion Auth Modal State
  const [itemToDelete, setItemToDelete] = useState<{ type: 'user' | 'ticket'; id: string; name: string } | null>(null);
  const [isDeleteAuthOpen, setIsDeleteAuthOpen] = useState(false);

  const getModuleTitle = (tab: ActiveTab): string => {
    switch (tab) {
      case 'dashboard': return 'Panel Principal (Dashboard)';
      case 'usuarios': return 'Gestión de Usuarios';
      case 'pqrs': return 'Módulo de PQRS';
      case 'canales': return 'Canales de Atención';
      case 'seguimiento': return 'Seguimiento y Control';
      case 'satisfaccion': return 'Satisfacción del Usuario';
      case 'informes': return 'Informes y Reportes';
      case 'kpis': return 'Indicadores de Gestión (KPI)';
      case 'normatividad': return 'Normatividad Legal';
      case 'phva': return 'Ciclo PHVA';
      case 'manual_funciones': return 'Manual de Funciones';
      case 'manual_usuario': return 'Manual de Usuario';
      case 'instalar': return 'Instalar Plataforma';
      case 'desinstalar': return 'Desinstalar Plataforma';
      case 'seguridad': return 'Seguridad y Roles';
      default: return 'SomosConnect CRM';
    }
  };

  const handleOpenNewTicketForUser = (userId: string) => {
    setPreselectedUserId(userId);
    setIsNewTicketModalOpen(true);
  };

  const handleSelectTicket = (ticket: SolicitudPQRS) => {
    setSelectedTicket(ticket);
    setIsTicketDetailOpen(true);
  };

  const handleOpenSurvey = (ticket: SolicitudPQRS) => {
    setSurveyTicket(ticket);
    setIsSurveyModalOpen(true);
  };

  const handleRequestDeleteUser = (user: CRMUser) => {
    setItemToDelete({
      type: 'user',
      id: user.id,
      name: `${user.nombre} (${user.documento})`
    });
    setIsDeleteAuthOpen(true);
  };

  const handleRequestDeleteTicket = (ticket: SolicitudPQRS) => {
    setItemToDelete({
      type: 'ticket',
      id: ticket.id,
      name: `${ticket.consecutivo} - ${ticket.userName}`
    });
    setIsDeleteAuthOpen(true);
  };

  const handleConfirmDelete = (authCode: string) => {
    if (!itemToDelete) return;

    if (itemToDelete.type === 'user') {
      const res = deleteUser(itemToDelete.id, authCode);
      if (res.success) {
        setIsDeleteAuthOpen(false);
        setItemToDelete(null);
      } else {
        showToast(res.message, 'error');
      }
    } else if (itemToDelete.type === 'ticket') {
      const res = deletePQRS(itemToDelete.id, authCode);
      if (res.success) {
        setIsDeleteAuthOpen(false);
        setItemToDelete(null);
        setIsTicketDetailOpen(false);
      } else {
        showToast(res.message, 'error');
      }
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden text-slate-900 font-sans">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header
          onOpenMobileSidebar={() => setIsOpenMobile(true)}
          onOpenNewTicket={() => {
            setPreselectedUserId(undefined);
            setIsNewTicketModalOpen(true);
          }}
          onOpenNewUser={() => setIsNewUserModalOpen(true)}
          activeModuleTitle={getModuleTitle(activeTab)}
        />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-[1560px] w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenNewTicket={() => {
                setPreselectedUserId(undefined);
                setIsNewTicketModalOpen(true);
              }}
              onOpenNewUser={() => setIsNewUserModalOpen(true)}
              onSelectTicket={handleSelectTicket}
            />
          )}

          {activeTab === 'usuarios' && (
            <UsersView
              onOpenNewUser={() => setIsNewUserModalOpen(true)}
              onOpenNewTicketForUser={handleOpenNewTicketForUser}
              onSelectTicket={handleSelectTicket}
              onRequestDeleteUser={handleRequestDeleteUser}
            />
          )}

          {activeTab === 'pqrs' && (
            <PQRSView
              onOpenNewTicket={() => {
                setPreselectedUserId(undefined);
                setIsNewTicketModalOpen(true);
              }}
              onSelectTicket={handleSelectTicket}
              onRequestDeleteTicket={handleRequestDeleteTicket}
            />
          )}

          {activeTab === 'canales' && (
            <ChannelsView
              onOpenNewTicket={() => {
                setPreselectedUserId(undefined);
                setIsNewTicketModalOpen(true);
              }}
              onSelectTicket={handleSelectTicket}
            />
          )}

          {activeTab === 'seguimiento' && (
            <TrackingView
              onSelectTicket={handleSelectTicket}
            />
          )}

          {activeTab === 'satisfaccion' && (
            <SatisfactionView
              onOpenSurveyModal={handleOpenSurvey}
              onSelectTicket={handleSelectTicket}
            />
          )}

          {activeTab === 'informes' && (
            <ReportsView />
          )}

          {activeTab === 'kpis' && (
            <KPIsView />
          )}

          {activeTab === 'normatividad' && (
            <LegalNormsView />
          )}

          {activeTab === 'phva' && (
            <PHVACycleView />
          )}

          {activeTab === 'manual_funciones' && (
            <JobManualView />
          )}

          {activeTab === 'manual_usuario' && (
            <UserManualView />
          )}

          {activeTab === 'instalar' && (
            <InstallView />
          )}

          {activeTab === 'desinstalar' && (
            <UninstallView />
          )}

          {activeTab === 'seguridad' && (
            <SecurityView />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <NewUserModal
        isOpen={isNewUserModalOpen}
        onClose={() => setIsNewUserModalOpen(false)}
        onUserCreated={(userId) => {
          showToast('Usuario registrado con éxito.');
        }}
      />

      <NewPQRSModal
        isOpen={isNewTicketModalOpen}
        onClose={() => setIsNewTicketModalOpen(false)}
        preselectedUserId={preselectedUserId}
      />

      <TicketDetailModal
        ticket={selectedTicket}
        isOpen={isTicketDetailOpen}
        onClose={() => {
          setIsTicketDetailOpen(false);
          setSelectedTicket(null);
        }}
        onOpenSurvey={(ticket) => {
          setIsTicketDetailOpen(false);
          handleOpenSurvey(ticket);
        }}
        onRequestDelete={handleRequestDeleteTicket}
      />

      <SatisfactionModal
        ticket={surveyTicket}
        isOpen={isSurveyModalOpen}
        onClose={() => {
          setIsSurveyModalOpen(false);
          setSurveyTicket(null);
        }}
      />

      <ConfirmAuthModal
        isOpen={isDeleteAuthOpen}
        onClose={() => {
          setIsDeleteAuthOpen(false);
          setItemToDelete(null);
        }}
        title="Confirmación de Eliminación con Autorización"
        description="Esta operación es irreversible y requiere la contraseña de confirmación institucional."
        recordIdentifier={itemToDelete?.name || ''}
        onConfirm={handleConfirmDelete}
      />

      {/* Floating Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
          {toastMessage.type === 'info' && <Info className="w-4 h-4 text-sky-400 shrink-0" />}
          <span className="leading-tight">{toastMessage.text}</span>
          <button
            onClick={hideToast}
            className="ml-2 p-0.5 text-slate-400 hover:text-white rounded"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <CRMProvider>
      <AppContent />
    </CRMProvider>
  );
}
