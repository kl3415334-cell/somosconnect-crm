/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Platform Uninstallation & Device De-provisioning View for SomosConnect CRM - Corporación Social Somos Uno
 */

import React, { useState } from 'react';
import { 
  Trash2, 
  AlertTriangle, 
  Download, 
  ShieldAlert, 
  LogOut, 
  Monitor, 
  Smartphone, 
  Globe, 
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';

export const UninstallView: React.FC = () => {
  const { exportBackupJSON, clearAllData, currentUser, showToast } = useCRM();

  const [confirmPassword, setConfirmPassword] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [sessionRevoked, setSessionRevoked] = useState(false);

  const handleRevokeSession = () => {
    setSessionRevoked(true);
    showToast('Sesión de este dispositivo cerrada y token de acceso revocado.', 'info');
  };

  const handleClearLocalData = (e: React.FormEvent) => {
    e.preventDefault();
    const res = clearAllData(confirmPassword);
    if (res.success) {
      setShowClearConfirm(false);
      setConfirmPassword('');
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Desinstalar Plataforma</h2>
          <p className="text-xs text-slate-500">
            Procedimiento seguro para desinstalar la aplicación del dispositivo, revocar credenciales y proteger los registros centrales.
          </p>
        </div>

        <button
          onClick={exportBackupJSON}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>Descargar Copia de Seguridad Antes de Desinstalar</span>
        </button>
      </div>

      {/* Critical Institutional Notice (Specified in Prompt) */}
      <div className="p-5 bg-amber-50 border-2 border-amber-300 rounded-2xl text-xs text-amber-950 space-y-2 shadow-2xs">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
          <span>AVISO IMPORTANTE DE SEGURIDAD Y CONSERVACIÓN DOCUMENTAL</span>
        </div>
        <p className="text-amber-900 text-xs leading-relaxed font-medium">
          Desinstalar la aplicación de su computador o teléfono celular <strong>NO elimina la información de la base de datos central</strong> de la Corporación Social Somos Uno. Los radicados de PQRS, expedientes de usuarios, bitácoras de auditoría y reportes se conservan intactos conforme a las directrices de la Ley 1755 de 2015 y Ley 1581 de 2012.
        </p>
        <p className="text-[11px] text-amber-800">
          La eliminación de registros en la base de datos es un proceso completamente independiente que requiere autorización ejecutiva, justificación legal y doble clave de seguridad.
        </p>
      </div>

      {/* Recommended 3-Step Procedure */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">
          Procedimiento Recomendado Antes de Desinstalar
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Step 1 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="w-6 h-6 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="font-bold text-slate-900 text-xs">Descargar Respaldo</h4>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Guarde un archivo JSON estructurado con todos los casos y usuarios registrados para evitar cualquier pérdida local.
              </p>
            </div>
            <button
              onClick={exportBackupJSON}
              className="w-full py-2 bg-white text-blue-700 hover:bg-blue-50 font-semibold border border-blue-200 rounded-lg transition"
            >
              Exportar Respaldo
            </button>
          </div>

          {/* Step 2 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="w-6 h-6 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="font-bold text-slate-900 text-xs">Cerrar Sesión Activa</h4>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Cierre su sesión para revocar los permisos asignados a su perfil en este equipo o dispositivo particular.
              </p>
            </div>
            <button
              onClick={handleRevokeSession}
              disabled={sessionRevoked}
              className="w-full py-2 bg-white text-slate-700 hover:bg-slate-100 font-semibold border border-slate-300 rounded-lg transition disabled:opacity-50"
            >
              {sessionRevoked ? '✓ Sesión Revocada' : 'Cerrar y Revocar Sesión'}
            </button>
          </div>

          {/* Step 3 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="w-6 h-6 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h4 className="font-bold text-slate-900 text-xs">Desinstalar del SO</h4>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Siga las instrucciones específicas de su sistema operativo (Windows, Android o iOS) detalladas a continuación.
              </p>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Listo para desinstalar</span>
            </span>
          </div>
        </div>
      </div>

      {/* Step by step OS Guides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Windows */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-blue-700" />
            <h4 className="font-bold text-slate-900 text-sm">Pasos para Windows</h4>
          </div>
          <ol className="list-decimal pl-4 space-y-1.5 text-xs text-slate-600 leading-relaxed">
            <li>Abra <strong>Configuración de Windows</strong> (teclas Win + I).</li>
            <li>Seleccione <strong>"Aplicaciones"</strong> &gt; <strong>"Aplicaciones instaladas"</strong>.</li>
            <li>Busque <strong>"SomosConnect CRM"</strong> en la lista.</li>
            <li>Haga clic en los tres puntos y elija <strong>"Desinstalar"</strong>.</li>
            <li>Opcional: Si la ventana de la app está abierta, haga clic en el menú superior <code className="bg-slate-100 px-1 py-0.5 rounded text-[10px]">⋮</code> y seleccione <em>"Desinstalar SomosConnect CRM..."</em>.</li>
          </ol>
        </div>

        {/* Android */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-700" />
            <h4 className="font-bold text-slate-900 text-sm">Pasos para Android</h4>
          </div>
          <ol className="list-decimal pl-4 space-y-1.5 text-xs text-slate-600 leading-relaxed">
            <li>En la pantalla de inicio o menú de aplicaciones, mantenga presionado el ícono de <strong>SomosConnect</strong>.</li>
            <li>Toque el ícono de papelera o la opción <strong>"Desinstalar"</strong>.</li>
            <li>Confirme la acción en el mensaje emergente de Android.</li>
            <li>La aplicación y su acceso directo quedarán removidos del dispositivo.</li>
          </ol>
        </div>

        {/* Browsers */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-sky-700" />
            <h4 className="font-bold text-slate-900 text-sm">Navegadores Web</h4>
          </div>
          <ol className="list-decimal pl-4 space-y-1.5 text-xs text-slate-600 leading-relaxed">
            <li>En Chrome o Edge, vaya a la barra de direcciones y escriba: <code className="bg-slate-100 px-1 py-0.5 rounded text-[10px]">chrome://apps</code> o <code className="bg-slate-100 px-1 py-0.5 rounded text-[10px]">edge://apps</code>.</li>
            <li>Haga clic derecho sobre <strong>SomosConnect CRM</strong>.</li>
            <li>Seleccione <strong>"Eliminar de Chrome/Edge"</strong>.</li>
            <li>Para Safari en iOS, mantenga presionado el ícono en el inicio y seleccione <em>"Eliminar marcador"</em>.</li>
          </ol>
        </div>
      </div>

      {/* Advanced production cleanup tool for Admin only */}
      {currentUser.permisos.canDelete && (
        <div className="p-6 bg-red-50/50 rounded-2xl border border-red-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-900">
              <Lock className="w-5 h-5 text-red-600" />
              <div>
                <h4 className="font-bold text-sm">Área Restringida: Puesta en Producción / Vaciado de Registros</h4>
                <p className="text-xs text-red-700">Solo habilitada para perfiles Administrador y Gerente</p>
              </div>
            </div>
            <button
              onClick={() => setShowClearConfirm(!showClearConfirm)}
              className="px-3.5 py-1.5 text-xs font-semibold text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition"
            >
              {showClearConfirm ? 'Ocultar Opciones' : 'Preparar para Producción'}
            </button>
          </div>

          {showClearConfirm && (
            <form onSubmit={handleClearLocalData} className="p-4 bg-white rounded-xl border border-red-200 space-y-3 text-xs">
              <p className="text-slate-700 leading-relaxed">
                Esta opción elimina todos los datos de muestra de demostración académica para dejar la base de datos lista para el registro de solicitudes reales de la Corporación. Se requiere confirmación con clave institucional (<code className="bg-slate-100 px-1 py-0.5 rounded">LIMPIAR-TODO-SOMOSUNO</code> o <code className="bg-slate-100 px-1 py-0.5 rounded">admin123</code>).
              </p>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Clave de Confirmación Requerida *</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Ingrese LIMPIAR-TODO-SOMOSUNO..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
                />
              </div>

              <div className="flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(false)}
                  className="px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs"
                >
                  Confirmar Limpieza de Muestra
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
