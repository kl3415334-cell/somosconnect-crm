/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Tracking & Control View (Seguimiento, Auditoría y Casos sin Gestión) for SomosConnect CRM
 */

import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  AlertTriangle, 
  Clock, 
  UserCheck, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Calendar,
  Send,
  Eye
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { SolicitudPQRS } from '../types';

interface TrackingViewProps {
  onSelectTicket: (ticket: SolicitudPQRS) => void;
}

export const TrackingView: React.FC<TrackingViewProps> = ({ onSelectTicket }) => {
  const { pqrs, activityLogs, addActivityPQRS } = useCRM();

  const [activeTab, setActiveTab] = useState<'sin_gestion' | 'bitacora_global' | 'auditoria'>('sin_gestion');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicketId, setSelectedTicketId] = useState<string>(pqrs[0]?.id || '');
  const [quickActivityText, setQuickActivityText] = useState('');

  const today = new Date();
  const todayStr = today.toISOString().substring(0, 10);

  // Tickets without management for > 48h
  const unmanagedTickets = pqrs.filter(p => {
    if (p.estado === 'Solucionada y cerrada') return false;
    const lastActivity = p.actividades[0];
    if (!lastActivity) return true;
    const actDate = new Date(lastActivity.fecha.substring(0, 10));
    const diffDays = Math.floor((today.getTime() - actDate.getTime()) / (1000 * 3600 * 24));
    return diffDays >= 2;
  });

  const selectedTicket = pqrs.find(p => p.id === selectedTicketId) || pqrs[0];

  const handleAddQuickActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickActivityText.trim() || !selectedTicket) return;
    addActivityPQRS(selectedTicket.id, 'Seguimiento registrado desde Módulo de Control', quickActivityText.trim());
    setQuickActivityText('');
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Seguimiento y Control</h2>
          <p className="text-xs text-slate-500">
            Trazabilidad integral, control de tiempos de atención, auditoría de modificaciones y alerta de solicitudes sin gestión.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('sin_gestion')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'sin_gestion' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Alertas Sin Gestión ({unmanagedTickets.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('bitacora_global')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'bitacora_global' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Trazabilidad por Caso
          </button>
          <button
            onClick={() => setActiveTab('auditoria')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'auditoria' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Registro de Auditoría General
          </button>
        </div>
      </div>

      {activeTab === 'sin_gestion' && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Control Operativo: Solicitudes sin Gestión &gt; 48 Horas</p>
              <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                El sistema detecta automáticamente los casos que no han registrado llamadas, oficios, requerimientos ni avances en los últimos 2 días hábiles. Es obligatorio asignar actividades para evitar vencimientos de términos legales.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Radicado</th>
                    <th className="py-3 px-3">Usuario</th>
                    <th className="py-3 px-3">Tipo y Prioridad</th>
                    <th className="py-3 px-3">Responsable Asignado</th>
                    <th className="py-3 px-3">Última Gestión</th>
                    <th className="py-3 px-3">Fecha Límite</th>
                    <th className="py-3 px-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {unmanagedTickets.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-emerald-700 font-medium">
                        ✓ ¡Excelente! Todas las solicitudes cuentan con seguimiento activo reciente.
                      </td>
                    </tr>
                  ) : (
                    unmanagedTickets.map(ticket => {
                      const lastAct = ticket.actividades[0];
                      const isOverdue = ticket.fechaLimite < todayStr;

                      return (
                        <tr key={ticket.id} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-4 font-mono font-bold text-blue-950">
                            {ticket.consecutivo}
                          </td>
                          <td className="py-3 px-3 font-semibold text-slate-900">
                            {ticket.userName}
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-medium text-slate-800">{ticket.tipo}</span>
                            <span className="text-[10px] text-amber-600 block">Prioridad: {ticket.prioridad}</span>
                          </td>
                          <td className="py-3 px-3">
                            <p className="font-medium text-slate-800">{ticket.colaboradorAsignado}</p>
                            <p className="text-[10px] text-slate-400">{ticket.areaResponsable}</p>
                          </td>
                          <td className="py-3 px-3 font-mono text-slate-600">
                            {lastAct ? lastAct.fecha : 'Sin actividad inicial'}
                          </td>
                          <td className="py-3 px-3 font-mono tabular-nums">
                            <span className={isOverdue ? 'text-red-700 font-bold' : 'text-slate-700'}>
                              {ticket.fechaLimite}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => onSelectTicket(ticket)}
                              className="px-3 py-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-lg transition"
                            >
                              Gestionar Ahora
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bitacora_global' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ticket Picker */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Seleccionar Caso</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {pqrs.map(ticket => (
                <button
                  key={ticket.id}
                  onClick={() => setSelectedTicketId(ticket.id)}
                  className={`w-full p-2.5 rounded-xl border text-left transition ${
                    selectedTicket?.id === ticket.id
                      ? 'bg-blue-50/80 border-blue-400 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-mono font-bold text-xs text-blue-900">{ticket.consecutivo}</span>
                    <span className="text-[10px] font-semibold text-slate-500">{ticket.estado}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 truncate">{ticket.userName}</p>
                  <p className="text-[10px] text-slate-500 truncate">{ticket.tipo} · {ticket.areaResponsable}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Traceability Timeline */}
          {selectedTicket && (
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base font-mono">
                    Historial de Trazabilidad: {selectedTicket.consecutivo}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Usuario: <span className="font-semibold text-slate-700">{selectedTicket.userName}</span> · Área: {selectedTicket.areaResponsable}
                  </p>
                </div>
                <button
                  onClick={() => onSelectTicket(selectedTicket)}
                  className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                >
                  Ver expediente completo
                </button>
              </div>

              {/* Quick Activity Form */}
              <form onSubmit={handleAddQuickActivity} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Registrar Nueva Gestión o Actividad de Seguimiento
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={quickActivityText}
                    onChange={e => setQuickActivityText(e.target.value)}
                    placeholder="Describa la llamada, envío de correo, reunión o avance..."
                    className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-lg transition flex items-center gap-1.5 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Guardar</span>
                  </button>
                </div>
              </form>

              {/* Timeline Items */}
              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {selectedTicket.actividades.map((act, idx) => (
                  <div key={act.id || idx} className="relative">
                    <div className="absolute -left-6 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white"></div>
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">{act.accion}</span>
                        <span className="text-[10px] text-slate-400 font-mono tabular-nums">{act.fecha}</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Quién realizó la modificación:{' '}
                        <span className="font-semibold text-slate-800">{act.autor}</span> ({act.rol})
                      </p>
                      {act.detalle && (
                        <p className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100 mt-1.5">
                          {act.detalle}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'auditoria' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Registro Central de Auditoría del Sistema</h3>
              <p className="text-xs text-slate-500">
                Trazabilidad inmutable de inicios de sesión, cambios de estado, radicaciones y modificaciones con autoría registrada.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              {activityLogs.length} eventos registrados
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Fecha y Hora</th>
                  <th className="py-2.5 px-3">Usuario y Rol</th>
                  <th className="py-2.5 px-3">Módulo</th>
                  <th className="py-2.5 px-3">Acción</th>
                  <th className="py-2.5 px-3">Detalle del Registro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {activityLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50 transition">
                    <td className="py-2.5 px-3 font-mono tabular-nums text-slate-500">{log.timestamp}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-900">
                      {log.usuario} <span className="text-[10px] text-slate-400 block font-normal">({log.rol})</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                        {log.modulo}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{log.accion}</td>
                    <td className="py-2.5 px-3 text-slate-600">{log.detalle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
