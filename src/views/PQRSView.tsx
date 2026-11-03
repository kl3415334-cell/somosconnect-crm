/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PQRS Tickets Management View for SomosConnect CRM - Corporación Social Somos Uno
 */

import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  UserCheck, 
  ChevronRight,
  Eye,
  Trash2,
  AlertTriangle,
  Send,
  MessageSquare,
  FileCheck
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { SolicitudPQRS, TipoPQRS, EstadoPQRS, Prioridad, CanalRecepcion } from '../types';
import { exportPQRSToExcel, exportReportToPDF } from '../utils/exportUtils';

interface PQRSViewProps {
  onOpenNewTicket: () => void;
  onSelectTicket: (ticket: SolicitudPQRS) => void;
  onRequestDeleteTicket: (ticket: SolicitudPQRS) => void;
}

export const PQRSView: React.FC<PQRSViewProps> = ({
  onOpenNewTicket,
  onSelectTicket,
  onRequestDeleteTicket
}) => {
  const { pqrs, currentUser } = useCRM();

  const [searchQuery, setSearchQuery] = useState('');
  const [tabFilter, setTabFilter] = useState<'todas' | 'pendientes' | 'en_proceso' | 'vencidas' | 'cerradas'>('todas');
  const [typeFilter, setTypeFilter] = useState<string>('todos');
  const [channelFilter, setChannelFilter] = useState<string>('todos');
  const [priorityFilter, setPriorityFilter] = useState<string>('todos');

  const todayStr = new Date().toISOString().substring(0, 10);

  // Filter tickets
  const filteredTickets = pqrs.filter(ticket => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      ticket.consecutivo.toLowerCase().includes(query) ||
      ticket.userName.toLowerCase().includes(query) ||
      ticket.userDoc.includes(query) ||
      ticket.descripcion.toLowerCase().includes(query) ||
      ticket.colaboradorAsignado.toLowerCase().includes(query);

    // Tab filter
    let matchesTab = true;
    const isOverdue = ticket.estado !== 'Solucionada y cerrada' && ticket.fechaLimite < todayStr;

    if (tabFilter === 'pendientes') {
      matchesTab = ticket.estado === 'Recibida' || ticket.estado === 'Pendiente de asignación' || ticket.estado === 'Asignada';
    } else if (tabFilter === 'en_proceso') {
      matchesTab = ticket.estado === 'En proceso' || ticket.estado === 'En espera de información' || ticket.estado === 'Respondida';
    } else if (tabFilter === 'vencidas') {
      matchesTab = isOverdue;
    } else if (tabFilter === 'cerradas') {
      matchesTab = ticket.estado === 'Solucionada y cerrada';
    }

    const matchesType = typeFilter === 'todos' || ticket.tipo === typeFilter;
    const matchesChannel = channelFilter === 'todos' || ticket.canalRecepcion === channelFilter;
    const matchesPriority = priorityFilter === 'todos' || ticket.prioridad === priorityFilter;

    return matchesSearch && matchesTab && matchesType && matchesChannel && matchesPriority;
  });

  const handleExportPDF = () => {
    const summary = [
      { label: 'Total Filtradas', value: filteredTickets.length },
      { label: 'Solucionadas', value: filteredTickets.filter(t => t.estado === 'Solucionada y cerrada').length },
      { label: 'Pendientes', value: filteredTickets.filter(t => t.estado !== 'Solucionada y cerrada').length },
      { label: 'Vencidas', value: filteredTickets.filter(t => t.estado !== 'Solucionada y cerrada' && t.fechaLimite < todayStr).length }
    ];

    const columns = ['Radicado', 'Fecha', 'Usuario', 'Tipo', 'Canal', 'Responsable', 'Fecha Límite', 'Estado'];
    const rows = filteredTickets.map(t => [
      t.consecutivo,
      t.fechaRecepcion,
      t.userName,
      t.tipo,
      t.canalRecepcion,
      t.colaboradorAsignado,
      t.fechaLimite,
      t.estado
    ]);

    exportReportToPDF(
      'INFORME DETALLADO DE SOLICITUDES PQRS',
      'Listado oficial de radicados, estados de trámite y cumplimiento de términos legales',
      summary,
      columns,
      rows,
      'Reporte_PQRS_SomosConnect.pdf'
    );
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Módulo de PQRS</h2>
          <p className="text-xs text-slate-500">
            Control de Peticiones, Quejas, Reclamos, Sugerencias, Felicitaciones y Solicitudes de Información.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => exportPQRSToExcel(filteredTickets)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-300 shadow-2xs transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Descargar Excel</span>
          </button>
          <button
            onClick={handleExportPDF}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-300 shadow-2xs transition flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Descargar PDF</span>
          </button>
          <button
            onClick={onOpenNewTicket}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Radicar PQRS</span>
          </button>
        </div>
      </div>

      {/* Segmented Quick Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setTabFilter('todas')}
          className={`px-3.5 py-2 rounded-xl font-semibold transition whitespace-nowrap shrink-0 ${
            tabFilter === 'todas' ? 'bg-blue-700 text-white shadow-2xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Todas ({pqrs.length})
        </button>
        <button
          onClick={() => setTabFilter('pendientes')}
          className={`px-3.5 py-2 rounded-xl font-semibold transition whitespace-nowrap shrink-0 ${
            tabFilter === 'pendientes' ? 'bg-blue-700 text-white shadow-2xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Pendientes ({pqrs.filter(p => p.estado === 'Recibida' || p.estado === 'Pendiente de asignación' || p.estado === 'Asignada').length})
        </button>
        <button
          onClick={() => setTabFilter('en_proceso')}
          className={`px-3.5 py-2 rounded-xl font-semibold transition whitespace-nowrap shrink-0 ${
            tabFilter === 'en_proceso' ? 'bg-blue-700 text-white shadow-2xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          En Proceso / Espera ({pqrs.filter(p => p.estado === 'En proceso' || p.estado === 'En espera de información' || p.estado === 'Respondida').length})
        </button>
        <button
          onClick={() => setTabFilter('vencidas')}
          className={`px-3.5 py-2 rounded-xl font-semibold transition whitespace-nowrap shrink-0 ${
            tabFilter === 'vencidas' ? 'bg-red-600 text-white shadow-2xs' : 'bg-white text-red-600 hover:bg-red-50 border border-red-200'
          }`}
        >
          Vencidas ({pqrs.filter(p => p.estado !== 'Solucionada y cerrada' && p.fechaLimite < todayStr).length})
        </button>
        <button
          onClick={() => setTabFilter('cerradas')}
          className={`px-3.5 py-2 rounded-xl font-semibold transition whitespace-nowrap shrink-0 ${
            tabFilter === 'cerradas' ? 'bg-emerald-700 text-white shadow-2xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Solucionadas y Cerradas ({pqrs.filter(p => p.estado === 'Solucionada y cerrada').length})
        </button>
      </div>

      {/* Search and Secondary Filter dropdowns */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar por radicado (PQRS-2026-001), usuario, documento, palabras clave..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-700 font-medium"
          >
            <option value="todos">Todos los tipos</option>
            <option value="Petición">Petición</option>
            <option value="Queja">Queja</option>
            <option value="Reclamo">Reclamo</option>
            <option value="Sugerencia">Sugerencia</option>
            <option value="Felicitación">Felicitación</option>
            <option value="Solicitud de información">Solicitud de información</option>
          </select>

          <select
            value={channelFilter}
            onChange={e => setChannelFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-700 font-medium"
          >
            <option value="todos">Todos los canales</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Correo electrónico">Correo electrónico</option>
            <option value="Llamada telefónica">Llamada telefónica</option>
            <option value="Página web">Página web</option>
            <option value="Atención presencial">Atención presencial</option>
          </select>

          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-700 font-medium"
          >
            <option value="todos">Todas las prioridades</option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
            <option value="Crítica">Crítica</option>
          </select>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Radicado Oficial</th>
                <th className="py-3 px-3">Fecha y Canal</th>
                <th className="py-3 px-3">Usuario Solicitante</th>
                <th className="py-3 px-3">Tipo / Prioridad</th>
                <th className="py-3 px-3">Responsable y Área</th>
                <th className="py-3 px-3">Término Legal</th>
                <th className="py-3 px-3">Estado</th>
                <th className="py-3 px-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400">
                    No se encontraron solicitudes que coincidan con los filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredTickets.map(ticket => {
                  const isOverdue = ticket.estado !== 'Solucionada y cerrada' && ticket.fechaLimite < todayStr;

                  return (
                    <tr 
                      key={ticket.id} 
                      className={`hover:bg-slate-50 transition cursor-pointer ${isOverdue ? 'bg-red-50/40' : ''}`}
                      onClick={() => onSelectTicket(ticket)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-blue-950 text-xs">
                            {ticket.consecutivo}
                          </span>
                          {ticket.documentosAdjuntos.length > 0 && (
                            <span className="text-[10px] text-slate-400" title={`${ticket.documentosAdjuntos.length} anexo(s)`}>
                              📎{ticket.documentosAdjuntos.length}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 max-w-[220px]" title={ticket.descripcion}>
                          {ticket.descripcion}
                        </p>
                      </td>

                      <td className="py-3 px-3">
                        <p className="font-mono tabular-nums text-slate-700">{ticket.fechaRecepcion}</p>
                        <p className="text-[10px] text-slate-400">{ticket.canalRecepcion}</p>
                      </td>

                      <td className="py-3 px-3">
                        <p className="font-semibold text-slate-900 truncate max-w-[140px]">{ticket.userName}</p>
                        <p className="text-[10px] text-slate-400 font-mono">Doc: {ticket.userDoc}</p>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-medium text-slate-800 block">{ticket.tipo}</span>
                        <span className={`text-[10px] font-semibold ${
                          ticket.prioridad === 'Crítica' ? 'text-red-600' :
                          ticket.prioridad === 'Alta' ? 'text-amber-600' :
                          'text-slate-500'
                        }`}>
                          Prioridad: {ticket.prioridad}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <p className="font-medium text-slate-800 truncate max-w-[130px]" title={ticket.colaboradorAsignado}>
                          {ticket.colaboradorAsignado}
                        </p>
                        <p className="text-[10px] text-slate-500">{ticket.areaResponsable}</p>
                      </td>

                      <td className="py-3 px-3 font-mono tabular-nums">
                        <div className="flex items-center gap-1">
                          <span className={isOverdue ? 'text-red-700 font-bold' : 'text-slate-700'}>
                            {ticket.fechaLimite}
                          </span>
                          {isOverdue && (
                            <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 block">{ticket.diasTermino} días hábiles</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          ticket.estado === 'Solucionada y cerrada' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          ticket.estado === 'Respondida' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                          isOverdue ? 'bg-red-100 text-red-800 border border-red-300' :
                          'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {ticket.estado}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-right" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onSelectTicket(ticket)}
                            className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition"
                          >
                            Gestionar
                          </button>
                          {currentUser.permisos.canDelete && (
                            <button
                              onClick={() => onRequestDeleteTicket(ticket)}
                              title="Eliminar solicitud con autorización"
                              className="p-1 text-slate-400 hover:text-red-600 rounded-md transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Mostrando {filteredTickets.length} de {pqrs.length} solicitudes</span>
          <span className="text-[11px] italic">Corporación Social Somos Uno · Servicio al Cliente</span>
        </div>
      </div>
    </div>
  );
};
