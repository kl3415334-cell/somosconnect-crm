/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Dashboard View for SomosConnect CRM - Corporación Social Somos Uno
 */

import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertOctagon, 
  Smile, 
  MessageSquareWarning, 
  TrendingUp, 
  Calendar, 
  Filter, 
  ArrowUpRight, 
  AlertTriangle,
  Radio,
  FileSpreadsheet,
  Plus
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { SolicitudPQRS } from '../types';

interface DashboardViewProps {
  onNavigateTab: (tab: any) => void;
  onOpenNewTicket: () => void;
  onOpenNewUser: () => void;
  onSelectTicket: (ticket: SolicitudPQRS) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateTab,
  onOpenNewTicket,
  onOpenNewUser,
  onSelectTicket
}) => {
  const { metrics, pqrs, isDemoData, resetToDemoData } = useCRM();
  const [dateFilter, setDateFilter] = useState<'todo' | 'mes' | '7dias'>('todo');

  const overdueList = pqrs.filter(p => p.estado !== 'Solucionada y cerrada' && p.fechaLimite < new Date().toISOString().substring(0, 10));
  const recentTickets = pqrs.slice(0, 5);

  // Chart data calculations
  const typesCount: Record<string, number> = {
    'Petición': 0,
    'Queja': 0,
    'Reclamo': 0,
    'Sugerencia': 0,
    'Felicitación': 0,
    'Solicitud de información': 0
  };

  const channelsCount: Record<string, number> = {
    'WhatsApp': 0,
    'Correo electrónico': 0,
    'Llamada telefónica': 0,
    'Página web': 0,
    'Atención presencial': 0
  };

  pqrs.forEach(p => {
    if (typesCount[p.tipo] !== undefined) typesCount[p.tipo]++;
    if (channelsCount[p.canalRecepcion] !== undefined) channelsCount[p.canalRecepcion]++;
  });

  return (
    <div className="space-y-6">
      {/* Top Welcome & Slogan Bar */}
      <div className="bg-gradient-to-r from-[#002b55] via-[#003b73] to-[#0284c7] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 text-sky-200 text-xs font-medium mb-2 border border-white/10">
              <span>Corporación Social Somos Uno</span>
              <span>·</span>
              <span>Área de Servicio al Cliente</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              SomosConnect CRM
            </h1>
            <p className="text-xs sm:text-sm text-sky-100/90 mt-1 max-w-xl">
              "Conectamos personas, mejoramos experiencias" — Monitoreo en tiempo real de solicitudes, trazabilidad y cumplimiento legal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenNewTicket}
              className="px-4 py-2 bg-white text-blue-900 hover:bg-sky-50 font-semibold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-blue-700" />
              <span>Nueva PQRS</span>
            </button>
            <button
              onClick={onOpenNewUser}
              className="px-3.5 py-2 bg-blue-800/80 hover:bg-blue-800 text-white font-medium text-xs rounded-xl border border-white/20 transition flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Registrar Usuario</span>
            </button>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />
      </div>

      {/* Academic demo notice if active */}
      {isDemoData && (
        <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Datos ilustrativos académicos cargados</p>
              <p className="text-[11px] text-amber-800">
                Los datos iniciales corresponden al ejercicio académico referenciado en el proyecto (150 solicitudes recibidas, 120 solucionadas, 30 pendientes, 90% satisfacción). Puede registrar información real en cualquier momento.
              </p>
            </div>
          </div>
          <button
            onClick={resetToDemoData}
            className="px-3 py-1 bg-amber-200/80 hover:bg-amber-300 text-amber-950 font-semibold rounded-lg text-xs transition self-start sm:self-auto shrink-0"
          >
            Restablecer muestra
          </button>
        </div>
      )}

      {/* Visual Alerts for Overdue or Attention cases */}
      {overdueList.length > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-red-900 shadow-2xs">
          <div className="flex items-start gap-2.5">
            <AlertOctagon className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-950 text-sm">
                ¡Atención prioritaria! Existen {overdueList.length} solicitud(es) con plazo vencido
              </p>
              <p className="text-[11px] text-red-800">
                Requiere gestión y respuesta de fondo inmediata para dar cumplimiento al Artículo 23 constitucional y Ley 1755 de 2015.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('pqrs')}
            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-xs transition shrink-0 flex items-center gap-1.5"
          >
            <span>Ver casos vencidos</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Date Filter Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <Filter className="w-4 h-4 text-slate-500" />
          <span>Filtrar período de indicadores:</span>
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setDateFilter('todo')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
              dateFilter === 'todo' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Histórico Total
          </button>
          <button
            onClick={() => setDateFilter('mes')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
              dateFilter === 'mes' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mes en Curso
          </button>
          <button
            onClick={() => setDateFilter('7dias')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
              dateFilter === '7dias' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Últimos 7 Días
          </button>
        </div>
      </div>

      {/* 9 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {/* 1. Total Usuarios */}
        <div 
          onClick={() => onNavigateTab('usuarios')}
          className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Usuarios</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {metrics.totalUsers}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center">
              Directorio activo
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Beneficiarios, aliados y afiliados</p>
        </div>

        {/* 2. Total Solicitudes */}
        <div 
          onClick={() => onNavigateTab('pqrs')}
          className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Solicitudes Recibidas</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {metrics.totalSolicitudes}
            </span>
            <span className="text-[11px] text-blue-600 font-semibold">
              Radicados totales
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Acumulado del período actual</p>
        </div>

        {/* 3. Solicitudes Solucionadas */}
        <div 
          onClick={() => onNavigateTab('pqrs')}
          className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Solicitudes Solucionadas</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {metrics.solicitudesSolucionadas}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold">
              80.0% tasa de éxito
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Casos cerrados a satisfacción</p>
        </div>

        {/* 4. Solicitudes Pendientes */}
        <div 
          onClick={() => onNavigateTab('pqrs')}
          className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Solicitudes Pendientes</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-amber-700 font-mono tabular-nums">
              {metrics.solicitudesPendientes}
            </span>
            <span className="text-[11px] text-amber-600 font-semibold">
              En trámite y asignación
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">20.0% del total radicado</p>
        </div>

        {/* 5. Solicitudes Vencidas */}
        <div 
          onClick={() => onNavigateTab('pqrs')}
          className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Solicitudes Vencidas</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
              metrics.solicitudesVencidas > 0 ? 'bg-red-100 text-red-700 group-hover:bg-red-600 group-hover:text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className={`text-2xl font-extrabold font-mono tabular-nums ${metrics.solicitudesVencidas > 0 ? 'text-red-600' : 'text-slate-800'}`}>
              {metrics.solicitudesVencidas}
            </span>
            <span className="text-[11px] text-red-600 font-semibold">
              {metrics.solicitudesVencidas > 0 ? 'Alerta crítica' : 'Al día'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Superaron el término legal de respuesta</p>
        </div>

        {/* 6. Quejas y Reclamos */}
        <div 
          onClick={() => onNavigateTab('pqrs')}
          className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quejas y Reclamos</span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition">
              <MessageSquareWarning className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-orange-700 font-mono tabular-nums">
              {metrics.cantidadQuejasReclamos}
            </span>
            <span className="text-[11px] text-orange-600 font-semibold">
              Análisis causa raíz
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Monitoreadas para el ciclo PHVA</p>
        </div>

        {/* 7. Porcentaje de Satisfacción */}
        <div 
          onClick={() => onNavigateTab('satisfaccion')}
          className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Satisfacción del Usuario</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition">
              <Smile className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-purple-800 font-mono tabular-nums">
              {metrics.porcentajeSatisfaccion}%
            </span>
            <span className="text-[11px] text-purple-600 font-semibold">
              Meta institucional: 90%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Calificaciones en encuestas CSAT</p>
        </div>

        {/* 8. Tiempo Promedio de Respuesta */}
        <div 
          onClick={() => onNavigateTab('kpis')}
          className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tiempo Promedio Respuesta</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {metrics.tiempoPromedioRespuestaDias} <span className="text-sm font-normal text-slate-500">días</span>
            </span>
            <span className="text-[11px] text-teal-700 font-semibold">
              Meta legal: &le; 15 días
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Alta oportunidad de resolución</p>
        </div>

        {/* 9. Cumplimiento de Tiempos (SLA) */}
        <div 
          onClick={() => onNavigateTab('kpis')}
          className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cumplimiento de Términos</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-indigo-800 font-mono tabular-nums">
              {metrics.tasaCumplimientoTiempos}%
            </span>
            <span className="text-[11px] text-indigo-600 font-semibold">
              SLA Operativo
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Solicitudes cerradas dentro del plazo</p>
        </div>
      </div>

      {/* Visual Statistical Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Distribution by PQRS Type */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Distribución por Tipo de Solicitud</h3>
              <p className="text-[11px] text-slate-500">Clasificación según naturaleza de la PQRS</p>
            </div>
            <button
              onClick={() => onNavigateTab('pqrs')}
              className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
            >
              <span>Ver todas</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5 pt-2">
            {Object.entries(typesCount).map(([type, count]) => {
              const total = Math.max(pqrs.length, 1);
              const percentage = Math.round((count / total) * 100);
              return (
                <div key={type} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">{type}</span>
                    <span className="font-mono text-slate-600 tabular-nums">
                      {count} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        type === 'Petición' ? 'bg-blue-600' :
                        type === 'Queja' ? 'bg-amber-500' :
                        type === 'Reclamo' ? 'bg-red-500' :
                        type === 'Felicitación' ? 'bg-emerald-500' :
                        type === 'Sugerencia' ? 'bg-purple-500' : 'bg-sky-500'
                      }`}
                      style={{ width: `${Math.max(percentage, 5)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Distribution by Channel */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Canales de Recepción</h3>
              <p className="text-[11px] text-slate-500">Medios utilizados por la comunidad para comunicarse</p>
            </div>
            <button
              onClick={() => onNavigateTab('canales')}
              className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
            >
              <span>Configuración</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {Object.entries(channelsCount).map(([channel, count]) => (
              <div key={channel} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{channel}</p>
                  <p className="text-[10px] text-slate-500">Canal oficial</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-base text-blue-950 tabular-nums">{count}</span>
                  <span className="text-[10px] text-slate-400 block">radicados</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between text-xs text-blue-900">
            <span>WhatsApp y Correo representan más del 65% del contacto.</span>
            <button 
              onClick={() => onNavigateTab('canales')} 
              className="font-bold text-blue-700 underline shrink-0"
            >
              Ver API status
            </button>
          </div>
        </div>
      </div>

      {/* Recent Cases Table Strip */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Últimos Casos Radicados</h3>
            <p className="text-[11px] text-slate-500">Expedientes ingresados recientemente en la plataforma</p>
          </div>
          <button
            onClick={() => onNavigateTab('pqrs')}
            className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
          >
            <span>Bandeja completa</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Radicado</th>
                <th className="py-2.5 px-3">Usuario / Beneficiario</th>
                <th className="py-2.5 px-3">Tipo</th>
                <th className="py-2.5 px-3">Canal</th>
                <th className="py-2.5 px-3">Fecha Límite</th>
                <th className="py-2.5 px-3">Estado</th>
                <th className="py-2.5 px-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recentTickets.map(ticket => (
                <tr key={ticket.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-950">
                    {ticket.consecutivo}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-900">
                    {ticket.userName}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-slate-600 font-medium">{ticket.tipo}</span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">
                    {ticket.canalRecepcion}
                  </td>
                  <td className="py-2.5 px-3 font-mono tabular-nums text-slate-600">
                    {ticket.fechaLimite}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ticket.estado === 'Solucionada y cerrada' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      ticket.estado === 'Respondida' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {ticket.estado}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => onSelectTicket(ticket)}
                      className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition"
                    >
                      Ver detalle
                    </button>
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
