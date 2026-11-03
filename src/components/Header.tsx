/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Header component for SomosConnect CRM complying with top bar contract
 */

import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Plus, 
  UserCheck, 
  Bell, 
  Download,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { RoleType } from '../types';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
  onOpenNewTicket: () => void;
  onOpenNewUser: () => void;
  activeModuleTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileSidebar,
  onOpenNewTicket,
  onOpenNewUser,
  activeModuleTitle
}) => {
  const { 
    currentUser, 
    setCurrentUserRole, 
    systemUsers, 
    isDemoData, 
    resetToDemoData, 
    metrics 
  } = useCRM();

  const { isInstallable, install } = usePWAInstall();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4 shadow-2xs">
      {/* Zone 1: Brand & Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-1.5 -ml-1 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-sm text-slate-500 truncate">
          <span className="font-semibold text-slate-900 truncate">SomosConnect</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-700 font-medium truncate">{activeModuleTitle}</span>
        </div>
      </div>

      {/* Zone 2: Status & Quick Info */}
      <div className="hidden md:flex items-center gap-3">
        {isDemoData ? (
          <div className="flex items-center gap-2 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-md text-[11px] text-amber-800">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Modo académico (150 registros base)</span>
            <button
              onClick={resetToDemoData}
              title="Restablecer datos de demostración"
              className="text-amber-900 font-semibold underline hover:text-amber-950 ml-1"
            >
              Restablecer
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-md text-[11px] text-emerald-800 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Base de datos en producción</span>
          </div>
        )}

        {metrics.solicitudesVencidas > 0 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 border border-red-200 rounded-md text-[11px] text-red-700 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
            <span>{metrics.solicitudesVencidas} caso(s) vencido(s)</span>
          </div>
        )}
      </div>

      {/* Zone 3: Actions & Role Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {isInstallable && (
          <button
            onClick={install}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Instalar PWA</span>
          </button>
        )}

        <button
          onClick={onOpenNewTicket}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Nueva PQRS</span>
          <span className="sm:hidden">PQRS</span>
        </button>

        {/* Role Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition text-left"
          >
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0">
              {currentUser.nombre.charAt(0)}
            </div>
            <div className="hidden xl:block text-left pr-1">
              <p className="text-xs font-semibold text-slate-800 leading-tight truncate max-w-[120px]">
                {currentUser.nombre.split(' ')[0]} {currentUser.nombre.split(' ')[1] || ''}
              </p>
              <p className="text-[10px] text-slate-500 font-medium truncate max-w-[120px]">
                {currentUser.cargo}
              </p>
            </div>
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1.5 border-b border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400">
                  Simulador de roles y perfiles
                </p>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">
                  Cambiar usuario en sesión activa:
                </p>
              </div>

              <div className="py-1">
                {systemUsers.map(u => (
                  <button
                    key={u.id}
                    onClick={() => {
                      setCurrentUserRole(u.cargo);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                      currentUser.cargo === u.cargo ? 'bg-blue-50 font-semibold text-blue-900' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-slate-900">{u.nombre}</p>
                      <p className="text-[11px] text-slate-500">{u.cargo}</p>
                    </div>
                    {currentUser.cargo === u.cargo && (
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    )}
                  </button>
                ))}
              </div>

              <div className="px-3 pt-2 border-t border-slate-100">
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Permite verificar los permisos y restricciones específicas de cada cargo según el Manual de Funciones.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
