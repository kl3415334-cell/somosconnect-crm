/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Comprehensive PQRS Ticket Detail Modal with traceability, actions and status management
 */

import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  CheckCircle2, 
  Send, 
  Paperclip, 
  Printer, 
  Trash2, 
  AlertTriangle,
  MessageSquare,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { SolicitudPQRS, EstadoPQRS, AreaResponsable } from '../../types';

interface TicketDetailModalProps {
  ticket: SolicitudPQRS | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSurvey?: (ticket: SolicitudPQRS) => void;
  onRequestDelete?: (ticket: SolicitudPQRS) => void;
}

export const TicketDetailModal: React.FC<TicketDetailModalProps> = ({
  ticket,
  isOpen,
  onClose,
  onOpenSurvey,
  onRequestDelete
}) => {
  const { 
    assignPQRS, 
    changeStatusPQRS, 
    respondPQRS, 
    closePQRS, 
    addActivityPQRS, 
    addAttachmentPQRS, 
    systemUsers, 
    currentUser 
  } = useCRM();

  const [activeTab, setActiveTab] = useState<'detalle' | 'actividades' | 'responder' | 'asignar'>('detalle');
  
  // Local state for actions
  const [newActivityText, setNewActivityText] = useState('');
  const [responseDraft, setResponseDraft] = useState('');
  const [solucionDraft, setSolucionDraft] = useState('');
  const [closeSolutionText, setCloseSolutionText] = useState('');
  const [assignee, setAssignee] = useState('');
  const [assignArea, setAssignArea] = useState<AreaResponsable>('Servicio al Cliente');
  const [newStatus, setNewStatus] = useState<EstadoPQRS>('En proceso');
  const [statusNote, setStatusNote] = useState('');
  const [newFileName, setNewFileName] = useState('');

  if (!isOpen || !ticket) return null;

  const isOverdue = ticket.estado !== 'Solucionada y cerrada' && ticket.fechaLimite < new Date().toISOString().substring(0, 10);

  const handlePrint = () => {
    window.print();
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivityText.trim()) return;
    addActivityPQRS(ticket.id, 'Gestión operativa realizada', newActivityText.trim());
    setNewActivityText('');
  };

  const handleRespond = (e: React.FormEvent) => {
    e.preventDefault();
    if (!responseDraft.trim()) return;
    respondPQRS(ticket.id, responseDraft.trim(), solucionDraft.trim());
    setResponseDraft('');
    setActiveTab('detalle');
  };

  const handleCloseCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!closeSolutionText.trim()) return;
    closePQRS(ticket.id, closeSolutionText.trim());
    setCloseSolutionText('');
  };

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignee) return;
    assignPQRS(ticket.id, assignee, assignArea);
    setActiveTab('detalle');
  };

  const handleStatusChange = () => {
    changeStatusPQRS(ticket.id, newStatus, statusNote);
    setStatusNote('');
  };

  const handleAddFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;
    addAttachmentPQRS(ticket.id, {
      nombre: newFileName.trim(),
      tamano: '650 KB',
      tipo: 'application/pdf'
    });
    setNewFileName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#002b55] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/60 border border-blue-400/40 flex items-center justify-center font-mono font-bold text-sm text-sky-200">
              PQRS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold font-mono tracking-tight">{ticket.consecutivo}</h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  ticket.estado === 'Solucionada y cerrada' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' :
                  ticket.estado === 'Respondida' ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30' :
                  isOverdue ? 'bg-red-500/30 text-red-200 border border-red-400/40' :
                  'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                }`}>
                  {ticket.estado}
                </span>
                {isOverdue && (
                  <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full uppercase">
                    ¡Vencido!
                  </span>
                )}
              </div>
              <p className="text-xs text-sky-200">
                {ticket.tipo} · Canal: {ticket.canalRecepcion} · Área: {ticket.areaResponsable}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Imprimir comprobante institucional"
              className="p-1.5 rounded-lg text-sky-200 hover:text-white hover:bg-white/10 transition"
            >
              <Printer className="w-4 h-4" />
            </button>
            {currentUser.permisos.canDelete && onRequestDelete && (
              <button
                onClick={() => onRequestDelete(ticket)}
                title="Eliminar radicado (Requiere autorización)"
                className="p-1.5 rounded-lg text-red-300 hover:text-red-100 hover:bg-red-900/50 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-sky-200 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('detalle')}
            className={`px-3 py-2 border-b-2 transition ${activeTab === 'detalle' ? 'border-blue-700 text-blue-700 font-bold' : 'border-transparent hover:text-slate-900'}`}
          >
            Expediente y Detalle
          </button>
          <button
            onClick={() => setActiveTab('actividades')}
            className={`px-3 py-2 border-b-2 transition flex items-center gap-1.5 ${activeTab === 'actividades' ? 'border-blue-700 text-blue-700 font-bold' : 'border-transparent hover:text-slate-900'}`}
          >
            <span>Trazabilidad / Bitácora</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 tabular-nums">
              {ticket.actividades.length}
            </span>
          </button>
          {currentUser.permisos.canRespond && (
            <button
              onClick={() => setActiveTab('responder')}
              className={`px-3 py-2 border-b-2 transition ${activeTab === 'responder' ? 'border-blue-700 text-blue-700 font-bold' : 'border-transparent hover:text-slate-900'}`}
            >
              Emitir Respuesta
            </button>
          )}
          {currentUser.permisos.canAssign && (
            <button
              onClick={() => setActiveTab('asignar')}
              className={`px-3 py-2 border-b-2 transition ${activeTab === 'asignar' ? 'border-blue-700 text-blue-700 font-bold' : 'border-transparent hover:text-slate-900'}`}
            >
              Reasignar y Estado
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 text-xs text-slate-700 space-y-4">
          {activeTab === 'detalle' && (
            <div className="space-y-4">
              {/* Top Meta cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Fecha Recepción</span>
                  <p className="font-semibold text-slate-800 text-xs mt-0.5">
                    {ticket.fechaRecepcion} · {ticket.horaRecepcion}
                  </p>
                </div>
                <div className={`p-3 rounded-xl border ${isOverdue ? 'bg-red-50 border-red-200 text-red-900' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Fecha Límite</span>
                  <p className="font-semibold text-xs mt-0.5 font-mono tabular-nums">
                    {ticket.fechaLimite} ({ticket.diasTermino} días)
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Prioridad</span>
                  <p className="font-semibold text-slate-800 text-xs mt-0.5">
                    {ticket.prioridad}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Responsable Asignado</span>
                  <p className="font-semibold text-slate-800 text-xs mt-0.5 truncate" title={ticket.colaboradorAsignado}>
                    {ticket.colaboradorAsignado}
                  </p>
                </div>
              </div>

              {/* User Info card */}
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    {ticket.userName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{ticket.userName}</h3>
                    <p className="text-[11px] text-slate-600">
                      Doc: {ticket.userDoc} · Tel: {ticket.userPhone} · Correo: {ticket.userEmail}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-blue-900/60 block">Sustento Legal</span>
                  <span className="font-semibold text-xs text-blue-900">{ticket.normaAplicable}</span>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 mb-1.5 uppercase tracking-wider">
                  Descripción del Hecho o Solicitud
                </h4>
                <p className="text-slate-700 leading-relaxed text-xs whitespace-pre-wrap">
                  {ticket.descripcion}
                </p>
                {ticket.observaciones && (
                  <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                    <strong>Observaciones iniciales:</strong> {ticket.observaciones}
                  </div>
                )}
              </div>

              {/* Official Response if any */}
              {ticket.respuestaEnviada && (
                <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Respuesta Formal Emitida</span>
                    </h4>
                    {ticket.fechaCierre && (
                      <span className="text-[11px] text-emerald-800 font-medium">
                        Cierre: {ticket.fechaCierre}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-800 text-xs leading-relaxed whitespace-pre-wrap bg-white p-3 rounded-lg border border-emerald-100">
                    {ticket.respuestaEnviada}
                  </p>
                  {ticket.solucionDetalle && (
                    <p className="mt-2 text-[11px] text-emerald-900 font-medium">
                      <strong>Solución definitiva:</strong> {ticket.solucionDetalle}
                    </p>
                  )}
                </div>
              )}

              {/* Attachments Section */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                    <span>Documentos Adjuntos ({ticket.documentosAdjuntos.length})</span>
                  </h4>
                </div>

                {ticket.documentosAdjuntos.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No hay documentos anexos cargados para este radicado.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ticket.documentosAdjuntos.map(att => (
                      <div key={att.id} className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate">{att.nombre}</p>
                          <p className="text-[10px] text-slate-400">{att.tamano} · {att.fecha}</p>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium shrink-0">
                          PDF/Soporte
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Inline add attachment */}
                <form onSubmit={handleAddFile} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newFileName}
                    onChange={e => setNewFileName(e.target.value)}
                    placeholder="Nombre del documento a adjuntar (ej. Certificado_Residencia.pdf)..."
                    className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition"
                  >
                    Adjuntar
                  </button>
                </form>
              </div>

              {/* Close case box if responded but not closed */}
              {ticket.estado !== 'Solucionada y cerrada' && currentUser.permisos.canClose && (
                <div className="p-4 bg-slate-100 rounded-xl border border-slate-300 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900">Finalizar y Cerrar Solicitud</h4>
                  <p className="text-[11px] text-slate-600">
                    Verifique que la solicitud haya sido completamente atendida. Si quedan trámites pendientes, no debe marcarse como cerrada.
                  </p>
                  <form onSubmit={handleCloseCase} className="flex flex-col sm:flex-row gap-2 pt-1">
                    <input
                      type="text"
                      required
                      value={closeSolutionText}
                      onChange={e => setCloseSolutionText(e.target.value)}
                      placeholder="Resumen de la solución definitiva alcanzada..."
                      className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition shrink-0"
                    >
                      Cerrar y Solucionar Caso
                    </button>
                  </form>
                </div>
              )}

              {/* Survey Callout if Solucionada */}
              {ticket.estado === 'Solucionada y cerrada' && onOpenSurvey && (
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 flex items-center justify-between gap-3">
                  <div className="text-purple-900 text-xs">
                    <span className="font-bold">Evaluación de Calidad:</span>{' '}
                    {ticket.encuestaId ? 'Este radicado ya cuenta con encuesta de satisfacción registrada.' : 'Invite al usuario a calificar la atención para retroalimentar el Ciclo PHVA.'}
                  </div>
                  {!ticket.encuestaId && (
                    <button
                      onClick={() => onOpenSurvey(ticket)}
                      className="px-3 py-1 text-xs font-semibold text-purple-700 bg-white border border-purple-300 rounded-lg hover:bg-purple-100 transition shrink-0"
                    >
                      Aplicar Encuesta CSAT
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'actividades' && (
            <div className="space-y-4">
              {/* Add Activity Form */}
              <form onSubmit={handleAddActivity} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Registrar Nueva Actividad o Seguimiento
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={newActivityText}
                    onChange={e => setNewActivityText(e.target.value)}
                    placeholder="Ej. Llamada al usuario para solicitar copia del recibo de servicios..."
                    className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition flex items-center gap-1.5 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Registrar</span>
                  </button>
                </div>
              </form>

              {/* Activities Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Línea de Tiempo y Trazabilidad del Radicado
                </h4>
                <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {ticket.actividades.map((act, idx) => (
                    <div key={act.id || idx} className="relative">
                      <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white"></div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900 text-xs">{act.accion}</span>
                          <span className="text-[10px] text-slate-400 font-mono tabular-nums">{act.fecha}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mb-1">
                          Responsable: <span className="font-semibold text-slate-700">{act.autor}</span> ({act.rol})
                        </p>
                        {act.detalle && (
                          <p className="text-xs text-slate-700 bg-white p-2 rounded-lg border border-slate-100">
                            {act.detalle}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'responder' && (
            <form onSubmit={handleRespond} className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1">
                <span className="font-bold">Protocolo de Respuesta Formal (Ley 1755 de 2015):</span>
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  La respuesta debe ser clara, congruente, de fondo y fundamentada en la verdad. Se enviará al usuario a través del canal oficial registrado ({ticket.canalRecepcion} / {ticket.userEmail}).
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Texto de la Respuesta al Usuario *
                </label>
                <textarea
                  required
                  rows={6}
                  value={responseDraft}
                  onChange={e => setResponseDraft(e.target.value)}
                  placeholder="Estimado(a) usuario(a): En atención a su solicitud de la referencia, nos permitimos informar que..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Acción o Solución Ejecutada (Resumen Interno)
                </label>
                <input
                  type="text"
                  value={solucionDraft}
                  onChange={e => setSolucionDraft(e.target.value)}
                  placeholder="Ej. Se corrigió acta de entrega y se reprogramó entrega de kits..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('detalle')}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar y Registrar Respuesta</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'asignar' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-slate-900">Reasignar Caso a Colaborador o Área</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Área Responsable
                    </label>
                    <select
                      value={assignArea}
                      onChange={e => setAssignArea(e.target.value as AreaResponsable)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="Servicio al Cliente">Servicio al Cliente</option>
                      <option value="Jurídica">Jurídica</option>
                      <option value="Trabajo Social">Trabajo Social</option>
                      <option value="Proyectos Comunitarios">Proyectos Comunitarios</option>
                      <option value="Dirección General">Dirección General</option>
                      <option value="Talento Humano">Talento Humano</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Colaborador Encargado
                    </label>
                    <select
                      value={assignee}
                      onChange={e => setAssignee(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="">Seleccionar colaborador...</option>
                      {systemUsers.map(s => (
                        <option key={s.id} value={s.nombre}>
                          {s.nombre} ({s.cargo})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleAssign}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition"
                  >
                    Guardar Reasignación
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-slate-900">Cambio Manual de Estado</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Nuevo Estado
                    </label>
                    <select
                      value={newStatus}
                      onChange={e => setNewStatus(e.target.value as EstadoPQRS)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="Recibida">Recibida</option>
                      <option value="Pendiente de asignación">Pendiente de asignación</option>
                      <option value="Asignada">Asignada</option>
                      <option value="En proceso">En proceso</option>
                      <option value="En espera de información">En espera de información</option>
                      <option value="Respondida">Respondida</option>
                      <option value="Solucionada y cerrada">Solucionada y cerrada</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Motivo o Justificación del Cambio
                    </label>
                    <input
                      type="text"
                      value={statusNote}
                      onChange={e => setStatusNote(e.target.value)}
                      placeholder="Ej. Se solicitó documento adicional a la beneficiaria..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleStatusChange}
                    className="px-4 py-1.5 text-xs font-semibold text-slate-800 bg-slate-200 hover:bg-slate-300 rounded-lg transition"
                  >
                    Actualizar Estado
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">
            Radicado Oficial · Corporación Social Somos Uno
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition"
          >
            Cerrar Ventana
          </button>
        </div>
      </div>
    </div>
  );
};
