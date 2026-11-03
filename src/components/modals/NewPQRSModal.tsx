/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * New PQRS Ticket Modal for SomosConnect CRM
 */

import React, { useState, useEffect } from 'react';
import { X, FilePlus, Calendar, Clock, AlertCircle, Check, Paperclip } from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { 
  TipoPQRS, 
  CanalRecepcion, 
  AreaResponsable, 
  Prioridad, 
  EstadoPQRS 
} from '../../types';

interface NewPQRSModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedUserId?: string;
}

export const NewPQRSModal: React.FC<NewPQRSModalProps> = ({
  isOpen,
  onClose,
  preselectedUserId
}) => {
  const { users, terminosConfig, addPQRS, currentUser, systemUsers } = useCRM();

  const now = new Date();
  const todayStr = now.toISOString().substring(0, 10);
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const [selectedUserId, setSelectedUserId] = useState(preselectedUserId || (users[0]?.id || ''));
  const [fechaRecepcion, setFechaRecepcion] = useState(todayStr);
  const [horaRecepcion, setHoraRecepcion] = useState(timeStr);
  const [tipo, setTipo] = useState<TipoPQRS>('Petición');
  const [canalRecepcion, setCanalRecepcion] = useState<CanalRecepcion>('WhatsApp');
  const [areaResponsable, setAreaResponsable] = useState<AreaResponsable>('Servicio al Cliente');
  const [colaboradorAsignado, setColaboradorAsignado] = useState(systemUsers[2]?.nombre || 'Lic. Laura Camila Gómez');
  const [prioridad, setPrioridad] = useState<Prioridad>('Media');
  const [descripcion, setDescripcion] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-calculate deadline based on terminosConfig
  const currentTermino = terminosConfig.find(t => t.tipoPQRS === tipo);
  const diasHabiles = currentTermino?.diasHabiles || 15;
  const normaAplicable = currentTermino?.normaReferencia || 'Ley 1755 de 2015';

  const calculateDeadline = (startDate: string, businessDays: number): string => {
    const d = new Date(startDate);
    let count = 0;
    while (count < businessDays) {
      d.setDate(d.getDate() + 1);
      const dayOfWeek = d.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip Sat & Sun
        count++;
      }
    }
    return d.toISOString().substring(0, 10);
  };

  const fechaLimite = calculateDeadline(fechaRecepcion, diasHabiles);

  useEffect(() => {
    if (preselectedUserId) {
      setSelectedUserId(preselectedUserId);
    } else if (users.length > 0 && !selectedUserId) {
      setSelectedUserId(users[0].id);
    }
  }, [preselectedUserId, users]);

  if (!isOpen) return null;

  const selectedUser = users.find(u => u.id === selectedUserId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedUser) {
      setErrorMsg('Debe seleccionar o registrar previamente un usuario beneficiario.');
      return;
    }

    if (!descripcion.trim()) {
      setErrorMsg('La descripción detallada del caso es obligatoria.');
      return;
    }

    const attachments = attachmentName ? [
      {
        id: `adj-${Date.now()}`,
        nombre: attachmentName,
        tamano: '840 KB',
        tipo: 'application/pdf',
        fecha: fechaRecepcion
      }
    ] : [];

    const res = addPQRS({
      userId: selectedUser.id,
      userName: selectedUser.nombre,
      userDoc: selectedUser.documento,
      userEmail: selectedUser.email,
      userPhone: selectedUser.telefono,
      fechaRecepcion,
      horaRecepcion,
      tipo,
      descripcion: descripcion.trim(),
      canalRecepcion,
      areaResponsable,
      colaboradorAsignado,
      prioridad,
      fechaLimite,
      diasTermino: diasHabiles,
      normaAplicable,
      estado: 'Recibida' as EstadoPQRS,
      documentosAdjuntos: attachments,
      observaciones: observaciones.trim(),
      respuestaEnviada: ''
    });

    if (res.success) {
      onClose();
      // Reset
      setDescripcion('');
      setObservaciones('');
      setAttachmentName('');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#002b55] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FilePlus className="w-5 h-5 text-sky-400" />
            <div>
              <h2 className="text-base font-bold">Radicar Nueva Solicitud PQRS</h2>
              <p className="text-xs text-sky-200">Asignación de consecutivo automático y cómputo de términos legales</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-sky-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* User selector */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              Usuario o Beneficiario Solicitante *
            </label>
            {users.length === 0 ? (
              <p className="text-xs text-amber-700 font-medium">
                No hay usuarios en la base de datos. Por favor registre primero un usuario.
              </p>
            ) : (
              <select
                value={selectedUserId}
                onChange={e => setSelectedUserId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                {users.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.nombre} · {u.tipoDocumento} {u.documento} ({u.tipoUsuario} - {u.ciudad})
                  </option>
                ))}
              </select>
            )}

            {selectedUser && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-slate-600 border-t border-slate-200">
                <div>
                  <span className="font-semibold text-slate-700">Teléfono:</span> {selectedUser.telefono}
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Correo:</span> {selectedUser.email}
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Estado:</span> {selectedUser.estadoAtencion}
                </div>
              </div>
            )}
          </div>

          {/* Type, Channel, Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tipo de Solicitud *
              </label>
              <select
                value={tipo}
                onChange={e => setTipo(e.target.value as TipoPQRS)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="Petición">Petición (Interés general/particular)</option>
                <option value="Queja">Queja (Conducta de colaborador)</option>
                <option value="Reclamo">Reclamo (Servicio o prestación)</option>
                <option value="Sugerencia">Sugerencia (Propuesta de mejora)</option>
                <option value="Felicitación">Felicitación (Reconocimiento)</option>
                <option value="Solicitud de información">Solicitud de información (Docs)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Canal de Recepción *
              </label>
              <select
                value={canalRecepcion}
                onChange={e => setCanalRecepcion(e.target.value as CanalRecepcion)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="WhatsApp">WhatsApp (Línea Oficial)</option>
                <option value="Correo electrónico">Correo electrónico (PQRS)</option>
                <option value="Llamada telefónica">Llamada telefónica (PBX)</option>
                <option value="Página web">Página web (Formulario)</option>
                <option value="Atención presencial">Atención presencial (Ventanilla)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nivel de Prioridad *
              </label>
              <select
                value={prioridad}
                onChange={e => setPrioridad(e.target.value as Prioridad)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="Baja">Baja</option>
                <option value="Media">Media (Estándar)</option>
                <option value="Alta">Alta</option>
                <option value="Crítica">Crítica (Urgente / Menor o Adulto Mayor)</option>
              </select>
            </div>
          </div>

          {/* Area & Collaborator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Área Responsable de Atención *
              </label>
              <select
                value={areaResponsable}
                onChange={e => setAreaResponsable(e.target.value as AreaResponsable)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Colaborador Asignado *
              </label>
              <select
                value={colaboradorAsignado}
                onChange={e => setColaboradorAsignado(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                {systemUsers.map(s => (
                  <option key={s.id} value={s.nombre}>
                    {s.nombre} ({s.cargo})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Legal calculation notification card */}
          <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-blue-900 font-bold">
                <Calendar className="w-4 h-4 text-blue-700" />
                <span>Término Legal Aplicable: {diasHabiles} Días Hábiles</span>
              </div>
              <p className="text-[11px] text-blue-800">
                Norma: <span className="font-semibold">{normaAplicable}</span>
              </p>
            </div>
            <div className="text-right sm:border-l sm:border-blue-200 sm:pl-4">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Fecha límite de respuesta</span>
              <span className="font-mono font-bold text-sm text-blue-950 tabular-nums">{fechaLimite}</span>
            </div>
          </div>

          {/* Case Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Descripción Detallada del Caso *
            </label>
            <textarea
              required
              rows={3}
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              placeholder="Describa claramente los hechos, motivos de la solicitud o inconformidad..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Observations & Attachment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Observaciones Iniciales
              </label>
              <input
                type="text"
                value={observaciones}
                onChange={e => setObservaciones(e.target.value)}
                placeholder="Notas de recepción o anexos verificados..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                <span>Documento Adjunto (Opcional)</span>
              </label>
              <input
                type="text"
                value={attachmentName}
                onChange={e => setAttachmentName(e.target.value)}
                placeholder="Ej. Fotocopia_Cedula_Soporte.pdf"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Radicar Solicitud</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
