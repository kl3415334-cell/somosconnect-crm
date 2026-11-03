/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * New User Modal for SomosConnect CRM
 */

import React, { useState } from 'react';
import { X, UserPlus, ShieldAlert, Check } from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { TipoDocumento, TipoUsuario, EstadoAtencionUsuario } from '../../types';

interface NewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated?: (userId: string) => void;
}

export const NewUserModal: React.FC<NewUserModalProps> = ({
  isOpen,
  onClose,
  onUserCreated
}) => {
  const { addUser } = useCRM();

  const [nombre, setNombre] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento>('CC');
  const [documento, setDocumento] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>('Beneficiario');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('Medellín');
  const [estadoAtencion, setEstadoAtencion] = useState<EstadoAtencionUsuario>('Activo');
  const [observaciones, setObservaciones] = useState('');
  const [autorizacionDatos, setAutorizacionDatos] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!nombre.trim() || !documento.trim() || !email.trim() || !telefono.trim()) {
      setErrorMsg('Por favor complete todos los campos obligatorios marcados con *');
      return;
    }

    if (!autorizacionDatos) {
      setErrorMsg('Debe registrar la autorización de tratamiento de datos personales conforme a la Ley 1581 de 2012.');
      return;
    }

    const res = addUser({
      nombre: nombre.trim(),
      tipoDocumento,
      documento: documento.trim(),
      email: email.trim(),
      telefono: telefono.trim(),
      tipoUsuario,
      direccion: direccion.trim() || 'No registrada',
      ciudad: ciudad.trim() || 'Medellín',
      estadoAtencion,
      observaciones: observaciones.trim(),
      autorizacionDatos
    });

    if (res.success && res.user) {
      if (onUserCreated) onUserCreated(res.user.id);
      onClose();
      // Reset form
      setNombre('');
      setDocumento('');
      setEmail('');
      setTelefono('');
      setObservaciones('');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#002b55] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <UserPlus className="w-5 h-5 text-sky-400" />
            <div>
              <h2 className="text-base font-bold">Registrar Nuevo Usuario / Beneficiario</h2>
              <p className="text-xs text-sky-200">Corporación Social Somos Uno · Servicio al Cliente</p>
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
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nombre Completo o Razón Social *
              </label>
              <input
                type="text"
                required
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Ej. María Elena Salazar Henao"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tipo de Documento *
              </label>
              <select
                value={tipoDocumento}
                onChange={e => setTipoDocumento(e.target.value as TipoDocumento)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="CC">Cédula de Ciudadanía (CC)</option>
                <option value="CE">Cédula de Extranjería (CE)</option>
                <option value="TI">Tarjeta de Identidad (TI)</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="NIT">NIT (Persona Jurídica)</option>
                <option value="PEP">Permiso Especial de Permanencia (PEP)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Número de Identificación *
              </label>
              <input
                type="text"
                required
                value={documento}
                onChange={e => setDocumento(e.target.value)}
                placeholder="Ej. 43567890"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Correo Electrónico *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Teléfono / Celular *
              </label>
              <input
                type="tel"
                required
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
                placeholder="Ej. 3124567890"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tipo de Usuario
              </label>
              <select
                value={tipoUsuario}
                onChange={e => setTipoUsuario(e.target.value as TipoUsuario)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="Beneficiario">Beneficiario (Programas Sociales)</option>
                <option value="Afiliado">Afiliado / Voluntario</option>
                <option value="Aliado">Aliado Estratégico / Fundación</option>
                <option value="Proveedor">Proveedor / Contratista</option>
                <option value="Comunidad General">Comunidad General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estado de Atención
              </label>
              <select
                value={estadoAtencion}
                onChange={e => setEstadoAtencion(e.target.value as EstadoAtencionUsuario)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="Activo">Activo</option>
                <option value="Al día">Al día</option>
                <option value="En atención">En atención</option>
                <option value="Con solicitud pendiente">Con solicitud pendiente</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ciudad / Municipio
              </label>
              <input
                type="text"
                value={ciudad}
                onChange={e => setCiudad(e.target.value)}
                placeholder="Ej. Medellín"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Dirección Residencial / Sede
              </label>
              <input
                type="text"
                value={direccion}
                onChange={e => setDireccion(e.target.value)}
                placeholder="Ej. Carrera 45 # 67 - 23"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Observaciones o Contexto Comunitario
              </label>
              <textarea
                rows={2}
                value={observaciones}
                onChange={e => setObservaciones(e.target.value)}
                placeholder="Detalles relevantes sobre programas o grupos poblacionales a los que pertenece..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Habeas Data Checkbox */}
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/60">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={autorizacionDatos}
                onChange={e => setAutorizacionDatos(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span className="text-[11px] text-slate-700 leading-tight">
                <strong>Autorización Ley 1581 de 2012 (Habeas Data):</strong> El titular autoriza de manera voluntaria, previa y explícita a la <em>Corporación Social Somos Uno</em> para recolectar y tratar sus datos personales con fines de atención, seguimiento y prestación de servicios sociales.
              </span>
            </label>
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
              <span>Guardar Usuario</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
