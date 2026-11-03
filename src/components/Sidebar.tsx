/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Sidebar Navigation for SomosConnect CRM - Corporación Social Somos Uno
 */

import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Radio, 
  Activity, 
  Smile, 
  BarChart3, 
  TrendingUp, 
  Scale, 
  RefreshCw, 
  Briefcase, 
  BookOpen, 
  Download, 
  Trash2, 
  ShieldCheck,
  ChevronRight,
  X
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';

export type ActiveTab = 
  | 'dashboard'
  | 'usuarios'
  | 'pqrs'
  | 'canales'
  | 'seguimiento'
  | 'satisfaccion'
  | 'informes'
  | 'kpis'
  | 'normatividad'
  | 'phva'
  | 'manual_funciones'
  | 'manual_usuario'
  | 'instalar'
  | 'desinstalar'
  | 'seguridad';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpenMobile,
  setIsOpenMobile
}) => {
  const { metrics, currentUser } = useCRM();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Panel Principal',
      icon: LayoutDashboard,
      badge: null,
      section: 'GESTIÓN OPERATIVA'
    },
    {
      id: 'usuarios',
      label: 'Gestión de Usuarios',
      icon: Users,
      badge: metrics.totalUsers,
      section: 'GESTIÓN OPERATIVA'
    },
    {
      id: 'pqrs',
      label: 'Módulo de PQRS',
      icon: FileText,
      badge: metrics.solicitudesPendientes > 0 ? `${metrics.solicitudesPendientes} pend.` : null,
      badgeUrgent: metrics.solicitudesVencidas > 0,
      section: 'GESTIÓN OPERATIVA'
    },
    {
      id: 'canales',
      label: 'Canales de Atención',
      icon: Radio,
      badge: '5 canales',
      section: 'GESTIÓN OPERATIVA'
    },
    {
      id: 'seguimiento',
      label: 'Seguimiento y Control',
      icon: Activity,
      badge: metrics.solicitudesSinGestion > 0 ? `${metrics.solicitudesSinGestion} alerta` : null,
      badgeUrgent: metrics.solicitudesSinGestion > 0,
      section: 'GESTIÓN OPERATIVA'
    },
    {
      id: 'satisfaccion',
      label: 'Satisfacción del Usuario',
      icon: Smile,
      badge: `${metrics.porcentajeSatisfaccion}%`,
      section: 'CALIDAD Y REPORTES'
    },
    {
      id: 'informes',
      label: 'Informes y Reportes',
      icon: BarChart3,
      badge: 'PDF/Excel',
      section: 'CALIDAD Y REPORTES'
    },
    {
      id: 'kpis',
      label: 'Indicadores (KPI)',
      icon: TrendingUp,
      badge: 'Tiempo real',
      section: 'CALIDAD Y REPORTES'
    },
    {
      id: 'normatividad',
      label: 'Normatividad Legal',
      icon: Scale,
      badge: 'Colombia',
      section: 'MARCO INSTITUCIONAL'
    },
    {
      id: 'phva',
      label: 'Ciclo PHVA',
      icon: RefreshCw,
      badge: 'Mejora continua',
      section: 'MARCO INSTITUCIONAL'
    },
    {
      id: 'manual_funciones',
      label: 'Manual de Funciones',
      icon: Briefcase,
      badge: '5 cargos',
      section: 'ORGANIZACIÓN'
    },
    {
      id: 'manual_usuario',
      label: 'Manual de Usuario',
      icon: BookOpen,
      badge: 'Guía',
      section: 'ORGANIZACIÓN'
    },
    {
      id: 'instalar',
      label: 'Instalar Plataforma',
      icon: Download,
      badge: 'PWA',
      section: 'SISTEMA Y ACCESOS'
    },
    {
      id: 'desinstalar',
      label: 'Desinstalar Plataforma',
      icon: Trash2,
      badge: null,
      section: 'SISTEMA Y ACCESOS'
    },
    {
      id: 'seguridad',
      label: 'Seguridad y Roles',
      icon: ShieldCheck,
      badge: currentUser.cargo.split(' ')[0],
      section: 'SISTEMA Y ACCESOS'
    }
  ];

  const handleSelect = (tabId: string) => {
    setActiveTab(tabId as ActiveTab);
    setIsOpenMobile(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#002b55] text-white flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header / Brand lockup */}
        <div className="p-4 border-b border-blue-900/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-sky-400 p-0.5 shadow-md flex items-center justify-center shrink-0">
                <img 
                  src="/icon.svg" 
                  alt="Somos Uno Logo" 
                  className="w-full h-full object-contain rounded-[10px]"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-extrabold text-base tracking-tight text-white truncate">
                    SomosConnect
                  </h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    CRM
                  </span>
                </div>
                <p className="text-xs text-sky-200/80 truncate font-medium">
                  Corporación Social Somos Uno
                </p>
              </div>
            </div>
            
            {/* Close button on mobile */}
            <button 
              onClick={() => setIsOpenMobile(false)}
              className="lg:hidden p-1.5 text-sky-200 hover:text-white rounded-lg hover:bg-white/10"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="mt-2 text-[11px] text-blue-200/70 italic leading-snug">
            "Conectamos personas, mejoramos experiencias"
          </p>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 text-xs font-medium">
          {['GESTIÓN OPERATIVA', 'CALIDAD Y REPORTES', 'MARCO INSTITUCIONAL', 'ORGANIZACIÓN', 'SISTEMA Y ACCESOS'].map(section => {
            const items = navItems.filter(item => item.section === section);
            return (
              <div key={section} className="space-y-1">
                <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-sky-300/60 uppercase">
                  {section}
                </div>
                {items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left group ${
                        isActive
                          ? 'bg-blue-600 text-white font-semibold shadow-sm'
                          : 'text-slate-200 hover:bg-blue-900/50 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-sky-300 group-hover:text-white'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      
                      {item.badge && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 tabular-nums ${
                          item.badgeUrgent 
                            ? 'bg-red-500/90 text-white font-bold' 
                            : isActive 
                              ? 'bg-blue-700 text-sky-100' 
                              : 'bg-blue-950 text-sky-200'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* User Card at Bottom */}
        <div className="p-3 border-t border-blue-900/60 bg-[#002244]">
          <div className="flex items-center justify-between p-2 rounded-lg bg-blue-950/60 border border-blue-900/40">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {currentUser.nombre}
              </p>
              <p className="text-[11px] text-sky-300 truncate">
                {currentUser.cargo}
              </p>
            </div>
            <button
              onClick={() => handleSelect('seguridad')}
              title="Configuración de rol y sesión"
              className="p-1 text-sky-200 hover:text-white hover:bg-blue-800 rounded transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
