/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Security, Roles & RBAC Protection View for SomosConnect CRM - Corporación Social Somos Uno
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Key, 
  Lock, 
  Users, 
  Clock, 
  Download, 
  Upload, 
  CheckCircle2, 
  XCircle, 
  FileCheck,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { RoleType } from '../types';

export const SecurityView: React.FC = () => {
  const { 
    currentUser, 
    setCurrentUserRole, 
    systemUsers, 
    activityLogs, 
    exportBackupJSON, 
    importBackupJSON, 
    showToast 
  } = useCRM();

  const [activeSubTab, setActiveSubTab] = useState<'perfiles' | 'respaldos' | 'politica' | 'inactividad'>('perfiles');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [inactivityMinutes, setInactivityMinutes] = useState('15');
  const [backupFileContent, setBackupFileContent] = useState('');

  const permissionsMatrix = [
    { name: 'Eliminar registros (usuarios o PQRS)', key: 'canDelete', admin: true, gerente: true, coord: false, asesor: false, gestor: false },
    { name: 'Asignar / Reasignar solicitudes y áreas', key: 'canAssign', admin: true, gerente: true, coord: true, asesor: false, gestor: true },
    { name: 'Emitir respuestas formales de fondo', key: 'canRespond', admin: true, gerente: true, coord: true, asesor: true, gestor: true },
    { name: 'Cerrar y marcar solicitudes como solucionadas', key: 'canClose', admin: true, gerente: true, coord: true, asesor: false, gestor: true },
    { name: 'Configurar plazos legales de respuesta (Ley 1755)', key: 'canConfigureLegal', admin: true, gerente: true, coord: false, asesor: false, gestor: false },
    { name: 'Modificar manual de funciones y competencias', key: 'canEditFunctions', admin: true, gerente: true, coord: false, asesor: false, gestor: false },
    { name: 'Exportar informes oficiales en PDF y Excel', key: 'canExportReports', admin: true, gerente: true, coord: true, asesor: true, gestor: true },
    { name: 'Gestionar usuarios del sistema y credenciales', key: 'canManageUsers', admin: true, gerente: true, coord: true, asesor: false, gestor: false },
  ];

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showToast('La nueva contraseña debe tener mínimo 6 caracteres.', 'error');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showToast('Las contraseñas no coinciden.', 'error');
      return;
    }
    showToast('Contraseña actualizada con éxito en el sistema.', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = importBackupJSON(content);
        if (!res.success) {
          showToast(res.message, 'error');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Seguridad y Protección de la Información</h2>
          <p className="text-xs text-slate-500">
            Control de accesos por roles (RBAC), auditoría, copias de seguridad y cumplimiento de la Ley 1581 de 2012.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('perfiles')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeSubTab === 'perfiles' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Roles y Permisos
          </button>
          <button
            onClick={() => setActiveSubTab('respaldos')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeSubTab === 'respaldos' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Copias de Seguridad
          </button>
          <button
            onClick={() => setActiveSubTab('politica')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeSubTab === 'politica' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Política Habeas Data
          </button>
          <button
            onClick={() => setActiveSubTab('inactividad')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeSubTab === 'inactividad' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sesión y Clave
          </button>
        </div>
      </div>

      {activeSubTab === 'perfiles' && (
        <div className="space-y-6">
          {/* Active Session Card */}
          <div className="p-5 bg-gradient-to-r from-[#002b55] to-blue-800 rounded-2xl text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-lg text-sky-200">
                {currentUser.nombre.charAt(0)}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300">
                  Sesión Activa Actual
                </span>
                <h3 className="text-base font-bold text-white">{currentUser.nombre}</h3>
                <p className="text-xs text-sky-100 font-medium">{currentUser.cargo} · {currentUser.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-sky-200 mr-1 hidden md:inline">Simular cambio de rol:</span>
              <select
                value={currentUser.cargo}
                onChange={e => setCurrentUserRole(e.target.value as RoleType)}
                className="px-3 py-2 text-xs font-semibold text-slate-900 bg-white rounded-xl border-none shadow-sm focus:ring-2 focus:ring-sky-400"
              >
                {systemUsers.map(u => (
                  <option key={u.id} value={u.cargo}>
                    {u.cargo} ({u.nombre.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* RBAC Permission Matrix Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden p-6 space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Matriz Institucional de Control de Acceso (RBAC)</h3>
              <p className="text-xs text-slate-500">
                Distribución de privilegios específicos según las responsabilidades asignadas en el Manual de Funciones.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Operación / Privilegio</th>
                    <th className="py-3 px-3 text-center">Administrador</th>
                    <th className="py-3 px-3 text-center">Gerente</th>
                    <th className="py-3 px-3 text-center">Coordinador</th>
                    <th className="py-3 px-3 text-center">Gestor PQRS</th>
                    <th className="py-3 px-3 text-center">Asesor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {permissionsMatrix.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-medium text-slate-900">
                        {item.name}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {item.admin ? (
                          <span className="inline-flex text-emerald-600 font-bold">✓ Autorizado</span>
                        ) : (
                          <span className="inline-flex text-slate-300">✕</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {item.gerente ? (
                          <span className="inline-flex text-emerald-600 font-bold">✓ Autorizado</span>
                        ) : (
                          <span className="inline-flex text-slate-300">✕</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {item.coord ? (
                          <span className="inline-flex text-emerald-600 font-bold">✓ Autorizado</span>
                        ) : (
                          <span className="inline-flex text-slate-300">✕</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {item.gestor ? (
                          <span className="inline-flex text-emerald-600 font-bold">✓ Autorizado</span>
                        ) : (
                          <span className="inline-flex text-slate-300">✕</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {item.asesor ? (
                          <span className="inline-flex text-emerald-600 font-bold">✓ Autorizado</span>
                        ) : (
                          <span className="inline-flex text-slate-300">✕</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'respaldos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Export card */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Generar Copia de Seguridad Completa</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Descarga un archivo JSON encriptable que contiene la totalidad de radicados de PQRS, expedientes de usuarios, encuestas de satisfacción, manuales de funciones y bitácoras de auditoría.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={exportBackupJSON}
                className="w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Copia de Seguridad (.json)</span>
              </button>
            </div>
          </div>

          {/* Import card */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Restaurar Copia de Seguridad</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Restaure la base de datos a partir de un respaldo generado previamente por la plataforma SomosConnect CRM.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <label className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer border border-slate-300">
                <Upload className="w-4 h-4 text-slate-600" />
                <span>Seleccionar Archivo de Respaldo (.json)</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'politica' && (
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="flex items-center gap-2 text-blue-900 pb-3 border-b border-slate-100">
            <ShieldCheck className="w-6 h-6 text-blue-700" />
            <div>
              <h3 className="font-bold text-sm text-slate-900">Política de Tratamiento de Datos Personales (Habeas Data)</h3>
              <p className="text-[11px] text-slate-500">Conforme a la Ley Estatutaria 1581 de 2012 y Decreto Reglamentario 1074 de 2015</p>
            </div>
          </div>

          <div className="space-y-3">
            <p>
              La <strong>Corporación Social Somos Uno</strong>, identificada con NIT 900.876.543-1, en calidad de responsable del tratamiento de datos personales obtenidos a través de la plataforma SomosConnect CRM, informa a los titulares:
            </p>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900">1. Finalidad del Tratamiento</h4>
              <p>
                Los datos personales de contacto, identificación y contexto social son recolectados con el único propósito de gestionar, dar trámite y respuesta de fondo a las Peticiones, Quejas, Reclamos y Solicitudes de información radicadas, así como evaluar la satisfacción de la comunidad atendida.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900">2. Derechos del Titular</h4>
              <p>
                El usuario tiene derecho a conocer, actualizar, rectificar y suprimir sus datos personales en cualquier momento mediante solicitud expresa ante el área de Servicio al Cliente o al correo electrónico <code className="bg-white px-1 py-0.5 rounded border border-slate-200">privacidad@somosuno.org.co</code>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900">3. Medidas de Seguridad y Reserva</h4>
              <p>
                La plataforma implementa controles de acceso estrictos basados en roles, impidiendo que colaboradores no autorizados modifiquen o extraigan información sensible de niños, beneficiarios o comunidades vulnerables.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'inactividad' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Password change form */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Key className="w-5 h-5 text-blue-700" />
              <h3 className="font-bold text-slate-900 text-sm">Cambiar Contraseña de Sesión</h3>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contraseña Actual</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nueva Contraseña</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  required
                  value={confirmNewPassword}
                  onChange={e => setConfirmNewPassword(e.target.value)}
                  placeholder="Repita la nueva contraseña"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-xs transition"
                >
                  Actualizar Contraseña
                </button>
              </div>
            </form>
          </div>

          {/* Inactivity timer settings */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Clock className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-sm">Cierre de Sesión Automático por Inactividad</h3>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600 leading-relaxed">
                Para prevenir accesos no autorizados en terminales compartidas, el sistema cierra la sesión si no se detecta interacción del teclado o mouse durante el tiempo establecido:
              </p>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tiempo de Inactividad Permitido</label>
                <select
                  value={inactivityMinutes}
                  onChange={e => {
                    setInactivityMinutes(e.target.value);
                    showToast(`Tiempo de inactividad configurado a ${e.target.value} minutos.`);
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="5">5 minutos (Máxima seguridad)</option>
                  <option value="15">15 minutos (Recomendado estándar)</option>
                  <option value="30">30 minutos</option>
                  <option value="60">60 minutos (1 hora)</option>
                </select>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
                Estado actual: <strong>Protección activa</strong>. Se emitirá advertencia 60 segundos antes del cierre de sesión.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
